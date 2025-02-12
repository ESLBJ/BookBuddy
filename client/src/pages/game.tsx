import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Grid from "@/components/game/Grid";
import Keyboard from "@/components/game/Keyboard";
import Stats from "@/components/game/Stats";
import Timer from "@/components/game/Timer";
import ShareButton from "@/components/game/ShareButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { getDailyBook, checkGuess, getGameState, saveGameState } from "@/lib/game";
import { useToast } from "@/hooks/use-toast";

export default function Game() {
  const { toast } = useToast();
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);
  const [dailyBook, dailyAuthor, solution] = getDailyBook();

  useEffect(() => {
    const state = getGameState();
    if (state) {
      setGuesses(state.guesses);
      setGameWon(state.won);
      setGameLost(state.lost);
    }
  }, []);

  const handleKeyPress = (key: string) => {
    if (gameWon || gameLost) return;

    if (key === "Enter") {
      if (currentGuess.length !== 6) {
        toast({
          title: "Not enough numbers",
          description: "Please enter a 6-digit DDC code",
          variant: "destructive",
        });
        return;
      }

      const newGuesses = [...guesses, currentGuess];
      setGuesses(newGuesses);
      setCurrentGuess("");

      if (currentGuess === solution) {
        setGameWon(true);
        saveGameState(newGuesses, true, false);
      } else if (newGuesses.length === 6) {
        setGameLost(true);
        saveGameState(newGuesses, false, true);
      } else {
        saveGameState(newGuesses, false, false);
      }
    } else if (key === "Backspace") {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (/^\d$/.test(key) && currentGuess.length < 6) {
      setCurrentGuess(prev => prev + key);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Dewey Guess</CardTitle>
          <div className="text-center">
            <p className="text-lg">{dailyBook}</p>
            <p className="text-sm text-muted-foreground">by {dailyAuthor}</p>
          </div>
        </CardHeader>
        <CardContent>
          <Grid guesses={guesses} currentGuess={currentGuess} solution={solution} />
          <div className="mt-8">
            <Keyboard onKeyPress={handleKeyPress} guesses={guesses} solution={solution} />
          </div>
          <div className="mt-6 flex justify-between items-center">
            <Timer />
            <div className="flex gap-2">
              <ThemeToggle />
              <Stats />
              {(gameWon || gameLost) && (
                <ShareButton guesses={guesses} won={gameWon} />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}