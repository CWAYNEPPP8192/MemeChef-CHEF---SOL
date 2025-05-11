import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from '@/components/ui/select';
import { RARITY_LEVELS } from '@/lib/utils';

const FARMS = [
  {
    id: 1,
    name: "Meme Spice Garden",
    description: "Harvest rare spice ingredients",
    image: "https://images.unsplash.com/photo-1614632537197-38a17061c2bd",
    badges: ["High Yield", "Popular"],
    apy: 120,
    yourStake: 1420,
    nextHarvest: "12h 24m"
  },
  {
    id: 2,
    name: "Crypto Sauce Factory",
    description: "Produce legendary sauce ingredients",
    image: "https://images.unsplash.com/photo-1607478900766-efe13248b125",
    badges: ["Legendary Potential"],
    apy: 95,
    yourStake: 2500,
    nextHarvest: "4h 10m"
  }
];

const INGREDIENTS = [
  {
    id: 1,
    name: "Spicy Pepe",
    rarity: RARITY_LEVELS.RARE,
    quantity: 3,
    image: "https://images.unsplash.com/photo-1528750717929-32abb73d3bd9"
  },
  {
    id: 2,
    name: "Doge Sauce",
    rarity: RARITY_LEVELS.COMMON,
    quantity: 8,
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba"
  },
  {
    id: 3,
    name: "Moon Cheese",
    rarity: RARITY_LEVELS.UNCOMMON,
    quantity: 5,
    image: "https://pixabay.com/get/g2053742073ea292fa8fa38c7a464f5d9917b4cbf75b88467d410861b8b9d544500798cce35483ae3d386195de6bfba8df2d89d01973f9610d5f306ec262bacd7_1280.jpg"
  },
  {
    id: 4,
    name: "Elon's Secret Spice",
    rarity: RARITY_LEVELS.EPIC,
    quantity: 1,
    image: "https://pixabay.com/get/g920fece6fcb63d2fc2459040beface8947688975371c4ef6ad3e6f11e6fbe7f5bef0fbab013856f8f7bfc1a1e079c25082985b27c1902db7ae562de8ecc7bf93_1280.jpg"
  }
];

