const express = require("express");

const categories = express.Router();

const {
    getAllcategories,
    getOneCategory,
    addNewCategory,
    updateCategory,
    deleteCateory
} = require("../../queries/quotes/categories,js");

const validateCategory = require("../../validations/quoteValidators/categoryValidator.js");

categories.get("/", async (req, res) => {
    const allCategories = await getAllcategories();
    if (!allCategories.error) {
        res.status(200).json(allCategories);
    } else {
        res.status(500).json({error: "server error"});
    }
});

categories.get("/:id", async (req, res) => {
    const { id } = req.params;
    const category = await getOneCategory(id);

    if (!category.error) {
        res.status(200).json(category);   
    } else if (category.error.code === 0) {
        res.status(404).json({error: "category not found"});
    } else {
        res.status(500).json({error: "server error"})
    }
});

categories.post("/", validateCategory, (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        return res.status(422).json({error: "body requires name"});
    }
    return next();
},
async (req, res) => {
    try {

        const {name} = req.body
        const newCategory = await addNewCategory({
            name
        });
        return res.status(201).json(newCategory);
    } catch (error) {
        return res.status(500).json({error: "server error"})
    }
    
});
categories.put("/:id", validateCategory, async (req, res) => {
    const { id } = req.params;
    const category = req.body

    try {
        const updatedCategory = await updateCategory(id, category);

        if (updatedCategory.id) {
            res.status(200).json(updatedCategory);
        } else {
            res.status(404).json({error: "category not found"});
        }
    } catch (error) {
        res.status(500).json({server: "error"})
    }
});

categories.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const deletedCategory = await deleteCateory(id);

    if (deletedCategory.id) {
        res.status(201).json(deletedCategory);
    } else {
        res.status(404).json({error: "category not found"});
    }
});

module.exports = categories;