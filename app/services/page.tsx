import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import MyStack from "@/components/myskills/MyStack";
import { AppearOnScroll } from "@/components/ScrollEffects/ScrollEffect";
import { MetaServices } from "@/lib/metaData";
import { processSteps, services } from "@/lib/servicesData";
import GridBackground from "@/components/ui/GridBackground";

// Page-level SEO for /services
export const metadata: Metadata = MetaServices;

/** Services route: expertise section, service cards, process steps, and CTA; data from lib/servicesData.ts */
const ServicesPage = () => {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Grid Background - Subtle variant */}
      <GridBackground variant="subtle" withFade={true} />
      <div className="container mx-auto px-4">
        <MyStack />
        <AppearOnScroll>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6 title3">
              My Areas of Expertise
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto title1">
              Comprehensive digital solutions delivered with **precision,
              architecture, and reliability**.
            </p>
          </div>
        </AppearOnScroll>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <Card
              key={index}
              className="bg-gradient-card border-border-light hover:border-primary/50 transition-smooth shadow-card hover:shadow-glow group h-full"
            >
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-primary">
                  <service.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl text-text-primary mb-2 title3">
                  {service.title}
                </CardTitle>
                <p className="text-text-secondary title2">
                  {service.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6 title1">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-text-secondary text-sm">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-4">
                  <p className="text-primary font-semibold mb-4 title1">
                    {service.price}
                  </p>
                  <Button
                    variant="outline"
                    className="w-full group/btn border-border-light hover:border-primary hover:bg-primary/10"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-20">
          <AppearOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 title3">
                My Structured Workflow
              </h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto title1">
                A robust four-step approach, designed to guarantee the success
                of the project.
              </p>
            </div>
          </AppearOnScroll>
          <AppearOnScroll>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((process, index) => (
                <Card
                  key={index}
                  className="bg-gradient-card border-border-light shadow-card text-center group"
                >
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-primary">
                      <span className="text-primary-foreground font-bold text-lg">
                        {process.step}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-text-primary mb-3">
                      {process.title}
                    </h3>
                    <p className="text-text-secondary">{process.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </AppearOnScroll>
        </div>

        <div className="text-center bg-gradient-card rounded-2xl p-12 border border-border-light shadow-card">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Ready to Design Your Next Project?
          </h2>
          <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss your system requirements and craft the solution
            that will bring your ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-primary hover:opacity-90 border-0 shadow-primary hover:shadow-glow transition-smooth"
            >
              <a href="/contact">Start a Project</a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-border-light hover:border-primary hover:bg-primary/10"
            >
              <a
                href="https://wa.me/123456789"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;
