import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the option that fits your needs. One-time profile purchases or 
            unlimited access with a subscription.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Single Profile */}
          <PricingCard
            title="Single Profile"
            price="$4.99"
            period="one-time"
            description="Perfect for checking a specific vehicle before purchase"
            features={[
              "Full engine DNA profile",
              "Vulnerability assessment",
              "Maintenance schedule",
              "Tuning potential data",
              "Risk rating",
              "Lifetime access to profile",
            ]}
            buttonText="Buy Profile"
            buttonVariant="outline"
          />

          {/* Subscription */}
          <PricingCard
            title="Full Access"
            price="$9.99"
            period="per month"
            description="Unlimited access for enthusiasts and professionals"
            features={[
              "Unlimited engine profiles",
              "All premium insights",
              "Priority database updates",
              "Export reports (PDF)",
              "API access",
              "Cancel anytime",
            ]}
            buttonText="Start Subscription"
            buttonVariant="hero"
            featured
          />
        </div>

        {/* Free Tier Note */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            <span className="font-semibold text-foreground">Free tier available:</span>{" "}
            Basic specs for all engines. Sign up to get started.
          </p>
        </div>
      </div>
    </section>
  );
}

interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonVariant: "outline" | "hero";
  featured?: boolean;
}

function PricingCard({
  title,
  price,
  period,
  description,
  features,
  buttonText,
  buttonVariant,
  featured,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-8 relative",
        featured 
          ? "glass-card border-2 border-primary/30 glow-effect" 
          : "glass-card"
      )}
    >
      {featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
            <Sparkles className="w-3 h-3" />
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>

      <div className="mb-6">
        <span className="text-4xl font-bold text-foreground">{price}</span>
        <span className="text-muted-foreground ml-2">{period}</span>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Check className="w-3 h-3 text-primary" />
            </div>
            <span className="text-foreground text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <Button variant={buttonVariant} size="lg" className="w-full">
        {buttonText}
      </Button>
    </div>
  );
}
