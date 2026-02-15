import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import PageWrapper from "@/components/PageWrapper";
import FeatureCard from "@/components/FeatureCard";
import {
  Heart,
  Brain,
  Shield,
  Activity,
  FileText,
  Stethoscope,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Prediction",
    description:
      "Advanced XGBoost machine learning model trained on clinical heart disease data for accurate risk assessment.",
  },
  {
    icon: Shield,
    title: "SHAP Explainability",
    description:
      "Transparent predictions with detailed explanations of how each clinical factor influences your risk score.",
  },
  {
    icon: Activity,
    title: "Real-Time Analysis",
    description:
      "Instant processing of 13 clinical parameters to deliver immediate, actionable health insights.",
  },
  {
    icon: FileText,
    title: "Detailed Reports",
    description:
      "Generate comprehensive PDF reports with your prediction results, explanations, and recommendations.",
  },
];

const Landing = () => {
  return (
    <PageWrapper className="bg-gradient-to-b from-background to-secondary/20">
      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col">
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

        {/* Navigation */}
        <header className="relative z-10 container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Logo size="md" />
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" size="lg">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="hero" size="lg">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Content */}
        <main className="relative z-10 flex-1 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              {/* Floating hearts decoration */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <Heart className="w-20 h-20 text-primary fill-primary animate-heartbeat drop-shadow-lg" />
                  <div className="absolute -top-2 -right-2">
                    <Heart className="w-8 h-8 text-primary/60 fill-primary/60 animate-float" />
                  </div>
                  <div className="absolute -bottom-1 -left-3">
                    <Heart className="w-6 h-6 text-primary/40 fill-primary/40 animate-float" style={{ animationDelay: "1s" }} />
                  </div>
                </div>
              </div>

              <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
                <span className="gradient-text">CARDEON</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-4 opacity-0 animate-fade-in-up font-heading" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
                Heart Disease Predictability in Your Hands
              </p>

              <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto mb-10 opacity-0 animate-fade-in-up leading-relaxed" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
                An AI-powered, interpretable heart disease risk assessment platform using 
                advanced machine learning and explainable AI to provide transparent, 
                clinically meaningful predictions.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
                <Link to="/signup">
                  <Button variant="hero" size="xl" className="group">
                    Get Started
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="hero-outline" size="xl">
                    Sign In
                  </Button>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="mt-16 flex items-center justify-center gap-8 text-sm text-muted-foreground opacity-0 animate-fade-in-up" style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}>
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-primary" />
                  <span>Clinically Informed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <span>UCI Dataset Trained</span>
                </div>
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  <span>XGBoost + SHAP</span>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-2.5 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Powered by Advanced AI
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Leveraging state-of-the-art machine learning and explainable AI 
              technologies to provide transparent heart disease risk predictions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={0.1 * (index + 1)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <Heart className="w-16 h-16 text-primary fill-primary mx-auto mb-6 animate-heartbeat" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Start Your Heart Health Assessment
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Take control of your cardiovascular health with AI-powered predictions 
            and transparent, interpretable results.
          </p>
          <Link to="/signup">
            <Button variant="hero" size="xl">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/50 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Logo size="sm" />
            <p className="text-sm text-muted-foreground">
              © 2024 CARDEON. Educational and decision-support tool. Not a replacement for medical diagnosis.
            </p>
          </div>
        </div>
      </footer>
    </PageWrapper>
  );
};

export default Landing;
