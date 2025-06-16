
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Projects from "./pages/Projects";
import Finance from "./pages/Finance";
import Feed from "./pages/Feed";
import Collaborators from "./pages/Collaborators";
import VisualMaps from "./pages/VisualMaps";
import Marketing from "./pages/Marketing";
import MarketingCampaignDetail from "./pages/MarketingCampaignDetail";
import MusicProduction from "./pages/MusicProduction";
import MusicTracks from "./pages/MusicTracks";
import MusicEPs from "./pages/MusicEPs";
import MusicAlbums from "./pages/MusicAlbums";
import TrackDetail from "./pages/TrackDetail";
import Dance from "./pages/Dance";
import DanceChoreographies from "./pages/DanceChoreographies";
import DanceCalendar from "./pages/DanceCalendar";
import ChoreographyDetail from "./pages/ChoreographyDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/collaborators" element={<Collaborators />} />
          <Route path="/visual-maps" element={<VisualMaps />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/marketing/campaigns/:id" element={<MarketingCampaignDetail />} />
          <Route path="/music" element={<MusicProduction />} />
          <Route path="/music/tracks" element={<MusicTracks />} />
          <Route path="/music/tracks/:id" element={<TrackDetail />} />
          <Route path="/music/eps" element={<MusicEPs />} />
          <Route path="/music/albums" element={<MusicAlbums />} />
          <Route path="/dance" element={<Dance />} />
          <Route path="/dance/choreographies" element={<DanceChoreographies />} />
          <Route path="/dance/choreographies/:id" element={<ChoreographyDetail />} />
          <Route path="/dance/calendar" element={<DanceCalendar />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
