import { pgTable, text, serial, integer, boolean, timestamp, json, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  walletAddress: text("wallet_address"),
  chefTokens: integer("chef_tokens").default(0),
  createdAt: timestamp("created_at").defaultNow()
});

// Rarity enum
export const rarityEnum = pgEnum("rarity", [
  "Common",
  "Uncommon",
  "Rare",
  "Epic",
  "Legendary"
]);

// Ingredients table
export const ingredients = pgTable("ingredients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  rarity: rarityEnum("rarity").notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow()
});

// User ingredients (inventory)
export const userIngredients = pgTable("user_ingredients", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  ingredientId: integer("ingredient_id").references(() => ingredients.id).notNull(),
  quantity: integer("quantity").default(1).notNull(),
  createdAt: timestamp("created_at").defaultNow()
});

// Recipes table
export const recipes = pgTable("recipes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  creatorId: integer("creator_id").references(() => users.id).notNull(),
  description: text("description"),
  rarity: rarityEnum("rarity").notNull(),
  imageUrl: text("image_url"),
  tokenAmount: integer("token_amount").notNull(),
  ingredients: json("ingredients").notNull(), // Array of ingredient IDs and quantities
  likes: integer("likes").default(0),
  shares: integer("shares").default(0),
  viralityScore: integer("virality_score").default(0),
  createdAt: timestamp("created_at").defaultNow()
});

// Farm pools
export const farmPools = pgTable("farm_pools", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  apy: integer("apy").notNull(),
  minimumStake: integer("minimum_stake").default(100).notNull(),
  totalStaked: integer("total_staked").default(0).notNull(),
  isActive: boolean("is_active").default(true),
  ingredientTypes: json("ingredient_types").notNull(), // Which ingredients can be harvested
  legendaryChance: integer("legendary_chance").default(5).notNull(), // Percentage
  harvestPeriod: integer("harvest_period").default(24).notNull(), // Hours
  createdAt: timestamp("created_at").defaultNow()
});

// User stakes
export const userStakes = pgTable("user_stakes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  farmId: integer("farm_id").references(() => farmPools.id).notNull(),
  amount: integer("amount").notNull(),
  startDate: timestamp("start_date").defaultNow().notNull(),
  endDate: timestamp("end_date"),
  lastHarvest: timestamp("last_harvest").defaultNow(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow()
});

// Competitions
export const competitions = pgTable("competitions", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  theme: text("theme").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  prizePool: integer("prize_pool").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow()
});

// Competition entries
export const competitionEntries = pgTable("competition_entries", {
  id: serial("id").primaryKey(),
  competitionId: integer("competition_id").references(() => competitions.id).notNull(),
  recipeId: integer("recipe_id").references(() => recipes.id).notNull(),
  userId: integer("user_id").references(() => users.id).notNull(),
  votes: integer("votes").default(0),
  rank: integer("rank"),
  reward: integer("reward"),
  createdAt: timestamp("created_at").defaultNow()
});

// Charities
export const charities = pgTable("charities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  website: text("website"),
  createdAt: timestamp("created_at").defaultNow()
});

// Charity votes
export const charityVotes = pgTable("charity_votes", {
  id: serial("id").primaryKey(),
  charityId: integer("charity_id").references(() => charities.id).notNull(),
  userId: integer("user_id").references(() => users.id).notNull(),
  periodId: text("period_id").notNull(), // E.g. "2026-04" for April 2026
  createdAt: timestamp("created_at").defaultNow()
});

// Charity donations
export const charityDonations = pgTable("charity_donations", {
  id: serial("id").primaryKey(),
  charityId: integer("charity_id").references(() => charities.id).notNull(),
  amount: integer("amount").notNull(),
  usdEquivalent: integer("usd_equivalent").notNull(),
  txHash: text("tx_hash"),
  periodId: text("period_id").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({ 
  id: true, 
  createdAt: true 
});

export const insertIngredientSchema = createInsertSchema(ingredients).omit({ 
  id: true, 
  createdAt: true 
});

export const insertUserIngredientSchema = createInsertSchema(userIngredients).omit({ 
  id: true, 
  createdAt: true 
});

export const insertRecipeSchema = createInsertSchema(recipes).omit({ 
  id: true, 
  createdAt: true, 
  likes: true, 
  shares: true, 
  viralityScore: true 
});

export const insertFarmPoolSchema = createInsertSchema(farmPools).omit({ 
  id: true, 
  createdAt: true, 
  totalStaked: true 
});

export const insertUserStakeSchema = createInsertSchema(userStakes).omit({ 
  id: true, 
  createdAt: true, 
  lastHarvest: true 
});

export const insertCompetitionSchema = createInsertSchema(competitions).omit({ 
  id: true, 
  createdAt: true 
});

export const insertCompetitionEntrySchema = createInsertSchema(competitionEntries).omit({ 
  id: true, 
  createdAt: true, 
  votes: true, 
  rank: true, 
  reward: true 
});

export const insertCharitySchema = createInsertSchema(charities).omit({ 
  id: true, 
  createdAt: true 
});

export const insertCharityVoteSchema = createInsertSchema(charityVotes).omit({ 
  id: true, 
  createdAt: true 
});

export const insertCharityDonationSchema = createInsertSchema(charityDonations).omit({ 
  id: true, 
  createdAt: true 
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Ingredient = typeof ingredients.$inferSelect;
export type InsertIngredient = z.infer<typeof insertIngredientSchema>;

export type UserIngredient = typeof userIngredients.$inferSelect;
export type InsertUserIngredient = z.infer<typeof insertUserIngredientSchema>;

export type Recipe = typeof recipes.$inferSelect;
export type InsertRecipe = z.infer<typeof insertRecipeSchema>;

export type FarmPool = typeof farmPools.$inferSelect;
export type InsertFarmPool = z.infer<typeof insertFarmPoolSchema>;

export type UserStake = typeof userStakes.$inferSelect;
export type InsertUserStake = z.infer<typeof insertUserStakeSchema>;

export type Competition = typeof competitions.$inferSelect;
export type InsertCompetition = z.infer<typeof insertCompetitionSchema>;

export type CompetitionEntry = typeof competitionEntries.$inferSelect;
export type InsertCompetitionEntry = z.infer<typeof insertCompetitionEntrySchema>;

export type Charity = typeof charities.$inferSelect;
export type InsertCharity = z.infer<typeof insertCharitySchema>;

export type CharityVote = typeof charityVotes.$inferSelect;
export type InsertCharityVote = z.infer<typeof insertCharityVoteSchema>;

export type CharityDonation = typeof charityDonations.$inferSelect;
export type InsertCharityDonation = z.infer<typeof insertCharityDonationSchema>;
