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
    <div className={`grid grid-cols-${solution.length} gap-1.5 mx-auto w-fit`}>
      {guesses.map((guess, i) => (
        <Row key={i} guess={guess} solution={solution} />
      ))}
      {guesses.length < 6 && <CurrentRow guess={currentGuess} solution={solution} />}
      {empties.map((_, i) => (
        <EmptyRow key={i} solution={solution} />
      ))}
    </div>
  );
}

function Row({ guess, solution }: { guess: string; solution: string }) {
  const result = checkGuess(guess, solution);
  const hasNumbers = /\d/.test(solution);
  const shouldAddPeriod = solution.length > 3 && hasNumbers;

  return (
    <>
      {guess.split("").map((char, i) => (
        <>
          <motion.div
            key={`box-${i}`}
            initial={{ rotateX: 0 }}
            animate={{ rotateX: 360 }}
            className={`
              w-[50px] h-[50px] flex items-center justify-center font-bold text-xl border-2
              ${result[i] === "correct" && "bg-green-500 text-white border-green-600"}
              ${result[i] === "present" && "bg-yellow-500 text-white border-yellow-600"}
              ${result[i] === "absent" && "bg-gray-500 text-white border-gray-600"}
            `}
          >
            {char}
          </motion.div>
          {shouldAddPeriod && i === 2 && <div className="text-2xl font-bold px-1">.</div>}
        </>
      ))}
    </>
  );
}

function CurrentRow({ guess, solution }: { guess: string, solution: string }) {
  const chars = guess.padEnd(solution.length, " ").split("");
  const hasNumbers = /\d/.test(solution);
  const shouldAddPeriod = solution.length > 3 && hasNumbers;

  return (
    <>
      {chars.map((char, i) => (
        <>
          <div
            key={`box-${i}`}
            className="w-[50px] h-[50px] flex items-center justify-center font-bold text-xl border-2 border-gray-300"
          >
            {char !== " " ? char : ""}
          </div>
          {shouldAddPeriod && i === 2 && <div className="text-2xl font-bold px-1">.</div>}
        </>
      ))}
    </>
  );
}

function EmptyRow({ solution }: { solution: string }) {
  const hasNumbers = /\d/.test(solution);
  const shouldAddPeriod = solution.length > 3 && hasNumbers;

  return (
    <>
      {Array(solution.length).fill("").map((_, i) => (
        <>
          <div
            key={`box-${i}`}
            className="w-[50px] h-[50px] border-2 border-gray-200"
          />
          {shouldAddPeriod && i === 2 && <div className="text-2xl font-bold px-1">.</div>}
        </>
      ))}
    </>
  );
}