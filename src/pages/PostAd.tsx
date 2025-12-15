import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BottomNav } from "@/components/BottomNav";
import { useAuth } from "@/contexts/AuthContext";
import { useCreateListing } from "@/hooks/useListings";
import { useImageUpload } from "@/hooks/useImageUpload";
import { categories } from "@/data/categories";
import { toast } from "sonner";
import { PromotionSelector, promotionOptions } from "@/components/PromotionSelector";
import { PaymentModal } from "@/components/PaymentModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const conditions = [
  "Brand New",
  "Foreign Used",
  "Local Used",
  "Ugandan Used",
  "Refurbished",
];

const locations = [
  { name: "Kampala", regions: ["Central Division", "Nakawa", "Rubaga", "Makindye", "Kawempe"] },
  { name: "Mukono", regions: ["Mukono TC", "Seeta", "Goma"] },
  { name: "Wakiso", regions: ["Nansana", "Kira", "Entebbe"] },
  { name: "Jinja", regions: ["Jinja Central", "Bugembe"] },
  { name: "Mbarara", regions: ["Mbarara Central", "Kakoba"] },
];

const PostAd = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const createListing = useCreateListing();
  const { uploadMultipleImages, uploading, progress } = useImageUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");
  const [region, setRegion] = useState("");
  const [phone, setPhone] = useState("");
  const [negotiable, setNegotiable] = useState("not-sure");
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [selectedPromotion, setSelectedPromotion] = useState("none");
  const [showPayment, setShowPayment] = useState(false);
  const [pendingSubmit, setPendingSubmit] = useState(false);

  const selectedLocation = locations.find(l => l.name === location);
  const selectedPromotionOption = promotionOptions.find(p => p.id === selectedPromotion);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    if (images.length + newFiles.length > 8) {
      toast.error("Maximum 8 images allowed");
      return;
    }

    setImages(prev => [...prev, ...newFiles]);
    
    newFiles.forEach(file => {
      const url = URL.createObjectURL(file);
      setImageUrls(prev => [...prev, url]);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImageUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleClear = () => {
    setTitle("");
    setDescription("");
    setPrice("");
    setCategory("");
    setCondition("");
    setLocation("");
    setRegion("");
    setPhone("");
    setNegotiable("not-sure");
    setImages([]);
    setImageUrls([]);
    setSelectedPromotion("none");
  };

  const validateForm = () => {
    if (!user) {
      toast.error("Please sign in to post an ad");
      navigate("/auth");
      return false;
    }

    if (!title || !price || !category || !condition || !location || !region) {
      toast.error("Please fill in all required fields");
      return false;
    }

    if (images.length < 1) {
      toast.error("Please add at least 1 photo");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    // If promotion selected and costs money, show payment
    if (selectedPromotion !== "none" && selectedPromotionOption && selectedPromotionOption.price > 0) {
      setPendingSubmit(true);
      setShowPayment(true);
      return;
    }

    await submitListing(false);
  };

  const submitListing = async (isPromoted: boolean) => {
    try {
      const uploadedUrls = await uploadMultipleImages(images);
      
      if (uploadedUrls.length === 0) {
        toast.error("Failed to upload images");
        return;
      }

      await createListing.mutateAsync({
        user_id: user!.id,
        title,
        description: description || null,
        price: parseInt(price),
        currency: "USh",
        category,
        condition,
        location,
        region,
        phone: phone || null,
        is_negotiable: negotiable === "yes" ? true : negotiable === "no" ? false : null,
        is_promoted: isPromoted,
        is_featured: selectedPromotion === "boost",
        images: uploadedUrls,
      });

      toast.success("Ad posted successfully!");
      navigate("/my-adverts");
    } catch (error) {
      console.error("Error creating listing:", error);
    }
  };

  const handlePaymentSuccess = () => {
    setPendingSubmit(false);
    submitListing(true);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card sticky top-0 z-50 border-b border-border">
        <div className="container py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2">
              <ArrowLeft className="w-5 h-5 text-primary" />
            </button>
            <span className="font-medium text-primary">Post ad</span>
          </div>
          <button onClick={handleClear} className="text-destructive font-medium">
            Clear
          </button>
        </div>
      </header>

      <main className="container py-4 space-y-6">
        {/* Title & Category */}
        <div className="bg-card rounded-xl p-4">
          <div className="text-right text-sm text-muted-foreground mb-2">
            {title.length} / 70
          </div>
          <Input
            placeholder="Title*"
            value={title}
            onChange={(e) => setTitle(e.target.value.slice(0, 70))}
            className={!title ? "border-destructive" : ""}
          />
          {!title && (
            <p className="text-xs text-destructive mt-1">This field is required.</p>
          )}

          <div className="mt-4">
            <Label className="text-muted-foreground text-xs">Category*</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Photo Upload */}
          <div className="mt-6">
            <Label className="font-medium">Add photos</Label>
            <p className="text-sm text-primary mt-1">Add at least 1 photo (max 8)</p>
            <p className="text-xs text-muted-foreground">First picture is the title picture.</p>
            
            <div className="mt-3 flex gap-3 flex-wrap">
              {imageUrls.map((url, index) => (
                <div key={index} className="relative w-24 h-24">
                  <img 
                    src={url} 
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  {index === 0 && (
                    <span className="absolute bottom-1 left-1 bg-primary text-primary-foreground text-xs px-1 rounded">
                      Main
                    </span>
                  )}
                </div>
              ))}
              {images.length < 8 && (
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-24 h-24 bg-secondary rounded-xl flex items-center justify-center border-2 border-dashed border-primary/30 hover:border-primary/50 transition-colors"
                >
                  <Plus className="w-8 h-8 text-primary" />
                </button>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png"
              multiple
              onChange={handleImageSelect}
              className="hidden"
            />
            <p className="text-sm text-primary mt-2">Supported formats: .jpg and .png</p>
          </div>
        </div>

        {/* Location & Details */}
        <div className="bg-card rounded-xl p-4 space-y-4">
          <div>
            <Label className="text-muted-foreground text-xs">Location*</Label>
            <Select value={location} onValueChange={(val) => { setLocation(val); setRegion(""); }}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((loc) => (
                  <SelectItem key={loc.name} value={loc.name}>
                    {loc.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedLocation && (
            <div>
              <Label className="text-muted-foreground text-xs">Region*</Label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  {selectedLocation.regions.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <Label className="text-muted-foreground text-xs">Condition*</Label>
            <Select value={condition} onValueChange={setCondition}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                {conditions.map((cond) => (
                  <SelectItem key={cond} value={cond}>
                    {cond}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="text-right text-sm text-muted-foreground mb-1">
              {description.length} / 850
            </div>
            <Textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value.slice(0, 850))}
              rows={4}
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-muted-foreground font-medium">USh</span>
            <Input
              type="number"
              placeholder="Price*"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="flex-1"
            />
          </div>

          <div>
            <Label className="font-medium mb-3 block">Are you open to negotiation?</Label>
            <RadioGroup value={negotiable} onValueChange={setNegotiable} className="flex gap-4">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="yes" id="yes" />
                <label htmlFor="yes">Yes</label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="no" id="no" />
                <label htmlFor="no">No</label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="not-sure" id="not-sure" />
                <label htmlFor="not-sure" className="text-primary">Not sure</label>
              </div>
            </RadioGroup>
          </div>

          <Input 
            placeholder="Your phone number" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Promotion Options */}
        <div className="bg-card rounded-xl p-4">
          <PromotionSelector 
            selectedPromotion={selectedPromotion}
            onSelect={setSelectedPromotion}
          />
        </div>

        {/* Submit */}
        <div className="bg-card rounded-xl p-4">
          <Button 
            onClick={handleSubmit} 
            className="w-full" 
            size="lg"
            disabled={createListing.isPending || uploading}
          >
            {(createListing.isPending || uploading) ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {uploading ? `Uploading... ${progress}%` : "Posting..."}
              </>
            ) : (
              "Post ad"
            )}
          </Button>

          <p className="text-xs text-muted-foreground mt-4 text-center">
            By clicking on Post Ad, you accept the <span className="text-primary">Terms of Use</span>, confirm that you will abide by the Safety Tips, and declare that this posting does not include any Prohibited Items.
          </p>
        </div>
      </main>

      {showPayment && selectedPromotionOption && (
        <PaymentModal
          isOpen={showPayment}
          onClose={() => {
            setShowPayment(false);
            setPendingSubmit(false);
          }}
          amount={selectedPromotionOption.price}
          promotionName={`${selectedPromotionOption.name} - ${selectedPromotionOption.duration}`}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      <BottomNav />
    </div>
  );
};

export default PostAd;
