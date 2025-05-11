import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RARITY_LEVELS, RARITY_COLORS } from '@/lib/utils';

const INGREDIENTS = [
  {
    id: 1,
    name: 'Spicy Pepe',
    rarity: RARITY_LEVELS.RARE,
    image: 'https://images.unsplash.com/photo-1573225342350-16731dd9bf3d'
  },
  {
    id: 2,
    name: 'Doge Sauce',
    rarity: RARITY_LEVELS.COMMON,
    image: 'https://images.unsplash.com/photo-1633177317976-3f9bc45e1d1d'
  },
  {
    id: 3,
    name: 'Moon Cheese',
    rarity: RARITY_LEVELS.UNCOMMON,
    image: 'https://images.unsplash.com/photo-1589881133595-a3c085cb731d'
  }
];

const POPULAR_RECIPES = [
  {
    id: 1,
    name: "Pepe's Taco Supreme",
    rarity: RARITY_LEVELS.LEGENDARY,
    creator: "0xChef...69b",
    chefTokens: 824,
    dollarValue: 34.20,
    likes: 245,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38"
  },
  {
    id: 2,
    name: "Doge Lasagna",
    rarity: RARITY_LEVELS.RARE,
    creator: "MemeLord",
    chefTokens: 369,
    dollarValue: 15.5,
    likes: 123,
    image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0"
  }
];

export default function RecipeCreationSection() {
  const [selectedIngredients, setSelectedIngredients] = useState<number[]>([1]);
  const [recipeName, setRecipeName] = useState("Pepe's Spicy Moon Taco");
  const [tokenAmount, setTokenAmount] = useState(420);
  
  const toggleIngredient = (id: number) => {
    if (selectedIngredients.includes(id)) {
      setSelectedIngredients(selectedIngredients.filter(i => i !== id));
    } else {
      if (selectedIngredients.length < 3) {
        setSelectedIngredients([...selectedIngredients, id]);
      }
    }
  };
  
  return (
    <section id="recipes" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-title font-bold mb-2">Recipe NFT Creation</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Cook up unique meme recipes by combining ingredients and CHEF tokens</p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-white rounded-xl shadow-xl relative">
              <div className="absolute top-4 right-4 bg-accent text-darkBg text-xs font-bold py-1 px-3 rounded-full">
                LIVE PREVIEW
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-title font-bold mb-6">Meme Recipe Creator</h3>
                
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Recipe Name</label>
                  <Input 
                    type="text" 
                    value={recipeName}
                    onChange={(e) => setRecipeName(e.target.value)}
                    placeholder="Pepe's Spicy Moon Taco" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Select Ingredients (3 max)</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                    {INGREDIENTS.map((ingredient) => (
                      <div 
                        key={ingredient.id}
                        onClick={() => toggleIngredient(ingredient.id)}
                        className={`border-2 ${selectedIngredients.includes(ingredient.id) ? 'border-primary bg-primary bg-opacity-10' : 'border-gray-200 hover:border-primary hover:bg-primary hover:bg-opacity-5'} rounded-lg p-3 text-center cursor-pointer transition-all`}
                      >
                        <div className="w-full h-24 bg-gray-100 rounded-lg mb-2 overflow-hidden">
                          <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <rect width="100" height="100" fill="#f3f4f6" />
                            <text x="50%" y="50%" fontFamily="Arial" fontSize="12" fill="#6b7280" textAnchor="middle" dominantBaseline="middle">{ingredient.name}</text>
                          </svg>
                        </div>
                        <p className="text-xs font-bold">{ingredient.name}</p>
                        <div className="text-xs text-gray-500">Rarity: {ingredient.rarity}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">CHEF Tokens to Add (min. 100)</label>
                  <div className="flex items-center">
                    <Input 
                      type="number" 
                      value={tokenAmount}
                      onChange={(e) => setTokenAmount(Number(e.target.value))}
                      min="100" 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <span className="ml-2 text-gray-600">CHEF</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">More tokens = higher rarity potential</p>
                </div>
                
                <Button className="w-full py-3 bg-primary text-white rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-opacity-90">
                  <i className="fas fa-fire"></i>
                  <span>Cook Recipe NFT (Gas: ~0.002 SOL)</span>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-2xl font-title font-bold mb-6">Popular Recipes</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {POPULAR_RECIPES.map((recipe) => (
                <div key={recipe.id} className="recipe-card bg-white rounded-xl shadow-lg overflow-hidden transition-all">
                  <div className="w-full h-48 bg-gray-200">
                    <svg className="w-full h-full" viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
                      <rect width="400" height="250" fill="#f3f4f6" />
                      <text x="50%" y="50%" fontFamily="Arial" fontSize="18" fill="#6b7280" textAnchor="middle" dominantBaseline="middle">{recipe.name}</text>
                    </svg>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-title font-bold">{recipe.name}</h4>
                      <span className={`${RARITY_COLORS[recipe.rarity]} text-xs px-2 py-1 rounded-full`}>{recipe.rarity}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span>Created by </span>
                      <span className="font-medium text-primary ml-1">{recipe.creator}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm">
                        <span className="font-bold">{recipe.chefTokens} CHEF</span>
                        <span className="text-gray-500">(${recipe.dollarValue.toFixed(2)})</span>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-1 text-primary hover:text-opacity-80">
                          <i className="fas fa-heart"></i>
                        </button>
                        <button className="p-1 text-gray-500 hover:text-primary">
                          <i className="fas fa-share-alt"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <button className="text-primary font-medium flex items-center hover:underline">
                <span>View all recipes</span>
                <i className="fas fa-chevron-right ml-1 text-sm"></i>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
