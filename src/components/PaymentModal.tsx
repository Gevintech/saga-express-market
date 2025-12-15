import { useState } from "react";
import { CreditCard, Smartphone, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatPrice } from "@/data/listings";
import { toast } from "sonner";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  promotionName: string;
  onPaymentSuccess: () => void;
}

export const PaymentModal = ({ isOpen, onClose, amount, promotionName, onPaymentSuccess }: PaymentModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState<"mobile" | "card">("mobile");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    if (paymentMethod === "mobile" && !phoneNumber) {
      toast.error("Please enter your mobile money number");
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    toast.success("Payment successful! Your ad will be promoted.");
    onPaymentSuccess();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Payment</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="bg-secondary p-4 rounded-xl">
            <p className="text-sm text-muted-foreground">You're paying for</p>
            <p className="font-medium">{promotionName}</p>
            <p className="text-xl font-bold text-price mt-1">{formatPrice(amount, "USh")}</p>
          </div>

          <div>
            <Label className="mb-3 block">Payment Method</Label>
            <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as "mobile" | "card")}>
              <div className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                paymentMethod === "mobile" ? "border-primary bg-primary/5" : "border-border"
              }`}>
                <RadioGroupItem value="mobile" id="mobile" />
                <Smartphone className="w-5 h-5 text-primary" />
                <div className="flex-1">
                  <label htmlFor="mobile" className="font-medium cursor-pointer">Mobile Money</label>
                  <p className="text-sm text-muted-foreground">MTN MoMo, Airtel Money</p>
                </div>
              </div>
              <div className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors mt-2 ${
                paymentMethod === "card" ? "border-primary bg-primary/5" : "border-border"
              }`}>
                <RadioGroupItem value="card" id="card" />
                <CreditCard className="w-5 h-5 text-primary" />
                <div className="flex-1">
                  <label htmlFor="card" className="font-medium cursor-pointer">Card Payment</label>
                  <p className="text-sm text-muted-foreground">Visa, Mastercard</p>
                </div>
              </div>
            </RadioGroup>
          </div>

          {paymentMethod === "mobile" && (
            <div>
              <Label htmlFor="phone">Mobile Money Number</Label>
              <Input
                id="phone"
                placeholder="e.g. 0755842484"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                You'll receive a payment prompt on this number
              </p>
            </div>
          )}

          {paymentMethod === "card" && (
            <div className="space-y-4">
              <div>
                <Label>Card Number</Label>
                <Input placeholder="1234 5678 9012 3456" className="mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Expiry Date</Label>
                  <Input placeholder="MM/YY" className="mt-1" />
                </div>
                <div>
                  <Label>CVV</Label>
                  <Input placeholder="123" type="password" className="mt-1" />
                </div>
              </div>
            </div>
          )}

          <Button 
            onClick={handlePayment} 
            className="w-full" 
            size="lg"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              `Pay ${formatPrice(amount, "USh")}`
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Payments are secure and encrypted. For support contact{" "}
            <a href="tel:+256755842484" className="text-primary">+256755842484</a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
