import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CatalogSearcher } from "@/components/CatalogSearcher";
import { EngineProfile } from "@/components/EngineProfile";
import { Features } from "@/components/Features";
import { Pricing } from "@/components/Pricing";
import { Footer } from "@/components/Footer";
import { getEngineProfile, engineProfiles, EngineProfile as EngineProfileType } from "@/data/carDatabase";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [selectedProfile, setSelectedProfile] = useState<EngineProfileType | null>(null);

  const handleSearch = (brand: string, model: string, generation: string, engineCode: string) => {
    const profile = getEngineProfile(brand, model, generation, engineCode);
    
    if (profile) {
      setSelectedProfile(profile);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Fallback to first matching profile or first available
      const fallback = engineProfiles.find(p => p.brand === brand) || engineProfiles[0];
      setSelectedProfile(fallback);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setSelectedProfile(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {selectedProfile ? (
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="mb-6 gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Search
            </Button>
            <EngineProfile profile={selectedProfile} />
          </div>
        </main>
      ) : (
        <>
          <Hero />
          
          <section id="search" className="py-16 -mt-8 relative z-10">
            <div className="container mx-auto px-4">
              <CatalogSearcher onSearch={handleSearch} />
            </div>
          </section>
          
          <Features />
          <Pricing />
        </>
      )}
      
      <Footer />
    </div>
  );
};

export default Index;
