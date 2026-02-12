import HeroSection from "@/components/home/HeroSection";
import Aboutsection from "@/components/home/Aboutsection";
import Featuresection from "@/components/home/Featuresection";
import Servicesection from "@/components/home/Servicesection";
import Whychooseussection from "@/components/home/Whychooseussection";
import Testimonialssection from "@/components/home/Testimonialssection"; 
import Footersection from "@/components/common-components/footer"; 

 
export default function Page() {
  return (
    <>
      <HeroSection />
      <Aboutsection />
      <Featuresection />
      <Servicesection />
      <Whychooseussection />
      <Testimonialssection/>
     </>
  );
}