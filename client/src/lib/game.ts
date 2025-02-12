import booksData from "../data/books.json";

export interface Book {
  title: string;
  author: string;
  ddc: string;
}

export function getDailyBook(): [string, string, string] {
  const today = new Date().toDateString();
  const index = Math.abs(hashCode(today) % booksData.length);
  const book = booksData[index];
  return [book.title, book.author, book.ddc];
}

export function checkGuess(guess: string, solution: string): ("correct" | "present" | "absent")[] {
  const result: ("correct" | "present" | "absent")[] = [];
  const solutionArray = solution.split("");
  
  // First pass: mark correct positions
  guess.split("").forEach((char, i) => {
    if (char === solutionArray[i]) {
      result[i] = "correct";
      solutionArray[i] = "#"; // Mark as used
    }
  });
  
  // Second pass: mark present/absent
  guess.split("").forEach((char, i) => {
    if (result[i]) return;
    
    const index = solutionArray.indexOf(char);
    if (index !== -1) {
      result[i] = "present";
      solutionArray[index] = "#"; // Mark as used
    } else {
      result[i] = "absent";
    }
  });
  
  return result;
}

export function getGameState() {
  const today = new Date().toDateString();
  const saved = localStorage.getItem("gameState");
  if (!saved) return null;
  
  const state = JSON.parse(saved);
  if (state.date !== today) return null;
  
  return state;
}

export function saveGameState(guesses: string[], won: boolean, lost: boolean) {
  const today = new Date().toDateString();
  const state = {
    date: today,
    guesses,
    won,
    lost,
  };
  
  localStorage.setItem("gameState", JSON.stringify(state));
  
  // Update statistics
  const stats = JSON.parse(localStorage.getItem("stats") || "{}");
  stats.played = (stats.played || 0) + 1;
  if (won) stats.wins = (stats.wins || 0) + 1;
  localStorage.setItem("stats", JSON.stringify(stats));
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash;
}