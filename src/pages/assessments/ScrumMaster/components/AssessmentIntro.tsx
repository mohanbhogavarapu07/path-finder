
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, Users, TrendingUp, CheckCircle, ArrowRight, Lightbulb, Heart, Cog } from "lucide-react";

interface AssessmentIntroProps {
  onNext: () => void;
  onPrev?: () => void;
  onUpdateData?: (section: string, data: any) => void;
  assessmentData?: any;
  currentStep?: number;
  totalSteps?: number;
}

const AssessmentIntro: React.FC<AssessmentIntroProps> = ({ onNext }) => {
  const roles = [
    "Scrum Master",
    "Agile Coach", 
    "Project Manager (Agile)",
    "Delivery Lead",
    "Product Owner Associate"
  ];

  const traits = [
    { icon: Users, text: "Facilitation & conflict resolution" },
    { icon: Heart, text: "Empathy and active listening" },
    { icon: Cog, text: "Structured mindset with flexibility" },
    { icon: TrendingUp, text: "Communication and stakeholder management" },
    { icon: Lightbulb, text: "Resilience and continuous improvement" }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
              <Card className="border-2 border-blue-200 bg-blue-50">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
            Discover Your Scrum Master Career Potential
          </CardTitle>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take our comprehensive assessment to evaluate your psychological fit, technical readiness, 
            and career alignment for a future in Scrum Mastery and Agile leadership.
          </p>
        </CardHeader>
        <CardContent className="text-center">
          <div className="flex justify-center items-center space-x-6 mb-6">
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
            onClick={onNext} 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
          >
            Start Assessment
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </CardContent>
      </Card>

      {/* What Does a Scrum Master Do */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-6 h-6 text-green-600" />
            <span>What Does a Scrum Master Do?</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            Facilitates Agile Scrum teams, enabling efficient collaboration, removal of impediments, coaching in Scrum values, and ensuring smooth delivery cycles.
          </p>
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Typical Roles</h4>
            <div className="flex flex-wrap gap-2">
              {roles.map((role, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {role}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ideal Traits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="w-6 h-6 text-orange-600" />
            <span>Traits That Drive Success</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-3">
            {traits.map((trait, index) => (
              <div key={index} className="flex items-center space-x-3">
                <trait.icon className="w-4 h-4 text-green-600" />
                <span className="text-gray-700">{trait.text}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Assessment Structure */}
      <Card className="border-2 border-gray-200">
        <CardHeader>
          <CardTitle>Assessment Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-purple-50 border border-purple-200">
              <div className="text-2xl mb-2">🧠</div>
              <h4 className="font-semibold text-purple-900">Psychometric</h4>
              <p className="text-sm text-purple-700">Personality traits & mindset alignment</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-green-50 border border-green-200">
              <div className="text-2xl mb-2">⚙️</div>
              <h4 className="font-semibold text-green-900">Technical</h4>
              <p className="text-sm text-green-700">Process understanding & aptitude</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-orange-50 border border-orange-200">
              <div className="text-2xl mb-2">📊</div>
              <h4 className="font-semibold text-orange-900">WISCAR</h4>
              <p className="text-sm text-orange-700">Comprehensive readiness framework</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentIntro;
