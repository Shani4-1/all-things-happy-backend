const db = require("../../db/dbConfig.js");

const getAllRecipesDetails = async () => {
    try {
        const getAllRecipeDetails = await db.any(`SELECT * FROM recipe_details`);
        return getAllRecipeDetails;
    } catch (error) {
        return error;
    }
};

const getOneRecipeDetails = async (id) => {
    try {

        const oneRecipesDetails = await db.one(`SELECT * FROM recipe_details WHERE id=${id}`);
        return oneRecipesDetails;
    } catch (error) {
        return error
    }
};

const addNewRecipeDetails = async (oneRecipesDetails) => {
    try {
        const newRecipesDetails = await db.one(`
        INSERT INTO
        recipe_details (name, description, image, instructions, servings, calories)
        VALUES
        ($1, $2, $3, $4, $5, $6)
        RETURNING *;`,
        [oneRecipesDetails.name, oneRecipesDetails.description, oneRecipesDetails.image, oneRecipesDetails.instructions, oneRecipesDetails.servings, oneRecipesDetails.calories]
        );
        return newRecipesDetails;

    } catch (error) {
        return error;
    }
};

const updateRecipeDetails = async (id, oneRecipesDetails) => {
    try {
        const updatedRecipeDetails = await db.one(`
        UPDATE recipe_details SET name=$1, description=$2, image=$3, instructions=$4, servings=$5, calories=$6, id=$7 RETURNING *`,
        [oneRecipesDetails.name, oneRecipesDetails.description, oneRecipesDetails.image, oneRecipesDetails.instructions, oneRecipesDetails.servings, oneRecipesDetails.calories, id]
        );
        return updatedRecipeDetails;
    } catch (error) {
        return error
    }
};

const deleteRecipeDetails = async (id) => {
    try {
        const deletedRecipeDetails = await db.one(`
        DELETE FROM recipe_details WHERE id=$1 RETURNING *`,
        id
        );
        return deletedRecipeDetails;
    } catch (error) {
        return error;
    }
};

module.exports = {
    getAllRecipesDetails,
    getOneRecipeDetails,
    addNewRecipeDetails,
    updateRecipeDetails,
    deleteRecipeDetails
};