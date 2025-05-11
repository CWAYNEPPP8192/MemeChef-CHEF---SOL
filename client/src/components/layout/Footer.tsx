import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-darkBg text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <i className="fas fa-utensils text-primary text-2xl"></i>
              <h2 className="text-2xl font-title font-bold">
                <span className="text-primary">Meme</span>
                <span className="text-white">Chef</span>
              </h2>
            </div>
            <p className="text-gray-400 mb-6">Cook up the next viral meme, one recipe at a time!</p>
            <p className="text-gray-400 text-sm">© 2026 MemeChef. All rights reserved.</p>
          </div>
          
          <div>
            <h3 className="font-title font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#home" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="#recipes" className="hover:text-primary transition-colors">Recipe NFTs</a></li>
              <li><a href="#cook-offs" className="hover:text-primary transition-colors">Cook-offs</a></li>
              <li><a href="#farm" className="hover:text-primary transition-colors">Ingredient Farming</a></li>
              <li><a href="#charity" className="hover:text-primary transition-colors">Charity Potluck</a></li>
              <li><a href="#roadmap" className="hover:text-primary transition-colors">Roadmap</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-title font-bold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-primary transition-colors">Whitepaper</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Token Metrics</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Security Audit</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-title font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates and recipes</p>
            <div className="flex mb-4">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white bg-opacity-10 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button className="bg-primary text-white rounded-r-lg hover:bg-opacity-90 px-4">
                <i className="fas fa-paper-plane"></i>
              </Button>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <i className="fab fa-discord text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <i className="fab fa-telegram text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <i className="fab fa-medium text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <i className="fab fa-tiktok text-xl"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>This is a fictional memecoin project for demonstration purposes only. Not financial advice.</p>
        </div>
      </div>
    </footer>
  );
}
