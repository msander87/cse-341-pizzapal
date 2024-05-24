const validator = require('../helpers/validate');

const saveUser = (req, res, next) => {
    const validationRule = {
        type: 'required|string',
        name: 'required|string',
        email: 'required|email',
        oauth_provider: 'required|string',
        oauth_id: 'required|string',
        address: 'required|string',
        phone: 'required|numeric',
    };
    validator(req.body, validationRule, {}, (err, status) =>{
        if(!status){
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        }else{
            next();
        }
    });
   
};

const saveOrder = (req, res, next) => {
    const validationRule = {      
    'customer_id': 'required|string',  
    'items': 'required|array',
    'items.*.product_id': 'required|string',
    'items.*.quantity': 'required|integer',
    'items.*.toppings.*': 'string',
    'items.*.size': 'required|string',
    'items.*.crust': 'required|string',
    'status': 'required|string',
    'createdAt': 'required|string',
    'updatedAt': 'required|string',        
};
    validator(req.body, validationRule, {}, (err, status) =>{
        if(!status){
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        }else{
            next();
        }
    });
   
};

module.exports = {
    saveOrder,
    saveUser
}