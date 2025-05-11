import { motion } from 'framer-motion';

const TOKEN_ALLOCATION = [
  { name: "Liquidity Pool", percentage: 60, amount: "600,000,000 CHEF", color: "bg-primary" },
  { name: "Community Airdrops & Rewards", percentage: 15, amount: "150,000,000 CHEF", color: "bg-secondary" },
  { name: "Project Development", percentage: 10, amount: "100,000,000 CHEF", color: "bg-accent" },
  { name: "Marketing & Partnerships", percentage: 10, amount: "100,000,000 CHEF", color: "bg-gray-500" },
  { name: "Charity Potluck", percentage: 5, amount: "50,000,000 CHEF", color: "bg-success" }
];

const TOKEN_UTILITIES = [
  {
    icon: "fas fa-utensils",
    title: "Recipe Creation",
    description: "Use CHEF tokens to mint unique recipe NFTs"
  },
  {
    icon: "fas fa-seedling",
    title: "Ingredient Farming",
    description: "Stake CHEF to farm rare meme ingredients as NFTs"
  },
  {
    icon: "fas fa-trophy",
    title: "Competition Rewards",
    description: "Win CHEF tokens in weekly cook-off competitions"
  },
  {
    icon: "fas fa-heart",
    title: "Charity Voting",
    description: "Hold CHEF to vote on monthly charity donations"
  }
];

const ROADMAP_MILESTONES = [
  {
    icon: "fas fa-rocket",
    title: "Q3 2025 - Initial Launch",
    current: true,
    items: [
      { text: "Token Launch via PUMP.fun Platform", completed: true },
      { text: "Community Building & Initial Partnerships", completed: false },
      { text: "Staking Platform Development", completed: false },
      { text: "First Charity Potluck Vote", completed: false }
    ]
  },
  {
    icon: "fas fa-paint-brush",
    title: "Q1 2026 - NFT & Social Integration",
    current: false,
    items: [
      { text: "NFT Marketplace Launch", completed: false },
      { text: "Recipe Creation & Ingredient Farming Systems", completed: false },
      { text: "Social Media Platform Integrations", completed: false },
      { text: "First Community Cook-off Competition", completed: false }
    ]
  },
  {
    icon: "fas fa-certificate",
    title: "Q2 2026 - Platform Expansion",
    current: false,
    items: [
      { text: "Mobile App Development", completed: false },
      { text: "Cross-chain Bridge Exploration", completed: false },
      { text: "Advanced Recipe Mechanics", completed: false },
      { text: "Celebrity Chef Partnerships", completed: false }
    ]
  },
  {
    icon: "fas fa-star",
    title: "MAJOR MILESTONE",
    current: false,
    items: [
      { text: "Token Graduation @ $69,000 Market Cap", completed: false },
      { text: "Migration to Raydium Platform", completed: false },
      { text: "6 SOL Migration Fee", completed: false },
      { text: "$12,000 Liquidity Deposited & Burned on Raydium", completed: false }
    ]
  }
];

export default function TokenomicsRoadmapSection() {
  return (
    <section id="roadmap" className="py-16 bg-darkBg text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Tokenomics */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-title font-bold mb-2">Tokenomics</h2>
              <p className="text-gray-400 max-w-md mx-auto">The CHEF token powers the entire MemeChef ecosystem</p>
            </div>
            
            <div className="bg-white bg-opacity-5 rounded-xl p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-title font-bold">MemeChef (CHEF)</h3>
                  <p className="text-gray-400">Solana Network</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">Supply: 1,000,000,000</p>
                  <p className="text-gray-400">1 Billion CHEF</p>
                </div>
              </div>
              
              <div className="relative h-12 bg-white bg-opacity-10 rounded-full mb-6 overflow-hidden">
                {TOKEN_ALLOCATION.map((item, index) => {
                  const startPosition = TOKEN_ALLOCATION.slice(0, index).reduce((acc, curr) => acc + curr.percentage, 0);
                  return (
                    <div 
                      key={index}
                      className={`absolute left-0 top-0 h-full ${item.color}`} 
                      style={{ 
                        width: `${item.percentage}%`, 
                        marginLeft: `${startPosition}%`
                      }}
                    ></div>
                  );
                })}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {TOKEN_ALLOCATION.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`w-4 h-4 rounded-full ${item.color} mr-2`}></div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-400">{item.percentage}% ({item.amount})</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white bg-opacity-5 rounded-xl p-6">
              <h3 className="font-title font-bold mb-4">Token Utility</h3>
              
              <div className="space-y-4">
                {TOKEN_UTILITIES.map((utility, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex items-center justify-center bg-primary bg-opacity-20 rounded-full w-8 h-8 mt-1 mr-3 flex-shrink-0">
                      <i className={`${utility.icon} text-primary`}></i>
                    </div>
                    <div>
                      <p className="font-medium">{utility.title}</p>
                      <p className="text-sm text-gray-400">{utility.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Roadmap */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-title font-bold mb-2">Roadmap</h2>
              <p className="text-gray-400 max-w-md mx-auto">Our journey from token launch to a full meme ecosystem</p>
            </div>
            
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-700 ml-6"></div>
              
              {ROADMAP_MILESTONES.map((milestone, index) => (
                <div key={index} className="relative z-10 mb-12">
                  <div className="flex items-start">
                    <div className={`flex items-center justify-center ${milestone.current ? 'bg-primary' : 'bg-gray-700'} rounded-full w-12 h-12 mr-4 flex-shrink-0`}>
                      <i className={`${milestone.icon} text-white`}></i>
                    </div>
                    <div className="bg-white bg-opacity-5 rounded-xl p-6 flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-title font-bold text-lg">{milestone.title}</h3>
                        {milestone.current && <span className="bg-secondary text-white text-xs px-3 py-1 rounded-full">CURRENT</span>}
                      </div>
                      <div className="space-y-3 text-gray-300">
                        {milestone.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center">
                            <i className={`${item.completed ? 'fas fa-check-circle text-success' : 'fas fa-circle text-gray-500 text-xs'} mr-2`}></i>
                            <span>{item.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
