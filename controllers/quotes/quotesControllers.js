const express = require("express");

const quotes = express.Router();

const {
  getAllQuotes,
  getOneQuote,
  addNewQuote,
  updateQuote,
  deleteQuote,
} = require("../../queries/quotes/quotes.js");

const validateQuote = require("../../validations/quoteValidators/quoteValidator.js");

quotes.get("/", async (req, res) => {
  const allQuotes = await getAllQuotes();
  if (!allQuotes.error) {
    res.status(200).json(allQuotes);
  } else {
    res.status(500).json({ error: "server error" });
  }
});

quotes.get("/:id", async (req, res) => {
  const { id } = req.params;
  const quote = await getOneQuote(id);
  if (!quote.error) {
    res.status(200).json(quote);
  } else if (quote.error.code === 0) {
    res.status(404).json({ error: "quote not found" });
  } else {
    res.status(500).json({ error: "server error" });
  }
});

quotes.post(
  "/",
  validateQuote,
  async (req, res) => {
    const { category_id, quotee, quote } = req.body;
    if (!category_id || !quotee || !quote) {
      res
        .status(422)
        .json({ error: "body requires category_id, quotee, quote" });
    }
    return next();
  },
  async (req, res) => {
    try {
      const { category_id, quotee, quote } = req.body;
      const newQuote = await addNewQuote({
        category_id,
        quotee,
        quote,
      });
      return res.status(201).json(newQuote);
    } catch (error) {
      return res.status(500).json({ error: "server error" });
    }
  }
);

quotes.put("/:id", validateQuote, async (req, res) => {
  const { id } = req.params;
  const quote = req.body;
  const updatedQuote = await updateQuote(id, quote);
  if (updatedQuote.id) {
    res.status(200).json(updatedQuote);
  } else {
    res.status(404).json({ error: "quote not found" });
  }
});

quotes.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const deletedQuote = await deleteQuote(id);
    if (deletedQuote.id) {
        res.status(201).json(deletedQuote);
    } else {
        res.status(404).json({error: "quote not found"})
    }
 })


module.exports = quotes;