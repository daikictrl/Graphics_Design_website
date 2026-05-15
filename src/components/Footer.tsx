export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <a
              href="#home"
              className="flex items-center gap-3 inline-flex mb-6"
            >
              <img
                src="/logo.png"
                alt="Impact Graphics logo"
                className="h-10 w-auto rounded-sm border border-border bg-primary p-1 object-contain"
              />
              <span className="text-[1.2rem] font-heading font-extrabold tracking-[-0.5px]">
                IMPACT GRAPHICS<span className="text-accent">.</span>
              </span>
            </a>
            <p className="text-muted-foreground text-[0.9rem] leading-[1.6] font-normal max-w-md mb-8">
              A premium creative agency dedicated to transforming your ideas
              into compelling visual narratives that command attention and drive
              results.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold text-[11px] uppercase tracking-[2px] mb-6 text-accent">
              Quick Links
            </h4>
            <ul className="space-y-3 text-[11px] uppercase tracking-[1px]">
              <li>
                <a
                  href="#home"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-[11px] uppercase tracking-[2px] mb-6 text-accent">
              Services
            </h4>
            <ul className="space-y-3 text-[11px] uppercase tracking-[1px]">
              <li>
                <a
                  href="#services"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Branding & Identity
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Print Design
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Motion Graphics
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Web Design
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Consulting
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-[11px] uppercase tracking-[1px]">
            &copy; {currentYear} Impact Graphics and Son Sarl. All rights
            reserved.
          </p>
          <div className="flex space-x-6 text-[11px] uppercase tracking-[1px] text-muted-foreground">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
