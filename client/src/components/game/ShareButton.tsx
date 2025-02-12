import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShareButtonProps {
  guesses: string[];
  won: boolean;
}

export default function ShareButton({ guesses, won }: ShareButtonProps) {
  const { toast } = useToast();

  const generateShareText = () => {
    const date = new Date().toLocaleDateString();
    const attempts = guesses.length;
    const emoji = won ? "🟩" : "🟥";
    
    return `Dewey Guess ${date}\n${attempts}/6 ${emoji}\n\n${window.location.href}`;
  };

  const handleShare = async () => {
    const text = generateShareText();
    
    if (navigator.share) {
      try {
        await navigator.share({
          text,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard!",
        description: "Share your result with friends",
      });
    }
  };

  return (
    <Button onClick={handleShare} variant="outline" size="icon">
      <Share className="h-4 w-4" />
    </Button>
  );
}
