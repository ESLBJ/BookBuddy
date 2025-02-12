import { motion } from "framer-motion";
import { checkGuess } from "@/lib/game";

interface GridProps {
  guesses: string[];
  currentGuess: string;
  solution: string;
}

export default function Grid({ guesses, currentGuess, solution }: GridProps) {
  const empties = Array(6 - guesses.length - 1).fill("");

  return (
    <div className="grid grid-cols-[repeat(3,1fr)_auto_repeat(3,1fr)] gap-2">
      {guesses.map((guess, i) => (
        <Row key={i} guess={guess} solution={solution} />
      ))}
      {guesses.length < 6 && <CurrentRow guess={currentGuess} />}
      {empties.map((_, i) => (
        <EmptyRow key={i} />
      ))}
    </div>
  );
}

function Row({ guess, solution }: { guess: string; solution: string }) {
  const result = checkGuess(guess, solution);
  const chars = guess.split("");

  return (
    <>
      {chars.slice(0, 3).map((char, i) => (
        <motion.div
          key={i}
          initial={{ rotateX: 0 }}
          animate={{ rotateX: 360 }}
          className={`
            aspect-square flex items-center justify-center font-bold text-xl border-2
            ${result[i] === "correct" && "bg-green-500 text-white border-green-600"}
            ${result[i] === "present" && "bg-yellow-500 text-white border-yellow-600"}
            ${result[i] === "absent" && "bg-gray-500 text-white border-gray-600"}
          `}
        >
          {char}
        </motion.div>
      ))}
      <div className="flex items-end justify-center pb-2 font-bold text-xl">.</div>
      {chars.slice(3).map((char, i) => (
        <motion.div
          key={i + 3}
          initial={{ rotateX: 0 }}
          animate={{ rotateX: 360 }}
          className={`
            aspect-square flex items-center justify-center font-bold text-xl border-2
            ${result[i + 3] === "correct" && "bg-green-500 text-white border-green-600"}
            ${result[i + 3] === "present" && "bg-yellow-500 text-white border-yellow-600"}
            ${result[i + 3] === "absent" && "bg-gray-500 text-white border-gray-600"}
          `}
        >
          {char}
        </motion.div>
      ))}
    </>
  );
}

function CurrentRow({ guess }: { guess: string }) {
  const chars = guess.padEnd(6, " ").split("");

  return (
    <>
      {chars.slice(0, 3).map((char, i) => (
        <div
          key={i}
          className="aspect-square flex items-center justify-center font-bold text-xl border-2 border-gray-300"
        >
          {char !== " " ? char : ""}
        </div>
      ))}
      <div className="flex items-end justify-center pb-2 font-bold text-xl">.</div>
      {chars.slice(3).map((char, i) => (
        <div
          key={i + 3}
          className="aspect-square flex items-center justify-center font-bold text-xl border-2 border-gray-300"
        >
          {char !== " " ? char : ""}
        </div>
      ))}
    </>
  );
}

function EmptyRow() {
  return (
    <>
      {Array(3).fill("").map((_, i) => (
        <div
          key={i}
          className="aspect-square border-2 border-gray-200"
        />
      ))}
      <div className="flex items-end justify-center pb-2 font-bold text-xl">.</div>
      {Array(3).fill("").map((_, i) => (
        <div
          key={i + 3}
          className="aspect-square border-2 border-gray-200"
        />
      ))}
    </>
  );
}