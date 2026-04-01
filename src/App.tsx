import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import TourDetail from "./pages/TourDetail.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import NotFound from "./pages/NotFound.tsx";
import SpecialOffersPage from "./pages/SpecialOffersPage.tsx";
import JapanToursPage from "./pages/JapanToursPage.tsx";
import ExpeditionCruisesPage from "./pages/ExpeditionCruisesPage.tsx";
import ClassicCruisesPage from "./pages/ClassicCruisesPage.tsx";
import KoreaToursPage from "./pages/KoreaToursPage.tsx";
import ChinaToursPage from "./pages/ChinaToursPage.tsx";
import NorthKoreaToursPage from "./pages/NorthKoreaToursPage.tsx";
import RussiaToursPage from "./pages/RussiaToursPage.tsx";
import MaldivesPage from "./pages/MaldivesPage.tsx";
import CookieBanner from "./components/CookieBanner.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tour/:id" element={<TourDetail />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/special-offers" element={<SpecialOffersPage />} />
          <Route path="/japan-tours" element={<JapanToursPage />} />
          <Route path="/expedition-cruises" element={<ExpeditionCruisesPage />} />
          <Route path="/classic-cruises" element={<ClassicCruisesPage />} />
          <Route path="/korea-tours" element={<KoreaToursPage />} />
          <Route path="/china-tours" element={<ChinaToursPage />} />
          <Route path="/nkorea-tours" element={<NorthKoreaToursPage />} />
          <Route path="/russia-tours" element={<RussiaToursPage />} />
          <Route path="/maldives" element={<MaldivesPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CookieBanner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
