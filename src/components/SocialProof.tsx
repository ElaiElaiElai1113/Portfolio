import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollReveal } from './animations/ScrollReveal';
import { Quote, Star } from 'lucide-react';

interface Company {
  name: string;
  logo?: string;
  url?: string;
  period?: string;
}

interface Recommendation {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating?: number;
  avatar?: string;
  linkedInUrl?: string;
}

interface SocialProofProps {
  companies?: Company[];
  recommendations?: Recommendation[];
}

const defaultCompanies: Company[] = [
  { name: 'TechCorp', period: '2022 - Present' },
  { name: 'Innovate Labs', period: '2020 - 2022' },
  { name: 'StartupXYZ', period: '2018 - 2020' },
];

const defaultRecommendations: Recommendation[] = [
  {
    id: '1',
    name: 'Jane Smith',
    role: 'Senior Engineering Manager',
    company: 'TechCorp',
    content: 'One of the most talented developers I have worked with. Consistently delivers high-quality code and brings innovative solutions to complex problems.',
    rating: 5,
  },
  {
    id: '2',
    name: 'John Doe',
    role: 'CTO',
    company: 'Innovate Labs',
    content: 'Exceptional technical skills combined with great communication. A true professional who excels in both frontend and backend development.',
    rating: 5,
  },
];

export function SocialProof({ companies = defaultCompanies, recommendations = defaultRecommendations }: SocialProofProps) {
  return (
    <div className="space-y-16">
      {/* Companies Section */}
      <ScrollReveal>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Trusted by Industry Leaders</h2>
          <p className="text-muted-foreground">Companies I've had the privilege to work with</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {companies.map((company, index) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center"
            >
              <Card className="w-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  {company.logo ? (
                    <img src={company.logo} alt={company.name} className="h-12 mx-auto" />
                  ) : (
                    <div className="h-12 flex items-center justify-center text-xl font-bold text-primary/70">
                      {company.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  {company.period && (
                    <p className="text-xs text-muted-foreground mt-2">{company.period}</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </ScrollReveal>

      {/* Recommendations Section */}
      <ScrollReveal delay={0.2}>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">What People Say</h2>
          <p className="text-muted-foreground">Recommendations from colleagues and managers</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {recommendations.map((rec, index) => (
            <ScrollReveal key={rec.id} delay={index * 0.1}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Quote className="h-8 w-8 text-primary/30 mb-4" />
                  <p className="text-muted-foreground mb-6 italic">"{rec.content}"</p>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold">{rec.name}</p>
                      <p className="text-sm text-muted-foreground">{rec.role}</p>
                      <p className="text-sm text-primary">{rec.company}</p>
                    </div>
                    {rec.rating && (
                      <div className="flex gap-0.5">
                        {Array.from({ length: rec.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}

// Compact version for homepage
interface CompactSocialProofProps {
  companies?: Company[];
}

export function CompactSocialProof({ companies = defaultCompanies }: CompactSocialProofProps) {
  return (
    <div className="py-12 border-y bg-muted/30">
      <p className="text-center text-sm text-muted-foreground mb-6">
        Trusted by innovative companies
      </p>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
        {companies.map((company, index) => (
          <motion.div
            key={company.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-xl font-bold text-muted-foreground/50 hover:text-foreground transition-colors cursor-default"
          >
            {company.name}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
