import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertIngredientSchema, 
  insertUserIngredientSchema, 
  insertRecipeSchema, 
  insertFarmPoolSchema, 
  insertUserStakeSchema,
  insertCompetitionSchema,
  insertCompetitionEntrySchema,
  insertCharitySchema,
  insertCharityVoteSchema,
  insertCharityDonationSchema
} from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from 'zod-validation-error';

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // API error handler
  const handleApiError = (res: Response, error: unknown) => {
    console.error('API Error:', error);
    
    if (error instanceof ZodError) {
      const validationError = fromZodError(error);
      return res.status(400).json({ 
        message: "Validation error", 
        errors: validationError.details
      });
    }
    
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    
    return res.status(500).json({ message: "An unexpected error occurred" });
  };

  // User routes
  app.post("/api/users/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if username already exists
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already taken" });
      }
      
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      handleApiError(res, error);
    }
  });

  app.post("/api/users/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      
      // In a real app, you would use proper authentication and sessions
      res.status(200).json({ 
        id: user.id, 
        username: user.username, 
        walletAddress: user.walletAddress,
        chefTokens: user.chefTokens
      });
    } catch (error) {
      handleApiError(res, error);
    }
  });

  app.get("/api/users/wallet/:address", async (req, res) => {
    try {
      const { address } = req.params;
      const user = await storage.getUserByWalletAddress(address);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.status(200).json({ 
        id: user.id, 
        username: user.username, 
        walletAddress: user.walletAddress,
        chefTokens: user.chefTokens
      });
    } catch (error) {
      handleApiError(res, error);
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.status(200).json({ 
        id: user.id, 
        username: user.username, 
        walletAddress: user.walletAddress,
        chefTokens: user.chefTokens
      });
    } catch (error) {
      handleApiError(res, error);
    }
  });

  // Ingredients routes
  app.get("/api/ingredients", async (_req, res) => {
    try {
      const ingredients = await storage.getAllIngredients();
      res.status(200).json(ingredients);
    } catch (error) {
      handleApiError(res, error);
    }
  });

  app.get("/api/ingredients/rarity/:rarity", async (req, res) => {
    try {
      const { rarity } = req.params;
      const ingredients = await storage.getIngredientsByRarity(rarity);
      res.status(200).json(ingredients);
    } catch (error) {
      handleApiError(res, error);
    }
  });

  app.get("/api/ingredients/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const ingredient = await storage.getIngredient(id);
      
      if (!ingredient) {
        return res.status(404).json({ message: "Ingredient not found" });
      }
      
      res.status(200).json(ingredient);
    } catch (error) {
      handleApiError(res, error);
    }
  });

  app.post("/api/ingredients", async (req, res) => {
    try {
      const ingredientData = insertIngredientSchema.parse(req.body);
      const ingredient = await storage.createIngredient(ingredientData);
      res.status(201).json(ingredient);
    } catch (error) {
      handleApiError(res, error);
    }
  });

  // User Ingredients routes
  app.get("/api/users/:userId/ingredients", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const userIngredients = await storage.getUserIngredients(userId);
      res.status(200).json(userIngredients);
    } catch (error) {
      handleApiError(res, error);
    }
  });

  app.post("/api/users/:userId/ingredients", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const data = { ...req.body, userId };
      const userIngredientData = insertUserIngredientSchema.parse(data);
      const userIngredient = await storage.createUserIngredient(userIngredientData);
      res.status(201).json(userIngredient);
    } catch (error) {
      handleApiError(res, error);
    }
  });

  app.patch("/api/user-ingredients/:id/quantity", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { quantity } = req.body;
      
      if (typeof quantity !== 'number' || quantity < 0) {
        return res.status(400).json({ message: "Invalid quantity" });
      }
      
      const userIngredient = await storage.updateUserIngredientQuantity(id, quantity);
      
      if (!userIngredient) {
        return res.status(404).json({ message: "User ingredient not found" });
      }
      
      res.status(200).json(userIngredient);
    } catch (error) {
      handleApiError(res, error);
    }
  });

  // Recipe routes
  app.get("/api/recipes", async (_req, res) => {
    try {
      const recipes = await storage.getAllRecipes();
      res.status(200).json(recipes);
    } catch (error) {
      handleApiError(res, error);
    }
  });

  app.get("/api/recipes/popular", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const recipes = await storage.getPopularRecipes(limit);
      res.status(200).json(recipes);
    } catch (error) {
      handleApiError(res, error);
    }
  });

  app.get("/api/users/:userId/recipes", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const recipes = await storage.getRecipesByUser(userId);
      res.status(200).json(recipes);
    } catch (error) {
      handleApiError(res, error);
    }
  });

  app.get("/api/recipes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const recipe = await storage.getRecipe(id);
      
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      
      res.status(200).json(recipe);
    } catch (error) {
      handleApiError(res, error);
    }
  });

  app.post("/api/recipes", async (req, res) => {
    try {
      const recipeData = insertRecipeSchema.parse(req.body);
      
      // Verify that the user has enough tokens
      const user = await storage.getUser(recipeData.creatorId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      if ((user.chefTokens || 0) < recipeData.tokenAmount) {
        return res.status(400).json({ message: "Not enough CHEF tokens" });
      }
      
      // Verify that the user has the ingredients
      if (Array.isArray(recipeData.ingredients)) {
        for (const ingredient of recipeData.ingredients as any[]) {
          const userIngredient = await storage.getUserIngredient(
            recipeData.creatorId,
            ingredient.id
          );
          
          if (!userIngredient || userIngredient.quantity < ingredient.quantity) {
            return res.status(400).json({ 
              message: `Not enough of ingredient ${ingredient.id}` 
            });
          }
          
          // Decrease the user's ingredient quantity
          await storage.updateUserIngredientQuantity(
            userIngredient.id,
            userIngredient.quantity - ingredient.quantity
          );
        }
      }
      
      // Decrease the user's token amount
      await storage.updateUserTokens(recipeData.creatorId, -recipeData.tokenAmount);
      
      const recipe = await storage.createRecipe(recipeData);
      res.status(201).json(recipe);
    } catch (error) {
      handleApiError(res, error);
    }
  });

  app.post("/api/recipes/:id/like", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const recipe = await storage.getRecipe(id);
      
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      
      const updatedRecipe = await storage.updateRecipeLikes(id, (recipe.likes || 0) + 1);
      res.status(200).json(updatedRecipe);
    } catch (error) {
      handleApiError(res, error);
    }
  });

  app.post("/api/recipes/:id/share", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const recipe = await storage.getRecipe(id);
      
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      
      const updatedRecipe = await storage.updateRecipeShares(id, (recipe.shares || 0) + 1);
      res.status(200).json(updatedRecipe);
    } catch (error) {
      handleApiError(res, error);
    }
  });

  // Farm Pools routes
  app.get("/api/farm-pools", async (req, res) => {
    try {
      const onlyActive = req.query.active === 'true';
      const farmPools = onlyActive 
        ? await storage.getActiveFarmPools()
        : await storage.getAllFarmPools();
      
      res.status(200).json(farmPools);
    } catch (error) {
      handleApiError(res, error);
    }
  });

  app.get("/api/farm-pools/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const farmPool = await storage.getFarmPool(id);
      
      if (!farmPool) {
        return res.status(404).json({ message: "Farm pool not found" });
      }
      
      res.status(200).json(farmPool);
    } catch (error) {
      handleApiError(res, error);
    }
  });

  app.post("/api/farm-pools", async (req, res) => {
    try {
      const farmPoolData = insertFarmPoolSchema.parse(req.body);
      const farmPool = await storage.createFarmPool(farmPoolData);
      res.status(201).json(farmPool);
    } catch (error) {
      handleApiError(res, error);
    }
  });

  // User Stakes routes
  app.get("/api/users/:userId/stakes", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const userStakes = await storage.getUserStakesByUser(userId);
      res.status(200).json(userStakes);
    } catch (error) {
      handleApiError(res, error);
    }
  });

  app.post("/api/stakes", async (req, res) => {
    try {
      const stakeData = insertUserStakeSchema.parse(req.body);
      
      // Verify farm pool exists and is active
      const farmPool = await storage.getFarmPool(stakeData.farmId);
      if (!farmPool) {
        return res.status(404).json({ message: "Farm pool not found" });
      }
      
      if (!farmPool.isActive) {
        return res.status(400).json({ message: "Farm pool is not active" });
      }
      
      // Verify minimum stake amount
      if (stakeData.amount < farmPool.minimumStake) {
        return res.status(400).json({ 
          message: `Minimum stake amount is ${farmPool.minimumStake} CHEF tokens` 
        });
      }
      
      // Verify user has enough tokens
      const user = await storage.getUser(stakeData.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      if ((user.chefTokens || 0) < stakeData.amount) {
        return res.status(400).json({ message: "Not enough CHEF tokens" });
      }
      
      // Create the stake
      const userStake = await storage.createUserStake(stakeData);
      res.status(201).json(userStake);
    } catch (error) {
      handleApiError(res, error);
    }
  });

  app.post("/api/stakes/:id/harvest", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const userStake = await storage.getUserStake(id);
      
      if (!userStake) {
        return res.status(404).json({ message: "Stake not found" });
      }
      
      if (!userStake.isActive) {
        return res.status(400).json({ message: "Stake is not active" });
      }
      
      const farmPool = await storage.getFarmPool(userStake.farmId);
      if (!farmPool) {
        return res.status(404).json({ message: "Farm pool not found" });
      }
      
      // Calculate time since last harvest in hours
      const now = new Date();
      const lastHarvest = userStake.lastHarvest || now;
      const hoursSinceLastHarvest = (now.getTime() - lastHarvest.getTime()) / (1000 * 60 * 60);
      
      if (hoursSinceLastHarvest < farmPool.harvestPeriod) {
        return res.status(400).json({ 
          message: `Cannot harvest yet. Next harvest available in ${Math.ceil(farmPool.harvestPeriod - hoursSinceLastHarvest)} hours` 
        });
      }
      
      // Update last harvest time
      await storage.updateUserStakeHarvest(id);
      
      // Generate random ingredients based on farm pool
      const ingredientTypes = farmPool.ingredientTypes as number[];
      const randomIngredient = ingredientTypes[Math.floor(Math.random() * ingredientTypes.length)];
      
      // Determine rarity based on legendary chance
      const isLegendary = Math.random() * 100 < farmPool.legendaryChance;
      
      // Add ingredient to user's inventory
      const ingredient = await storage.getIngredient(randomIngredient);
      if (!ingredient) {
        return res.status(404).json({ message: "Ingredient not found" });
      }
      
      await storage.createUserIngredient({
        userId: userStake.userId,
        ingredientId: randomIngredient,
        quantity: 1
      });
      
      res.status(200).json({ 
        message: "Harvest successful", 
        ingredient: {
          id: ingredient.id,
          name: ingredient.name,
          rarity: isLegendary ? "Legendary" : ingredient.rarity,
          quantity: 1
        }
      });
    } catch (error) {
      handleApiError(res, error);
    }
  });

  app.post("/api/stakes/:id/unstake", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const userStake = await storage.getUserStake(id);
      
      if (!userStake) {
        return res.status(404).json({ message: "Stake not found" });
      }
      
      if (!userStake.isActive) {
        return res.status(400).json({ message: "Stake is already inactive" });
      }
      
      // Deactivate the stake and return tokens to user
      const updatedStake = await storage.deactivateUserStake(id);
      res.status(200).json(updatedStake);
    } catch (error) {
      handleApiError(res, error);
    }
  });

  // Competition routes
  app.get("/api/competitions", async (req, res) => {
    try {
      const status = req.query.status as string;
      
      let competitions;
      if (status === 'active') {
        competitions = await storage.getActiveCompetitions();
      } else if (status === 'past') {
        competitions = await storage.getPastCompetitions();
      } else {
        // Get both active and past competitions
        const active = await storage.getActiveCompetitions();
        const past = await storage.getPastCompetitions();
        competitions = [...active, ...past];
      }
      
      res.status(200).json(competitions);
    } catch (error) {
      handleApiError(res, error);
    }
  });

  app.get("/api/competitions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const competition = await storage.getCompetition(id);
      
      if (!competition) {
        return res.status(404).json({ message: "Competition not found" });
      }
      
      res.status(200).json(competition);
    } catch (error) {
      handleApiError(res, error);
    }
  });

  app.post("/api/competitions", async (req, res) => {
    try {
      const competitionData = insertCompetitionSchema.parse(req.body);
      const competition = await storage.createCompetition(competitionData);
      res.status(201).json(competition);
    } catch (error) {
      handleApiError(res, error);
    }
  });

  app.get("/api/competitions/:id/entries", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const entries = await storage.getCompetitionEntriesByCompetition(id);
      res.status(200).json(entries);
    } catch (error) {
      handleApiError(res, error);
    }
  });

  app.post("/api/competitions/:id/entries", async (req, res) => {
    try {
      const competitionId = parseInt(req.params.id);
      const data = { ...req.body, competitionId };
      const entryData = insertCompetitionEntrySchema.parse(data);
      
      // Verify competition exists and is active
      const competition = await storage.getCompetition(competitionId);
      if (!competition) {
        return res.status(404).json({ message: "Competition not found" });
      }
      
      if (!competition.isActive) {
        return res.status(400).json({ message: "Competition is not active" });
      }
      
      const now = new Date();
      if (now > competition.endDate) {
        return res.status(400).json({ message: "Competition has ended" });
      }
      
      // Verify recipe exists and belongs to the user
      const recipe = await storage.getRecipe(entryData.recipeId);
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      
      if (recipe.creatorId !== entryData.userId) {
        return res.status(403).json({ message: "Recipe does not belong to this user" });
      }
      
      const entry = await storage.createCompetitionEntry(entryData);
      res.status(201).json(entry);
    } catch (error) {
      handleApiError(res, error);
    }
  });

  app.post("/api/competition-entries/:id/vote", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const entry = await storage.getCompetitionEntry(id);
      
      if (!entry) {
        return res.status(404).json({ message: "Competition entry not found" });
      }
      
      // Verify competition is still active
      const competition = await storage.getCompetition(entry.competitionId);
      if (!competition) {
        return res.status(404).json({ message: "Competition not found" });
      }
      
      if (!competition.isActive) {
        return res.status(400).json({ message: "Competition is not active" });
      }
      
      const now = new Date();
      if (now > competition.endDate) {
        return res.status(400).json({ message: "Competition has ended" });
      }
      
      const updatedEntry = await storage.voteForCompetitionEntry(id);
      res.status(200).json(updatedEntry);
    } catch (error) {
      handleApiError(res, error);
    }
  });

  // Charity routes
  app.get("/api/charities", async (_req, res) => {
    try {
      const charities = await storage.getAllCharities();
      res.status(200).json(charities);
    } catch (error) {
      handleApiError(res, error);
    }
  });

  app.get("/api/charities/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const charity = await storage.getCharity(id);
      
      if (!charity) {
        return res.status(404).json({ message: "Charity not found" });
      }
      
      res.status(200).json(charity);
    } catch (error) {
      handleApiError(res, error);
    }
  });

  app.post("/api/charities", async (req, res) => {
    try {
      const charityData = insertCharitySchema.parse(req.body);
      const charity = await storage.createCharity(charityData);
      res.status(201).json(charity);
    } catch (error) {
      handleApiError(res, error);
    }
  });

  app.get("/api/charity-votes/:periodId", async (req, res) => {
    try {
      const { periodId } = req.params;
      const votes = await storage.getCharityVotesByPeriod(periodId);
      
      // Get charity details for each vote
      const votesWithDetails = await Promise.all(votes.map(async (vote) => {
        const charity = await storage.getCharity(vote.charityId);
        return {
          ...vote,
          charity: charity || { name: "Unknown Charity" }
        };
      }));
      
      res.status(200).json(votesWithDetails);
    } catch (error) {
      handleApiError(res, error);
    }
  });

  app.post("/api/charity-votes", async (req, res) => {
    try {
      const voteData = insertCharityVoteSchema.parse(req.body);
      
      // Verify charity exists
      const charity = await storage.getCharity(voteData.charityId);
      if (!charity) {
        return res.status(404).json({ message: "Charity not found" });
      }
      
      // Create the vote
      const vote = await storage.createCharityVote(voteData);
      res.status(201).json(vote);
    } catch (error) {
      handleApiError(res, error);
    }
  });

  app.get("/api/charity-donations/:periodId", async (req, res) => {
    try {
      const { periodId } = req.params;
      const donations = await storage.getCharityDonationsByPeriod(periodId);
      
      // Get charity details for each donation
      const donationsWithDetails = await Promise.all(donations.map(async (donation) => {
        const charity = await storage.getCharity(donation.charityId);
        return {
          ...donation,
          charity: charity || { name: "Unknown Charity" }
        };
      }));
      
      res.status(200).json(donationsWithDetails);
    } catch (error) {
      handleApiError(res, error);
    }
  });

  app.post("/api/charity-donations", async (req, res) => {
    try {
      const donationData = insertCharityDonationSchema.parse(req.body);
      
      // Verify charity exists
      const charity = await storage.getCharity(donationData.charityId);
      if (!charity) {
        return res.status(404).json({ message: "Charity not found" });
      }
      
      // Create the donation
      const donation = await storage.createCharityDonation(donationData);
      res.status(201).json(donation);
    } catch (error) {
      handleApiError(res, error);
    }
  });

  return httpServer;
}
