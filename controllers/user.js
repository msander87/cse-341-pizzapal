const mongodb = require("../data/database");
const authorize = require("../helpers/authorize");

//const { param } = require("../routes");

const getAll = async (req, res) => {
  //#swagger.tags=['Users']
  try {
    const access = await authorize(req, res);
    if (access !== "admin") {
      return res.status(401).send({
        success: false,
        message: "You are not authorized to access this resource."
      });
    }
    const result = await mongodb
      .getDatabase()
      .db()
      .collection('user')
      .find();
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
  try {
    let documentId;
    const access = await authorize(req, res);
    if (access !== "admin") {
      documentId = req.session.user.id;
    } else {
      documentId = req.params.id;
    }
    const result = await mongodb
      .getDatabase()
      .db()
      .collection('user')
      .find({
        oauth_id: documentId
      });
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
  const exists = await mongodb
    .getDatabase()
    .db()
    .collection("user")
    .findOne({
      oauth_id: req.session.user.id
    });
  if (exists) {
    return res
      .status(409)
      .json("User already exists, please update it instead.");
  }
  const document = {
    type: "client",
    name: req.body.name,
    email: req.body.email,
    oauth_provider: req.session.user.provider,
    oauth_id: req.session.user.id,
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
  let documentId;
  const access = await authorize(req, res);
  if (access !== "admin") {
    documentId = req.session.user.id;
  } else {
    documentId = req.params.id;
  }
  const user = await mongodb
    .getDatabase()
    .db()
    .collection("user")
    .findOne({
      oauth_id: documentId
    });
  const document = {
    type: user.type,
    name: req.body.name,
    email: req.body.email,
    oauth_provider: req.session.user.provider,
    oauth_id: req.session.user.id,
    address: req.body.address,
    phone: req.body.phone,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("user")
    .replaceOne({
      oauth_id: documentId
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
  let documentId;
  const access = await authorize(req, res);
  if (access !== "admin") {
    documentId = req.session.user.id;
  } else {
    documentId = req.params.id;
  }
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("user")
    .deleteOne({
      oauth_id: documentId
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