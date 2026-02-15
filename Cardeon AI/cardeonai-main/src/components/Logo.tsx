import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

const Logo = ({ className, showText = true, size = "md" }: LogoProps) => {
  const sizeClasses = {
    sm: { icon: "w-6 h-6", text: "text-xl" },
    md: { icon: "w-8 h-8", text: "text-2xl" },
    lg: { icon: "w-10 h-10", text: "text-3xl" },
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative">
        <Heart
          className={cn(
            "text-primary fill-primary transition-transform hover:scale-110",
            sizeClasses[size].icon
          )}
        />
        <Heart
          className={cn(
            "absolute inset-0 text-primary fill-primary animate-ping opacity-30",
            sizeClasses[size].icon
          )}
        />
      </div>
      {showText && (
        <span
          className={cn(
            "font-heading font-bold tracking-tight gradient-text",
            sizeClasses[size].text
          )}
        >
          CARDEON
        </span>
      )}
    </div>
  );
};

export default Logo;
