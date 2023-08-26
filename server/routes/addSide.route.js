const express = require('express');
const router = express.Router();
const CategoryModel = require('../models/category.model') 

router.get('/all_cats', async (req, res)=>{
  try{
    const cats = await CategoryModel.find({user_id: req.query.id})
    res.status(200).send(cats)
  }catch{
    res.status(500).send({ error: 'Could not get categories' })
  }
})
router.post('/add_side', async (req, res) => {
  const category = req.body;
  console.log(category);
  try {
    CategoryModel.insertMany([category])
    res.status(200).json({ message: 'Category added' })
  } catch (e) {
    res.status(500).json({ error: 'Error adding category' })
  }
});

module.exports = router;
