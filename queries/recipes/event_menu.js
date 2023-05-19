const db = require("../../db/dbConfig.js");

const getAllMenus = async () => {
    try {
        const allMenus = await db.any(`SELECT * FROM event_menu`);
        return allMenus;
    } catch (errors) {

        return errors
    }
    
};

const getOneMenu = async (id) => {
    try {
        const menu = await db.one(`SELECT * FROM event_menu WHERE id=${id}`);
        return menu;
    } catch (error) {
        return error;
    }
};

const addNewMenu = async (menu) => {
    try {
        const newMenu = await db.one(`
        INSERT INTO 
        event_menu(recipe_id)
        VALUES
        ($1)
        RETURNING *;`, 
        [menu.recipe_id]
        );
        return newMenu;
    } catch (error) {
        return error;
    }
};

const updateMenu = async (id, menu) => {
    try {
        const updatedMenu = await db.one(`
        UPDATE event_menu SET recipe_id=$1, id=$2 RETURNING *`,
        [menu.recipe_id, id]
        );
        return updatedMenu;
    } catch (error) {
        return error;
    }
};

const deleteMenu = async (id) => {
    try {
        const deletedMenu = await db.one(`
        DELETE FROM event_menu WHERE id=$1 RETURNING *`,
        id
        );
        return deletedMenu;
    } catch (error) {
        return error;
    }
};

module.exports = {
    getAllMenus,
    getOneMenu,
    addNewMenu,
    updateMenu,
    deleteMenu
};