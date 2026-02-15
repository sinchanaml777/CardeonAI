import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/Logo";
import PageWrapper from "@/components/PageWrapper";
import { Heart, Mail, Lock, User, ArrowRight, AlertCircle, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const passwordRequirements = [
    { label: "At least 6 characters", met: formData.password.length >= 6 },
    { label: "Passwords match", met: formData.password === formData.confirmPassword && formData.confirmPassword !== "" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);

    // Simulate account creation delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    localStorage.setItem(
      "cardeon_user",
      JSON.stringify({
        fullName: formData.fullName,
        email: formData.email,
      })
    );

    toast({
      title: "Account created!",
      description: "Welcome to CARDEON. Your account has been successfully created.",
    });

    navigate("/dashboard");
    setIsLoading(false);
  };

  return (
    <PageWrapper className="bg-gradient-to-br from-background via-background to-secondary/30">
      <div className="min-h-screen flex">
        {/* Left side - Decorative */}
        <div className="hidden lg:flex flex-1 bg-gradient-to-bl from-primary/10 via-primary/5 to-background items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,hsl(0_72%_50%/0.1),transparent_60%)]" />
          
          <div className="text-center relative z-10">
            <Heart className="w-32 h-32 text-primary fill-primary mx-auto animate-heartbeat drop-shadow-lg" />
            <h2 className="font-heading text-2xl font-bold mt-6 gradient-text">
              Join CARDEON Today
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xs">
              Start your journey to better heart health with AI-powered insights
            </p>
          </div>

          {/* Decorative circles */}
          <div className="absolute top-20 left-20 w-40 h-40 border border-primary/20 rounded-full" />
          <div className="absolute bottom-20 right-20 w-60 h-60 border border-primary/10 rounded-full" />
        </div>

        {/* Right side - Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <Link to="/" className="inline-block mb-8">
              <Logo size="md" />
            </Link>

            <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
              <h1 className="font-heading text-3xl font-bold mb-2">
                Create Account
              </h1>
              <p className="text-muted-foreground mb-8">
                Get started with your free CARDEON account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm animate-fade-in-scale">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <div className="space-y-2 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              {/* Password requirements */}
              <div className="space-y-2 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
                {passwordRequirements.map((req) => (
                  <div
                    key={req.label}
                    className={`flex items-center gap-2 text-sm transition-colors ${
                      req.met ? "text-green-600" : "text-muted-foreground"
                    }`}
                  >
                    <Check className={`w-4 h-4 ${req.met ? "opacity-100" : "opacity-30"}`} />
                    {req.label}
                  </div>
                ))}
              </div>

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full opacity-0 animate-fade-in-up"
                style={{ animationDelay: "0.45s", animationFillMode: "forwards" }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Creating account...
                  </div>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}>
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Signup;
