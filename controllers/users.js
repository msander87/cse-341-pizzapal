const mongodb = require("../data/database");
//const { param } = require("../routes");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Users']
  try {
    const result = await mongodb.getDatabase().db().collection('user').find();
    result.toArray().then((users) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(users);
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message
    })
  }

};



const getSingle = async (req, res) => {
  //#swagger.tags=['Users']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid user id');
  }
  const documentId = new ObjectId(req.params.id);
  try {
    const result = await mongodb.getDatabase().db().collection('user').find({_id:documentId});
    result.toArray().then((users) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(users[0]);
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message
    })
  }
};




const createDocument = async (req, res) => {
  //#swagger.tags=['Users']
  const document = {
    type: req.body.type,
    name: req.body.name,
    email: req.body.email,
    oauth_provider: req.body.oauth_provider,
    oauth_id: req.body.oauth_id,
    address: req.body.address,
    phone: req.body.phone,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("user")
    .insertOne(document);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error ocurred while creating the user.");
  }
};

const updateDocument = async (req, res) => {
  //#swagger.tags=['Users']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid user id');
  }
  const documentId = new ObjectId(req.params.id);
  const document = {
    type: req.body.type,
    name: req.body.name,
    email: req.body.email,
    oauth_provider: req.body.oauth_provider,
    oauth_id: req.body.oauth_id,
    address: req.body.address,
    phone: req.body.phone,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("user")
    .replaceOne({
      _id: documentId
    }, document);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error ocurred while modifying the user.");
  }
};

const deleteDocument = async (req, res) => {
  //#swagger.tags=['Users']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid user id');
  }
  const documentId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("user")
    .deleteOne({
      _id: documentId
    });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error ocurred while deleting the user.");
  }
};

module.exports = {
  getAll,
  getSingle,
  createDocument,
  updateDocument,
  deleteDocument,
};