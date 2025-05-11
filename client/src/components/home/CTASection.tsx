import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const SOCIAL_LINKS = [
  { name: "Twitter", icon: "fab fa-twitter" },
  { name: "Discord", icon: "fab fa-discord" },
  { name: "Telegram", icon: "fab fa-telegram" },
  { name: "Medium", icon: "fab fa-medium" },
  { name: "TikTok", icon: "fab fa-tiktok" }
];

export default function CTASection() {
  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      <div className="absolute -right-20 top-0 w-80 h-80 bg-accent rounded-full opacity-20"></div>
      <div className="absolute -left-20 bottom-0 w-80 h-80 bg-white rounded-full opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-title font-bold text-white mb-6">Ready to Cook Up Some Memes?</h2>
          <p className="text-white text-opacity-90 text-lg mb-10">Join the MemeChef community today and start creating viral recipe NFTs that could earn you rewards and social clout!</p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button className="py-4 px-8 bg-white text-primary rounded-full font-bold text-lg hover:bg-opacity-90 transition-all transform hover:scale-105">
              Connect Wallet
            </Button>
            <Button variant="outline" className="py-4 px-8 border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-primary transition-all">
              Join Discord
            </Button>
          </div>
          
          <motion.div 
            className="mt-16 flex flex-wrap justify-center gap-8"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {SOCIAL_LINKS.map((link, index) => (
              <motion.a 
                key={index}
                href="#" 
                className="flex flex-col items-center"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-2 hover:bg-opacity-80 transition-all">
                  <i className={`${link.icon} text-primary text-2xl`}></i>
                </div>
                <span className="text-white text-sm">{link.name}</span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
