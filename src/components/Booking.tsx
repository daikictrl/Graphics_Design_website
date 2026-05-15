import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send } from 'lucide-react';
import { servicesData } from './Services';

export default function Booking() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    description: '',
    budget: '',
    deadline: ''
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'saving' | 'saved' | 'error' | 'opening'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('saving');

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          service: formData.service,
          description: formData.description,
          budget: formData.budget || undefined,
          deadline: formData.deadline || undefined,
        }),
      });

      if (!res.ok) {
        console.error('Failed to save booking to server');
        setSubmitStatus('error');
      } else {
        setSubmitStatus('saved');
      }
    } catch (err) {
      console.error('Network error saving booking:', err);
      setSubmitStatus('error');
    }

    setSubmitStatus('opening');

    const message = `Hello, I would like to book a service.\n\nName: ${formData.name}\n\nPhone: ${formData.phone}\n\nEmail: ${formData.email}\n\nService: ${formData.service}\n\nProject Details: ${formData.description}\n\nBudget: ${formData.budget || 'Not specified'}\n\nDeadline: ${formData.deadline || 'Not specified'}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "237696277335";

    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');

    setTimeout(() => {
      setSubmitStatus('idle');
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: '',
        description: '',
        budget: '',
        deadline: ''
      });
    }, 2000);
  };

  return (
    <section id="booking" className="py-24 bg-muted relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-background/5 -skew-x-12 translate-x-32" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-accent font-semibold tracking-[2px] uppercase text-[10px] mb-3">Quick Booking</h2>
            <h3 className="text-4xl md:text-5xl font-heading font-bold mb-6 leading-[0.9] tracking-[-1px] uppercase">Let's Create Something Extraordinary</h3>
            <p className="text-muted-foreground text-[0.9rem] leading-[1.6] font-normal mb-8">
              Ready to elevate your brand? Fill out the form with your project details, and we'll get back to you immediately via WhatsApp to discuss how we can bring your vision to life.
            </p>
            
            <div className="bg-muted p-8 rounded-none border border-border">
              <h4 className="font-heading font-bold text-[0.85rem] uppercase tracking-[1px] mb-4">Why choose us?</h4>
              <ul className="space-y-4">
                {[
                  'Award-winning design team',
                  'Fast turnaround times',
                  'Dedicated project manager',
                  'Unlimited revisions on premium packages'
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-muted-foreground text-[11px] uppercase tracking-[0.5px]">
                    <div className="w-1 h-1 bg-accent rounded-none mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="bg-muted p-8 md:p-10 rounded-none border border-border shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[1px] font-bold text-muted-foreground">Full Name *</label>
                  <input 
                    required
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-background border border-border rounded-none px-4 py-3 text-[12px] text-foreground focus:outline-none focus:border-accent transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[1px] font-bold text-muted-foreground">Phone Number *</label>
                  <input 
                    required
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-background border border-border rounded-none px-4 py-3 text-[12px] text-foreground focus:outline-none focus:border-accent transition-colors"
                    placeholder="+1 234 567 890"
                  />
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <label className="text-[10px] uppercase tracking-[1px] font-bold text-muted-foreground">Email Address *</label>
                <input 
                  required
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-background border border-border rounded-none px-4 py-3 text-[12px] text-foreground focus:outline-none focus:border-accent transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2 mb-6">
                <label className="text-[10px] uppercase tracking-[1px] font-bold text-muted-foreground">Service Required *</label>
                <select 
                  required
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full bg-background border border-border rounded-none px-4 py-3 text-[12px] text-foreground focus:outline-none focus:border-accent transition-colors appearance-none"
                >
                  <option value="" disabled>Select a service category</option>
                  {servicesData.map(service => (
                    <option key={service.id} value={service.title}>{service.title}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2 mb-6">
                <label className="text-[10px] uppercase tracking-[1px] font-bold text-muted-foreground">Project Description *</label>
                <textarea 
                  required
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-background border border-border rounded-none px-4 py-3 text-[12px] text-foreground focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder="Tell us about your project goals, target audience, and specific requirements..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[1px] font-bold text-muted-foreground">Budget (Optional)</label>
                  <input 
                    type="text" 
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full bg-background border border-border rounded-none px-4 py-3 text-[12px] text-foreground focus:outline-none focus:border-accent transition-colors"
                    placeholder="e.g. 500 000 - 1 000 000 FCFA"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[1px] font-bold text-muted-foreground">Deadline (Optional)</label>
                  <input 
                    type="text" 
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    className="w-full bg-background border border-border rounded-none px-4 py-3 text-[12px] text-foreground focus:outline-none focus:border-accent transition-colors"
                    placeholder="e.g. 2 Weeks"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={submitStatus === 'saving' || submitStatus === 'opening'}
                className="w-full bg-accent text-accent-foreground font-bold text-[12px] uppercase tracking-[1px] px-8 py-4 rounded-none hover:bg-accent/90 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {submitStatus === 'saving' && 'Saving...'}
                {submitStatus === 'opening' && 'Opening WhatsApp...'}
                {submitStatus === 'saved' && 'Saved! Opening WhatsApp...'}
                {submitStatus === 'error' && 'Sending via WhatsApp...'}
                {submitStatus === 'idle' && (
                  <>
                    Send via WhatsApp
                    <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
              {submitStatus === 'saved' && (
                <p className="text-green-500 text-[10px] uppercase tracking-[1px] mt-3 text-center">
                  ✓ Booking saved to system
                </p>
              )}
              {submitStatus === 'error' && (
                <p className="text-yellow-500 text-[10px] uppercase tracking-[1px] mt-3 text-center">
                  ⚠ Could not save to server — WhatsApp opened instead
                </p>
              )}
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
