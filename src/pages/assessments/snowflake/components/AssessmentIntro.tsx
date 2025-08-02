import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Target, TrendingUp, Snowflake, Cloud, Database, BarChart3, Cog, Users } from "lucide-react";

interface AssessmentIntroProps {
  onStartAssessment: () => void;
}

export const AssessmentIntro = ({ onStartAssessment }: AssessmentIntroProps) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
              <Card className="border-2 border-blue-200 bg-blue-50">
        <CardContent className="text-center">
          <div className="flex justify-center mb-4">
            <Snowflake className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Discover Your Snowflake Career Potential
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Take our comprehensive assessment to evaluate your psychological fit,
            technical readiness, and career alignment for a future in Snowflake
            development and administration.
          </p>
          <div className="flex justify-center items-center space-x-6 mb-6">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>25-30 minutes</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Target className="w-4 h-4" />
              <span>Personalized Results</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <TrendingUp className="w-4 h-4" />
              <span>Career Guidance</span>
            </div>
          </div>
          <Button 
            onClick={onStartAssessment} 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
          >
            Start Assessment
          </Button>
        </CardContent>
      </Card>

      {/* What is Snowflake Section */}
      <Card>
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <Snowflake className="h-8 w-8 text-blue-600" />
            <h2 className="text-2xl font-bold">What is Snowflake?</h2>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Snowflake is a powerful <strong>cloud-native data platform</strong> that specializes in 
            <strong>data warehousing, engineering, and analytics</strong>. It enables scalable SQL-based data pipelines,
            real-time querying, and secure data sharing across organizations.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Cloud Platform</h4>
              <p className="text-sm text-blue-700">Scalable, secure, and accessible from anywhere</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Data Engineering</h4>
              <p className="text-sm text-green-700">Build robust data pipelines and transformations</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">Enterprise Scale</h4>
              <p className="text-sm text-purple-700">Used by Fortune 500 companies worldwide</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Career Opportunities */}
      <Card>
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <Users className="h-8 w-8 text-green-600" />
            <h2 className="text-2xl font-bold">Career Opportunities</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Snowflake Data Engineer",
                description: "Build workflows and automation",
                icon: Database
              },
              {
                title: "Cloud Data Architect", 
                description: "Design cloud-native data platforms",
                icon: Cloud
              },
              {
                title: "ETL/ELT Developer",
                description: "Create transformation logic in SQL",
                icon: Cog
              },
              {
                title: "BI Engineer/Analyst",
                description: "Create dashboards from Snowflake",
                icon: BarChart3
              },
              {
                title: "DataOps Engineer",
                description: "Manage Snowflake + automation",
                icon: TrendingUp
              },
              {
                title: "Data Platform Engineer",
                description: "Advanced system design & optimization",
                icon: Target
              }
            ].map((role, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <role.icon className="h-8 w-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">{role.title}</h3>
                <p className="text-sm text-gray-600">{role.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ideal Traits */}
      <Card>
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-6">Ideal Traits & Skills</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              "Strong analytical thinking",
              "Process-oriented mindset", 
              "Logical problem-solving",
              "Interest in data platforms",
              "Comfort with SQL/scripting",
              "Attention to detail"
            ].map((trait, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-700">{trait}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Assessment Overview */}
      <Card className="border-2 border-gray-200">
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Assessment Modules:</h4>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <span className="bg-purple-50 text-purple-700 rounded-full px-2 py-1 text-xs font-semibold">1</span>
                  <span className="text-sm">Psychological Fit Evaluation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="bg-green-50 text-green-700 rounded-full px-2 py-1 text-xs font-semibold">2</span>
                  <span className="text-sm">Technical Aptitude Testing</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="bg-orange-50 text-orange-700 rounded-full px-2 py-1 text-xs font-semibold">3</span>
                  <span className="text-sm">WISCAR Framework Analysis</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Your Results Include:</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Personalized fit score (0-100)</li>
                <li>• Detailed trait analysis</li>
                <li>• Technical readiness assessment</li>
                <li>• Career pathway recommendations</li>
                <li>• Next steps and learning resources</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};