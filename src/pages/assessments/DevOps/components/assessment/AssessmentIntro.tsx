import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Clock, 
  TrendingUp, 
  Users,
  Server,
  CloudLightning,
  Shield,
  Workflow,
  GitBranch,
  Monitor
} from "lucide-react";

interface AssessmentIntroProps {
  onStartAssessment: () => void;
}

export function AssessmentIntro({ onStartAssessment }: AssessmentIntroProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <Card className="bg-blue-50 border border-blue-100 rounded-xl shadow-sm p-10 mb-8">
        <CardContent className="text-center space-y-6">
          <h2 className="text-4xl font-bold text-blue-900 mb-2">
            Discover Your DevOps Career Potential
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-4">
            Take our comprehensive assessment to evaluate your psychological fit, technical readiness, 
            and career alignment for a future in DevOps engineering and automation.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <span>25-30 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-purple-500" />
              <span>Personalized Results</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-green-500" />
              <span>Career Guidance</span>
            </div>
          </div>
          <Button 
            onClick={onStartAssessment}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 text-lg font-semibold rounded-lg shadow-md transition-all duration-200"
          >
            Start Assessment
          </Button>
        </CardContent>
      </Card>

      {/* What is DevOps Section */}
      <Card className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 mb-8">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-900">What is DevOps?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-700 leading-relaxed">
            DevOps (Development + Operations) is a <strong>software engineering culture and practice</strong> that 
            emphasizes automation, continuous integration/deployment, infrastructure-as-code, and collaboration 
            between development and IT operations. It streamlines the software delivery lifecycle to improve 
            efficiency, quality, and speed.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
              <CloudLightning className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-700">Automation & CI/CD</h4>
                <p className="text-sm text-blue-700">Streamline processes and reduce manual work</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
              <Server className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-green-700">Infrastructure as Code</h4>
                <p className="text-sm text-green-700">Manage infrastructure through code and automation</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
              <Monitor className="h-6 w-6 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-purple-700">Monitoring & Observability</h4>
                <p className="text-sm text-purple-700">Ensure system reliability and performance</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg">
              <Users className="h-6 w-6 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-orange-700">Collaboration Culture</h4>
                <p className="text-sm text-orange-700">Bridge development and operations teams</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Career Opportunities */}
      <Card className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 mb-8">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-900">Career Opportunities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg bg-blue-50">
              <h4 className="font-semibold text-blue-900 mb-2">DevOps Engineer</h4>
              <p className="text-sm text-blue-700">Build automation and CI/CD pipelines</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg bg-green-50">
              <h4 className="font-semibold text-green-900 mb-2">Cloud Automation Engineer</h4>
              <p className="text-sm text-green-700">Automate cloud infrastructure and services</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg bg-purple-50">
              <h4 className="font-semibold text-purple-900 mb-2">Site Reliability Engineer (SRE)</h4>
              <p className="text-sm text-purple-700">Ensure system reliability and uptime</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg bg-orange-50">
              <h4 className="font-semibold text-orange-900 mb-2">Platform Engineer</h4>
              <p className="text-sm text-orange-700">Develop reusable platform services</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg bg-pink-50">
              <h4 className="font-semibold text-pink-900 mb-2">Infrastructure as Code Specialist</h4>
              <p className="text-sm text-pink-700">Manage infrastructure through code</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg bg-yellow-50">
              <h4 className="font-semibold text-yellow-900 mb-2">Release Manager</h4>
              <p className="text-sm text-yellow-700">Coordinate deployment and releases</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ideal Traits */}
      <Card className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 mb-8">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-900">Ideal Traits & Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700">✓</Badge>
              <span className="text-sm text-gray-900">Analytical thinking</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700">✓</Badge>
              <span className="text-sm text-gray-900">Systems thinking</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700">✓</Badge>
              <span className="text-sm text-gray-900">Attention to detail</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700">✓</Badge>
              <span className="text-sm text-gray-900">Curiosity for complexity</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700">✓</Badge>
              <span className="text-sm text-gray-900">Strong communication</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700">✓</Badge>
              <span className="text-sm text-gray-900">Scripting comfort</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What You'll Discover */}
      <Card className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 mb-8">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-900">What You'll Discover</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-blue-900 mb-4">Assessment Modules:</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Badge className="bg-blue-100 text-blue-700">1</Badge>
                  <span className="text-sm text-gray-900">Psychological Fit Evaluation</span>
                </div>
                <div className="flex items-start gap-3">
                  <Badge className="bg-green-100 text-green-700">2</Badge>
                  <span className="text-sm text-gray-900">Technical Aptitude Testing</span>
                </div>
                <div className="flex items-start gap-3">
                  <Badge className="bg-orange-100 text-orange-700">3</Badge>
                  <span className="text-sm text-gray-900">WISCAR Framework Analysis</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-blue-900 mb-4">Your Results Include:</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-900">Personalized fit score (0-100)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-900">Detailed trait analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-900">Technical readiness assessment</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-900">Career pathway recommendations</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-900">Learning resources and next steps</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}