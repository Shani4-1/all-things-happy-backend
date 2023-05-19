const db = require("../../db/dbConfig.js");

const getAllIngredients = async () => {
  try {
    const allIngredients = await db.any(`SELECT * FROM ingredients`);
    return allIngredients;
  } catch (error) {
    return error;
  }
};

const getOneIngredient = async (id) => {
  try {
    const ingredient = await db.one(`SELECT * FROM ingredients WHERE id=${id}`);
    return ingredient;
  } catch (errors) {
    return errors;
  }
};

const addIngredient = async (ingredient) => {
  try {
    const newIngredient = await db.one(
      `
        INSERT INTO 
        ingredients (name)
        VALUES
        ($1)
        RETURNING *;`,
      [ingredient.name]
    );
    return newIngredient;
  } catch (error) {
    return error;
  }
};

const updateIngredient = async (id, ingredient) => {
  try {
    const updatedIngredient = await db.one(
      `
        UPDATE ingredients SET name=$1, id=$2 RETURNING *`,
      [ingredient.name, id]
    );
    return updatedIngredient;
  } catch (error) {
    return error;
  }
};

const deleteIngredient = async (id) => {
  try {
    const deletedIngredient = await db.one(
      `
        DELETE FROM ingredients WHERE id=$1 RETURNING *`,
      id
    );
    return deletedIngredient;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllIngredients,
  getOneIngredient,
  addIngredient,
  updateIngredient,
  deleteIngredient,
};