export default function FarmingSection() {
  const [selectedFarm, setSelectedFarm] = useState("meme-spice");
  const [stakeAmount, setStakeAmount] = useState(1000);
  const [duration, setDuration] = useState("30");
  
  return (
    <section id="farm" className="py-16 bg-gray-50 relative overflow-hidden">
      <div className="absolute -right-64 top-20 w-96 h-96 bg-primary rounded-full opacity-5"></div>
      <div className="absolute -left-32 bottom-10 w-64 h-64 bg-accent rounded-full opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-title font-bold mb-2">Ingredient Farming</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Stake your CHEF tokens to farm unique meme ingredients and boost your recipe potential</p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <motion.div 
            className="lg:col-span-2"
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-xl font-title font-bold mb-4">Active Farms</h3>
              
              <div className="space-y-6">
                {FARMS.map((farm) => (
                  <div key={farm.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                    <div className="flex flex-wrap justify-between items-center mb-4">
                      <div className="flex items-center mb-2 sm:mb-0">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg mr-3 flex items-center justify-center">
                          <svg className="w-12 h-12" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <rect width="48" height="48" fill="#f3f4f6" />
                            <text x="50%" y="50%" fontFamily="Arial" fontSize="6" fill="#6b7280" textAnchor="middle" dominantBaseline="middle">Farm</text>
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-title font-bold">{farm.name}</h4>
                          <p className="text-xs text-gray-500">{farm.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {farm.badges.map((badge, idx) => (
                          <div 
                            key={idx}
                            className={`text-xs px-2 py-1 rounded-full ${
                              badge === "High Yield" ? "bg-success text-white" :
                              badge === "Popular" ? "bg-accent text-darkBg" :
                              "bg-primary text-white"
                            }`}
                          >
                            {badge}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-500">APY</p>
                        <p className="text-lg font-bold text-darkBg">{farm.apy}%</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-500">Your Stake</p>
                        <p className="text-lg font-bold text-darkBg">{farm.yourStake.toLocaleString()} CHEF</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-500">Next Harvest</p>
                        <p className="text-lg font-bold text-darkBg">{farm.nextHarvest}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                      <Button className="py-2 px-4 bg-primary text-white rounded-lg font-medium text-sm hover:bg-opacity-90 transition-all">
                        Harvest Ingredients
                      </Button>
                      <Button variant="outline" className="py-2 px-4 border border-gray-300 rounded-lg font-medium text-sm hover:bg-gray-50 transition-all">
                        Add CHEF
                      </Button>
                      <Button variant="outline" className="py-2 px-4 border border-gray-300 rounded-lg font-medium text-sm hover:bg-gray-50 transition-all">
                        Unstake
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-title font-bold">Your Ingredients</h3>
                <button className="text-primary text-sm font-medium hover:underline">
                  View All
                </button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {INGREDIENTS.map((ingredient) => (
                  <div key={ingredient.id} className="ingredient-card bg-gray-50 rounded-lg p-3 text-center transition-all">
                    <div className="w-full h-24 bg-gray-200 rounded-lg mb-2 flex items-center justify-center">
                      <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <rect width="100" height="100" fill="#f3f4f6" />
                        <text x="50%" y="50%" fontFamily="Arial" fontSize="10" fill="#6b7280" textAnchor="middle" dominantBaseline="middle">{ingredient.name}</text>
                      </svg>
                    </div>
                    <p className="text-sm font-bold">{ingredient.name}</p>
                    <div className="text-xs text-gray-500">Rarity: {ingredient.rarity}</div>
                    <div className="text-xs text-gray-500">Qty: {ingredient.quantity}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-darkBg text-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-title font-bold mb-4">Start Farming</h3>
              
              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-medium mb-2">Select Farm</label>
                <Select value={selectedFarm} onValueChange={setSelectedFarm}>
                  <SelectTrigger className="w-full p-3 bg-white bg-opacity-10 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary">
                    <SelectValue placeholder="Select a farm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meme-spice">Meme Spice Garden (120% APY)</SelectItem>
                    <SelectItem value="crypto-sauce">Crypto Sauce Factory (95% APY)</SelectItem>
                    <SelectItem value="viral-veggie">Viral Veggie Plot (85% APY)</SelectItem>
                    <SelectItem value="diamond-dairy">Diamond Hands Dairy (75% APY)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-medium mb-2">Amount to Stake</label>
                <div className="flex items-center">
                  <Input 
                    type="number" 
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(Number(e.target.value))}
                    placeholder="Min. 100 CHEF" 
                    className="w-full p-3 bg-white bg-opacity-10 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button 
                    className="ml-2 text-xs bg-primary px-2 py-1 rounded"
                    onClick={() => setStakeAmount(4269)}
                  >
                    MAX
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1">Available: 4,269 CHEF</p>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-medium mb-2">Duration</label>
                <div className="grid grid-cols-3 gap-3">
                  <button 
                    className={`py-2 border ${duration === "7" ? "border-primary bg-primary bg-opacity-20" : "border-gray-700"} rounded-lg text-center text-sm hover:bg-primary hover:border-primary transition-all`}
                    onClick={() => setDuration("7")}
                  >
                    7 Days
                  </button>
                  <button 
                    className={`py-2 border ${duration === "30" ? "border-primary bg-primary bg-opacity-20" : "border-gray-700"} rounded-lg text-center text-sm hover:bg-primary hover:border-primary transition-all`}
                    onClick={() => setDuration("30")}
                  >
                    30 Days
                  </button>
                  <button 
                    className={`py-2 border ${duration === "90" ? "border-primary bg-primary bg-opacity-20" : "border-gray-700"} rounded-lg text-center text-sm hover:bg-primary hover:border-primary transition-all`}
                    onClick={() => setDuration("90")}
                  >
                    90 Days
                  </button>
                </div>
              </div>
              
              <div className="bg-white bg-opacity-5 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-300">Est. Ingredients</span>
                  <span className="text-sm font-medium">12-15 per month</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-300">Legendary Chance</span>
                  <span className="text-sm font-medium">5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Platform Fee</span>
                  <span className="text-sm font-medium">2%</span>
                </div>
              </div>
              
              <Button className="w-full py-3 bg-primary text-white rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-opacity-90">
                <i className="fas fa-tractor"></i>
                <span>Start Farming</span>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
