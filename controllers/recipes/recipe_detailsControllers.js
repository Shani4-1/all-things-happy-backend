const express = require("express");

const recipeDetails = express.Router();

const {
    getAllRecipesDetails,
    getOneRecipeDetails,
    addNewRecipeDetails,
    updateRecipeDetails,
    deleteRecipeDetails
} = require("../../queries/recipes/recipeDetails.js");

const validateDetails = require("../../validations/recipeValidators/recipe_detailsValidator.js");

recipeDetails.get("/", async (req, res) => {
    const allDetails = await getAllRecipesDetails();
    if (!allDetails.error) {
        res.status(200).json(allDetails);
    } else {
        res.status(500).json({error: "server error"})
    }
});

recipeDetails.get("/:id", async (req, res) => {
    const { id } = req.params;
    const recipeDetails = await getOneRecipeDetails(id);
    if (!recipeDetails.error) {
        res.status(200).json(recipeDetails)
    } else if (recipeDetails.error.code === 0) {
        res.status(404).json({error: "recipe details not found"})
    } else {
        res.status(500).json({error: "server error"})
    }
});

recipeDetails.post(
    "/",
    validateDetails,
    async (req, res) => {
      try {
        const { name, description, image, instructions, servings, calories } = req.body;
        const newRecipeDetails = await addNewRecipeDetails({
          name,
          description,
          image,
          instructions,
          servings,
          calories,
        });
        return res.status(201).json(newRecipeDetails);
      } catch (error) {
        return res.status(500).json({ error: "server error" });
      }
    }
  );
  
  recipeDetails.put("/:id", validateDetails, async (req, res) => {
    const { id } = req.params;
    const recipeDetails = req.body;
  
    try {
      const updatedRecipeDetails = await updateRecipeDetails(id, recipeDetails);
      if (updatedRecipeDetails.id) {
        res.status(200).json(updatedRecipeDetails);
      } else {
        res.status(404).json({ error: "recipe details not found" });
      }
    } catch (error) {
      return res.status(500).json({ error: "server error" });
    }
  });
  
  recipeDetails.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const deletedRecipeDetails = await deleteRecipeDetails(id);
    if (deletedRecipeDetails.id) {
      res.status(200).json(deletedRecipeDetails);
    } else {
      res.status(404).json({ error: "recipe details not found" });
    }
  });
  
  module.exports = recipeDetails;
  