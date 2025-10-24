
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdSenseComponent from "@/components/AdSenseComponent";
import Index from "./pages/Index";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Assessments from "./pages/Assessments";
import Categories from "./pages/Categories";
import Paths from "./pages/Paths";
import Popular from "./pages/Popular";
import New from "./pages/New";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import AdminBlogEditor from "./pages/AdminBlogEditor";
import AdminAssessmentEditor from "./pages/AdminAssessmentEditor";
import AdminCategoryManager from "./pages/AdminCategoryManager";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import DataProtection from "./pages/DataProtection";
import ReleaseNotes from "./pages/ReleaseNotes";
import NotFound from "./pages/NotFound";

// Import dynamic assessment components
import DynamicAssessment from "./pages/DynamicAssessment";
import GateAssessment from "./pages/GateAssessment";
import GateResults from "./pages/GateResults";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/assessments" element={<Assessments />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/paths" element={<Paths />} />
            {/* New domain/category routes */}
            <Route path="/category/:categorySlug" element={<Assessments />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/new" element={<New />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/data-protection" element={<DataProtection />} />
            <Route path="/release-notes" element={<ReleaseNotes />} />
            
            {/* Dynamic Assessment Route (new) */}
            <Route path="/category/:categorySlug/:assessmentId/*" element={<DynamicAssessment />} />
            
            {/* GATE Assessment Route - Legacy support */}
            <Route path="/gate/:categorySlug/:assessmentId" element={<GateAssessment />} />
            
            {/* GATE Results Route */}
            <Route path="/gate-results/:assessmentId" element={<GateResults />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/new-post" element={<AdminBlogEditor />} />
            <Route path="/admin/edit-post/:postId" element={<AdminBlogEditor />} />
            <Route path="/admin/new-assessment" element={<AdminAssessmentEditor />} />
            <Route path="/admin/edit-assessment/:assessmentId" element={<AdminAssessmentEditor />} />
            <Route path="/admin/categories" element={<AdminCategoryManager />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
