import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, Trophy, Settings } from "lucide-react";

export default function Navigation() {
  const [location] = useLocation();

  const navItems = [
    { path: "/", label: "Game", icon: Home },
    { path: "/scores", label: "Scores", icon: Trophy },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-2 z-50">
      <div className="flex space-x-2">
        {navItems.map(({ path, label, icon: Icon }) => (
          <Link key={path} href={path}>
            <Button
              variant={location === path ? "default" : "ghost"}
              className={`senior-button px-6 ${
                location === path 
                  ? "bg-primary text-white" 
                  : "hover:bg-gray-100"
              }`}
            >
              <Icon className="mr-2 h-5 w-5" />
              {label}
            </Button>
          </Link>
        ))}
      </div>
    </nav>
  );
}
