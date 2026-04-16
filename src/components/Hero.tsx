import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/design/1920/1080')] bg-cover bg-center opacity-10 mix-blend-overlay grayscale" />
        <div className="absolute inset-0 bg-background/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-block">
            <div className="w-10 h-[2px] bg-accent mb-6 mx-auto"></div>
            <span className="inline-flex items-center text-accent text-[10px] font-bold tracking-[2px] uppercase mb-6">
              Impact Graphics and Son Sarl
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-[4.5rem] font-heading font-bold tracking-[-2px] leading-[0.9] uppercase">
            Where Vision Meets <br className="hidden md:block" />
            <span className="text-foreground">
              Visual Brilliance
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-[0.9rem] leading-[1.6] text-muted-foreground font-normal">
            We are a premium creative agency dedicated to transforming your ideas into compelling visual narratives that command attention and drive results.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <a
              href="#booking"
              className="group flex items-center justify-center gap-2 bg-accent text-accent-foreground font-bold px-8 py-4 rounded-none uppercase text-[12px] tracking-[1px] hover:bg-accent/90 transition-all w-full sm:w-auto"
            >
              Book a Service
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#portfolio"
              className="flex items-center justify-center gap-2 bg-transparent border border-border text-foreground font-bold px-8 py-4 rounded-none uppercase text-[12px] tracking-[1px] hover:bg-muted transition-all w-full sm:w-auto"
            >
              View Our Work
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
