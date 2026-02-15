import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import PageWrapper from "@/components/PageWrapper";
import FeatureCard from "@/components/FeatureCard";
import {
  Heart,
  Activity,
  FileText,
  Stethoscope,
  Lightbulb,
  MessageSquare,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";

const quickActions = [
  {
    icon: Activity,
    title: "Predict Now",
    description: "Start a new heart disease risk assessment with our AI-powered prediction engine.",
    path: "/predict",
    color: "primary",
  },
  {
    icon: Stethoscope,
    title: "Check Ups",
    description: "Learn about essential cardiac evaluations and routine health screenings.",
    path: "/checkups",
  },
  {
    icon: Lightbulb,
    title: "Health Tips",
    description: "Discover lifestyle recommendations for maintaining optimal heart health.",
    path: "/health-tips",
  },
  {
    icon: MessageSquare,
    title: "Contact Us",
    description: "Have questions? Reach out to our team for support and guidance.",
    path: "/contact",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ fullName?: string; email?: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("cardeon_user");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("cardeon_user");
    navigate("/");
  };

  if (!user) return null;

  const displayName = user.fullName || user.email?.split("@")[0] || "User";

  return (
    <PageWrapper>
      <Navbar isAuthenticated onLogout={handleLogout} />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-10">
                <Heart className="w-48 h-48 text-primary fill-primary" />
              </div>
              
              <div className="relative z-10">
                <p className="text-primary font-medium mb-2 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
                  Welcome back,
                </p>
                <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
                  {displayName}
                </h1>
                <p className="text-muted-foreground max-w-xl mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
                  Your heart health dashboard is ready. Start a new prediction or explore 
                  our resources to learn more about cardiovascular wellness.
                </p>
                <Link to="/predict" className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
                  <Button variant="hero" size="lg" className="group">
                    Start Prediction
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Stats Cards */}
          <section className="mb-12">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-card border border-border/50 rounded-2xl p-6 card-hover opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    XGBoost Model
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-2xl">95%</h3>
                <p className="text-sm text-muted-foreground">Model Accuracy</p>
              </div>

              <div className="bg-card border border-border/50 rounded-2xl p-6 card-hover opacity-0 animate-fade-in-up" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    UCI Dataset
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-2xl">13</h3>
                <p className="text-sm text-muted-foreground">Clinical Features</p>
              </div>

              <div className="bg-card border border-border/50 rounded-2xl p-6 card-hover opacity-0 animate-fade-in-up" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Activity className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    SHAP
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-2xl">100%</h3>
                <p className="text-sm text-muted-foreground">Explainability</p>
              </div>
            </div>
          </section>

          {/* Quick Actions */}
          <section>
            <h2 className="font-heading text-2xl font-bold mb-6">Quick Actions</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <Link
                  key={action.title}
                  to={action.path}
                  className="group"
                >
                  <div
                    className={`h-full p-6 rounded-2xl border border-border/50 bg-card card-hover opacity-0 animate-fade-in-up ${
                      action.color === "primary"
                        ? "bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20"
                        : ""
                    }`}
                    style={{ animationDelay: `${0.1 * (index + 1)}s`, animationFillMode: "forwards" }}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                      action.color === "primary"
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary/10 group-hover:bg-primary/20"
                    }`}>
                      <action.icon className={`w-6 h-6 ${action.color === "primary" ? "" : "text-primary"}`} />
                    </div>
                    <h3 className="font-heading font-semibold mb-2 group-hover:text-primary transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {action.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </PageWrapper>
  );
};

export default Dashboard;
