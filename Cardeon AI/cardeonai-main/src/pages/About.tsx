import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import PageWrapper from "@/components/PageWrapper";
import FeatureCard from "@/components/FeatureCard";
import {
  Heart,
  Brain,
  Shield,
  Database,
  Lightbulb,
  Users,
  Target,
  Award,
} from "lucide-react";

const features = [
  {
    icon: Database,
    title: "UCI Heart Disease Dataset",
    description:
      "Trained on the renowned Cleveland Heart Disease dataset from UCI Machine Learning Repository, ensuring clinically validated predictions.",
  },
  {
    icon: Brain,
    title: "XGBoost Classifier",
    description:
      "Utilizes the powerful XGBoost gradient boosting algorithm, known for its exceptional performance in medical classification tasks.",
  },
  {
    icon: Shield,
    title: "SHAP Explainability",
    description:
      "Every prediction comes with SHAP-based explanations, making the AI's decision-making process transparent and interpretable.",
  },
  {
    icon: Target,
    title: "13 Clinical Features",
    description:
      "Analyzes key cardiovascular indicators including age, blood pressure, cholesterol, ECG results, and exercise response.",
  },
];

const values = [
  {
    icon: Lightbulb,
    title: "Educational Purpose",
    description:
      "CARDEON serves as an educational and decision-support tool, helping users understand cardiovascular risk factors.",
  },
  {
    icon: Users,
    title: "User-Centered Design",
    description:
      "Built with accessibility and usability in mind, ensuring everyone can benefit from AI-powered health insights.",
  },
  {
    icon: Award,
    title: "Academic Integrity",
    description:
      "Developed following rigorous academic standards, suitable for research demonstrations and educational purposes.",
  },
];

const About = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("cardeon_user");
    if (!storedUser) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("cardeon_user");
    navigate("/");
  };

  return (
    <PageWrapper>
      <Navbar isAuthenticated onLogout={handleLogout} />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Heart className="w-20 h-20 text-primary fill-primary animate-heartbeat" />
              </div>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 gradient-text opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
              About CARDEON
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
              CARDEON is an AI-powered heart disease prediction and explanation platform 
              designed to provide transparent, clinically informed cardiovascular risk 
              assessments using advanced machine learning techniques.
            </p>
          </section>

          {/* Technology Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold mb-4">Our Technology</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Built on state-of-the-art machine learning and explainable AI technologies
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
          </section>

          {/* How It Works */}
          <section className="mb-20">
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-3xl p-8 md:p-12">
              <h2 className="font-heading text-3xl font-bold mb-8 text-center">
                How It Works
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
                  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 font-heading font-bold text-xl">
                    1
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">Input Clinical Data</h3>
                  <p className="text-muted-foreground text-sm">
                    Enter 13 clinical parameters including age, blood pressure, 
                    cholesterol levels, and ECG results.
                  </p>
                </div>

                <div className="text-center opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
                  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 font-heading font-bold text-xl">
                    2
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">AI Analysis</h3>
                  <p className="text-muted-foreground text-sm">
                    Our XGBoost model processes your data using patterns learned 
                    from the UCI Heart Disease dataset.
                  </p>
                </div>

                <div className="text-center opacity-0 animate-fade-in-up" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
                  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 font-heading font-bold text-xl">
                    3
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">Transparent Results</h3>
                  <p className="text-muted-foreground text-sm">
                    Receive predictions with SHAP explanations showing how each 
                    factor influenced the outcome.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold mb-4">Our Commitment</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                CARDEON is built with transparency, accuracy, and user empowerment at its core
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <FeatureCard
                  key={value.title}
                  icon={value.icon}
                  title={value.title}
                  description={value.description}
                  delay={0.1 * (index + 1)}
                />
              ))}
            </div>
          </section>

          {/* Disclaimer */}
          <section className="bg-card border border-border/50 rounded-3xl p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-heading text-xl font-semibold mb-3">
              Important Disclaimer
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              CARDEON is designed as an educational and decision-support tool. It is not 
              intended to replace professional medical diagnosis, advice, or treatment. 
              Always consult with qualified healthcare professionals for medical decisions.
            </p>
          </section>
        </div>
      </main>
    </PageWrapper>
  );
};

export default About;
