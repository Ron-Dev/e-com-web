const express = require('express');
const router = express.Router();

const { checkAuthorization, checkAuthentication } = require('../utils/middleware')

// Create a new Product
router.post('/', checkAuthentication(), checkAuthorization('PRODUCT_ADD'), (req, res)=> {
    res.status(201).send({ message: "Product added successfully" })
});

// Get List of Products
router.get('/', checkAuthentication(),  checkAuthorization('PRODUCT_READ_ALL'),(req, res)=> {
    res.status(200).send({ message: "Products sent successfully" });
});

// Get Product by ID
router.get('/:id', checkAuthentication(), checkAuthorization('PRODUCT_READ'), (req, res)=> {
    res.status(200).send({ message: "Product sent successfully" });
  
});

// Update a Product
router.put('/:id', checkAuthentication(), checkAuthorization('PRODUCT_UPDATE'), (req, res)=> {
    res.status(200).send({ message: "Product updated successfully" });
});

// Delete a Product
router.delete('/:id', checkAuthentication(), checkAuthorization('PRODUCT_DELETE'),(req, res)=> {
    res.status(200).send({ message: "Product deleted successfully" });
});

module.exports = router;