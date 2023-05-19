const express = require("express");

const quoteList = express.Router;

const {
    getAllList,
    getOneList,
    addNewList,
    updateList,
    deleteList
} = require("../../queries/quotes/quoteList.js");

const validateQuoteList = require("../../validations/quoteValidators/quote_listValidator");

quoteList.get("/", async (req, res) => {
    const allList = await getAllList();
    if (!allList.error) {
        res.status(200).json(allList);
    } else {
        res.status(500).json({error: "server error"});
    }
});

quoteList.get("/:id", async (req, res) => {
    const { id } = req.params;
    const list = getOneList(id);
    if (!list.error) {
        res.status(200).json(list);
    } else if (list.error.code === 0) {
        res.status(404).json({error: "list not found"});
    } else {
        res.status(500).json({error: "server error"})
    }

});

quoteList.post("/", validateQuoteList, (req, res, next) =>{
    const { quote_id, category_id } = req.body;
    if (!quote_id || !category_id) {
        return res.status(422).json({error: "body requires quote_id, category_id"});
    }
    return next();
},
async (req, res) => {
    try {
        const {quote_id, category_id} = req.body;
        const newList = await addNewList({
            quote_id,
            category_id
        });
        return res.status(201).json(newList);
    } catch (error) {
        return res.status(500).json({error: "server error"})
    }
});

quoteList.put("/:id", validateQuoteList, async (req, res) => {
    const { id } = req.params;
    const list = req.body;

    try {

        const updatedList = await updateList(id, list);
        if (updatedList.id) {
            res.status(200).json(updatedList);
        } else {
            res.status(404).json({error: "list not found"});
        }
    } catch (error) {
        return res.status(500).json({error: "server error"})
    }

    
});

quoteList.delete("/:id", async (req, res) => {
    const { id } = req.params;

    const deletedList = await deleteList(id);
    if (deletedList.id) {
        res.status(201).json(deletedList);
    } else {
        res.status(404).json({error: "list not found"});    }
});

module.exports = quoteList;