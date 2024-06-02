const mongodb = require("../data/database");

const ObjectId = require("mongodb").ObjectId;
const authorize = require("../helpers/authorize");



const getAllProducts = async (req, res) => {
  //#swagger.tags=['Menu']
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection('product')
      .find();
    result.toArray().then((products) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(products);
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message
    })
  }
};

const getAllToppings = async (req, res) => {
  //#swagger.tags=['Menu']
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection('topping')
      .find();
    result.toArray().then((toppings) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(toppings);
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message
    })
  }
};

const getAllSizes = async (req, res) => {
  //#swagger.tags=['Menu']
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection('size')
      .find();
    result.toArray().then((sizes) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(sizes);
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message
    })
  }
};

const getAllCrusts = async (req, res) => {
  //#swagger.tags=['Menu']
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection('crust')
      .find();
    result.toArray().then((crusts) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(crusts);
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message
    })
  }
};

const getSingleProduct = async (req, res) => {
  //#swagger.tags=['Menu']
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json("Must use a valid product id");
  }
  const documentId = ObjectId.createFromHexString(req.params.id);
  try {
    const result = await mongodb.getDatabase().db().collection("product").find({
      _id: documentId,
    });
    result.toArray().then((product) => {
      if (product.length === 0) {
        return res.status(404).json("Product not found");
      }
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(product);
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const getSingleTopping = async (req, res) => {
  //#swagger.tags=['Menu']
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json("Must use a valid topping id");
  }
  const documentId = ObjectId.createFromHexString(req.params.id);
  try {
    const result = await mongodb.getDatabase().db().collection("topping").find({
      _id: documentId,
    });
    result.toArray().then((topping) => {
      if (topping.length === 0) {
        return res.status(404).json("Topping not found");
      }
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(topping);
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const getSingleSize = async (req, res) => {
  //#swagger.tags=['Menu']
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json("Must use a valid size id");
  }
  const documentId = ObjectId.createFromHexString(req.params.id);
  try {
    const result = await mongodb.getDatabase().db().collection("size").find({
      _id: documentId,
    });
    result.toArray().then((size) => {
      if (size.length === 0) {
        return res.status(404).json("Size not found");
      }
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(size);
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const getSingleCrust = async (req, res) => {
  //#swagger.tags=['Menu']
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json("Must use a valid crust id");
  }
  const documentId = ObjectId.createFromHexString(req.params.id);
  try {
    const result = await mongodb.getDatabase().db().collection("crust").find({
      _id: documentId,
    });
    result.toArray().then((crust) => {
      if (crust.length === 0) {
        return res.status(404).json("Crust not found");
      }
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(crust);
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const createProduct = async (req, res) => {
  //#swagger.tags=['Menu']
  const access = await authorize(req, res);
  if (access !== "admin") {
    return res.status(401).send({
      success: false,
      message: "You are not authorized to access this resource.",
    });
  }
  const product = 
  {
    product: req.body.product,
  };
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("product")
    .insertOne(product);
  if (result.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(result.error || "Some error occurred while creating the product.");
  }
};

const createTopping = async (req, res) => {
  //#swagger.tags=['Menu']
  const access = await authorize(req, res);
  if (access !== "admin") {
    return res.status(401).send({
      success: false,
      message: "You are not authorized to access this resource.",
    });
  }
  const topping = 
  {
    topping: req.body.topping,
  };  const result = await mongodb
    .getDatabase()
    .db()
    .collection("topping")
    .insertOne(topping);
  if (result.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(result.error || "Some error occurred while creating the topping.");
  }
};

const createSize = async (req, res) => {
  //#swagger.tags=['Menu']
  const access = await authorize(req, res);
  if (access !== "admin") {
    return res.status(401).send({
      success: false,
      message: "You are not authorized to access this resource.",
    });
  }
  const size = 
  {
    size: req.body.size,
  };  const result = await mongodb
    .getDatabase()
    .db()
    .collection("size")
    .insertOne(size);
  if (result.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(result.error || "Some error occurred while creating the size.");
  }
};

const createCrust = async (req, res) => {
  //#swagger.tags=['Menu']
  const access = await authorize(req, res);
  if (access !== "admin") {
    return res.status(401).send({
      success: false,
      message: "You are not authorized to access this resource.",
    });
  }
  const crust = 
  {
    crust: req.body.crust,
  }
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("crust")
    .insertOne(crust);
  if (result.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(result.error || "Some error occurred while creating the crust.");
  }
};

const updateProduct = async (req, res) => {
  //#swagger.tags=['Menu']
  const access = await authorize(req, res);
  if (access !== "admin") {
    return res.status(401).send({
      success: false,
      message: "You are not authorized to access this resource.",
    });
  }
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json("Must use a valid order id");
  }
  const documentId = ObjectId.createFromHexString(req.params.id);
  let product = await mongodb
    .getDatabase()
    .db()
    .collection("product")
    .findOne({
      _id: documentId,
    });

  if (!product) {
    return res.status(404).send({
      success: false,
      message: "Product not found.",
    });
  }
  product = 
  {
    product: req.body.product,
  }
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("product")
    .replaceOne(
      {
        _id: documentId,
      },
      product,
    );
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error ocurred while modifying the user.");
  }
};

const updateTopping = async (req, res) => {
  //#swagger.tags=['Menu']
  const access = await authorize(req, res);
  if (access !== "admin") {
    return res.status(401).send({
      success: false,
      message: "You are not authorized to access this resource.",
    });
  }
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json("Must use a valid order id");
  }
  const documentId = ObjectId.createFromHexString(req.params.id);
  let topping = await mongodb
    .getDatabase()
    .db()
    .collection("topping")
    .findOne({
      _id: documentId,
    });

  if (!topping) {
    return res.status(404).send({
      success: false,
      message: "Topping not found.",
    });
  }
  topping = 
  {
    topping: req.body.topping,
  }
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("topping")
    .replaceOne(
      {
        _id: documentId,
      },
      req.body,
    );
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error ocurred while modifying the user.");
  }
};

const updateSize = async (req, res) => {
  //#swagger.tags=['Menu']
  const access = await authorize(req, res);
  if (access !== "admin") {
    return res.status(401).send({
      success: false,
      message: "You are not authorized to access this resource.",
    });
  }
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json("Must use a valid order id");
  }
  const documentId = ObjectId.createFromHexString(req.params.id);
  let size = await mongodb.getDatabase().db().collection("size").findOne({
    _id: documentId,
  });

  if (!size) {
    return res.status(404).send({
      success: false,
      message: "Size not found.",
    });
  }
  size = 
  {
    size: req.body.size,
  }
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("size")
    .replaceOne(
      {
        _id: documentId,
      },
      req.body,
    );
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while modifying the size.");
  }
};

const updateCrust = async (req, res) => {
  //#swagger.tags=['Menu']
  const access = await authorize(req, res);
  if (access !== "admin") {
    return res.status(401).send({
      success: false,
      message: "You are not authorized to access this resource.",
    });
  }
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json("Must use a valid order id");
  }
  const documentId = ObjectId.createFromHexString(req.params.id);
  let crust = await mongodb.getDatabase().db().collection("crust").findOne({
    _id: documentId,
  });

  if (!crust) {
    return res.status(404).send({
      success: false,
      message: "Crust not found.",
    });
  }
  crust = 
  {
    crust: req.body.crust,
  }
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("crust")
    .replaceOne(
      {
        _id: documentId,
      },
      req.body,
    );
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while modifying the crust.");
  }
};

const deleteProduct = async (req, res) => {
  //#swagger.tags=['Menu']
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json("Must use a valid order id");
  }
  const documentId = ObjectId.createFromHexString(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("product")
    .deleteOne({ _id: documentId });

  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(404).json("Product not found.");
  }
};

const deleteTopping = async (req, res) => {
  //#swagger.tags=['Menu']
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json("Must use a valid order id");
  }
  const documentId = ObjectId.createFromHexString(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("topping")
    .deleteOne({ _id: documentId });

  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(404).json("Topping not found.");
  }
};

const deleteSize = async (req, res) => {
  //#swagger.tags=['Menu']
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json("Must use a valid order id");
  }
  const documentId = ObjectId.createFromHexString(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("size")
    .deleteOne({ _id: documentId });

  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(404).json("Size not found.");
  }
};

const deleteCrust = async (req, res) => {
  //#swagger.tags=['Menu']
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json("Must use a valid order id");
  }
  const documentId = ObjectId.createFromHexString(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("crust")
    .deleteOne({ _id: documentId });

  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(404).json("Crust not found.");
  }
};

module.exports = {
  getAllProducts,
  getAllToppings,
  getAllSizes,
  getAllCrusts,
  getSingleProduct,
  getSingleTopping,
  getSingleSize,
  getSingleCrust,
  createProduct,
  createTopping,
  createSize,
  createCrust,
  updateProduct,
  updateTopping,
  updateSize,
  updateCrust,
  deleteProduct,
  deleteTopping,
  deleteSize,
  deleteCrust,
};
