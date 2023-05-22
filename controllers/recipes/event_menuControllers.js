const express = require("express");

const menus = express.Router();

const {
    getAllMenus,
    getOneMenu,
    addNewMenu,
    updateMenu,
    deleteMenu,
    
} = require("../../queries/recipes/event_menu.js");

const validateMenu = require("../../validations/recipeValidators/event_menuValidator.js");

menus.get("/", async (req, res) => {
    const allMenus = await getAllMenus();
    if (!allMenus.error) {
        res.status(200).json(allMenus);
    } else {
        res.status(500).json({error: "server error"});
    }
});

menus.get("/:id", async (req, res) => {
    const { id } = req.params;
    const menu = await getOneMenu(id);
    if (!menu.error) {
        res.status(200).json(menu);
    } else if (menu.error.code === 0) {
        res.status(404).json({error: "menu not found"});
    } else {
        res.status(500).json({error: "server error"})
    }
});

menus.post("/", validateMenu, (req, res, next) => {
    const { recipe_id } = req.body;
    if (!recipe_id) {
        return res.status(422).json({error: "body requires recipe_id"});
    }
    return next();
},
async (req, res) => {
    try {
        const {recipe_id} = req.body;
        const newMenu = await addNewMenu({
            recipe_id
        });
        return res.status(201).json(newMenu);
    } catch (error) {

        return res.status(500).json({error: "server error"})
    }
    
});

menus.put("/:id", validateMenu, async (req, res) => {
    const { id } = req.params;
    const menu = req.body;

    try {
        const updatedMenu = await updateMenu(id, menu);
        if (updatedMenu.id) {
            res.status(200).json(updatedMenu);
        } else {
            res.status(404).json({error: "song not found"})
        }
    } catch (error) {
        res.status(500).json({error: "server error"})
    }
});

menus.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const deletedMenu = await deleteMenu(id);

    if (deletedMenu.id) {
        res.status(201).json(deletedMenu);
    } else {
        res.status(404).json({error: "menu not found"});
    }
});

module.exports = menus;