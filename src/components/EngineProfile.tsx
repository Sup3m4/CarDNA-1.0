import { useState } from "react";
import { 
  Gauge, 
  Zap, 
  Fuel, 
  Calendar, 
  AlertTriangle, 
  Wrench, 
  TrendingUp, 
  Lock,
  ChevronRight,
  Shield,
  DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EngineProfile as EngineProfileType } from "@/data/carDatabase";
import { cn } from "@/lib/utils";

interface EngineProfileProps {
  profile: EngineProfileType;
}

export function EngineProfile({ profile }: EngineProfileProps) {
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(false);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-slide-up">
      {/* Header Card */}
      <div className="glass-card rounded-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full uppercase tracking-wider">
                {profile.brand}
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{profile.yearRange}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {profile.model} {profile.generation}
            </h1>
            <div className="flex items-center gap-2">
              <span className="font-mono text-lg text-electric font-semibold">
                {profile.engineCode}
              </span>
              <span className="text-muted-foreground">|</span>
              <span className="text-muted-foreground">{profile.displacement}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <RiskBadge rating={profile.riskRating} />
          </div>
        </div>
      </div>

      {/* Basic Specs - FREE */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SpecCard icon={Gauge} label="Power" value={profile.power} />
        <SpecCard icon={Zap} label="Torque" value={profile.torque} />
        <SpecCard icon={Fuel} label="Fuel Type" value={profile.fuelType} />
        <SpecCard 
          icon={Calendar} 
          label="Configuration" 
          value={`${profile.cylinders} cyl / ${profile.valves}V`} 
        />
      </div>

      {/* Technical Details - FREE */}
      <div className="glass-card rounded-2xl p-6 md:p-8">
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
            <Gauge className="w-4 h-4 text-primary" />
          </div>
          Technical Specifications
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <DetailRow label="Displacement" value={profile.displacement} />
          <DetailRow label="Compression Ratio" value={profile.compression} />
          <DetailRow label="Cylinder Count" value={`${profile.cylinders} cylinders`} />
          <DetailRow label="Valve Configuration" value={`${profile.valves} valves`} />
          <DetailRow label="Fuel System" value={profile.fuelType} />
          <DetailRow label="Production Years" value={profile.yearRange} />
        </div>
      </div>

      {/* Premium Content - LOCKED */}
      {!isPremiumUnlocked ? (
        <PremiumPaywall onUnlock={() => setIsPremiumUnlocked(true)} />
      ) : (
        <PremiumContent profile={profile} />
      )}
    </div>
  );
}

function SpecCard({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="glass-card rounded-xl p-4 hover-lift">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-primary" />
        </div>
      </div>
      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
      <p className="font-semibold text-foreground text-sm">{value}</p>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
      <p className="font-mono text-foreground">{value}</p>
    </div>
  );
}

function RiskBadge({ rating }: { rating: number }) {
  const getColor = () => {
    if (rating <= 3) return "bg-green-500/10 text-green-600 border-green-500/20";
    if (rating <= 6) return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
    return "bg-red-500/10 text-red-600 border-red-500/20";
  };

  const getLabel = () => {
    if (rating <= 3) return "Low Risk";
    if (rating <= 6) return "Medium Risk";
    return "High Risk";
  };

  return (
    <div className={cn("px-4 py-2 rounded-xl border", getColor())}>
      <p className="text-xs font-medium mb-1">{getLabel()}</p>
      <p className="text-2xl font-bold">{rating}/10</p>
    </div>
  );
}

function PremiumPaywall({ onUnlock }: { onUnlock: () => void }) {
  return (
    <div className="relative rounded-2xl overflow-hidden">
      {/* Blurred preview background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card to-background opacity-50" />
      
      <div className="relative glass-card rounded-2xl p-8 md:p-12 text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Lock className="w-8 h-8 text-primary" />
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          Unlock Actionable Insights
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          Access risk assessments, known vulnerabilities, maintenance secrets, and tuning potential 
          for this engine. Make informed decisions with real engineering data.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
          <InsightPreview 
            icon={AlertTriangle} 
            title="Vulnerabilities" 
            description="Known failure points and prevention strategies"
          />
          <InsightPreview 
            icon={Wrench} 
            title="Maintenance Secrets" 
            description="Optimal service intervals and procedures"
          />
          <InsightPreview 
            icon={TrendingUp} 
            title="Tuning Potential" 
            description="Safe power gains by modification stage"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="lg" onClick={onUnlock} className="gap-2">
            <DollarSign className="w-4 h-4" />
            Buy This Profile - $4.99
          </Button>
          <Button variant="outline" size="lg" className="gap-2">
            <Shield className="w-4 h-4" />
            Subscribe - $9.99/mo
          </Button>
        </div>

        <p className="text-xs text-muted-foreground mt-4">
          Full database access • Unlimited profiles • Cancel anytime
        </p>
      </div>
    </div>
  );
}

function InsightPreview({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <div className="p-4 rounded-xl bg-secondary/50 text-left">
      <Icon className="w-5 h-5 text-primary mb-2" />
      <h3 className="font-semibold text-foreground text-sm mb-1">{title}</h3>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}

function PremiumContent({ profile }: { profile: EngineProfileType }) {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Vulnerabilities */}
      <div className="glass-card rounded-2xl p-6 md:p-8">
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 text-red-500" />
          </div>
          Known Vulnerabilities
        </h2>
        <ul className="space-y-3">
          {profile.vulnerabilities.map((v, i) => (
            <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
              <ChevronRight className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
              <span className="text-foreground">{v}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Maintenance Schedule */}
      <div className="glass-card rounded-2xl p-6 md:p-8">
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Wrench className="w-4 h-4 text-blue-500" />
          </div>
          Optimized Maintenance Schedule
        </h2>
        <div className="grid gap-3">
          {profile.maintenanceSchedule.map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <span className="font-mono text-sm text-primary">{item.interval}</span>
              <span className="text-foreground text-right">{item.task}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tuning Potential */}
      <div className="glass-card rounded-2xl p-6 md:p-8">
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-green-500" />
          </div>
          Tuning Potential
        </h2>
        <div className="space-y-4">
          {profile.tuningPotential.map((stage, i) => (
            <div key={i} className="p-4 rounded-xl bg-secondary/50 border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-foreground">{stage.stage}</span>
                <span className="font-mono text-lg text-electric font-bold">{stage.power}</span>
              </div>
              <p className="text-sm text-muted-foreground">{stage.notes}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Common Issues & Cost */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-semibold text-foreground mb-3">Common Issues</h3>
          <ul className="space-y-2">
            {profile.commonIssues.map((issue, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                {issue}
              </li>
            ))}
          </ul>
        </div>
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-semibold text-foreground mb-3">Repair Cost Estimate</h3>
          <p className="text-2xl font-bold text-electric font-mono">
            {profile.repairCostEstimate}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Major repair or preventive maintenance costs
          </p>
        </div>
      </div>
    </div>
  );
}
