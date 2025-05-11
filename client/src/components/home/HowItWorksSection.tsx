import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const STEPS = [
  {
    icon: "fas fa-seedling",
    title: "1. Farm Ingredients",
    description: "Stake your CHEF tokens to farm unique meme ingredients like \"Spicy Pepe\" or \"Doge Sauce\" as collectible NFTs"
  },
  {
    icon: "fas fa-utensils",
    title: "2. Create Recipes",
    description: "Combine your ingredients to create unique meme recipe NFTs that can be traded, shared or entered into competitions"
  },
  {
    icon: "fas fa-trophy",
    title: "3. Compete & Earn",
    description: "Enter weekly cook-offs, get community votes, and earn CHEF tokens when your recipes go viral on social media"
  }
];

export default function HowItWorksSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-title font-bold mb-2">How MemeChef Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">A revolutionary memecoin ecosystem that lets you create, share, and earn from viral meme recipes</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {STEPS.map((step, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-all group"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-all">
                <i className={`${step.icon} text-primary text-2xl group-hover:text-white`}></i>
              </div>
              <h3 className="text-xl font-title font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 flex justify-center"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button className="py-3 px-8 bg-primary rounded-full font-medium text-white hover:bg-opacity-90 transition-all transform hover:scale-105 flex items-center space-x-2">
            <span>Start Cooking</span>
            <i className="fas fa-arrow-right"></i>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
