
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { Switch, Route } from "wouter";
import Game from "./pages/game";
import NotFound from "./pages/not-found";

export default function App() {
  return (
    <ThemeProvider>
      <Switch>
        <Route path="/" component={Game} />
        <Route component={NotFound} />
      </Switch>
      <Toaster />
    </ThemeProvider>
  );
}
