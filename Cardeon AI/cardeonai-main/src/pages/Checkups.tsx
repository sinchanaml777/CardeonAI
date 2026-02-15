import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import PageWrapper from "@/components/PageWrapper";
import {
  Heart,
  Activity,
  Stethoscope,
  Thermometer,
  Droplets,
  Zap,
  Calendar,
  ClipboardCheck,
} from "lucide-react";

const checkups = [
  {
    icon: Activity,
    title: "Blood Pressure Monitoring",
    description:
      "Regular blood pressure checks help detect hypertension early. Aim for readings below 120/80 mmHg for optimal cardiovascular health.",
    frequency: "Every 1-2 years (more if elevated)",
    importance: "High",
  },
  {
    icon: Droplets,
    title: "Cholesterol Testing",
    description:
      "A lipid panel measures total cholesterol, LDL, HDL, and triglycerides. Key for assessing cardiovascular risk factors.",
    frequency: "Every 4-6 years (annually if at risk)",
    importance: "High",
  },
  {
    icon: Zap,
    title: "Electrocardiogram (ECG)",
    description:
      "Records electrical activity of the heart to detect arrhythmias, heart attacks, or other cardiac abnormalities.",
    frequency: "As recommended by physician",
    importance: "Moderate",
  },
  {
    icon: Thermometer,
    title: "Blood Sugar Testing",
    description:
      "Fasting blood glucose tests help detect diabetes and prediabetes, which significantly impact heart health.",
    frequency: "Every 3 years (annually if at risk)",
    importance: "High",
  },
  {
    icon: Stethoscope,
    title: "Physical Examination",
    description:
      "Comprehensive check including heart sounds, pulse rate, and overall cardiovascular assessment by a healthcare provider.",
    frequency: "Annually",
    importance: "High",
  },
  {
    icon: Heart,
    title: "Stress Testing",
    description:
      "Evaluates heart function during physical activity to detect coronary artery disease and assess exercise capacity.",
    frequency: "As recommended by physician",
    importance: "Moderate",
  },
];

const Checkups = () => {
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
                <ClipboardCheck className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 gradient-text opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
              Cardiac Check-Ups
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
              Regular cardiac evaluations are essential for maintaining heart health. 
              Learn about the key screenings and tests recommended for cardiovascular wellness.
            </p>
          </section>

          {/* Checkups Grid */}
          <section className="mb-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {checkups.map((checkup, index) => (
                <div
                  key={checkup.title}
                  className="group bg-card border border-border/50 rounded-2xl p-6 card-hover opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${0.1 * (index + 1)}s`, animationFillMode: "forwards" }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <checkup.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          checkup.importance === "High"
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {checkup.importance} Priority
                      </span>
                    </div>
                  </div>

                  <h3 className="font-heading font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {checkup.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {checkup.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{checkup.frequency}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recommendation Box */}
          <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-3xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center">
                  <Stethoscope className="w-10 h-10 text-primary" />
                </div>
              </div>
              <div>
                <h2 className="font-heading text-2xl font-bold mb-3">
                  Schedule Your Check-Up
                </h2>
                <p className="text-muted-foreground max-w-2xl">
                  The best time to schedule your cardiac check-up is now. Regular screenings 
                  can detect potential issues early when they're most treatable. Consult with 
                  your healthcare provider to determine the appropriate screening schedule 
                  based on your age, family history, and risk factors.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </PageWrapper>
  );
};

export default Checkups;
