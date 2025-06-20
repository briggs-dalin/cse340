// Needed Resources 
const express = require("express");
const router = new express.Router() ;
const invController = require("../controllers/invController");
const utilities = require("../utilities")
const invValidate = require("../utilities/inventory-validation");

// Route middleware
router.use(["/add-classification", "/add-inventory", "/edit/:inventoryId", "/update", "/delete/:inventoryId", "/delete/",], utilities.checkLogin);
router.use(["/add-classification", "/add-inventory", "/edit/:inventoryId", "/update", "/delete/:inventoryId", "/delete/",], utilities.checkAuthorizationManager);

// Route to build inventory by classification view
router.get("/", utilities.checkAuthorizationManager, utilities.handleErrors(invController.buildManagementView));
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));
router.get("/detail/:inventoryId", utilities.handleErrors(invController.buildByInventoryId)); 

// Classification management routes
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification));
router.post("/add-classification", invValidate.classificationRules(), invValidate.checkClassificationData, utilities.handleErrors(invController.addClassification)); // ...through the appropriate router, where server-side validation middleware is present,... 

// Inventory management routes
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventory));
router.post("/add-inventory", invValidate.inventoryRules(), invValidate.checkInventoryData, utilities.handleErrors(invController.addInventory));


// Build edit inventory view
router.get("/edit/:inventoryId", utilities.handleErrors(invController.buildEditInventory));
router.post("/update/", invValidate.inventoryRules(), invValidate.checkUpdateData);
utilities.handleErrors(invController.updateInventory);

//Delete Vehicle information
router.get("/delete/:inventoryId", utilities.handleErrors(invController.deleteInventory));
router.post("/delete/", utilities.handleErrors(invController.deleteInventory)); //No need for validation

// AJAX inventory api call route
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))


module.exports = router;