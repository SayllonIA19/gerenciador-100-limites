import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Projects from "./pages/Projects";
import ProjectManager from "./pages/ProjectManager";
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
import TecnologiaSugestoes from "./pages/tecnologia/TecnologiaSugestoes";
import TecnologiaProjetos from "./pages/tecnologia/TecnologiaProjetos";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/events" element={
              <ProtectedRoute>
                <Events />
              </ProtectedRoute>
            } />
            <Route path="/events/:id" element={
              <ProtectedRoute>
                <EventDetail />
              </ProtectedRoute>
            } />
            <Route path="/projects" element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            } />
            <Route path="/project-manager" element={
              <ProtectedRoute>
                <ProjectManager />
              </ProtectedRoute>
            } />
            <Route path="/finance" element={
              <ProtectedRoute>
                <Finance />
              </ProtectedRoute>
            } />
            <Route path="/feed" element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            } />
            <Route path="/collaborators" element={
              <ProtectedRoute>
                <Collaborators />
              </ProtectedRoute>
            } />
            <Route path="/visual-maps" element={
              <ProtectedRoute>
                <VisualMaps />
              </ProtectedRoute>
            } />
            <Route path="/marketing" element={
              <ProtectedRoute>
                <Marketing />
              </ProtectedRoute>
            } />
            <Route path="/marketing/campaigns/:id" element={
              <ProtectedRoute>
                <MarketingCampaignDetail />
              </ProtectedRoute>
            } />
            <Route path="/music" element={
              <ProtectedRoute>
                <MusicProduction />
              </ProtectedRoute>
            } />
            <Route path="/music/tracks" element={
              <ProtectedRoute>
                <MusicTracks />
              </ProtectedRoute>
            } />
            <Route path="/music/tracks/:id" element={
              <ProtectedRoute>
                <TrackDetail />
              </ProtectedRoute>
            } />
            <Route path="/music/eps" element={
              <ProtectedRoute>
                <MusicEPs />
              </ProtectedRoute>
            } />
            <Route path="/music/albums" element={
              <ProtectedRoute>
                <MusicAlbums />
              </ProtectedRoute>
            } />
            <Route path="/dance" element={
              <ProtectedRoute>
                <Dance />
              </ProtectedRoute>
            } />
            <Route path="/dance/choreographies" element={
              <ProtectedRoute>
                <DanceChoreographies />
              </ProtectedRoute>
            } />
            <Route path="/dance/choreographies/:id" element={
              <ProtectedRoute>
                <ChoreographyDetail />
              </ProtectedRoute>
            } />
            <Route path="/dance/calendar" element={
              <ProtectedRoute>
                <DanceCalendar />
              </ProtectedRoute>
            } />
            <Route path="/tecnologia/sugestoes" element={
              <ProtectedRoute>
                <TecnologiaSugestoes />
              </ProtectedRoute>
            } />
            <Route path="/tecnologia/projetos" element={
              <ProtectedRoute>
                <TecnologiaProjetos />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
