const express = require("express");

const recipes = express.Router();
const validateRecipe = require("../validations/recipeValidator.js");

const {
  getAllRecipes,
  getOneRecipe,
  addNewRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../queries/recipes.js");

recipes.get("/", async (req, res) => {
  const allRecipes = await getAllRecipes();
  if (!allRecipes.error) {
    res.status(200).json(allRecipes);
  } else {
    res.status(500).json({ error: "server error" });
  }
});

recipes.get("/:id", async (req, res) => {
  const { id } = req.params;
  const recipe = await getOneRecipe(id);

  if (!recipe.error) {
    res.status(200).json(recipe);
  } else if (recipe.error.code) {
    res.status.apply(404).json({ error: "recipe not found" });
  } else {
    res.status(500).json({ error: "server error" });
  }
});

recipes.post(
  "/",
  validateRecipe,
  (req, res, next) => {
    const { recipe_details_id, ingredient_id, measure_id, amount } = req.body;
    if (!recipe_details_id || !ingredient_id || !measure_id || !amount) {
      return res
        .status(422)
        .json({
          error:
            "body requires recipe_details_id, ingredient_id, measure_id, amount",
        });
    }
    return next();
  },
  async (req, res) => {
    try {
      const { recipe_details_id, ingredient_id, measure_id, amount } = req.body;
      const newRecipe = await addNewRecipe({
        recipe_details_id,
        ingredient_id,
        measure_id,
        amount,
      });
      return res.status(201).json(newRecipe);
    } catch (error) {
      return res.status(500).json({ error: "server error" });
    }
  }
);

recipes.put("/:id", validateRecipe, async (req, res) => {
    const { id } = req.params;
    const recipe = req.body;

    try {

        const updatedRecipe = await updateRecipe(id, recipe);
        if (updatedRecipe.id) {
            res.status(200).json(updatedRecipe);
        } else {
            res.status(404).json({error: "recipe not found"});
        }
    } catch (error) {
        return res.status(500).json({error: "server error"})
    }
    
});

recipes.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const deletedRecipe = await deleteRecipe(id);
    if (deletedRecipe.id) {
        res.status(200).json(deletedRecipe);
    } else {
        res.status(404).json({error: "recipe not found"})
    }
});

module.exports = recipes;
