
import React from 'react';
import { Brain, Code, Cloud, Smartphone, Shield, BarChart3, Palette, Briefcase, Award } from 'lucide-react';
import AssessmentCard from '@/components/AssessmentCard';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Assessments = () => {
  const assessmentCategories = [
    {
      title: "Cloud & Infrastructure",
      icon: Cloud,
      color: "bg-purple-100 text-purple-700",
      assessments: [
        {
          id: "aws",
          title: "AWS Assessment",
        },
        {
          id: "google-cloud-platform",
          title: "Google Cloud Platform Assessment",
        },
        {
          id: "snowflake",
          title: "Snowflake Assessment",
        },
        {
          id: "oracle-cloud",
          title: "Oracle Cloud Assessment",
        },
        {
          id: "multi-cloud-engineer",
          title: "Multi Cloud Engineer Assessment",
        }
      ]
    },
    {
      title: "Technology & Programming",
      icon: Code,
      color: "bg-thinkera-blue/10 text-thinkera-blue border-thinkera-blue/20",
      assessments: [
        {
          id: "full-stack-python",
          title: "Full Stack Python Assessment",
        },
        {
          id: "full-stack-java",
          title: "Full Stack JAVA Assessment",
        },
        {
          id: "full-stack-dotnet",
          title: "Full Stack Dot Net Assessment",
        },
        {
          id: "mern-stack",
          title: "MERN Stack Assessment",
        },
        {
          id: "react-js",
          title: "React JS Assessment",
        },
        {
          id: "mean-stack",
          title: "Mean Stack Assessment",
        },
        {
          id: "flutter",
          title: "Flutter Assessment",
        }
      ]
    },
    {
      title: "Data Science & AI",
      icon: Brain,
      color: "bg-blue-100 text-blue-700",
      assessments: [
        {
          id: "data-science",
          title: "Data Science Assessment",
        },
        {
          id: "ai-ml",
          title: "AI/ML Assessment",
        },
        {
          id: "gen-ai",
          title: "Gen AI Assessment",
        },
        {
          id: "python-data-analytics",
          title: "Python with Data Analytics Assessment",
        },
        {
          id: "power-bi-tableau",
          title: "Power BI & Tableau Assessment",
        }
      ]
    },
    {
      title: "DevOps & Engineering",
      icon: Shield,
      color: "bg-green-100 text-green-700",
      assessments: [
        {
          id: "devops",
          title: "DevOps Assessment",
        },
        {
          id: "scrum-master",
          title: "Scrum Master Assessment",
        }
      ]
    },
    {
      title: "Security & Ethics",
      icon: Shield,
      color: "bg-red-100 text-red-700",
      assessments: [
        {
          id: "cyber-security",
          title: "Cyber Security Assessment",
        },
        {
          id: "ethical-hacking",
          title: "Ethical Hacking Assessment",
        }
      ]
    },
    {
      title: "Business & Analytics",
      icon: BarChart3,
      color: "bg-orange-100 text-orange-700",
      assessments: [
        {
          id: "business-analyst",
          title: "Business Analyst Assessment",
        },
        {
          id: "salesforce",
          title: "Salesforce Assessment",
        },
        {
          id: "microsoft-dynamics-365",
          title: "Microsoft Dynamics 365 Assessment",
        }
      ]
    },
    {
      title: "Blockchain & Emerging Tech",
      icon: Code,
      color: "bg-indigo-100 text-indigo-700",
      assessments: [
        {
          id: "blockchain",
          title: "Block Chain Assessment",
        }
      ]
    },
    {
      title: "Healthcare & Medical",
      icon: Award,
      color: "bg-pink-100 text-pink-700",
      assessments: [
        {
          id: "medical-coding",
          title: "Medical Coding Assessment",
        }
      ]
    },
    {
      title: "Marketing & Digital",
      icon: Palette,
      color: "bg-yellow-100 text-yellow-700",
      assessments: [
        {
          id: "digital-marketing",
          title: "Digital Marketing Assessment",
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-blue-100">
      <Header />
      
      {/* Hero Section */}
      <div className="pt-40 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-left mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Choose Your Assessment</h2>
            <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
              Explore our comprehensive range of career assessments, each designed with cutting-edge psychometric research 
              to provide you with accurate, actionable insights about your ideal career path.
            </p>
          </div>
        </div>
      </div>
      
      {/* Assessment Categories Section */}
      <div className="px-4 pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="space-y-16">
            {assessmentCategories.map((category, categoryIndex) => {
              const Icon = category.icon;
              // Create anchor ID from category title
              const anchorId = category.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
              return (
                <div key={categoryIndex} id={anchorId}>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-3 rounded-lg ${category.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
                  </div>
                  
                  {/* Two Column Layout for Assessments */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
                    {/* Left Column */}
                    <div className="space-y-3">
                      {category.assessments.slice(0, Math.ceil(category.assessments.length / 2)).map((assessment, index) => (
                        <AssessmentCard key={index} {...assessment} />
                      ))}
                    </div>
                    
                    {/* Right Column */}
                    <div className="space-y-3">
                      {category.assessments.slice(Math.ceil(category.assessments.length / 2)).map((assessment, index) => (
                        <AssessmentCard key={index + Math.ceil(category.assessments.length / 2)} {...assessment} />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="px-4 py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">How Our Assessments Work</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-thinkera-blue text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Choose Assessment</h3>
              <p className="text-muted-foreground text-sm">Select the career path you're interested in exploring</p>
            </div>
            
            <div className="text-center">
              <div className="bg-thinkera-blue text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Complete Evaluation</h3>
              <p className="text-muted-foreground text-sm">Answer questions about your skills, interests, and preferences</p>
            </div>
            
            <div className="text-center">
              <div className="bg-thinkera-blue text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Get Analysis</h3>
              <p className="text-muted-foreground text-sm">Receive detailed insights based on scientific assessment methods</p>
            </div>
            
            <div className="text-center">
              <div className="bg-thinkera-blue text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Plan Your Path</h3>
              <p className="text-muted-foreground text-sm">Use personalized recommendations to guide your career journey</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Assessments;
