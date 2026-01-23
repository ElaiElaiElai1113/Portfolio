import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollReveal } from './animations/ScrollReveal';

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

interface SkillsVisualizationProps {
  skills: Skill[];
  className?: string;
}

const proficiencyColors = {
  Beginner: 'bg-blue-500',
  Intermediate: 'bg-yellow-500',
  Advanced: 'bg-green-500',
  Expert: 'bg-purple-500',
};

const proficiencyWidth = {
  Beginner: 25,
  Intermediate: 50,
  Advanced: 75,
  Expert: 100,
};

export function SkillsVisualization({ skills, className = '' }: SkillsVisualizationProps) {
  const skillsByCategory = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>
  );

  return (
    <div className={`space-y-8 ${className}`}>
      {Object.entries(skillsByCategory).map(([category, categorySkills], categoryIndex) => (
        <ScrollReveal key={category} delay={categoryIndex * 0.1}>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-6">{category}</h3>
              <div className="space-y-4">
                {categorySkills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: skillIndex * 0.05 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.proficiency}</span>
                    </div>
                    <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${proficiencyWidth[skill.proficiency]}%` }}
                        transition={{ duration: 0.8, delay: skillIndex * 0.05 }}
                        className={`h-full ${proficiencyColors[skill.proficiency]} rounded-full`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
      ))}
    </div>
  );
}

interface CircularSkillProps {
  skill: Skill;
  size?: number;
  strokeWidth?: number;
}

export function CircularSkill({ skill, size = 120, strokeWidth = 8 }: CircularSkillProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = proficiencyWidth[skill.proficiency] / 100;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center"
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="hsl(var(--muted))"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={skill.proficiency === 'Expert' ? '#A855F7' : skill.proficiency === 'Advanced' ? '#22C55E' : skill.proficiency === 'Intermediate' ? '#EAB308' : '#3B82F6'}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold">{proficiencyWidth[skill.proficiency]}%</div>
            <div className="text-xs text-muted-foreground">{skill.proficiency}</div>
          </div>
        </div>
      </div>
      <div className="mt-3 text-sm font-medium text-center">{skill.name}</div>
    </motion.div>
  );
}
