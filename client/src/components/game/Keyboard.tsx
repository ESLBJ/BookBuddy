import { Button } from "@/components/ui/button";
import { checkGuess } from "@/lib/game";

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  guesses: string[];
  solution: string;
}

export default function Keyboard({ onKeyPress, guesses, solution }: KeyboardProps) {
  const keys = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"]
  ];

  const getKeyState = (key: string) => {
    if (key === "Enter" || key === "Backspace") return "default";
    
    let state = "default";
    guesses.forEach(guess => {
      const result = checkGuess(guess, solution);
      const index = guess.indexOf(key);
      if (index === -1) return;
      
      if (result[index] === "correct") state = "correct";
      else if (result[index] === "present" && state !== "correct") state = "present";
      else if (result[index] === "absent" && state === "default") state = "absent";
    });
    
    return state;
  };

  return (
    <div className="grid gap-2">
      {keys.map((row, i) => (
        <div key={i} className="flex justify-center gap-2">
          {row.map(key => {
            const state = getKeyState(key);
            return (
              <Button
                key={key}
                onClick={() => onKeyPress(key)}
                variant={state === "default" ? "outline" : "default"}
                className={`
                  w-10 h-10 p-0 font-bold text-sm
                  ${state === "correct" && "bg-green-500 hover:bg-green-600"}
                  ${state === "present" && "bg-yellow-500 hover:bg-yellow-600"}
                  ${state === "absent" && "bg-gray-500 hover:bg-gray-600"}
                  ${key === "Enter" && "w-20"}
                  ${key === "Backspace" && "w-20"}
                `}
              >
                {key === "Backspace" ? "⌫" : key}
              </Button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
