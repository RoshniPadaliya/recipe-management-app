// // controllers/recipeController.js
// const asyncHandler = require('express-async-handler');
// const Recipe = require('../models/Recipe');

// // @desc    Create a new recipe
// // @route   POST /api/recipes
// // @access  Private
// const createRecipe = asyncHandler(async (req, res) => {
//   const { title, ingredients, instructions, cuisineType } = req.body;

//   if (!title || !ingredients || !instructions || !cuisineType) {
//     res.status(400);
//     throw new Error('Please include all fields');
//   }

//   const recipe = await Recipe.create({
//     title,
//     ingredients,
//     instructions,
//     cuisineType,
//     author: req.user._id,
//   });

//   res.status(201).json(recipe);
// });

// // @desc    Get all recipes or search by query
// // @route   GET /api/recipes
// // @access  Public
// const getRecipes = asyncHandler(async (req, res) => {
//   const recipes = await Recipe.find().populate('author', 'name email');
//   res.json(recipes);
// });

// // @desc    Get single recipe by ID
// // @route   GET /api/recipes/:id
// // @access  Public
// const getRecipeById = asyncHandler(async (req, res) => {
//   const recipe = await Recipe.findById(req.params.id).populate(
//     'author',
//     'name email'
//   );

//   if (recipe) {
//     res.json(recipe);
//   } else {
//     res.status(404);
//     throw new Error('Recipe not found');
//   }
// });

// // @desc    Update a recipe
// // @route   PUT /api/recipes/:id
// // @access  Private
// const updateRecipe = asyncHandler(async (req, res) => {
//   const { title, ingredients, instructions, cuisineType } = req.body;

//   const recipe = await Recipe.findById(req.params.id);

//   if (!recipe) {
//     res.status(404);
//     throw new Error('Recipe not found');
//   }

//   // Check if the logged-in user is the author
//   if (recipe.author.toString() !== req.user._id.toString()) {
//     res.status(401);
//     throw new Error('Not authorized to update this recipe');
//   }

//   recipe.title = title || recipe.title;
//   recipe.ingredients = ingredients || recipe.ingredients;
//   recipe.instructions = instructions || recipe.instructions;
//   recipe.cuisineType = cuisineType || recipe.cuisineType;

//   const updatedRecipe = await recipe.save();
//   res.json(updatedRecipe);
// });

// // @desc    Delete a recipe
// // @route   DELETE /api/recipes/:id
// // @access  Private
// const deleteRecipe = asyncHandler(async (req, res) => {
//   const recipe = await Recipe.findById(req.params.id);

//   if (!recipe) {
//     res.status(404);
//     throw new Error('Recipe not found');
//   }

//   // Check if the logged-in user is the author
//   if (recipe.author.toString() !== req.user._id.toString()) {
//     res.status(401);
//     throw new Error('Not authorized to delete this recipe');
//   }

//   await recipe.remove();
//   res.json({ message: 'Recipe removed' });
// });

// module.exports = {
//   createRecipe,
//   getRecipes,
//   getRecipeById,
//   updateRecipe,
//   deleteRecipe,
// };

// controllers/recipeController.js
const asyncHandler = require('express-async-handler');
const Recipe = require('../models/Recipe');

// @desc    Create a new recipe
// @route   POST /api/recipes
// @access  Private
const createRecipe = asyncHandler(async (req, res) => {
  const { title, ingredients, instructions, cuisineType } = req.body;

  if (!title || !ingredients || !instructions || !cuisineType) {
    res.status(400);
    throw new Error('Please include all fields');
  }

  const recipe = await Recipe.create({
    title,
    ingredients,
    instructions,
    cuisineType,
    author: req.user._id,
  });

  res.status(201).json(recipe);
});

// @desc    Get all recipes
// @route   GET /api/recipes
// @access  Public
const getRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find().populate('author', 'name email');
  res.json(recipes);
});

// @desc    Get single recipe by ID
// @route   GET /api/recipes/:id
// @access  Public
const getRecipeById = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id).populate(
    'author',
    'name email'
  );

  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404);
    throw new Error('Recipe not found');
  }
});

// @desc    Update a recipe
// @route   PUT /api/recipes/:id
// @access  Private
const updateRecipe = asyncHandler(async (req, res) => {
  const { title, ingredients, instructions, cuisineType } = req.body;

  const recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    res.status(404);
    throw new Error('Recipe not found');
  }

  // Check if the logged-in user is the author
  if (recipe.author.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to update this recipe');
  }

  recipe.title = title || recipe.title;
  recipe.ingredients = ingredients || recipe.ingredients;
  recipe.instructions = instructions || recipe.instructions;
  recipe.cuisineType = cuisineType || recipe.cuisineType;

  const updatedRecipe = await recipe.save();
  res.json(updatedRecipe);
});

// @desc    Delete a recipe
// @route   DELETE /api/recipes/:id
// @access  Private
const deleteRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    res.status(404);
    throw new Error('Recipe not found');
  }

  // Check if the logged-in user is the author
  if (recipe.author.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to delete this recipe');
  }

  await recipe.remove();
  res.json({ message: 'Recipe removed' });
});

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
