import { useState, useEffect } from "react";
import { ChevronDown, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { carDatabase } from "@/data/carDatabase";
import { cn } from "@/lib/utils";

interface CatalogSearcherProps {
  onSearch: (brand: string, model: string, generation: string, engineCode: string) => void;
}

export function CatalogSearcher({ onSearch }: CatalogSearcherProps) {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [generation, setGeneration] = useState("");
  const [engineCode, setEngineCode] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const [models, setModels] = useState<string[]>([]);
  const [generations, setGenerations] = useState<string[]>([]);
  const [engineCodes, setEngineCodes] = useState<string[]>([]);

  // Update models when brand changes
  useEffect(() => {
    if (brand) {
      setModels(carDatabase.models[brand as keyof typeof carDatabase.models] || []);
      setModel("");
      setGeneration("");
      setEngineCode("");
    } else {
      setModels([]);
    }
  }, [brand]);

  // Update generations when model changes
  useEffect(() => {
    if (brand && model) {
      const key = `${brand}-${model}` as keyof typeof carDatabase.generations;
      setGenerations(carDatabase.generations[key] || []);
      setGeneration("");
      setEngineCode("");
    } else {
      setGenerations([]);
    }
  }, [brand, model]);

  // Update engine codes when generation changes
  useEffect(() => {
    if (brand && model && generation) {
      const key = `${brand}-${model}-${generation}`;
      setEngineCodes(carDatabase.engineCodes[key] || []);
      setEngineCode("");
    } else {
      setEngineCodes([]);
    }
  }, [brand, model, generation]);

  const handleSearch = async () => {
    if (!brand || !model || !generation || !engineCode) return;
    
    setIsSearching(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    onSearch(brand, model, generation, engineCode);
    setIsSearching(false);
  };

  const isComplete = brand && model && generation && engineCode;

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="glass-card rounded-2xl p-6 md:p-8">
        <div className="text-center mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-1">
            Vehicle Identification
          </h2>
          <p className="text-sm text-muted-foreground">
            Select your vehicle specifications to access its DNA profile
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <SelectField
            label="Brand"
            value={brand}
            onChange={setBrand}
            options={carDatabase.brands}
            placeholder="Select Brand"
          />
          <SelectField
            label="Model"
            value={model}
            onChange={setModel}
            options={models}
            placeholder="Select Model"
            disabled={!brand}
          />
          <SelectField
            label="Generation"
            value={generation}
            onChange={setGeneration}
            options={generations}
            placeholder="Select Generation"
            disabled={!model}
          />
          <SelectField
            label="Engine Code"
            value={engineCode}
            onChange={setEngineCode}
            options={engineCodes}
            placeholder="Select Engine"
            disabled={!generation}
          />
        </div>

        <div className="mt-6 flex justify-center">
          <Button
            variant="hero"
            size="xl"
            onClick={handleSearch}
            disabled={!isComplete || isSearching}
            className={cn(
              "min-w-[200px]",
              !isComplete && "opacity-50"
            )}
          >
            {isSearching ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Search DNA Profile
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  disabled?: boolean;
}

function SelectField({ label, value, onChange, options, placeholder, disabled }: SelectFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={cn(
            "w-full h-12 px-4 pr-10 rounded-lg appearance-none",
            "bg-background border border-border",
            "text-foreground font-medium",
            "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",
            "transition-all duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            !value && "text-muted-foreground"
          )}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option} className="text-foreground bg-background">
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
      </div>
    </div>
  );
}
