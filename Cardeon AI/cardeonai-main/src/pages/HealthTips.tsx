import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import PageWrapper from "@/components/PageWrapper";
import {
  Heart,
  Apple,
  Dumbbell,
  Brain,
  Moon,
  Cigarette,
  Wine,
  Footprints,
  Leaf,
} from "lucide-react";

const tips = [
  {
    icon: Apple,
    title: "Heart-Healthy Diet",
    description:
      "Focus on fruits, vegetables, whole grains, and lean proteins. Limit saturated fats, trans fats, and sodium intake.",
    tips: [
      "Eat at least 5 servings of fruits and vegetables daily",
      "Choose whole grains over refined grains",
      "Include omega-3 rich fish twice a week",
      "Limit processed and red meat consumption",
    ],
    color: "green",
  },
  {
    icon: Dumbbell,
    title: "Regular Exercise",
    description:
      "Aim for at least 150 minutes of moderate aerobic activity or 75 minutes of vigorous activity weekly.",
    tips: [
      "Start with 30 minutes of walking daily",
      "Include strength training twice a week",
      "Take stairs instead of elevators",
      "Find activities you enjoy to stay motivated",
    ],
    color: "blue",
  },
  {
    icon: Brain,
    title: "Stress Management",
    description:
      "Chronic stress can contribute to heart disease. Practice relaxation techniques to maintain emotional balance.",
    tips: [
      "Practice meditation or deep breathing",
      "Maintain social connections",
      "Set realistic goals and expectations",
      "Take breaks throughout the day",
    ],
    color: "purple",
  },
  {
    icon: Moon,
    title: "Quality Sleep",
    description:
      "Poor sleep is linked to higher risk of heart disease. Aim for 7-9 hours of quality sleep each night.",
    tips: [
      "Maintain a consistent sleep schedule",
      "Create a relaxing bedtime routine",
      "Limit screen time before bed",
      "Keep your bedroom cool and dark",
    ],
    color: "indigo",
  },
  {
    icon: Cigarette,
    title: "Quit Smoking",
    description:
      "Smoking is a major risk factor for heart disease. Quitting at any age significantly reduces cardiovascular risk.",
    tips: [
      "Seek professional help or counseling",
      "Consider nicotine replacement therapy",
      "Identify and avoid triggers",
      "Build a support network",
    ],
    color: "red",
  },
  {
    icon: Wine,
    title: "Limit Alcohol",
    description:
      "Excessive alcohol consumption can raise blood pressure and contribute to heart failure. Moderation is key.",
    tips: [
      "Limit to one drink per day for women",
      "Limit to two drinks per day for men",
      "Choose alcohol-free days each week",
      "Stay hydrated with water",
    ],
    color: "amber",
  },
];

const HealthTips = () => {
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
          {/* Header */}
          <section className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Leaf className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 gradient-text opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
              Heart Health Tips
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
              Lifestyle modifications can significantly reduce your risk of heart disease. 
              Follow these evidence-based recommendations for optimal cardiovascular health.
            </p>
          </section>

          {/* Tips Grid */}
          <section className="mb-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tips.map((tip, index) => (
                <div
                  key={tip.title}
                  className="group bg-card border border-border/50 rounded-2xl overflow-hidden card-hover opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${0.1 * (index + 1)}s`, animationFillMode: "forwards" }}
                >
                  <div className="p-6">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <tip.icon className="w-7 h-7 text-primary" />
                    </div>

                    <h3 className="font-heading font-semibold text-xl mb-2 group-hover:text-primary transition-colors">
                      {tip.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {tip.description}
                    </p>

                    <ul className="space-y-2">
                      {tip.tips.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <Heart className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Daily Habits Section */}
          <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-3xl p-8 md:p-12 mb-16">
            <h2 className="font-heading text-2xl font-bold mb-8 text-center">
              Daily Heart-Healthy Habits
            </h2>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Footprints className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-heading font-semibold mb-2">10,000 Steps</h4>
                <p className="text-sm text-muted-foreground">
                  Aim for daily walking goal
                </p>
              </div>

              <div className="text-center opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Apple className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-heading font-semibold mb-2">5 Servings</h4>
                <p className="text-sm text-muted-foreground">
                  Fruits and vegetables daily
                </p>
              </div>

              <div className="text-center opacity-0 animate-fade-in-up" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Moon className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-heading font-semibold mb-2">7-9 Hours</h4>
                <p className="text-sm text-muted-foreground">
                  Quality sleep each night
                </p>
              </div>

              <div className="text-center opacity-0 animate-fade-in-up" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-heading font-semibold mb-2">10 Minutes</h4>
                <p className="text-sm text-muted-foreground">
                  Mindfulness or meditation
                </p>
              </div>
            </div>
          </section>

          {/* Reminder Box */}
          <section className="bg-card border border-border/50 rounded-3xl p-8 text-center">
            <Heart className="w-12 h-12 text-primary mx-auto mb-4 animate-heartbeat" />
            <h3 className="font-heading text-xl font-semibold mb-3">
              Small Changes, Big Impact
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              You don't have to change everything at once. Start with one or two habits 
              and gradually build from there. Every positive change you make contributes 
              to better heart health.
            </p>
          </section>
        </div>
      </main>
    </PageWrapper>
  );
};

export default HealthTips;
