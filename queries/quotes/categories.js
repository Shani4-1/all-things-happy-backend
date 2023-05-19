const db = require("../../db/dbConfig.js");

const getAllCategories = async () => {
    try {
        const allCategories = await db.any(`SELECT * FROM categories`);
        return allCategories;
    } catch (error) {
        return error;
    }
};

const getOneCategory = async (id) => {
    try {

        const category = await db.one(`SELECT * FROM categories WHERE id=${id}`);
        return category;
    } catch (error) {
        return error;
    }
    
};

const addNewCategory = async (category) => {
    try {
        const newCategory = await db.one(`
        INSERT INTO
        categories(name)
        VALUES
        ($1)
        RETURNING *`, 
        [category.name]
        );
        return newCategory;
    } catch (error) {
        return error;
    }
};

const updateCategory = async (id, category) => {
    try {
        const updatedCategory = await db.one(`
        UPDATE categories SET name=$1, id=$2 RETURNING *`, 
        [category.name, id]
        );
        return updatedCategory;
    } catch (error) {
        return error;
    }
};

const deleteCategory = async (id) => {
    try {
        const deletedCategory = await db.one(`
        DELETE FROM categories WHERE id=$1 RETURNING *`,
        id
        );
        return deletedCategory;
    } catch (error) {
        return error;
    }
};

module.exports = {
    getAllCategories,
    getOneCategory,
    addNewCategory,
    updateCategory,
    deleteCategory
};