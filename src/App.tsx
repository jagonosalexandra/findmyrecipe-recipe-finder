import { Route, Routes } from "react-router-dom";
import { SearchContextProvider } from "./context/SearchContext";
import Home from "./pages/Home";
import Search from "./pages/Search";
import RecipeDetail from "./pages/RecipeDetail";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <main className="grow">
        <SearchContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SearchContextProvider>
      </main>
      <Footer />
    </div>
  );
}

export default App;
