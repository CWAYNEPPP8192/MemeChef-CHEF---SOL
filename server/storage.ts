import { users, ingredients, userIngredients, recipes, farmPools, userStakes, competitions, competitionEntries, charities, charityVotes, charityDonations } from "@shared/schema";
import type { 
  User, InsertUser, 
  Ingredient, InsertIngredient, 
  UserIngredient, InsertUserIngredient,
  Recipe, InsertRecipe,
  FarmPool, InsertFarmPool,
  UserStake, InsertUserStake,
  Competition, InsertCompetition,
  CompetitionEntry, InsertCompetitionEntry,
  Charity, InsertCharity,
  CharityVote, InsertCharityVote,
  CharityDonation, InsertCharityDonation
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByWalletAddress(walletAddress: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserTokens(userId: number, amount: number): Promise<User | undefined>;
  
  // Ingredients
  getIngredient(id: number): Promise<Ingredient | undefined>;
  getAllIngredients(): Promise<Ingredient[]>;
  getIngredientsByRarity(rarity: string): Promise<Ingredient[]>;
  createIngredient(ingredient: InsertIngredient): Promise<Ingredient>;
  
  // User Ingredients
  getUserIngredients(userId: number): Promise<(UserIngredient & { ingredient: Ingredient })[]>;
  getUserIngredient(userId: number, ingredientId: number): Promise<UserIngredient | undefined>;
  createUserIngredient(userIngredient: InsertUserIngredient): Promise<UserIngredient>;
  updateUserIngredientQuantity(id: number, quantity: number): Promise<UserIngredient | undefined>;
  
  // Recipes
  getRecipe(id: number): Promise<Recipe | undefined>;
  getAllRecipes(): Promise<Recipe[]>;
  getRecipesByUser(userId: number): Promise<Recipe[]>;
  getPopularRecipes(limit?: number): Promise<Recipe[]>;
  createRecipe(recipe: InsertRecipe): Promise<Recipe>;
  updateRecipeLikes(id: number, likes: number): Promise<Recipe | undefined>;
  updateRecipeShares(id: number, shares: number): Promise<Recipe | undefined>;
  
  // Farm Pools
  getFarmPool(id: number): Promise<FarmPool | undefined>;
  getAllFarmPools(): Promise<FarmPool[]>;
  getActiveFarmPools(): Promise<FarmPool[]>;
  createFarmPool(farmPool: InsertFarmPool): Promise<FarmPool>;
  updateFarmPoolStake(id: number, amount: number): Promise<FarmPool | undefined>;
  
  // User Stakes
  getUserStake(id: number): Promise<UserStake | undefined>;
  getUserStakesByUser(userId: number): Promise<(UserStake & { farmPool: FarmPool })[]>;
  getUserStakeByUserAndFarm(userId: number, farmId: number): Promise<UserStake | undefined>;
  createUserStake(userStake: InsertUserStake): Promise<UserStake>;
  updateUserStakeHarvest(id: number): Promise<UserStake | undefined>;
  deactivateUserStake(id: number): Promise<UserStake | undefined>;
  
  // Competitions
  getCompetition(id: number): Promise<Competition | undefined>;
  getActiveCompetitions(): Promise<Competition[]>;
  getPastCompetitions(): Promise<Competition[]>;
  createCompetition(competition: InsertCompetition): Promise<Competition>;
  
  // Competition Entries
  getCompetitionEntry(id: number): Promise<CompetitionEntry | undefined>;
  getCompetitionEntriesByCompetition(competitionId: number): Promise<(CompetitionEntry & { recipe: Recipe, user: User })[]>;
  getCompetitionEntriesByUser(userId: number): Promise<(CompetitionEntry & { competition: Competition, recipe: Recipe })[]>;
  createCompetitionEntry(entry: InsertCompetitionEntry): Promise<CompetitionEntry>;
  voteForCompetitionEntry(id: number): Promise<CompetitionEntry | undefined>;
  updateCompetitionEntryRank(id: number, rank: number, reward: number): Promise<CompetitionEntry | undefined>;
  
  // Charities
  getCharity(id: number): Promise<Charity | undefined>;
  getAllCharities(): Promise<Charity[]>;
  createCharity(charity: InsertCharity): Promise<Charity>;
  
  // Charity Votes
  getCharityVoteByUserAndPeriod(userId: number, periodId: string): Promise<CharityVote | undefined>;
  getCharityVotesByPeriod(periodId: string): Promise<{ charityId: number, votes: number }[]>;
  createCharityVote(vote: InsertCharityVote): Promise<CharityVote>;
  
  // Charity Donations
  getCharityDonation(id: number): Promise<CharityDonation | undefined>;
  getCharityDonationsByPeriod(periodId: string): Promise<CharityDonation[]>;
  createCharityDonation(donation: InsertCharityDonation): Promise<CharityDonation>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private ingredients: Map<number, Ingredient>;
  private userIngredients: Map<number, UserIngredient>;
  private recipes: Map<number, Recipe>;
  private farmPools: Map<number, FarmPool>;
  private userStakes: Map<number, UserStake>;
  private competitions: Map<number, Competition>;
  private competitionEntries: Map<number, CompetitionEntry>;
  private charities: Map<number, Charity>;
  private charityVotes: Map<number, CharityVote>;
  private charityDonations: Map<number, CharityDonation>;
  
  private userIdCounter: number = 1;
  private ingredientIdCounter: number = 1;
  private userIngredientIdCounter: number = 1;
  private recipeIdCounter: number = 1;
  private farmPoolIdCounter: number = 1;
  private userStakeIdCounter: number = 1;
  private competitionIdCounter: number = 1;
  private competitionEntryIdCounter: number = 1;
  private charityIdCounter: number = 1;
  private charityVoteIdCounter: number = 1;
  private charityDonationIdCounter: number = 1;

  constructor() {
    this.users = new Map();
    this.ingredients = new Map();
    this.userIngredients = new Map();
    this.recipes = new Map();
    this.farmPools = new Map();
    this.userStakes = new Map();
    this.competitions = new Map();
    this.competitionEntries = new Map();
    this.charities = new Map();
    this.charityVotes = new Map();
    this.charityDonations = new Map();
    
    // Initialize with some data
    this.initializeData();
  }

  private initializeData() {
    // Add some initial farm pools
    this.createFarmPool({
      name: "Meme Spice Garden",
      description: "Harvest rare spice ingredients",
      apy: 120,
      minimumStake: 100,
      isActive: true,
      ingredientTypes: [1, 2, 3],
      legendaryChance: 5,
      harvestPeriod: 24
    });

    this.createFarmPool({
      name: "Crypto Sauce Factory",
      description: "Produce legendary sauce ingredients",
      apy: 95,
      minimumStake: 250,
      isActive: true,
      ingredientTypes: [2, 4, 5],
      legendaryChance: 8,
      harvestPeriod: 12
    });

    // Add some initial ingredients
    this.createIngredient({
      name: "Spicy Pepe",
      description: "A rare spicy meme ingredient",
      rarity: "Rare",
      imageUrl: "https://images.unsplash.com/photo-1573225342350-16731dd9bf3d"
    });

    this.createIngredient({
      name: "Doge Sauce",
      description: "Common sauce made from Doge memes",
      rarity: "Common",
      imageUrl: "https://images.unsplash.com/photo-1633177317976-3f9bc45e1d1d"
    });

    this.createIngredient({
      name: "Moon Cheese",
      description: "Uncommon cheese that takes your recipes to the moon",
      rarity: "Uncommon",
      imageUrl: "https://images.unsplash.com/photo-1589881133595-a3c085cb731d"
    });

    this.createIngredient({
      name: "Elon's Secret Spice",
      description: "Epic spice that adds a tweet of flavor",
      rarity: "Epic",
      imageUrl: "https://pixabay.com/get/g920fece6fcb63d2fc2459040beface8947688975371c4ef6ad3e6f11e6fbe7f5bef0fbab013856f8f7bfc1a1e079c25082985b27c1902db7ae562de8ecc7bf93_1280.jpg"
    });

    // Add a competition
    this.createCompetition({
      title: "Weekly Cook-off",
      description: "Submit your best meme recipes and win CHEF tokens!",
      theme: "Crypto Kitchen Disasters",
      startDate: new Date(),
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      prizePool: 42069,
      isActive: true
    });

    // Add some charities
    this.createCharity({
      name: "World Food Program",
      description: "Fighting global hunger through emergency response and community support.",
      website: "https://www.wfp.org/"
    });

    this.createCharity({
      name: "Feeding America",
      description: "Nationwide network of food banks providing meals to those in need.",
      website: "https://www.feedingamerica.org/"
    });

    this.createCharity({
      name: "Action Against Hunger",
      description: "Combating malnutrition and providing clean water in over 45 countries.",
      website: "https://www.actionagainsthunger.org/"
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async getUserByWalletAddress(walletAddress: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.walletAddress === walletAddress
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const now = new Date();
    const user: User = { 
      ...insertUser, 
      id, 
      chefTokens: 1000, // Give new users some tokens to start
      createdAt: now 
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserTokens(userId: number, amount: number): Promise<User | undefined> {
    const user = await this.getUser(userId);
    if (!user) return undefined;
    
    const updatedUser = { 
      ...user, 
      chefTokens: Math.max(0, (user.chefTokens || 0) + amount) // Ensure tokens don't go negative
    };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  // Ingredient methods
  async getIngredient(id: number): Promise<Ingredient | undefined> {
    return this.ingredients.get(id);
  }

  async getAllIngredients(): Promise<Ingredient[]> {
    return Array.from(this.ingredients.values());
  }

  async getIngredientsByRarity(rarity: string): Promise<Ingredient[]> {
    return Array.from(this.ingredients.values()).filter(
      (ingredient) => ingredient.rarity === rarity
    );
  }

  async createIngredient(insertIngredient: InsertIngredient): Promise<Ingredient> {
    const id = this.ingredientIdCounter++;
    const now = new Date();
    const ingredient: Ingredient = { ...insertIngredient, id, createdAt: now };
    this.ingredients.set(id, ingredient);
    return ingredient;
  }

  // User Ingredients methods
  async getUserIngredients(userId: number): Promise<(UserIngredient & { ingredient: Ingredient })[]> {
    const userIngredients = Array.from(this.userIngredients.values()).filter(
      (ui) => ui.userId === userId
    );
    
    return userIngredients.map(ui => {
      const ingredient = this.ingredients.get(ui.ingredientId);
      if (!ingredient) {
        throw new Error(`Ingredient with ID ${ui.ingredientId} not found`);
      }
      return { ...ui, ingredient };
    });
  }

  async getUserIngredient(userId: number, ingredientId: number): Promise<UserIngredient | undefined> {
    return Array.from(this.userIngredients.values()).find(
      (ui) => ui.userId === userId && ui.ingredientId === ingredientId
    );
  }

  async createUserIngredient(insertUserIngredient: InsertUserIngredient): Promise<UserIngredient> {
    // Check if the user already has this ingredient
    const existing = await this.getUserIngredient(
      insertUserIngredient.userId, 
      insertUserIngredient.ingredientId
    );
    
    if (existing) {
      // Update quantity instead of creating a new entry
      return this.updateUserIngredientQuantity(
        existing.id, 
        existing.quantity + (insertUserIngredient.quantity || 1)
      ) as Promise<UserIngredient>;
    }
    
    const id = this.userIngredientIdCounter++;
    const now = new Date();
    const userIngredient: UserIngredient = { 
      ...insertUserIngredient, 
      id, 
      createdAt: now 
    };
    this.userIngredients.set(id, userIngredient);
    return userIngredient;
  }

  async updateUserIngredientQuantity(id: number, quantity: number): Promise<UserIngredient | undefined> {
    const userIngredient = this.userIngredients.get(id);
    if (!userIngredient) return undefined;
    
    if (quantity <= 0) {
      // Remove if quantity is 0 or negative
      this.userIngredients.delete(id);
      return { ...userIngredient, quantity: 0 };
    }
    
    const updatedUserIngredient = { ...userIngredient, quantity };
    this.userIngredients.set(id, updatedUserIngredient);
    return updatedUserIngredient;
  }

  // Recipe methods
  async getRecipe(id: number): Promise<Recipe | undefined> {
    return this.recipes.get(id);
  }

  async getAllRecipes(): Promise<Recipe[]> {
    return Array.from(this.recipes.values());
  }

  async getRecipesByUser(userId: number): Promise<Recipe[]> {
    return Array.from(this.recipes.values()).filter(
      (recipe) => recipe.creatorId === userId
    );
  }

  async getPopularRecipes(limit: number = 10): Promise<Recipe[]> {
    return Array.from(this.recipes.values())
      .sort((a, b) => (b.likes + b.viralityScore) - (a.likes + a.viralityScore))
      .slice(0, limit);
  }

  async createRecipe(insertRecipe: InsertRecipe): Promise<Recipe> {
    const id = this.recipeIdCounter++;
    const now = new Date();
    const recipe: Recipe = { 
      ...insertRecipe, 
      id, 
      likes: 0, 
      shares: 0, 
      viralityScore: 0, 
      createdAt: now 
    };
    this.recipes.set(id, recipe);
    return recipe;
  }

  async updateRecipeLikes(id: number, likes: number): Promise<Recipe | undefined> {
    const recipe = await this.getRecipe(id);
    if (!recipe) return undefined;
    
    const updatedRecipe = { ...recipe, likes };
    this.recipes.set(id, updatedRecipe);
    return updatedRecipe;
  }

  async updateRecipeShares(id: number, shares: number): Promise<Recipe | undefined> {
    const recipe = await this.getRecipe(id);
    if (!recipe) return undefined;
    
    const updatedRecipe = { ...recipe, shares };
    
    // Update virality score based on likes and shares
    updatedRecipe.viralityScore = Math.floor((updatedRecipe.likes * 0.7) + (updatedRecipe.shares * 1.5));
    
    this.recipes.set(id, updatedRecipe);
    return updatedRecipe;
  }

  // Farm Pools methods
  async getFarmPool(id: number): Promise<FarmPool | undefined> {
    return this.farmPools.get(id);
  }

  async getAllFarmPools(): Promise<FarmPool[]> {
    return Array.from(this.farmPools.values());
  }

  async getActiveFarmPools(): Promise<FarmPool[]> {
    return Array.from(this.farmPools.values()).filter(
      (pool) => pool.isActive
    );
  }

  async createFarmPool(insertFarmPool: InsertFarmPool): Promise<FarmPool> {
    const id = this.farmPoolIdCounter++;
    const now = new Date();
    const farmPool: FarmPool = { 
      ...insertFarmPool, 
      id, 
      totalStaked: 0, 
      createdAt: now 
    };
    this.farmPools.set(id, farmPool);
    return farmPool;
  }

  async updateFarmPoolStake(id: number, amount: number): Promise<FarmPool | undefined> {
    const farmPool = await this.getFarmPool(id);
    if (!farmPool) return undefined;
    
    const updatedFarmPool = { 
      ...farmPool, 
      totalStaked: Math.max(0, farmPool.totalStaked + amount) // Ensure totalStaked doesn't go negative
    };
    this.farmPools.set(id, updatedFarmPool);
    return updatedFarmPool;
  }

  // User Stakes methods
  async getUserStake(id: number): Promise<UserStake | undefined> {
    return this.userStakes.get(id);
  }

  async getUserStakesByUser(userId: number): Promise<(UserStake & { farmPool: FarmPool })[]> {
    const userStakes = Array.from(this.userStakes.values()).filter(
      (stake) => stake.userId === userId && stake.isActive
    );
    
    return userStakes.map(stake => {
      const farmPool = this.farmPools.get(stake.farmId);
      if (!farmPool) {
        throw new Error(`Farm pool with ID ${stake.farmId} not found`);
      }
      return { ...stake, farmPool };
    });
  }

  async getUserStakeByUserAndFarm(userId: number, farmId: number): Promise<UserStake | undefined> {
    return Array.from(this.userStakes.values()).find(
      (stake) => stake.userId === userId && stake.farmId === farmId && stake.isActive
    );
  }

  async createUserStake(insertUserStake: InsertUserStake): Promise<UserStake> {
    const id = this.userStakeIdCounter++;
    const now = new Date();
    
    // Calculate end date if provided in days
    let endDate = insertUserStake.endDate;
    
    const userStake: UserStake = { 
      ...insertUserStake, 
      id, 
      startDate: now,
      endDate,
      lastHarvest: now,
      isActive: true,
      createdAt: now 
    };
    
    this.userStakes.set(id, userStake);
    
    // Update farm pool's total staked amount
    await this.updateFarmPoolStake(insertUserStake.farmId, insertUserStake.amount);
    
    // Deduct tokens from user
    await this.updateUserTokens(insertUserStake.userId, -insertUserStake.amount);
    
    return userStake;
  }

  async updateUserStakeHarvest(id: number): Promise<UserStake | undefined> {
    const userStake = await this.getUserStake(id);
    if (!userStake) return undefined;
    
    const now = new Date();
    const updatedUserStake = { ...userStake, lastHarvest: now };
    this.userStakes.set(id, updatedUserStake);
    return updatedUserStake;
  }

  async deactivateUserStake(id: number): Promise<UserStake | undefined> {
    const userStake = await this.getUserStake(id);
    if (!userStake || !userStake.isActive) return undefined;
    
    // Update farm pool's total staked amount
    await this.updateFarmPoolStake(userStake.farmId, -userStake.amount);
    
    // Return tokens to user
    await this.updateUserTokens(userStake.userId, userStake.amount);
    
    const updatedUserStake = { ...userStake, isActive: false };
    this.userStakes.set(id, updatedUserStake);
    return updatedUserStake;
  }

  // Competition methods
  async getCompetition(id: number): Promise<Competition | undefined> {
    return this.competitions.get(id);
  }

  async getActiveCompetitions(): Promise<Competition[]> {
    const now = new Date();
    return Array.from(this.competitions.values()).filter(
      (comp) => comp.isActive && comp.endDate > now
    );
  }

  async getPastCompetitions(): Promise<Competition[]> {
    const now = new Date();
    return Array.from(this.competitions.values()).filter(
      (comp) => comp.endDate <= now
    ).sort((a, b) => b.endDate.getTime() - a.endDate.getTime());
  }

  async createCompetition(insertCompetition: InsertCompetition): Promise<Competition> {
    const id = this.competitionIdCounter++;
    const now = new Date();
    const competition: Competition = { 
      ...insertCompetition, 
      id, 
      createdAt: now 
    };
    this.competitions.set(id, competition);
    return competition;
  }

  // Competition Entries methods
  async getCompetitionEntry(id: number): Promise<CompetitionEntry | undefined> {
    return this.competitionEntries.get(id);
  }

  async getCompetitionEntriesByCompetition(competitionId: number): Promise<(CompetitionEntry & { recipe: Recipe, user: User })[]> {
    const entries = Array.from(this.competitionEntries.values()).filter(
      (entry) => entry.competitionId === competitionId
    ).sort((a, b) => (b.votes - a.votes));
    
    return entries.map(entry => {
      const recipe = this.recipes.get(entry.recipeId);
      const user = this.users.get(entry.userId);
      if (!recipe) {
        throw new Error(`Recipe with ID ${entry.recipeId} not found`);
      }
      if (!user) {
        throw new Error(`User with ID ${entry.userId} not found`);
      }
      return { ...entry, recipe, user };
    });
  }

  async getCompetitionEntriesByUser(userId: number): Promise<(CompetitionEntry & { competition: Competition, recipe: Recipe })[]> {
    const entries = Array.from(this.competitionEntries.values()).filter(
      (entry) => entry.userId === userId
    );
    
    return entries.map(entry => {
      const competition = this.competitions.get(entry.competitionId);
      const recipe = this.recipes.get(entry.recipeId);
      if (!competition) {
        throw new Error(`Competition with ID ${entry.competitionId} not found`);
      }
      if (!recipe) {
        throw new Error(`Recipe with ID ${entry.recipeId} not found`);
      }
      return { ...entry, competition, recipe };
    });
  }

  async createCompetitionEntry(insertEntry: InsertCompetitionEntry): Promise<CompetitionEntry> {
    // Check if the user already has an entry for this competition
    const existing = Array.from(this.competitionEntries.values()).find(
      (entry) => entry.competitionId === insertEntry.competitionId && entry.userId === insertEntry.userId
    );
    
    if (existing) {
      throw new Error('User already has an entry for this competition');
    }
    
    const id = this.competitionEntryIdCounter++;
    const now = new Date();
    const entry: CompetitionEntry = { 
      ...insertEntry, 
      id, 
      votes: 0,
      rank: null,
      reward: null,
      createdAt: now 
    };
    this.competitionEntries.set(id, entry);
    return entry;
  }

  async voteForCompetitionEntry(id: number): Promise<CompetitionEntry | undefined> {
    const entry = await this.getCompetitionEntry(id);
    if (!entry) return undefined;
    
    const updatedEntry = { ...entry, votes: entry.votes + 1 };
    this.competitionEntries.set(id, updatedEntry);
    return updatedEntry;
  }

  async updateCompetitionEntryRank(id: number, rank: number, reward: number): Promise<CompetitionEntry | undefined> {
    const entry = await this.getCompetitionEntry(id);
    if (!entry) return undefined;
    
    const updatedEntry = { ...entry, rank, reward };
    this.competitionEntries.set(id, updatedEntry);
    
    // Award the user with CHEF tokens
    if (reward > 0) {
      await this.updateUserTokens(entry.userId, reward);
    }
    
    return updatedEntry;
  }

  // Charity methods
  async getCharity(id: number): Promise<Charity | undefined> {
    return this.charities.get(id);
  }

  async getAllCharities(): Promise<Charity[]> {
    return Array.from(this.charities.values());
  }

  async createCharity(insertCharity: InsertCharity): Promise<Charity> {
    const id = this.charityIdCounter++;
    const now = new Date();
    const charity: Charity = { ...insertCharity, id, createdAt: now };
    this.charities.set(id, charity);
    return charity;
  }

  // Charity Votes methods
  async getCharityVoteByUserAndPeriod(userId: number, periodId: string): Promise<CharityVote | undefined> {
    return Array.from(this.charityVotes.values()).find(
      (vote) => vote.userId === userId && vote.periodId === periodId
    );
  }

  async getCharityVotesByPeriod(periodId: string): Promise<{ charityId: number, votes: number }[]> {
    const votes = Array.from(this.charityVotes.values()).filter(
      (vote) => vote.periodId === periodId
    );
    
    // Count votes by charity
    const voteCounts = new Map<number, number>();
    votes.forEach(vote => {
      const current = voteCounts.get(vote.charityId) || 0;
      voteCounts.set(vote.charityId, current + 1);
    });
    
    return Array.from(voteCounts.entries()).map(([charityId, votes]) => ({
      charityId,
      votes
    }));
  }

  async createCharityVote(insertVote: InsertCharityVote): Promise<CharityVote> {
    // Check if user already voted in this period
    const existing = await this.getCharityVoteByUserAndPeriod(
      insertVote.userId,
      insertVote.periodId
    );
    
    if (existing) {
      throw new Error('User already voted in this period');
    }
    
    const id = this.charityVoteIdCounter++;
    const now = new Date();
    const vote: CharityVote = { ...insertVote, id, createdAt: now };
    this.charityVotes.set(id, vote);
    return vote;
  }

  // Charity Donations methods
  async getCharityDonation(id: number): Promise<CharityDonation | undefined> {
    return this.charityDonations.get(id);
  }

  async getCharityDonationsByPeriod(periodId: string): Promise<CharityDonation[]> {
    return Array.from(this.charityDonations.values()).filter(
      (donation) => donation.periodId === periodId
    );
  }

  async createCharityDonation(insertDonation: InsertCharityDonation): Promise<CharityDonation> {
    const id = this.charityDonationIdCounter++;
    const now = new Date();
    const donation: CharityDonation = { ...insertDonation, id, createdAt: now };
    this.charityDonations.set(id, donation);
    return donation;
  }
}

export const storage = new MemStorage();
