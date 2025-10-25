import Hero from "../components/Hero";
import TopRatedPlants from "../components/TopRatedPlants";
import PlantCareTips from "../components/PlantCareTips";
import GreenExperts from "../components/GreenExperts";
import EcoDecorIdeas from "../components/EcoDecorIdeas";

const Home = () => {
  return (
    <div className="bg-base-100 text-base-content">
      <Hero />
      <TopRatedPlants />
      <PlantCareTips />
      <GreenExperts />
      <EcoDecorIdeas />
    </div>
  );
};

export default Home;
