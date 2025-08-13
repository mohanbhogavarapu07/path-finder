
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Assessments from "./pages/Assessments";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import AdminBlogEditor from "./pages/AdminBlogEditor";
import AdminAssessmentEditor from "./pages/AdminAssessmentEditor";
import NotFound from "./pages/NotFound";

// Import dynamic assessment components
import DynamicAssessments from "./pages/DynamicAssessments";
import DynamicAssessment from "./pages/DynamicAssessment";

// Import all assessment components - using clarity-hub method
import AWSAssessment from "./pages/assessments/AWS/pages/Index";
import GoogleCloudPlatformAssessment from "./pages/assessments/GoogleCloudPlatform/pages/Index";
import OracleCloudAssessment from "./pages/assessments/OracleCloud/pages/Index";
import DevOpsAssessment from "./pages/assessments/DevOps/pages/Index";
import MultiCloudEngineerAssessment from "./pages/assessments/MultiCloudEngineer/pages/Index";
import Microsoft365Assessment from "./pages/assessments/Microsoft365/pages/Index";
import SnowflakeAssessment from "./pages/assessments/snowflake/App";
import DataScienceAssessment from "./pages/assessments/DataScience/pages/Index";
import PowerBITableauAssessment from "./pages/assessments/PowerBI/pages/Index";
import BlockchainAssessment from "./pages/assessments/Blockchain/pages/Index";
import AIMLAssessment from "./pages/assessments/AIML/pages/Index";
import GenAIAssessment from "./pages/assessments/GenAI/pages/Index";
import CyberSecurityAssessment from "./pages/assessments/CyberSecurity/pages/Index";
import EthicalHackingAssessment from "./pages/assessments/EthicalHacking/pages/Index";
import PythonDataAnalyticsAssessment from "./pages/assessments/PythonwithDataAnalytics/pages/Index";
import FullStackPythonAssessment from "./pages/assessments/fullstackpython/pages/Index";
import FullStackJAVAAssessment from "./pages/assessments/FullStackJAVA/pages/Index";
import FullStackDotNetAssessment from "./pages/assessments/FullStackDotNet/pages/Index";
import MERNStackAssessment from "./pages/assessments/MERNStack/pages/Index";
import ReactJSAssessment from "./pages/assessments/ReactJS/pages/Index";
import FlutterAssessment from "./pages/assessments/Flutter/pages/Index";
import ScrumMasterAssessment from "./pages/assessments/ScrumMaster/pages/Index";
import BusinessAnalystAssessment from "./pages/assessments/bussinessanalyst/pages/Index";
import DigitalMarketingAssessment from "./pages/assessments/DigitalMarketing/pages/Index";
import MedicalCodingAssessment from "./pages/assessments/MedicalCoding/pages/Index";
import ServiceNowAssessment from "./pages/assessments/Servicenow/pages/Index";

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
            <Route path="/contact" element={<Contact />} />
            
            {/* Dynamic Assessment Routes */}
            <Route path="/dynamic-assessments" element={<DynamicAssessments />} />
            <Route path="/dynamic-assessments/:assessmentId/*" element={<DynamicAssessment />} />
            
            {/* Assessment Routes - using clarity-hub method with wildcards */}
            <Route path="/assessments/aws/*" element={<AWSAssessment />} />
            <Route path="/assessments/google-cloud-platform/*" element={<GoogleCloudPlatformAssessment />} />
            <Route path="/assessments/oracle-cloud/*" element={<OracleCloudAssessment />} />
            <Route path="/assessments/devops/*" element={<DevOpsAssessment />} />
            <Route path="/assessments/multi-cloud-engineer/*" element={<MultiCloudEngineerAssessment />} />
            <Route path="/assessments/microsoft-365/*" element={<Microsoft365Assessment />} />
            <Route path="/assessments/snowflake/*" element={<SnowflakeAssessment />} />
            <Route path="/assessments/data-science/*" element={<DataScienceAssessment />} />
            <Route path="/assessments/powerbi-tableau/*" element={<PowerBITableauAssessment />} />
            <Route path="/assessments/blockchain/*" element={<BlockchainAssessment />} />
            <Route path="/assessments/ai-ml/*" element={<AIMLAssessment />} />
            <Route path="/assessments/gen-ai/*" element={<GenAIAssessment />} />
            <Route path="/assessments/cyber-security/*" element={<CyberSecurityAssessment />} />
            <Route path="/assessments/ethical-hacking/*" element={<EthicalHackingAssessment />} />
            <Route path="/assessments/python-data-analytics/*" element={<PythonDataAnalyticsAssessment />} />
            <Route path="/assessments/full-stack-python/*" element={<FullStackPythonAssessment />} />
            <Route path="/assessments/full-stack-java/*" element={<FullStackJAVAAssessment />} />
            <Route path="/assessments/full-stack-dotnet/*" element={<FullStackDotNetAssessment />} />
            <Route path="/assessments/mern-stack/*" element={<MERNStackAssessment />} />
            <Route path="/assessments/react-js/*" element={<ReactJSAssessment />} />
            <Route path="/assessments/flutter/*" element={<FlutterAssessment />} />
            <Route path="/assessments/scrum-master/*" element={<ScrumMasterAssessment />} />
            <Route path="/assessments/business-analyst/*" element={<BusinessAnalystAssessment />} />
            <Route path="/assessments/digital-marketing/*" element={<DigitalMarketingAssessment />} />
            <Route path="/assessments/medical-coding/*" element={<MedicalCodingAssessment />} />
            <Route path="/assessments/servicenow/*" element={<ServiceNowAssessment />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/new-post" element={<AdminBlogEditor />} />
            <Route path="/admin/edit-post/:postId" element={<AdminBlogEditor />} />
            <Route path="/admin/new-assessment" element={<AdminAssessmentEditor />} />
            <Route path="/admin/edit-assessment/:assessmentId" element={<AdminAssessmentEditor />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
