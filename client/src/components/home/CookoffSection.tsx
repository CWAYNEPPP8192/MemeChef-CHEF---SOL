import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useCountdown } from '@/hooks/use-countdown';
import { RARITY_LEVELS } from '@/lib/utils';

const LEADERBOARD = [
  {
    rank: 1,
    recipe: {
      name: "LUNA Crash Soufflé",
      rarity: RARITY_LEVELS.LEGENDARY,
      image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f"
    },
    chef: "MemeKing",
    votes: 3412,
    viralityScore: 98.2,
    reward: 12000
  },
  {
    rank: 2,
    recipe: {
      name: "Elon's SNL Doge Dip",
      rarity: RARITY_LEVELS.RARE,
      image: "https://images.unsplash.com/photo-1605792657660-596af9009e82"
    },
    chef: "DogeFather",
    votes: 2845,
    viralityScore: 87.3,
    reward: 8500
  },
  {
    rank: 3,
    recipe: {
      name: "FTX Fried Rice",
      rarity: RARITY_LEVELS.UNCOMMON,
      image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e"
    },
    chef: "CryptoKitchen",
    votes: 1978,
    viralityScore: 72.8,
    reward: 5000
  }
];

export default function CookoffSection() {
  const { days, hours, minutes, seconds } = useCountdown(
    new Date().getTime() + 3 * 24 * 60 * 60 * 1000 // 3 days from now
  );
  
  return (
    <section id="cook-offs" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-title font-bold mb-2">Weekly Cook-off Competitions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Submit your meme recipes, get community votes, and win CHEF rewards</p>
        </motion.div>
        
        <motion.div 
          className="bg-darkBg text-white rounded-xl p-8 mb-12 relative overflow-hidden"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="absolute top-0 right-0 bg-primary px-4 py-2 text-sm font-bold">
            LIVE NOW
          </div>
          
          <div className="relative z-10">
            <h3 className="text-2xl font-title font-bold mb-2">This Week's Theme: "Crypto Kitchen Disasters"</h3>
            <p className="text-gray-300 mb-6">Create the funniest recipe depicting crypto market crashes, failed launches, or trading mistakes</p>
            
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm text-gray-400">Time Remaining</p>
                <div className="flex items-center space-x-3 text-xl font-bold">
                  <div className="bg-white bg-opacity-10 px-3 py-1 rounded">{String(days).padStart(2, '0')}</div>
                  <span>:</span>
                  <div className="bg-white bg-opacity-10 px-3 py-1 rounded">{String(hours).padStart(2, '0')}</div>
                  <span>:</span>
                  <div className="bg-white bg-opacity-10 px-3 py-1 rounded">{String(minutes).padStart(2, '0')}</div>
                  <span>:</span>
                  <div className="bg-white bg-opacity-10 px-3 py-1 rounded">{String(seconds).padStart(2, '0')}</div>
                </div>
                <div className="flex items-center space-x-3 text-xs mt-1">
                  <div className="w-10 text-center">Days</div>
                  <div className="w-4"></div>
                  <div className="w-10 text-center">Hours</div>
                  <div className="w-4"></div>
                  <div className="w-10 text-center">Mins</div>
                  <div className="w-4"></div>
                  <div className="w-10 text-center">Secs</div>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-400">Prize Pool</p>
                <p className="text-xl font-bold">42,069 CHEF</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-400">Entries</p>
                <p className="text-xl font-bold">387</p>
              </div>
              
              <Button className="py-3 px-6 bg-primary rounded-lg font-medium hover:bg-opacity-90 transition-all">
                Submit Your Recipe
              </Button>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl font-title font-bold mb-6">Leaderboard</h3>
          
          <div className="bg-white shadow-lg rounded-xl overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-3 px-4 text-left font-medium text-gray-700">Rank</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-700">Recipe</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-700">Chef</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-700">Votes</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-700">Virality Score</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-700">Reward</th>
                  </tr>
                </thead>
                <tbody>
                  {LEADERBOARD.map((entry, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div 
                          className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm
                          ${entry.rank === 1 ? 'bg-accent text-darkBg' : 
                            entry.rank === 2 ? 'bg-secondary text-white' : 
                            'bg-primary bg-opacity-20 text-primary'}`}
                        >
                          {entry.rank}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-lg bg-gray-200 mr-3 flex items-center justify-center">
                            <svg className="w-10 h-10" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                              <rect width="40" height="40" fill="#f3f4f6" />
                              <text x="50%" y="50%" fontFamily="Arial" fontSize="4" fill="#6b7280" textAnchor="middle" dominantBaseline="middle">Recipe</text>
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium">{entry.recipe.name}</p>
                            <p className="text-xs text-gray-500">{entry.recipe.rarity} Recipe</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div 
                            className={`w-6 h-6 rounded-full mr-2 flex items-center justify-center text-white text-xs
                            ${entry.rank === 1 ? 'bg-primary' : 
                              entry.rank === 2 ? 'bg-secondary' : 
                              'bg-gray-300'}`}
                          >
                            {entry.chef.charAt(0)}
                          </div>
                          <span>{entry.chef}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">{entry.votes.toLocaleString()}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <i className="fas fa-fire text-primary mr-1"></i>
                          <span>{entry.viralityScore}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-medium">{entry.reward.toLocaleString()} CHEF</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button variant="outline" className="py-2 px-6 border-2 border-primary text-primary rounded-full font-medium hover:bg-primary hover:text-white transition-all">
              View All Competition Results
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
