const db = require("../../db/dbConfig.js");

const getAllRecipes = async () => {
    try {
        const allRecipes = await db.any(`SELECT * FROM recipes`);
        return allRecipes;
    } catch (error) {
        return error;
    }
};

const getOneRecipe = async (id) => {
   try {

       const recipe = await db.one(`SELECT * FROM recipes WHERE id=${id}`);
        return recipe;
   } catch (error) {
    return error;
   }
};

const addNewRecipe = async (recipe) => {
    try {
        const newRecipe = await db.one(
            `INSERT INTO recipes (recipe_details_id, ingredient _id, measure_id, amount)
            VALUES 
            ($1, $2, $3, $4)
            RETURNING *;`,
            [recipe.recipe_details_id, recipe.ingredient_id, recipe.measure_id, recipe.amount]
        );
        return newRecipe;
    } catch (error) {
        return error;
    }
};

const updateRecipe = async (id, recipe) => {
    try {
      const updatedRecipe = await db.one(`
      UPDATE recipes SET recipe_details_id=$1, ingredient_id=$2, measure_id=$3, amount=$4, id=$5 RETURNING *`,
      [recipe.recipe_details_id, recipe.ingredient_id, recipe.measure_id, recipe.amount, id]
      );
      return updatedRecipe;  
    } catch (error) {
        return error;
    }
};

const deleteRecipe = async (id) => {
    try {
        const deletedRecipe = await db.one(`
        DELETE FROM recipes WHERE id=$1 RETURNING *`,
        id
        );
        return deletedRecipe;

    } catch (error) {
        return error;
    }
    
};

module.exports = {
    getAllRecipes,
    getOneRecipe,
    addNewRecipe,
    updateRecipe,
    deleteRecipe 
}