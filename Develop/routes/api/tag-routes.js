
const router = require('express').Router();  // Routing & middleware framework
const { Tag, Product, ProductTag } = require('../../models');  // Models



// Routing: Get /api/tags - return all Tag records and linked Product records

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    if (!tagData) res.status(404).json({ message: 'No tags exist.' });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});



// Routing: Get /api/tag/:id - return requested Tag record and linked Product records

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tagData) res.status(404).json({ message: `The requested tag: ${req.params.id} does not exist.` });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Routing: Post /api/tag - add Tag record

router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }  
});



// Routing: Put /api/tag/:id - update requested Tag record

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: `Tag: ${req.params.id} does not exist.` });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});



// Routing: Delete /api/tag/:id - delete what tag the user requested 

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: `Tag: ${req.params.id} does not exist.` });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;