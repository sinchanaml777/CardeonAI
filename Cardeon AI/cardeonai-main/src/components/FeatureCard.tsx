import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  delay?: number;
}

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  className,
  delay = 0,
}: FeatureCardProps) => {
  return (
    <div
      className={cn(
        "group p-6 rounded-2xl bg-card border border-border/50 card-hover opacity-0 animate-fade-in-up",
        className
      )}
      style={{ animationDelay: `${delay}s`, animationFillMode: "forwards" }}
    >
      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <h3 className="font-heading font-semibold text-lg mb-2 text-foreground">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
