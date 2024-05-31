const validator = require("../helpers/validate");

const saveUser = (req, res, next) => {
  const validationRule = {
    name: "required|string",
    email: "required|email",
    address: "required|string",
    phone: "required|numeric",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

const saveOrder = (req, res, next) => {
  let validationRule = {
    status: "required|string",
  };

  if (req.method === "POST") {
    validationRule = {
      ...validationRule,
      items: "required|array",
      "items.*.product_id": "required|string",
      "items.*.quantity": "required|integer",
      "items.*.toppings.*": "string",
      "items.*.size": "required|string",
      "items.*.crust": "required|string",
    };
  }
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

const validateMenuItem = (req, res, next) => {
  const url = req.url;
  if (url.includes("product")) {
    field = "product"
  }
  else if (url.includes("topping")) {
    field = "topping"
  }
  else if (url.includes("size")) {
    field = "size"
  }
  else if (url.includes("crust")) {
    field = "crust"
  }

  const validationRule = {};
  validationRule[field] = "required|string";

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveOrder,
  saveUser,
  validateMenuItem,
};
