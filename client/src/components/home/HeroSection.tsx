import { motion } from 'framer-motion';
import { formatNumber } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section id="home" className="relative bg-darkBg text-white py-20 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="grid grid-cols-5 grid-rows-3 h-full w-full">
          <div className="bg-primary opacity-30"></div>
          <div className="bg-secondary opacity-20"></div>
          <div className="bg-accent opacity-25"></div>
          <div className="bg-primary opacity-15"></div>
          <div className="bg-secondary opacity-20"></div>
          <div className="bg-accent opacity-20"></div>
          <div className="bg-primary opacity-25"></div>
          <div className="bg-secondary opacity-30"></div>
          <div className="bg-accent opacity-15"></div>
          <div className="bg-primary opacity-20"></div>
          <div className="bg-secondary opacity-15"></div>
          <div className="bg-accent opacity-25"></div>
          <div className="bg-primary opacity-20"></div>
          <div className="bg-secondary opacity-15"></div>
          <div className="bg-accent opacity-30"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-title font-bold mb-4">
              Cook up the next <span className="text-primary">viral meme</span>, one recipe at a time!
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              MemeChef is a playful community-driven memecoin that gamifies the act of "cooking up" memes and recipes, blending the worlds of food, social media, and crypto culture.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="py-3 px-8 bg-primary rounded-full font-medium text-white hover:bg-opacity-90 transition-all transform hover:scale-105">
                Join the Kitchen
              </Button>
              <Button variant="outline" className="py-3 px-8 border-2 border-white rounded-full font-medium hover:bg-white hover:text-darkBg transition-all">
                Learn More
              </Button>
            </div>
            <div className="flex items-center mt-10 space-x-6">
              <a href="#" className="text-white hover:text-primary transition-colors">
                <i className="fab fa-twitter text-2xl"></i>
              </a>
              <a href="#" className="text-white hover:text-primary transition-colors">
                <i className="fab fa-discord text-2xl"></i>
              </a>
              <a href="#" className="text-white hover:text-primary transition-colors">
                <i className="fab fa-telegram text-2xl"></i>
              </a>
              <a href="#" className="text-white hover:text-primary transition-colors">
                <i className="fab fa-tiktok text-2xl"></i>
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 flex justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <svg className="w-64 h-64 md:w-96 md:h-96" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="125" cy="125" r="120" fill="#FF6B35" />
              <circle cx="125" cy="125" r="110" fill="#FFF" />
              <g className="animate-cook">
                <path d="M60,115 C70,90 90,75 125,70 C160,75 180,90 190,115 C200,140 180,180 125,180 C70,180 50,140 60,115 Z" fill="#FFC107" />
                <circle cx="95" cy="110" r="10" fill="#000" />
                <circle cx="155" cy="110" r="10" fill="#000" />
                <path d="M95,140 C115,155 135,155 155,140" stroke="#000" strokeWidth="5" strokeLinecap="round" />
                <path d="M90,80 C100,70 120,65 125,65 C130,65 150,70 160,80" stroke="#000" strokeWidth="3" strokeLinecap="round" />
                <path d="M70,100 L85,85 M175,100 L165,85" stroke="#000" strokeWidth="3" strokeLinecap="round" />
              </g>
              <circle cx="125" cy="125" r="120" stroke="#FF6B35" strokeWidth="5" fill="none" />
            </svg>
          </motion.div>
        </div>
        
        <motion.div 
          className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-4 mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center">
            <p className="text-gray-300 text-sm">Current Price</p>
            <p className="text-2xl font-bold text-white">$0.000042</p>
            <p className="text-success text-sm">+12.5% <i className="fas fa-arrow-up"></i></p>
          </div>
          <div className="text-center">
            <p className="text-gray-300 text-sm">Market Cap</p>
            <p className="text-2xl font-bold text-white">${formatNumber(42069)}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-300 text-sm">Total Holders</p>
            <p className="text-2xl font-bold text-white">{formatNumber(4269)}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-300 text-sm">Recipes Created</p>
            <p className="text-2xl font-bold text-white">{formatNumber(12420)}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
