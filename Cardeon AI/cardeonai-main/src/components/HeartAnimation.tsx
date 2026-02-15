import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeartAnimationProps {
  visible: boolean;
  size?: "sm" | "md" | "lg";
}

const HeartAnimation = ({ visible, size = "lg" }: HeartAnimationProps) => {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  return (
    <div
      className={cn(
        "fixed inset-0 pointer-events-none z-40 flex items-center justify-center transition-opacity duration-500",
        visible ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="relative">
        {/* Pulse rings */}
        <div
          className={cn(
            "absolute inset-0 rounded-full bg-primary/20 animate-pulse-ring",
            sizeClasses[size]
          )}
        />
        <div
          className={cn(
            "absolute inset-0 rounded-full bg-primary/15 animate-pulse-ring",
            sizeClasses[size]
          )}
          style={{ animationDelay: "0.5s" }}
        />
        
        {/* Heart icon */}
        <Heart
          className={cn(
            "text-primary fill-primary animate-heartbeat drop-shadow-lg",
            sizeClasses[size]
          )}
          style={{
            filter: "drop-shadow(0 0 20px hsl(0 72% 50% / 0.4))",
          }}
        />
      </div>
    </div>
  );
};

export default HeartAnimation;
