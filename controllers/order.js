const mongodb = require("../data/database");
//const { param } = require("../routes");
const ObjectId = require("mongodb").ObjectId;
const authorize = require("../helpers/authorize");

const getAll = async (req, res) => {
  //#swagger.tags=['Orders']
  try {
    const access = await authorize(req, res);
    let result;
    if (access === "client") {
      result = await mongodb
        .getDatabase()
        .db()
        .collection("order")
        .find({
          customer_id: req.session.user.id
        });
    } else {
      result = await mongodb
        .getDatabase()
        .db()
        .collection("order")
        .find();
    }
    result.toArray().then(orders => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(orders);
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Orders']
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json("Must use a valid order id");
  }
  const documentId = ObjectId.createFromHexString(req.params.id);
  try {
    let result;
    const access = await authorize(req, res);
    if (access === "client") {
      result = await mongodb
        .getDatabase()
        .db()
        .collection("order")
        .find({
          _id: documentId,
          customer_id: req.session.user.id
        });
    } else {
      result = await mongodb
        .getDatabase()
        .db()
        .collection("order")
        .find({
          _id: documentId
        });
    }
    result.toArray().then((orders) => {
      if (orders.length === 0) {
        return res.status(404).json("Order not found.");
      }
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(orders[0]);
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};
const createDocument = async (req, res) => {
  //#swagger.tags=['Orders']
  let documentId;
  const access = await authorize(req, res);
  if (access === "client") {
    documentId = req.session.user.id;
  } else {
    documentId = req.params.id;
  }
  const exists = await mongodb
    .getDatabase()
    .db()
    .collection("user")
    .findOne({
      oauth_id: documentId,
    });
    if (!exists) {
      return res.status(404).json("No customer found.");
    }

  const document = {
    customer_id: documentId,
    items: req.body.items,
    status: req.body.status,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("order")
    .insertOne(document);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error ocurred while creating the order.");
  }
};

const updateDocument = async (req, res) => {
  //#swagger.tags=['Orders']
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json("Must use a valid order id");
  }
  const documentId = ObjectId.createFromHexString(req.params.id);
  const access = await authorize(req, res);
  if (access === "client") {
    return res.status(403).json("You are not allowed to modify this order.");
  }
  const order = await mongodb
    .getDatabase()
    .db()
    .collection("order")
    .findOne({
      _id: documentId
    });
  if (!order) {
    return res.status(404).json("Order not found.");
  }
  const document = {
    customer_id: order.customer_id,
    items: req.body.items || order.items,
    status: req.body.status,
    created_at: order.created_at,
    updated_at: new Date().toISOString(),
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("order")
    .replaceOne({
        _id: documentId,
      },
      document
    );
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error ocurred while modifying the order.");
  }
};

const deleteDocument = async (req, res) => {
  //#swagger.tags=['Orders']
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json("Must use a valid order id");
  }
  const documentId = ObjectId.createFromHexString(req.params.id);
  const access = await authorize(req, res);
  let response;
  if (access === "client") {
    response = await mongodb
      .getDatabase()
      .db()
      .collection("order")
      .deleteOne({
        _id: documentId,
        customer_id: req.session.user.id,
      });
  } else {
    response = await mongodb
      .getDatabase()
      .db()
      .collection("order")
      .deleteOne({
        _id: documentId,
      });
  }
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error ocurred while deleting the order.");
  }
};

module.exports = {
  getAll,
  getSingle,
  createDocument,
  updateDocument,
  deleteDocument,
};