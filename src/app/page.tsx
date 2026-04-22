import WelcomeHome from "@/components/Home/WelcomeHome";
import Stats from "@/components/Home/Stats";
import Services from "@/components/Home/Services";
import Trainings from "@/components/Home/Trainings";
import CTASection from "@/components/Home/CTASection";

export default function Home() {
  return (
    <>
      <WelcomeHome />
      <Stats />
      <Services />
      <Trainings />
      <CTASection />
    </>
  );
}
