
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle({ variant = "outline", size = "icon" }: { variant?: "outline" | "ghost"; size?: "icon" | "sm" | "default" }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="focus:outline-none"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
      {size !== "icon" && <span className="ml-2">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>}
    </Button>
  );
}
