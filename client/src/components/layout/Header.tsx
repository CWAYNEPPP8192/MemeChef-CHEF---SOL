import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const NavLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Recipes', href: '#recipes' },
  { name: 'Cook-offs', href: '#cook-offs' },
  { name: 'Farm', href: '#farm' },
  { name: 'Charity Potluck', href: '#charity' },
  { name: 'Roadmap', href: '#roadmap' }
];

export default function Header() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string, isMobile = false) => {
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
    
    const element = document.querySelector(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <i className="fas fa-utensils text-primary text-2xl"></i>
          <h1 className="text-3xl font-title font-bold">
            <span className="text-primary">Meme</span>
            <span className="text-darkBg">Chef</span>
          </h1>
        </div>
        
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          {NavLinks.map((link) => (
            <a 
              key={link.href}
              href={link.href}
              className="hover:text-primary transition-colors"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
            >
              {link.name}
            </a>
          ))}
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button 
            className="hidden md:flex py-2 px-4 bg-primary text-white rounded-full font-medium hover:bg-opacity-90 transition-all"
          >
            Connect Wallet
          </Button>
          
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden p-0">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
              <div className="flex flex-col gap-4 mt-4">
                {NavLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium px-2 py-2 hover:text-primary transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href, true);
                    }}
                  >
                    {link.name}
                  </a>
                ))}
                <Button 
                  className="mt-4 py-2 px-4 bg-primary text-white rounded-full font-medium hover:bg-opacity-90 transition-all"
                >
                  Connect Wallet
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
