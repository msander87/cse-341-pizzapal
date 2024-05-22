const validator = require('../helpers/validate');

const savePlayer = (req, res, next) => {
    const validationRule = {
        firstName: 'required|string',
        lastName: 'required|string',
        height: 'required|string',
        weight: 'required|string',
        birthday: 'required|string',
        goals: 'required|string',
        nationalTeam: 'required|string',
        club: 'required|string'
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

const saveClub = (req, res, next) => {
    const validationRule = {        
        name: 'required|string',
        creationYear: 'required|string',
        country: 'required|string'        
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
    savePlayer,
    saveClub
}