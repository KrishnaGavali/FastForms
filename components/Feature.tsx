import {
  BatteryCharging,
  GitPullRequest,
  Layers,
  RadioTower,
  SquareKanban,
  WandSparkles,
  Bot,
  Zap,
  Settings,
  Sparkles,
  CheckCircle2,
  Rocket,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Feature {
  heading: string;
  description: string;
  icon: React.ReactNode;
}

interface FeatureProps {
  label?: string;
  title?: string;
  features?: Feature[];
}

const Feature = ({
  label = "Why FastForms",
  title = "Build Better Forms, Faster",
  features = [
    {
      heading: "AI-Powered",
      description:
        "Leverage cutting-edge AI to understand your form requirements naturally and create them instantly.",
      icon: <Bot className="size-4 md:size-6" />,
    },
    {
      heading: "Lightning Fast",
      description:
        "Generate fully functional Google Forms in seconds. No more manual setup or tedious configuration.",
      icon: <Zap className="size-4 md:size-6" />,
    },
    {
      heading: "Easy Customization",
      description:
        "Modify and edit your forms through natural conversation. Change questions, add logic, update styling effortlessly.",
      icon: <Settings className="size-4 md:size-6" />,
    },
    {
      heading: "Seamless Integration",
      description:
        "Works directly with Google Forms. Your forms are stored in your Google Drive and fully compatible.",
      icon: <CheckCircle2 className="size-4 md:size-6" />,
    },
  ],
}: FeatureProps) => {
  return (
    <section className="py-32">
      <div className="container mx-auto">
        {(label || title) && (
          <div className="mb-12 flex max-w-3xl flex-col gap-4">
            <Badge variant="secondary">{label}</Badge>
            <h2 className="text-3xl font-medium md:text-4xl lg:text-5xl">
              {title}
            </h2>
          </div>
        )}
        <div className="grid gap-12 md:grid-cols-2">
          {features.map((feature, idx) => (
            <div className="flex gap-6 space-y-4 rounded-lg md:block" key={idx}>
              <span className="bg-accent flex size-10 shrink-0 items-center justify-center rounded-full md:size-12">
                {feature.icon}
              </span>
              <div>
                <h3 className="font-medium md:mb-2 md:text-xl">
                  {feature.heading}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature };
