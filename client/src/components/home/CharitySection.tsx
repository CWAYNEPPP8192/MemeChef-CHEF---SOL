import { useState } from 'react';
import { motion } from 'framer-motion';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';

const CHARITIES = [
  {
    id: "wfp",
    name: "World Food Program",
    description: "Fighting global hunger through emergency response and community support.",
    percentage: 45
  },
  {
    id: "feeding-america",
    name: "Feeding America",
    description: "Nationwide network of food banks providing meals to those in need.",
    percentage: 32
  },
  {
    id: "action-against-hunger",
    name: "Action Against Hunger",
    description: "Combating malnutrition and providing clean water in over 45 countries.",
    percentage: 23
  }
];

const PREVIOUS_DONATIONS = [
  {
    organization: "World Food Program",
    date: "April 2026",
    amount: 12345,
    usdEquivalent: 520
  },
  {
    organization: "No Kid Hungry",
    date: "March 2026",
    amount: 10890,
    usdEquivalent: 450
  },
  {
    organization: "Feeding America",
    date: "February 2026",
    amount: 8720,
    usdEquivalent: 365
  }
];

export default function CharitySection() {
  const [selectedCharity, setSelectedCharity] = useState("feeding-america");
  
  return (
    <section id="charity" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-title font-bold mb-2">Charity Potluck</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">A portion of all transaction fees goes to food-related charities voted by the community</p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="order-2 lg:order-1"
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-title font-bold mb-6">Current Charity Vote</h3>
            
            <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-gray-500">Current Potluck</p>
                  <p className="text-2xl font-bold">24,680 CHEF</p>
                  <p className="text-sm text-gray-500">≈ $1,037 USD</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Voting Ends In</p>
                  <p className="text-2xl font-bold">3d 12h</p>
                </div>
              </div>
              
              <RadioGroup value={selectedCharity} onValueChange={setSelectedCharity} className="space-y-4 mb-6">
                {CHARITIES.map((charity) => (
                  <div key={charity.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <RadioGroupItem value={charity.id} id={charity.id} className="h-4 w-4 text-primary focus:ring-primary border-gray-300" />
                      <Label htmlFor={charity.id} className="ml-2 font-medium">{charity.name}</Label>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 mr-4">
                        <div className="bg-primary h-2 rounded-full" style={{ width: `${charity.percentage}%` }}></div>
                      </div>
                      <span className="text-sm font-medium">{charity.percentage}%</span>
                    </div>
                    <p className="text-sm text-gray-500">{charity.description}</p>
                  </div>
                ))}
              </RadioGroup>
              
              <Button className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-opacity-90 transition-all">
                Cast Your Vote (1 vote per wallet)
              </Button>
            </div>
            
            <div>
              <h4 className="font-title font-bold mb-4">Previous Donations</h4>
              
              <div className="space-y-4">
                {PREVIOUS_DONATIONS.map((donation, index) => (
                  <div key={index} className="flex items-center justify-between border-b border-gray-200 pb-3">
                    <div>
                      <p className="font-medium">{donation.organization}</p>
                      <p className="text-sm text-gray-500">{donation.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{donation.amount.toLocaleString()} CHEF</p>
                      <p className="text-sm text-gray-500">${donation.usdEquivalent} USD</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="order-1 lg:order-2"
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div className="w-full h-[800px] bg-gray-200 rounded-xl shadow-lg flex items-center justify-center">
                <svg viewBox="0 0 600 800" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <rect width="600" height="800" fill="#f3f4f6" />
                  <text x="50%" y="50%" fontFamily="Arial" fontSize="24" fill="#6b7280" textAnchor="middle" dominantBaseline="middle">Charity Impact Visualization</text>
                </svg>
              </div>
              
              <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-xl p-4 shadow-lg max-w-xs">
                <h4 className="font-title font-bold mb-2">Community Impact</h4>
                <p className="text-sm text-gray-600 mb-3">5% of all transaction fees automatically go to the Charity Potluck wallet.</p>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Total Donated:</span>
                  <span className="font-bold">31,955 CHEF</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>USD Equivalent:</span>
                  <span className="font-bold">$1,335</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
