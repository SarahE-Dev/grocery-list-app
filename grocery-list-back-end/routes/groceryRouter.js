const express = require('express');
const router = express.Router();
const { createGrocery, updateGroceryByID, getAllGroceries, deleteGroceryByID } = require('./grocery/controller/groceryController')

router.post('/create-grocery', createGrocery)

router.put('/update-grocery/:id', updateGroceryByID)

router.get('/get-all-groceries', getAllGroceries)

router.delete('/delete-grocery/:id', deleteGroceryByID)

module.exports = router