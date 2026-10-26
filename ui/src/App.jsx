import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import ProductHighlights from "./components/ProductHighlights/ProductHighlights";
import EnquiryForm from "./components/EnquiryForm/EnquiryForm";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-br from-[#073F49] via-[#086B70] to-[#079B91]">
      <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-8 lg:px-10">
        <Header />
        <Hero />
      </div>

      <ProductHighlights />
      <EnquiryForm />
      <Footer />
    </main>
  );
}

export default App;
