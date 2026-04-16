import { motion, useInView } from 'motion/react';
import { Award, Users, Zap, Target } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

function CountUp({ end, suffix = '' }: { end: number, suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function About() {
  const stats = [
    { icon: <Award size={24} />, value: 10, suffix: '+', label: 'Years Experience' },
    { icon: <Users size={24} />, value: 500, suffix: '+', label: 'Happy Clients' },
    { icon: <Zap size={24} />, value: 1000, suffix: '+', label: 'Projects Delivered' },
    { icon: <Target size={24} />, value: 100, suffix: '%', label: 'Client Satisfaction' },
  ];

  return (
    <section id="about" className="py-24 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square rounded-none overflow-hidden relative border border-border">
              <img 
                src="/about-image.jpg" 
                alt="Creative Agency Workspace" 
                className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-background/80 to-transparent" />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-8 -right-8 bg-muted p-8 rounded-none border border-border shadow-2xl hidden md:block">
              <div className="text-accent font-heading text-5xl font-bold mb-2">Est.</div>
              <div className="text-foreground font-medium text-lg tracking-widest uppercase">2014</div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-accent font-semibold tracking-[2px] uppercase text-[10px] mb-3">About Us</h2>
              <h3 className="text-4xl md:text-5xl font-heading font-bold leading-[0.9] tracking-[-1px] uppercase">
                Crafting Digital <br /> Excellence Since Day One
              </h3>
            </div>
            
            <p className="text-muted-foreground text-[0.9rem] leading-[1.6] font-normal">
              At Impact Graphics and Son Sarl, we don't just design; we engineer visual experiences. 
              Our team of visionary creatives and strategic thinkers collaborate to elevate brands 
              beyond the ordinary. We blend artistic intuition with market intelligence to deliver 
              designs that not only look spectacular but drive tangible business growth.
            </p>

            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-border">
              {stats.map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className="text-accent">{stat.icon}</div>
                  <div className="text-3xl font-heading font-bold">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-[1px]">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
