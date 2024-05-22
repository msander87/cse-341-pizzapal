const mongodb = require("../data/database");
//const { param } = require("../routes");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Clubs']
  try {
    const result = await mongodb.getDatabase().db().collection('club').find();
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
  //#swagger.tags=['Clubs']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid club id');
  }
  const documentId = new ObjectId(req.params.id);
  try {
    const result = await mongodb.getDatabase().db().collection('club').find({_id:documentId});
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
  //#swagger.tags=['Clubs']
  const document = {
    name: req.body.name,
    creationYear: req.body.creationYear,
    country: req.body.country,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("club")
    .insertOne(document);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error ocurred while creating the club.");
  }
};

const updateDocument = async (req, res) => {
  //#swagger.tags=['Clubs']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid club id');
  }
  const documentId = new ObjectId(req.params.id);
  const document = {
    name: req.body.name,
    creationYear: req.body.creationYear,
    country: req.body.country,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("club")
    .replaceOne({
      _id: documentId
    }, document);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error ocurred while modifying the club.");
  }
};

const deleteDocument = async (req, res) => {
  //#swagger.tags=['Clubs']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid club id');
  }
  const documentId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("club")
    .deleteOne({
      _id: documentId
    });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error ocurred while deleting the club.");
  }
};

module.exports = {
  getAll,
  getSingle,
  createDocument,
  updateDocument,
  deleteDocument,
};