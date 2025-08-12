
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Users, Target, CheckCircle } from "lucide-react";

interface IntroSectionProps {
  onNext: () => void;
}

export const IntroSection = ({ onNext }: IntroSectionProps) => {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="text-center mb-8">
        <Badge className="mb-4 bg-blue-100 text-blue-700">
          1️⃣ TEST INTRODUCTION
        </Badge>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to Your Python Career Assessment
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          This comprehensive assessment will help you explore if Full Stack Python development 
          is a good fit for your interests, personality, cognitive strengths, and long-term goals.
        </p>
      </div>

      {/* Assessment Overview */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Target className="w-6 h-6" />
              🔍 Purpose
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              To help you explore if Full Stack Python development is a good fit for your 
              interests, personality, cognitive strengths, and long-term goals.
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Clock className="w-6 h-6" />
              Duration & Format
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Time:</span>
                <span className="font-semibold">20-30 minutes</span>
              </div>
              <div className="flex justify-between">
                <span>Format:</span>
                <span className="font-semibold">Interactive & Adaptive</span>
              </div>
              <div className="flex justify-between">
                <span>Sections:</span>
                <span className="font-semibold">5 comprehensive areas</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ideal Candidates */}
      <Card className="border-2 border-purple-200 bg-purple-50 mb-6">
        <CardHeader>
          <CardTitle className="text-purple-800">✅ Ideal Candidates Often Have</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Passion for elegant problem-solving",
              "Comfort with minimal syntax & readable code",
              "Flexibility and comfort with rapid prototyping",
              "High curiosity and self-direction",
              "Interest in building end-to-end applications",
              "Enjoyment of both creative and logical challenges"
            ].map((trait, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{trait}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Assessment Sections Preview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-center">What You'll Complete</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
                1
              </div>
              <h3 className="font-semibold text-blue-800 mb-2">Psychometric</h3>
              <p className="text-sm text-gray-600">Personality, interests, and cognitive style assessment</p>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
                2
              </div>
              <h3 className="font-semibold text-green-800 mb-2">Technical</h3>
              <p className="text-sm text-gray-600">Programming aptitude and Python-specific knowledge</p>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
                3
              </div>
              <h3 className="font-semibold text-purple-800 mb-2">WISCAR</h3>
              <p className="text-sm text-gray-600">Multi-dimensional readiness framework analysis</p>
            </div>
            
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
                4
              </div>
              <h3 className="font-semibold text-orange-800 mb-2">Results</h3>
              <p className="text-sm text-gray-600">Personalized recommendations and learning path</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Start Button */}
      <div className="text-center">
        <Button 
          onClick={onNext}
          size="lg" 
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-xl"
        >
          Begin Assessment
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        <p className="text-sm text-gray-600 mt-3">
          Ready to discover your Python potential? Let's get started!
        </p>
      </div>
    </div>
  );
};
