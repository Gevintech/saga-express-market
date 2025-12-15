import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { BottomNav } from "@/components/BottomNav";

const PostAd = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [negotiable, setNegotiable] = useState("not-sure");
  const [promoType, setPromoType] = useState("free");

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card sticky top-0 z-50 border-b border-border">
        <div className="container py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2">
              <ArrowLeft className="w-5 h-5 text-primary" />
            </button>
            <span className="font-medium text-primary">Post ad</span>
          </div>
          <button className="text-destructive font-medium">Clear</button>
        </div>
      </header>

      <main className="container py-4 space-y-6">
        {/* Title */}
        <div className="bg-card rounded-xl p-4">
          <div className="text-right text-sm text-muted-foreground mb-2">
            {title.length} / 70
          </div>
          <Input
            placeholder="Title*"
            value={title}
            onChange={(e) => setTitle(e.target.value.slice(0, 70))}
            className="border-destructive"
          />
          <p className="text-xs text-destructive mt-1">This field is required.</p>

          {/* Category */}
          <div className="mt-4">
            <button className="w-full flex items-center justify-between py-3 border rounded-lg px-3">
              <div>
                <Label className="text-muted-foreground text-xs">Category*</Label>
                <p className="text-foreground">Mobile Phones</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Photo Upload */}
          <div className="mt-6">
            <Label className="font-medium">Add photo</Label>
            <p className="text-sm text-primary mt-1">Add at least 2 photos for this category</p>
            <p className="text-xs text-muted-foreground">First picture - is the title picture.</p>
            
            <div className="mt-3 flex gap-3">
              <button className="w-24 h-24 bg-secondary rounded-xl flex items-center justify-center border-2 border-dashed border-primary/30">
                <Plus className="w-8 h-8 text-primary" />
              </button>
            </div>
            <p className="text-sm text-primary mt-2">Supported formats are *.jpg and *.png</p>

            <Input placeholder="Link to Youtube or Facebook video" className="mt-4" />
          </div>
        </div>

        {/* Location & Details */}
        <div className="bg-card rounded-xl p-4 space-y-4">
          <button className="w-full flex items-center justify-between py-3 border rounded-lg px-3">
            <div>
              <Label className="text-muted-foreground text-xs">Select Location*</Label>
              <p className="text-foreground">Central Division</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          <button className="w-full flex items-center justify-between py-3 border rounded-lg px-3">
            <span className="text-muted-foreground">Brand*</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          <button className="w-full flex items-center justify-between py-3 border rounded-lg px-3">
            <span className="text-muted-foreground">Model*</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          <button className="w-full flex items-center justify-between py-3 border rounded-lg px-3">
            <span className="text-muted-foreground">Condition*</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          <button className="w-full flex items-center justify-between py-3 border rounded-lg px-3">
            <span className="text-muted-foreground">Color</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* Made in Uganda */}
          <div>
            <Label className="font-medium">Made in Uganda</Label>
            <div className="flex items-center gap-2 mt-2">
              <Checkbox id="made-in-uganda" />
              <label htmlFor="made-in-uganda" className="text-sm">Yes</label>
            </div>
          </div>

          {/* Description */}
          <div>
            <div className="text-right text-sm text-muted-foreground mb-1">
              {description.length} / 850
            </div>
            <Textarea
              placeholder="Description*"
              value={description}
              onChange={(e) => setDescription(e.target.value.slice(0, 850))}
              rows={4}
            />
          </div>

          {/* Price */}
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

          <button className="w-full flex items-center justify-between py-3 border rounded-lg px-3">
            <span className="text-muted-foreground">Add bulk price</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* Negotiable */}
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

          <Input placeholder="Your phone number" />

          <button className="w-full flex items-center justify-between py-3 border rounded-lg px-3">
            <span className="text-muted-foreground">Add delivery options</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Promotion Options */}
        <div className="bg-card rounded-xl p-4">
          <Label className="font-medium">Promote your ad</Label>
          <p className="text-sm text-muted-foreground mt-1">Choose a promotion type for your ad to post it</p>

          <div className="mt-4 space-y-3">
            <button 
              className={`w-full flex items-center justify-between py-4 px-4 border-2 rounded-lg ${promoType === 'free' ? 'border-primary' : 'border-border'}`}
              onClick={() => setPromoType('free')}
            >
              <span className="font-medium">No promo</span>
              <span className="text-muted-foreground">free</span>
            </button>

            <div className="border rounded-lg p-4">
              <p className="font-medium mb-3">TOP promo</p>
              <div className="flex gap-2 mb-2">
                <Button variant="secondary" size="sm" className="bg-secondary">7 days</Button>
                <Button variant="outline" size="sm">30 days</Button>
              </div>
              <p className="text-right font-bold">USh 10,000</p>
            </div>

            <div className="border rounded-lg p-4">
              <p className="font-medium mb-3">Boost Premium promo</p>
              <Button variant="secondary" size="sm" className="bg-secondary mb-2">1 month (28 days)</Button>
              <p className="text-right font-bold">USh 140,799</p>
            </div>
          </div>

          <Button variant="default" className="w-full mt-6" size="lg">
            Post ad
          </Button>

          <p className="text-xs text-muted-foreground mt-4 text-center">
            By clicking on Post Ad, you accept the <span className="text-primary">Terms of Use</span>, confirm that you will abide by the Safety Tips, and declare that this posting does not include any Prohibited Items.
          </p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default PostAd;
