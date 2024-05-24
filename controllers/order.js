const mongodb = require("../data/database");
//const { param } = require("../routes");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Orders']
  try {
    const result = await mongodb.getDatabase().db().collection("order").find();
    result.toArray().then((users) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(users);
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Orders']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid order id");
  }
  const documentId = new ObjectId(req.params.id);
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("order")
      .find({ _id: documentId });
    result.toArray().then((users) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(users[0]);
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const createDocument = async (req, res) => {
  //#swagger.tags=['Orders']
  const document = {
    customer_id: req.body.customer_id,
    items: req.body.items,
    status: req.body.status,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
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
    res.status(400).json("Must use a valid order id");
  }
  const documentId = new ObjectId(req.params.id);
  const document = {
    customer_id: req.body.customer_id,
    items: req.body.items,
    status: req.body.status,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("order")
    .replaceOne(
      {
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
    res.status(400).json("Must use a valid order id");
  }
  const documentId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("order")
    .deleteOne({
      _id: documentId,
    });
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
