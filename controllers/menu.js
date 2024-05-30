const mongodb = require("../data/database");

const ObjectId = require("mongodb").ObjectId;
const authorize = require("../helpers/authorize");

const getMenu = async (req, res) => {
  //#swagger.tags=['Menu']
  try {
    const products = getProducts();
    const toppings = getToppings();
    const sizes = getSizes();
    const crusts = getCrusts();
    const menu = {
      ...products,
      ...toppings,
      ...sizes,
      ...crusts,
    };
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(menu);
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message,
        });
        }
}

const getProducts = async () => {
    const result = await mongodb
        .getDatabase()
        .db()
        .collection("product")
        .find();
    return result.toArray();
}

const getToppings = async () => {
    const result = await mongodb
        .getDatabase()
        .db()
        .collection("topping")
        .find();
    return result.toArray();
}

const getSizes = async () => {
    const result = await mongodb
        .getDatabase()
        .db()
        .collection("size")
        .find();
    return result.toArray();
}

const getCrusts = async () => {
    const result = await mongodb
        .getDatabase()
        .db()
        .collection("crust")
        .find();
    return result.toArray();
}

const getSingleProduct = async (req, res) => {
    //#swagger.tags=['Menu']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid product id");
    }
    const documentId = ObjectId.createFromHexString(req.params.id);
    try {
        const result = await mongodb
            .getDatabase()
            .db()
            .collection("product")
            .find({
                _id: documentId
            });
        result.toArray().then(product => {
            if (products.length === 0) {
                res.status(404).json("Product not found");
            }
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(product);
        });
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message,
        });
    }
}

const getSingleTopping = async (req, res) => {
    //#swagger.tags=['Menu']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid topping id");
    }
    const documentId = ObjectId.createFromHexString(req.params.id);
    try {
        const result = await mongodb
            .getDatabase()
            .db()
            .collection("topping")
            .find({
                _id: documentId
            });
        result.toArray().then(topping => {
            if (topping.length === 0) {
                res.status(404).json("Topping not found");
            }
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(topping);
        });
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message,
        });
    }
}

const getSingleSize = async (req, res) => {
    //#swagger.tags=['Menu']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid size id");
    }
    const documentId = ObjectId.createFromHexString(req.params.id);
    try {
        const result = await mongodb
            .getDatabase()
            .db()
            .collection("size")
            .find({
                _id: documentId
            });
        result.toArray().then(size => {
            if (size.length === 0) {
                res.status(404).json("Size not found");
            }
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(size);
        });
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message,
        });
    }
}

const getSingleCrust = async (req, res) => {
    //#swagger.tags=['Menu']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid crust id");
    }
    const documentId = ObjectId.createFromHexString(req.params.id);
    try {
        const result = await mongodb
            .getDatabase()
            .db()
            .collection("crust")
            .find({
                _id: documentId
            });
        result.toArray().then(crust => {
            if (crust.length === 0) {
                res.status(404).json("Crust not found");
            }
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(crust);
        });
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message,
        });
    }
}



module.exports = {
    getMenu,
    getProducts,
    getToppings,
    getSizes,
    getCrusts,
    getSingleProduct,
    getSingleTopping,
    getSingleSize,
    getSingleCrust,

};