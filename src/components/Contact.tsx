import { motion } from 'motion/react';
import { Phone, Mail, MapPin, MessageCircle, Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-primary relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-accent font-semibold tracking-[2px] uppercase text-[10px] mb-3">Get In Touch</h2>
            <h3 className="text-4xl md:text-5xl font-heading font-bold mb-6 leading-[0.9] tracking-[-1px] uppercase">We're Here to Help</h3>
            <p className="text-muted-foreground text-[0.9rem] leading-[1.6] font-normal">
              Have a question or want to discuss a potential project? Reach out to us through any of the channels below.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-muted p-8 rounded-none border border-border text-center hover:border-accent transition-colors"
          >
            <div className="w-12 h-12 border border-accent flex items-center justify-center mx-auto mb-6 text-accent">
              <Phone size={20} />
            </div>
            <h4 className="text-[0.85rem] uppercase tracking-[1px] font-heading font-bold mb-2">Call Us</h4>
            <p className="text-muted-foreground text-[11px]">+237 600 000 000</p>
            <p className="text-muted-foreground text-[11px]">+237 611 111 111</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-muted p-8 rounded-none border border-border text-center hover:border-accent transition-colors"
          >
            <div className="w-12 h-12 border border-accent flex items-center justify-center mx-auto mb-6 text-accent">
              <Mail size={20} />
            </div>
            <h4 className="text-[0.85rem] uppercase tracking-[1px] font-heading font-bold mb-2">Email Us</h4>
            <p className="text-muted-foreground text-[11px]">hello@impactgraphics.com</p>
            <p className="text-muted-foreground text-[11px]">support@impactgraphics.com</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-muted p-8 rounded-none border border-border text-center hover:border-accent transition-colors"
          >
            <div className="w-12 h-12 border border-accent flex items-center justify-center mx-auto mb-6 text-accent">
              <MapPin size={20} />
            </div>
            <h4 className="text-[0.85rem] uppercase tracking-[1px] font-heading font-bold mb-2">Visit Us</h4>
            <p className="text-muted-foreground">123 Creative Avenue</p>
            <p className="text-muted-foreground">Douala, Cameroon</p>
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-muted rounded-none border border-border">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h4 className="text-[1.2rem] font-heading font-bold mb-2 uppercase tracking-[-0.5px]">Need an immediate response?</h4>
            <p className="text-muted-foreground text-[11px] uppercase tracking-[1px]">Our WhatsApp support team is online 24/7.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="https://wa.me/237600000000" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-none font-bold uppercase text-[12px] tracking-[1px] hover:bg-accent/90 transition-colors"
            >
              <MessageCircle size={20} />
              Chat on WhatsApp
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
