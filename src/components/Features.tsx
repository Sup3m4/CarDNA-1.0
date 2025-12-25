import { 
  AlertTriangle, 
  BarChart3, 
  Clock, 
  FileText, 
  Search, 
  Shield 
} from "lucide-react";

export function Features() {
  return (
    <section id="features" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Intelligence That Matters
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every CarDNA profile contains actionable data compiled from manufacturer 
            documentation, workshop manuals, and real-world experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={AlertTriangle}
            title="Vulnerability Database"
            description="Known failure points, common issues, and preventive measures for each engine variant. Stay ahead of problems."
          />
          <FeatureCard
            icon={Clock}
            title="Service Intervals"
            description="Optimized maintenance schedules that go beyond manufacturer recommendations. Real-world tested intervals."
          />
          <FeatureCard
            icon={BarChart3}
            title="Tuning Potential"
            description="Safe power gains by modification stage. Know what's achievable before you invest in upgrades."
          />
          <FeatureCard
            icon={Shield}
            title="Risk Ratings"
            description="Aggregate reliability scores based on common failure rates and repair complexity."
          />
          <FeatureCard
            icon={FileText}
            title="Technical Specs"
            description="Complete engine specifications including compression ratios, valve configurations, and fuel systems."
          />
          <FeatureCard
            icon={Search}
            title="Searchable Database"
            description="Quickly find any engine by brand, model, generation, or engine code. Instant access to thousands of profiles."
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <div className="glass-card rounded-2xl p-6 hover-lift group">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
