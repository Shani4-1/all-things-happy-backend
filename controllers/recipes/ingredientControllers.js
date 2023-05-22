const express = require("express");

const ingredients = express.Router();

const {
    getAllIngredients,
    getOneIngredient,
    addIngredient,
    updateIngredient,
    deleteIngredient
} = require("../../queries/recipes/ingredients.js");


const validateIngredient = require("../../validations/recipeValidators/ingredientValidator.js");

ingredients.get("/", async (req, res) => {
    const allIngredients = await getAllIngredients();
    if (!allIngredients.error) {
        res.status(200).json(allIngredients);
    } else {
        res.status(500).json({error: "server error"});
    }
});

ingredients.get("/:id", async (req, res) => {
    const { id } = req.params;
    const ingredient = await getOneIngredient(id);
    if (!ingredient.error) {
        res.status(200).json(ingredient);
    } else if (ingredient.error.code === 0) {
        res.status(404).json({error: "ingredient not found"});
    } else {
        res.status(500).json({error: "server error"})
    }
});

ingredients.post("/", validateIngredient, (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        return res.status(422).json({error: "body requires name"});
    }
    return next(); 
},
async (req, res) => {
    try {
        const { name } = req.body;
        const newIngredient = await addIngredient({
            name
        });
        return res.status(201).json(newIngredient);
    } catch (error) {
        return res.status(500).json({error: "server error"});
    }
});

ingredients.put("/:id", validateIngredient, async (req, res) => {
    const { id } = req.params;
    const ingredient = req.body;

    try {
        const updatedIngredient = await updateIngredient(id, ingredient);
        if (updatedIngredient.id) {
            res.status(200).json(updatedIngredient);
        } else {
            res.status(404).json({error: "ingredient not found"});
        }
    } catch (error) {
        res.status(500).json({error: "server error"});
    }
});

ingredients.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const deletedIngredient = await deleteIngredient(id);

    if (deletedIngredient.id) {
        res.status(201).json(deletedIngredient);
    } else {
        res.status(404).json({error: "ingredient not found"})
    }
});

module.exports = ingredients;