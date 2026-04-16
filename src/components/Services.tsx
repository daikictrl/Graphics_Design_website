import { motion } from 'motion/react';
import { 
  Palette, 
  Printer, 
  Video, 
  Camera, 
  Megaphone, 
  Briefcase, 
  PenTool, 
  Lightbulb 
} from 'lucide-react';

export const servicesData = [
  {
    id: 'branding',
    title: 'Branding & Identity',
    icon: <Palette size={32} />,
    items: ['Logo Design', 'Business Cards', 'Letter Heads', 'Branding Guidelines']
  },
  {
    id: 'print',
    title: 'Print Design',
    icon: <Printer size={32} />,
    items: ['Flyers', 'Banners', 'Roll-ups', 'Magazines & Book Layouts']
  },
  {
    id: 'multimedia',
    title: 'Multimedia & Motion',
    icon: <Video size={32} />,
    items: ['Video Editing', 'Motion Graphics', '2D/3D Animations', 'Visual Effects', 'GIF Creation']
  },
  {
    id: 'photography',
    title: 'Photography & Editing',
    icon: <Camera size={32} />,
    items: ['Product Photography', 'Event Photography', 'Photo Retouching', 'Image Manipulation']
  },
  {
    id: 'advertising',
    title: 'Advertising & Marketing',
    icon: <Megaphone size={32} />,
    items: ['Ad Campaigns', 'Billboards', 'Social Media Campaigns', 'Promotional Materials']
  },
  {
    id: 'corporate',
    title: 'Corporate & Business',
    icon: <Briefcase size={32} />,
    items: ['Company Profiles', 'Annual Reports', 'Presentation Slides', 'Proposal Documents']
  },
  {
    id: 'custom',
    title: 'Custom & Specialized',
    icon: <PenTool size={32} />,
    items: ['T-shirt Designs', 'Vehicle Branding', 'Signage Design', 'Event Design']
  },
  {
    id: 'consulting',
    title: 'Consulting & Direction',
    icon: <Lightbulb size={32} />,
    items: ['Brand Strategy', 'Creative Direction', 'Design Consulting', 'Rebranding Services']
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-muted relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-accent font-semibold tracking-[2px] uppercase text-[10px] mb-3">Capabilities / 2024</h2>
            <h3 className="text-4xl md:text-5xl font-heading font-bold mb-6 leading-[0.9] tracking-[-1px] uppercase">Comprehensive Design Solutions</h3>
            <p className="text-muted-foreground text-[0.9rem] leading-[1.6] font-normal">
              We offer a full spectrum of creative services designed to elevate your brand across every touchpoint.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-muted border border-border p-6 rounded-none hover:border-accent transition-all duration-300 relative overflow-hidden"
            >
              <div className="text-accent mb-4 relative z-10 w-[30px] h-[30px] flex items-center justify-center border border-accent">
                <div className="scale-75">{service.icon}</div>
              </div>
              
              <h4 className="text-[0.85rem] font-heading font-bold mb-2 relative z-10 uppercase">{service.title}</h4>
              
              <ul className="space-y-1 relative z-10">
                {service.items.map((item, i) => (
                  <li key={i} className="text-muted-foreground text-[11px] leading-[1.4] flex items-start opacity-70">
                    <span className="text-accent mr-2 mt-[2px] text-[8px]">■</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
