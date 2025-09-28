import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedRecipes from "@/components/FeaturedRecipes";
import Categories from "@/components/Categories";
import Footer from "@/components/Footer";


const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-dark">
      <Header />
      <main>
        <Hero />

        <FeaturedRecipes />
        <Categories />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
