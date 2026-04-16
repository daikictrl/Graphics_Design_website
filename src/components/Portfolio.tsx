import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const categories = ['All', 'Branding', 'Print', 'Digital', 'Photography'];

const portfolioItems = [
  { id: 1, title: 'Luxe Brand Identity', category: 'Branding', image: '/Branding1.jpg' },
  { id: 2, title: 'Urban Magazine', category: 'Print', image: '/Print1.jpg' },
  { id: 3, title: 'Digital Presence', category: 'Digital', image: '/Digital.jpg' },
  { id: 4, title: 'Product Campaign', category: 'Photography', image: '/Photography.jpg' },
  { id: 5, title: 'Corporate Brochure', category: 'Print', image: '/Print2.png' },
  { id: 6, title: 'Product Rebrand', category: 'Branding', image: '/Branding2.jpg' },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = activeCategory === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-accent font-semibold tracking-[2px] uppercase text-[10px] mb-3">Selected Works</h2>
            <h3 className="text-4xl md:text-5xl font-heading font-bold leading-[0.9] tracking-[-1px] uppercase">Our Creative Portfolio</h3>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2"
          >
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-none text-[11px] uppercase tracking-[1px] font-bold transition-all border ${
                  activeCategory === category 
                    ? 'bg-accent text-accent-foreground border-accent' 
                    : 'bg-transparent text-muted-foreground border-border hover:text-primary-foreground hover:border-accent'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Portfolio Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map(item => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-none overflow-hidden aspect-[4/5] bg-muted cursor-pointer border border-border"
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                  <span className="text-accent text-[10px] uppercase tracking-[2px] font-bold mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{item.category}</span>
                  <h4 className="text-xl font-heading font-bold text-foreground uppercase tracking-[-0.5px] translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{item.title}</h4>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
