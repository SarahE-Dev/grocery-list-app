const Grocery = require('../model/Grocery')

async function getAllGroceries(req, res){
    try {
        const allGroceries = await Grocery.find({})
        res.json({message: 'success', payload: allGroceries})
    } catch (error) {
        res.status(500).json({message: 'error', error: error.message})
    }
}

async function createGrocery(req, res){
    const {grocery} = req.body
    try {
        const newGrocery = new Grocery({grocery})
        await newGrocery.save()
        res.json({message: 'success', payload: newGrocery})
    } catch (error) {
        res.status(500).json({message: 'error', error: error.message})
    }
}

async function updateGroceryByID(req, res){
    try {
        const updatedGrocery = await Grocery.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
        res.json({message: 'success', payload: updatedGrocery})
    } catch (error) {
        res.status(500).json({message: 'error', error: error.message})
    }
}

async function deleteGroceryByID(req, res){
    try {
        const deletedGrocery = await Grocery.findByIdAndDelete({_id: req.params.id})
        res.json({message: 'success', payload: deletedGrocery})
    } catch (error) {
        res.status(500).json({message: 'error', error: error.message})
    }
}

module.exports = {
    createGrocery,
    deleteGroceryByID,
    updateGroceryByID,
    getAllGroceries
}