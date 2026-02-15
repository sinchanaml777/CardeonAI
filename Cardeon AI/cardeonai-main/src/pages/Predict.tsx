import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import PageWrapper from "@/components/PageWrapper";
import { Heart, Activity, AlertCircle, CheckCircle, Download, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { jsPDF } from "jspdf";

interface FormData {
  age: string;
  sex: string;
  cp: string;
  trestbps: string;
  chol: string;
  fbs: string;
  restecg: string;
  thalach: string;
  exang: string;
  oldpeak: string;
  slope: string;
  ca: string;
  thal: string;
}

interface PredictionResult {
  prediction: number;
  probability: number;
  shapValues: { feature: string; value: number; impact: number }[];
}

const initialFormData: FormData = {
  age: "",
  sex: "",
  cp: "",
  trestbps: "",
  chol: "",
  fbs: "",
  restecg: "",
  thalach: "",
  exang: "",
  oldpeak: "",
  slope: "",
  ca: "",
  thal: "",
};

const Predict = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

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

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate prediction delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock prediction logic based on some risk factors
    const age = parseInt(formData.age);
    const chol = parseInt(formData.chol);
    const trestbps = parseInt(formData.trestbps);
    const thalach = parseInt(formData.thalach);
    
    // Simple mock risk calculation
    let riskScore = 0;
    if (age > 55) riskScore += 0.15;
    if (chol > 240) riskScore += 0.2;
    if (trestbps > 140) riskScore += 0.15;
    if (thalach < 120) riskScore += 0.1;
    if (formData.cp === "0") riskScore += 0.2;
    if (formData.exang === "1") riskScore += 0.1;
    if (formData.ca !== "0") riskScore += 0.1;

    const probability = Math.min(0.95, Math.max(0.05, riskScore + Math.random() * 0.1));
    const prediction = probability > 0.5 ? 1 : 0;

    // Mock SHAP values
    const shapValues = [
      { feature: "Age", value: parseInt(formData.age), impact: age > 55 ? 0.15 : -0.05 },
      { feature: "Cholesterol", value: chol, impact: chol > 240 ? 0.2 : -0.1 },
      { feature: "Blood Pressure", value: trestbps, impact: trestbps > 140 ? 0.15 : -0.05 },
      { feature: "Max Heart Rate", value: thalach, impact: thalach < 120 ? 0.1 : -0.15 },
      { feature: "Chest Pain Type", value: parseInt(formData.cp), impact: formData.cp === "0" ? 0.2 : -0.1 },
      { feature: "Exercise Angina", value: parseInt(formData.exang), impact: formData.exang === "1" ? 0.1 : -0.05 },
      { feature: "Major Vessels", value: parseInt(formData.ca), impact: formData.ca !== "0" ? 0.1 : -0.05 },
    ].sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact));

    setResult({ prediction, probability, shapValues });
    setIsLoading(false);

    toast({
      title: "Prediction Complete",
      description: "Your heart disease risk assessment has been processed.",
    });
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setResult(null);
  };

  const handleDownload = () => {
    if (!result) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let yPos = 20;

    // Header with red accent
    doc.setFillColor(220, 38, 38); // Blood red
    doc.rect(0, 0, pageWidth, 45, "F");

    // Logo/Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("CARDEON", margin, 25);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Heart Disease Predictability in Your Hands", margin, 35);

    // Report date on right
    doc.setFontSize(9);
    doc.text(`Report Date: ${new Date().toLocaleDateString()}`, pageWidth - margin - 50, 25);
    doc.text(`Time: ${new Date().toLocaleTimeString()}`, pageWidth - margin - 50, 32);

    yPos = 60;

    // Result Section
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Prediction Result", margin, yPos);
    yPos += 10;

    // Result box
    const resultColor = result.prediction === 1 ? [254, 226, 226] : [220, 252, 231];
    const resultBorderColor = result.prediction === 1 ? [220, 38, 38] : [34, 197, 94];
    doc.setFillColor(resultColor[0], resultColor[1], resultColor[2]);
    doc.setDrawColor(resultBorderColor[0], resultBorderColor[1], resultBorderColor[2]);
    doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 25, 3, 3, "FD");

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(resultBorderColor[0], resultBorderColor[1], resultBorderColor[2]);
    doc.text(
      result.prediction === 1 ? "Heart Disease Detected" : "No Heart Disease Detected",
      margin + 10,
      yPos + 12
    );
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Confidence: ${(result.probability * 100).toFixed(1)}%`, margin + 10, yPos + 20);

    yPos += 40;

    // Patient Data Section
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Clinical Parameters", margin, yPos);
    yPos += 8;

    // Divider line
    doc.setDrawColor(220, 38, 38);
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 10;

    // Patient data in two columns
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const patientData = [
      ["Age", formData.age + " years"],
      ["Sex", formData.sex === "1" ? "Male" : "Female"],
      ["Chest Pain Type", ["Typical Angina", "Atypical Angina", "Non-anginal", "Asymptomatic"][parseInt(formData.cp)]],
      ["Resting BP", formData.trestbps + " mm Hg"],
      ["Cholesterol", formData.chol + " mg/dl"],
      ["Fasting Blood Sugar", formData.fbs === "1" ? "> 120 mg/dl" : "≤ 120 mg/dl"],
      ["Resting ECG", ["Normal", "ST-T Abnormality", "LV Hypertrophy"][parseInt(formData.restecg)]],
      ["Max Heart Rate", formData.thalach + " bpm"],
      ["Exercise Angina", formData.exang === "1" ? "Yes" : "No"],
      ["ST Depression", formData.oldpeak],
      ["ST Slope", ["Upsloping", "Flat", "Downsloping"][parseInt(formData.slope)]],
      ["Major Vessels", formData.ca],
      ["Thalassemia", ["", "Normal", "Fixed Defect", "Reversible Defect"][parseInt(formData.thal)]],
    ];

    const colWidth = (pageWidth - 2 * margin) / 2;
    patientData.forEach((item, index) => {
      const xOffset = index % 2 === 0 ? margin : margin + colWidth;
      const currentY = yPos + Math.floor(index / 2) * 12;
      doc.setFont("helvetica", "bold");
      doc.setTextColor(100, 100, 100);
      doc.text(item[0] + ":", xOffset, currentY);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);
      doc.text(item[1], xOffset + 45, currentY);
    });

    yPos += Math.ceil(patientData.length / 2) * 12 + 15;

    // SHAP Explanation Section
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Key Contributing Factors (SHAP Analysis)", margin, yPos);
    yPos += 8;

    doc.setDrawColor(220, 38, 38);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 10;

    doc.setFontSize(10);
    result.shapValues.forEach((item) => {
      doc.setFont("helvetica", "bold");
      doc.text(item.feature, margin, yPos);
      
      // Impact bar
      const barWidth = Math.abs(item.impact) * 150;
      const barColor = item.impact > 0 ? [220, 38, 38] : [34, 197, 94];
      doc.setFillColor(barColor[0], barColor[1], barColor[2]);
      doc.roundedRect(margin + 50, yPos - 4, barWidth, 5, 1, 1, "F");
      
      doc.setFont("helvetica", "normal");
      doc.setTextColor(barColor[0], barColor[1], barColor[2]);
      doc.text(
        `${item.impact > 0 ? "+" : ""}${(item.impact * 100).toFixed(0)}%`,
        margin + 55 + barWidth,
        yPos
      );
      doc.setTextColor(0, 0, 0);
      yPos += 12;
    });

    yPos += 10;

    // Disclaimer
    doc.setFillColor(250, 250, 250);
    doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 25, 3, 3, "F");
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text("DISCLAIMER: This report is generated by an AI-powered decision-support system and is", margin + 5, yPos + 8);
    doc.text("intended for educational purposes only. It is NOT a substitute for professional medical", margin + 5, yPos + 14);
    doc.text("diagnosis or treatment. Please consult a qualified healthcare provider for medical advice.", margin + 5, yPos + 20);

    // Footer
    doc.setFillColor(220, 38, 38);
    doc.rect(0, doc.internal.pageSize.getHeight() - 15, pageWidth, 15, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text("© CARDEON - Heart Disease Prediction System | Powered by XGBoost & SHAP", margin, doc.internal.pageSize.getHeight() - 6);

    // Save the PDF
    doc.save(`CARDEON_Report_${new Date().toISOString().split("T")[0]}.pdf`);

    toast({
      title: "Report Downloaded",
      description: "Your PDF report has been generated and downloaded.",
    });
  };

  return (
    <PageWrapper>
      <Navbar isAuthenticated onLogout={handleLogout} />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Activity className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Heart Disease Prediction
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Enter your clinical parameters below to receive an AI-powered heart disease 
              risk assessment with transparent SHAP-based explanations.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form Section */}
            <div className="bg-card border border-border/50 rounded-3xl p-8 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
              <h2 className="font-heading text-xl font-semibold mb-6 flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                Clinical Parameters
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age (years)</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="e.g., 55"
                      value={formData.age}
                      onChange={(e) => handleChange("age", e.target.value)}
                      required
                      min="1"
                      max="120"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sex">Sex</Label>
                    <Select value={formData.sex} onValueChange={(value) => handleChange("sex", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sex" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Male</SelectItem>
                        <SelectItem value="0">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cp">Chest Pain Type</Label>
                    <Select value={formData.cp} onValueChange={(value) => handleChange("cp", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Typical Angina</SelectItem>
                        <SelectItem value="1">Atypical Angina</SelectItem>
                        <SelectItem value="2">Non-anginal Pain</SelectItem>
                        <SelectItem value="3">Asymptomatic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="trestbps">Resting Blood Pressure (mm Hg)</Label>
                    <Input
                      id="trestbps"
                      type="number"
                      placeholder="e.g., 130"
                      value={formData.trestbps}
                      onChange={(e) => handleChange("trestbps", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="chol">Serum Cholesterol (mg/dl)</Label>
                    <Input
                      id="chol"
                      type="number"
                      placeholder="e.g., 200"
                      value={formData.chol}
                      onChange={(e) => handleChange("chol", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fbs">Fasting Blood Sugar &gt; 120 mg/dl</Label>
                    <Select value={formData.fbs} onValueChange={(value) => handleChange("fbs", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Yes</SelectItem>
                        <SelectItem value="0">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="restecg">Resting ECG Results</Label>
                    <Select value={formData.restecg} onValueChange={(value) => handleChange("restecg", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select result" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Normal</SelectItem>
                        <SelectItem value="1">ST-T Abnormality</SelectItem>
                        <SelectItem value="2">LV Hypertrophy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="thalach">Max Heart Rate Achieved</Label>
                    <Input
                      id="thalach"
                      type="number"
                      placeholder="e.g., 150"
                      value={formData.thalach}
                      onChange={(e) => handleChange("thalach", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="exang">Exercise Induced Angina</Label>
                    <Select value={formData.exang} onValueChange={(value) => handleChange("exang", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Yes</SelectItem>
                        <SelectItem value="0">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="oldpeak">ST Depression (Oldpeak)</Label>
                    <Input
                      id="oldpeak"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 1.5"
                      value={formData.oldpeak}
                      onChange={(e) => handleChange("oldpeak", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slope">ST Segment Slope</Label>
                    <Select value={formData.slope} onValueChange={(value) => handleChange("slope", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select slope" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Upsloping</SelectItem>
                        <SelectItem value="1">Flat</SelectItem>
                        <SelectItem value="2">Downsloping</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ca">Major Vessels (0-3)</Label>
                    <Select value={formData.ca} onValueChange={(value) => handleChange("ca", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select number" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0</SelectItem>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="thal">Thalassemia</Label>
                    <Select value={formData.thal} onValueChange={(value) => handleChange("thal", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Normal</SelectItem>
                        <SelectItem value="2">Fixed Defect</SelectItem>
                        <SelectItem value="3">Reversible Defect</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="flex-1"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Processing...
                      </div>
                    ) : (
                      <>
                        <Heart className="w-4 h-4" />
                        Predict Risk
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={handleReset}
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </div>

            {/* Results Section */}
            <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
              {!result ? (
                <div className="bg-card border border-border/50 rounded-3xl p-8 h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
                    <Heart className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-2">
                    Ready for Analysis
                  </h3>
                  <p className="text-muted-foreground max-w-sm">
                    Fill in your clinical parameters and click "Predict Risk" to 
                    receive your AI-powered heart disease assessment.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Prediction Result Card */}
                  <div
                    className={`rounded-3xl p-8 ${
                      result.prediction === 1
                        ? "bg-gradient-to-br from-destructive/10 to-destructive/5 border border-destructive/20"
                        : "bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                          result.prediction === 1 ? "bg-destructive/20" : "bg-green-500/20"
                        }`}
                      >
                        {result.prediction === 1 ? (
                          <AlertCircle className="w-7 h-7 text-destructive" />
                        ) : (
                          <CheckCircle className="w-7 h-7 text-green-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading text-xl font-bold mb-1">
                          {result.prediction === 1
                            ? "Heart Disease Detected"
                            : "No Heart Disease Detected"}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          Based on the XGBoost model analysis
                        </p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Confidence Level</span>
                        <span className="font-medium">{(result.probability * 100).toFixed(1)}%</span>
                      </div>
                      <div className="h-3 bg-background/50 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${
                            result.prediction === 1 ? "bg-destructive" : "bg-green-500"
                          }`}
                          style={{ width: `${result.probability * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* SHAP Explanation Card */}
                  <div className="bg-card border border-border/50 rounded-3xl p-8">
                    <h3 className="font-heading text-lg font-semibold mb-4 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-primary" />
                      SHAP Feature Importance
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      How each clinical factor influenced your prediction
                    </p>

                    <div className="space-y-4">
                      {result.shapValues.map((item, index) => (
                        <div key={item.feature} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">{item.feature}</span>
                            <span className="text-muted-foreground">
                              Value: {item.value}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                  item.impact > 0 ? "bg-destructive" : "bg-green-500"
                                }`}
                                style={{
                                  width: `${Math.abs(item.impact) * 200}%`,
                                  animationDelay: `${index * 0.1}s`,
                                }}
                              />
                            </div>
                            <span
                              className={`text-xs font-medium ${
                                item.impact > 0 ? "text-destructive" : "text-green-600"
                              }`}
                            >
                              {item.impact > 0 ? "+" : ""}
                              {(item.impact * 100).toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Download Button */}
                  <Button
                    variant="hero-outline"
                    size="lg"
                    className="w-full"
                    onClick={handleDownload}
                  >
                    <Download className="w-4 h-4" />
                    Download PDF Report
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </PageWrapper>
  );
};

export default Predict;
