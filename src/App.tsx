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
import EventToursPage from "./pages/EventToursPage.tsx";
import ExcursionToursPage from "./pages/ExcursionToursPage.tsx";
import ActiveToursPage from "./pages/ActiveToursPage.tsx";
import AuthorToursPage from "./pages/AuthorToursPage.tsx";
import CorporateToursPage from "./pages/CorporateToursPage.tsx";
import WellnessToursPage from "./pages/WellnessToursPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";

import SafariToursPage from "./pages/SafariToursPage.tsx";
import DivingToursPage from "./pages/DivingToursPage.tsx";
import MaldivesPage from "./pages/MaldivesPage.tsx";
import ArcticCruisesPage from "./pages/cruises/ArcticCruisesPage.tsx";
import AntarcticaCruisesPage from "./pages/cruises/AntarcticaCruisesPage.tsx";
import AfricaCruisesPage from "./pages/cruises/AfricaCruisesPage.tsx";
import OceaniaCruisesPage from "./pages/cruises/OceaniaCruisesPage.tsx";
import MiddleEastCruisesPage from "./pages/cruises/MiddleEastCruisesPage.tsx";
import NorthAmericaCruisesPage from "./pages/cruises/NorthAmericaCruisesPage.tsx";
import SouthAmericaCruisesPage from "./pages/cruises/SouthAmericaCruisesPage.tsx";
import RussiaCruisesPage from "./pages/cruises/RussiaCruisesPage.tsx";
import LinersPage from "./pages/cruises/LinersPage.tsx";
import LinerDetailPage from "./pages/cruises/LinerDetailPage.tsx";
import AsiaCruisesPage from "./pages/cruises/AsiaCruisesPage.tsx";
import EuropeCruisesPage from "./pages/cruises/EuropeCruisesPage.tsx";
import AsiaDestinationPage from "./pages/destinations/AsiaDestinationPage.tsx";
import MaldivesHotelsPage from "./pages/hotels/MaldivesHotelsPage.tsx";
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
          <Route path="/event-tours" element={<EventToursPage />} />
          <Route path="/excursion-tours" element={<ExcursionToursPage />} />
          <Route path="/active-tours" element={<ActiveToursPage />} />
          <Route path="/author-tours" element={<AuthorToursPage />} />
          <Route path="/corporate-tours" element={<CorporateToursPage />} />
          <Route path="/wellness-tours" element={<WellnessToursPage />} />
          <Route path="/about" element={<AboutPage />} />

          <Route path="/safari-tours" element={<SafariToursPage />} />
          <Route path="/diving-tours" element={<DivingToursPage />} />
          <Route path="/maldives" element={<MaldivesPage />} />
          <Route path="/cruises/arctic" element={<ArcticCruisesPage />} />
          <Route path="/cruises/antarctica" element={<AntarcticaCruisesPage />} />
          <Route path="/cruises/africa" element={<AfricaCruisesPage />} />
          <Route path="/cruises/oceania" element={<OceaniaCruisesPage />} />
          <Route path="/cruises/middle-east" element={<MiddleEastCruisesPage />} />
          <Route path="/cruises/north-america" element={<NorthAmericaCruisesPage />} />
          <Route path="/cruises/south-america" element={<SouthAmericaCruisesPage />} />
          <Route path="/cruises/russia" element={<RussiaCruisesPage />} />
          <Route path="/cruises/liners" element={<LinersPage />} />
          <Route path="/liner/:slug" element={<LinerDetailPage />} />
          <Route path="/cruises/asia" element={<AsiaCruisesPage />} />
          <Route path="/cruises/europe" element={<EuropeCruisesPage />} />
          <Route path="/destinations/asia" element={<AsiaDestinationPage />} />
          <Route path="/hotels/maldives" element={<MaldivesHotelsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CookieBanner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
