import { Database, Shield, TrendingUp, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 tech-grid opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-electric/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in">
            <Database className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Comprehensive Engine Intelligence
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-slide-up">
            Decode Your Vehicle's{" "}
            <span className="gradient-text">True DNA</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Access detailed technical profiles, known vulnerabilities, maintenance schedules, 
            and tuning potential for thousands of automotive engines. Make informed decisions 
            backed by real engineering data.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <FeaturePill icon={Shield} text="Risk Assessments" />
            <FeaturePill icon={Zap} text="Tuning Data" />
            <FeaturePill icon={TrendingUp} text="Reliability Insights" />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturePill({ icon: Icon, text }: { icon: any; text: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border">
      <Icon className="w-4 h-4 text-primary" />
      <span className="text-sm font-medium text-foreground">{text}</span>
    </div>
  );
}
