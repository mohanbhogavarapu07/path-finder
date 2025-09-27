import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Calendar, 
  Plus, 
  TrendingUp, 
  Shield, 
  Database, 
  AlertTriangle,
  Navigation,
  Eye,
  Search,
  Star,
  Lightbulb,
  Users,
  BarChart3,
  Code,
  Brain,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const ReleaseNotes = () => {
  const [expandedCards, setExpandedCards] = useState<{ [key: string]: boolean }>({});

  const toggleCard = (cardId: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const getYesterdayDate = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split('T')[0];
  };

  const getCurrentDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-heading">
                Release Notes
              </h1>
            </div>
            <p className="text-lg text-foreground-soft max-w-3xl mx-auto">
              Stay up to date with the latest features, improvements, and bug fixes. We're constantly working to make your assessment experience better.
            </p>
          </div>

      {/* Release Notes Content */}
      <div className="space-y-6">
        {/* Version 2.0.0 - Major */}
        <Card className="border-2 border-gray-200 shadow-lg">
          <CardHeader 
            className="bg-gradient-to-r from-blue-50 to-indigo-50 cursor-pointer hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100 transition-colors"
            onClick={() => toggleCard('version-2-0')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CardTitle className="text-2xl font-bold text-gray-900">Version 1.5</CardTitle>
                <Badge className="bg-green-500 text-white">Major</Badge>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>2025-09-27</span>
                </div>
                {expandedCards['version-2-0'] ? (
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
              </div>
            </div>
          </CardHeader>
          {expandedCards['version-2-0'] && (
            <CardContent className="p-6 space-y-4">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Complete Platform Redesign</h3>
                <p className="text-gray-600">Major overhaul of the entire platform with modern design and improved functionality.</p>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <Plus className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">New Design System</h4>
                  <p className="text-sm text-gray-700">Implemented modern design system with improved accessibility and user experience.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <Plus className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Assessment Categories</h4>
                  <p className="text-sm text-gray-700">Organized assessments into clear categories for better navigation.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <TrendingUp className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Performance Optimization</h4>
                  <p className="text-sm text-gray-700">Significantly improved page load times and overall platform performance.</p>
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Version 1.1 - Major */}
        <Card className="border-2 border-gray-200 shadow-lg">
          <CardHeader 
            className="bg-gradient-to-r from-blue-50 to-indigo-50 cursor-pointer hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100 transition-colors"
            onClick={() => toggleCard('version-1-1')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CardTitle className="text-2xl font-bold text-gray-900">Version   1.0</CardTitle>
                <Badge className="bg-green-500 text-white">Major</Badge>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>2025-08-15</span>
                </div>
                {expandedCards['version-1-0'] ? (
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
              </div>
            </div>
          </CardHeader>
          {expandedCards['version-1-1'] && (
            <CardContent className="p-6 space-y-4">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Enhanced Assessment Experience</h3>
                <p className="text-gray-600">Major improvements to assessment interface and new categories.</p>
              </div>
              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <Plus className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">4 Assessment Categories</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <span>Cognitive & Learning Intelligence</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <span>Emerging Technologies</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <span>Engineering & Manufacturing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <span>Personal and emotional intelligence</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <Plus className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Navigation Updates</h4>
                  <p className="text-gray-700">Improved navigation structure for better user flow.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <Plus className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Accessibility Improvements</h4>
                  <p className="text-gray-700">Enhanced accessibility features for users with disabilities.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <Plus className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Security Enhancements</h4>
                  <p className="text-gray-700">Implemented additional security measures to protect user data.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <Plus className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Error Handling</h4>
                  <p className="text-gray-700">Improved error handling and user feedback mechanisms.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <Plus className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Database Optimization</h4>
                  <p className="text-gray-700">Optimized database queries for better performance.</p>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </div>

          {/* Stay Updated Section */}
          <Card className="bg-blue-50 border-blue-200 mt-8">
            <CardContent className="p-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Stay Updated</h2>
              <p className="text-gray-600 mb-6">Follow our development progress and be the first to know about new features.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-gray-700">New features every month</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-700">Regular improvements</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full">
                  <AlertTriangle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">Quick bug fixes</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReleaseNotes;
