import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { checkGuess } from "@/lib/game";

interface ShareButtonProps {
  guesses: string[];
  won: boolean;
}

export default function ShareButton({ guesses, won }: ShareButtonProps) {
  const { toast } = useToast();

  const generateShareText = () => {
    const date = new Date().toLocaleDateString();
    const attempts = guesses.length;
    const resultEmoji = won ? "🎯" : "❌";

    // Generate grid representation
    const gridRows = guesses.map(guess => {
      const result = checkGuess(guess, window.solution);
      return result.map(r => {
        if (r === "correct") return "🟩";
        if (r === "present") return "🟨";
        return "⬜";
      }).join("");
    }).join("\n");

    return `Dewey Guess ${date}\n${attempts}/6 ${resultEmoji}\n\n${gridRows}`;
  };

  const copyToClipboard = async () => {
    const text = generateShareText();
    await navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard!",
      description: "Share your result with friends",
    });
  };

  return (
    <Button onClick={copyToClipboard} variant="outline" size="icon">
      <Share className="h-4 w-4" />
    </Button>
  );
}