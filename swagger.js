const swaggerAutogen = require('swagger-autogen')();
const doc = {
    info:{
        title: 'PizzaPal Api',
        description: 'PizzaPal Api'
    },
    host: 'cse-341-pizzapal-1.onrender.com',
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

//this will generate swagger.json

swaggerAutogen(outputFile, endpointsFiles, doc);