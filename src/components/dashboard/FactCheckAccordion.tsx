
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

interface FactCheckAccordionProps {
  isOpen: boolean;
  podcast: {
    id: number;
    title: string;
  };
}

const FactCheckAccordion: React.FC<FactCheckAccordionProps> = ({ isOpen, podcast }) => {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  const toggleSection = (section: string) => {
    const newOpenSections = new Set(openSections);
    if (newOpenSections.has(section)) {
      newOpenSections.delete(section);
    } else {
      newOpenSections.add(section);
    }
    setOpenSections(newOpenSections);
  };

  const factCheckData = {
    'factual-verification': {
      title: 'Factual Verification',
      content: 'Claims made about AI technology adoption rates have been cross-referenced with industry reports. 3 out of 5 statistics mentioned are accurate according to recent studies.',
    },
    'motivation-analysis': {
      title: 'Motivation & Benefit Analysis',
      content: 'The discussion appears to be educational in nature, with the host presenting balanced viewpoints on emerging technologies. No apparent commercial bias detected.',
    },
    'intent-framing': {
      title: 'Intent & Framing',
      content: 'Content is framed as informational and exploratory. The conversation maintains objectivity while discussing both opportunities and challenges.',
    },
    'sentiment-tone': {
      title: 'Sentiment & Tone',
      content: 'Overall tone is optimistic yet cautious. Sentiment analysis shows 70% positive, 20% neutral, 10% cautionary language patterns.',
    },
    'final-verdict': {
      title: 'Final Verdict',
      content: 'Taking the data into consideration, I conclude that: This episode presents a well-balanced discussion of emerging technologies with mostly accurate information and professional presentation.',
    },
    'evidence-sources': {
      title: '🔗 Evidence Sources',
      content: '',
      sources: [
        'https://techreport.ai/adoption-metrics-2024',
        'https://industry.gov/tech-trends-analysis',
        'https://research.mit.edu/ai-impact-study'
      ]
    }
  };

  if (!isOpen) return null;

  return (
    <div className="mt-4 bg-black/80 backdrop-blur-sm border border-teal-400/30 rounded-2xl overflow-hidden shadow-2xl shadow-teal-400/10 animate-slide-down">
      <div className="p-4 border-b border-teal-400/30 bg-gradient-to-r from-gray-900 to-gray-800">
        <h3 className="text-teal-300 font-bold text-lg">Echo3AI Fact Check Analysis</h3>
        <p className="text-gray-400 text-sm mt-1">{podcast.title}</p>
      </div>

      <div className="divide-y divide-gray-700/50">
        {Object.entries(factCheckData).map(([key, section]) => (
          <div key={key} className="transition-all duration-200">
            <button
              onClick={() => toggleSection(key)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-teal-400/5 transition-colors duration-200 group"
            >
              <span className="text-white font-medium group-hover:text-teal-300 transition-colors duration-200">
                {section.title}
              </span>
              {openSections.has(key) ? (
                <ChevronUp className="w-5 h-5 text-teal-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-teal-400 transition-colors duration-200" />
              )}
            </button>
            
            {openSections.has(key) && (
              <div className="px-4 pb-4 pt-2 bg-gray-900/30 animate-accordion-down">
                <div className="border-l-2 border-teal-400/30 pl-4">
                  {section.content && (
                    <p className="text-gray-300 text-sm leading-relaxed mb-3">
                      {section.content}
                    </p>
                  )}
                  
                  {section.sources && (
                    <div className="space-y-2">
                      {section.sources.map((source, index) => (
                        <a
                          key={index}
                          href={source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-teal-400 hover:text-teal-300 text-sm transition-colors duration-200 group"
                        >
                          <ExternalLink className="w-3 h-3 mr-2 group-hover:scale-110 transition-transform duration-200" />
                          <span className="truncate">{source}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FactCheckAccordion;
