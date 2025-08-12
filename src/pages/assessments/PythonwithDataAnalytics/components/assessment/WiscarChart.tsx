import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface WiscarData {
  W: number; // Will
  I: number; // Interest
  S: number; // Skill
  C: number; // Cognitive Readiness
  A: number; // Ability to Learn
  R: number; // Real-World Fit
}

interface WiscarChartProps {
  data: WiscarData;
  overallScore: number;
}

const WiscarChart = ({ data, overallScore }: WiscarChartProps) => {
  const chartData = [
    { subject: 'Will', score: data.W, fullMark: 100 },
    { subject: 'Interest', score: data.I, fullMark: 100 },
    { subject: 'Skill', score: data.S, fullMark: 100 },
    { subject: 'Cognitive', score: data.C, fullMark: 100 },
    { subject: 'Ability', score: data.A, fullMark: 100 },
    { subject: 'Real-World', score: data.R, fullMark: 100 },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#16a34a'; // success
    if (score >= 60) return '#eab308'; // warning  
    return '#dc2626'; // destructive
  };

  const dimensions = [
    { key: 'W', label: 'Will (Persistence)', description: 'Your determination to overcome challenges in data analytics' },
    { key: 'I', label: 'Interest (Passion)', description: 'Your genuine curiosity about data and analytics' },
    { key: 'S', label: 'Skill (Current)', description: 'Your existing technical capabilities in programming and analytics' },
    { key: 'C', label: 'Cognitive Readiness', description: 'Your analytical thinking and logical reasoning abilities' },
    { key: 'A', label: 'Ability to Learn', description: 'Your openness to feedback and learning new concepts' },
    { key: 'R', label: 'Real-World Fit', description: 'How well you align with actual data analyst job requirements' }
  ];

  return (
    <div className="space-y-6">
      {/* Chart */}
      <div className="bg-gradient-card rounded-lg p-6 shadow-card">
        <h3 className="text-xl font-bold text-center mb-6">WISCAR Framework Analysis</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={chartData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }}
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]} 
                tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
              />
              <Radar
                name="Score"
                dataKey="score"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Overall Score */}
        <div className="text-center mt-6">
          <div className="inline-flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-full">
            <span className="text-sm font-medium">Overall Confidence Score:</span>
            <span 
              className="text-lg font-bold"
              style={{ color: getScoreColor(overallScore) }}
            >
              {overallScore}/100
            </span>
          </div>
        </div>
      </div>

      {/* Dimension Breakdown */}
      <div className="grid md:grid-cols-2 gap-4">
        {dimensions.map((dimension) => {
          const score = data[dimension.key as keyof WiscarData];
          return (
            <div key={dimension.key} className="bg-white rounded-lg p-4 border shadow-soft">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-sm">{dimension.label}</h4>
                <span 
                  className="font-bold text-sm px-2 py-1 rounded"
                  style={{ 
                    color: getScoreColor(score),
                    backgroundColor: `${getScoreColor(score)}20`
                  }}
                >
                  {score}/100
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{dimension.description}</p>
              <div className="mt-2 bg-muted rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${score}%`,
                    backgroundColor: getScoreColor(score)
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WiscarChart;