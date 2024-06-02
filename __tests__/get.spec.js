require('dotenv').config();
const app = require('../server');
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(app);
const mongodb = require('../data/database');

beforeAll(() => {
    return new Promise((resolve, reject) => {
        mongodb.initDb((err) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                app.listen(process.env.PORT, () => {
                    console.log(`Database is listening on port ${process.env.PORT}`);
                    resolve();
                });
            }
        });
    });
});

describe('Test Handlers', () => {
    test('responds to /user', async () => {
        const res = await request.get('/user');
        expect(res.statusCode).toBe(401);
    }),

    test('responds to /user/:id', async () => {
        const res = await request.get('/user/1');
        expect(res.statusCode).toBe(401);
    }),

    test('responds to /order', async () => {
        const res = await request.get('/order');
        expect(res.statusCode).toBe(401);
    }),

    test('responds to /order/:id', async () => {
        const res = await request.get('/order/1');
        expect(res.statusCode).toBe(401);
    }),

    test('responds to /menu/product/', async () => {
        const res = await request.get('/menu/product/');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
    }),

    test('responds to /menu/product/:id', async () => {
        const res = await request.get('/menu/product/66593f292b3daf9995c1cbb9');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('[{"_id":"66593f292b3daf9995c1cbb9","product":"Hawaiian"}]');
    }),

    test('responds to /menu/product/:id', async () => {
        const res = await request.get('/menu/product/1');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(400);
        expect(res.text).toBe('"Must use a valid product id"');
    }),

    test('responds to /menu/product/:id', async () => {
        const res = await request.get('/menu/product/66593f292b3daf9995c1cbb8');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(404);
        expect(res.text).toBe('"Product not found"');
    }),

    test('responds to /menu/topping/', async () => {
        const res = await request.get('/menu/topping/');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
    }),

    test('responds to /menu/topping/:id', async () => {
        const res = await request.get('/menu/topping/665944e5d7c48bdf4e6ae9b6');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('[{"_id":"665944e5d7c48bdf4e6ae9b6","topping":"Pepperoni"}]');
    }),

    test('responds to /menu/topping/:id', async () => {
        const res = await request.get('/menu/topping/665944e5d7c48bdf4e6ae9b7');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(404);
        expect(res.text).toBe('"Topping not found"');
    }),

    test('responds to /menu/topping/:id', async () => {
        const res = await request.get('/menu/topping/1');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(400);
        expect(res.text).toBe('"Must use a valid topping id"');
    }),

    test('responds to /menu/size/', async () => {
        const res = await request.get('/menu/size/');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
    }),

    test('responds to /menu/size/:id', async () => {
        const res = await request.get('/menu/size/66594599d7c48bdf4e6ae9c1');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('[{"_id":"66594599d7c48bdf4e6ae9c1","size":"Small"}]');
    }),

    test('responds to /menu/size/:id', async () => {
        const res = await request.get('/menu/size/66594599d7c48bdf4e6ae9c2');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(404);
        expect(res.text).toBe('"Size not found"');
    }),

    test('responds to /menu/size/:id', async () => {
        const res = await request.get('/menu/size/1');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(400);
        expect(res.text).toBe('"Must use a valid size id"');
    }),

    test('responds to /menu/crust/', async () => {
        const res = await request.get('/menu/crust/');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
    }),

    test('responds to /menu/crust/:id', async () => {
        const res = await request.get('/menu/crust/6659488fd7c48bdf4e6ae9c8');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('[{"_id":"6659488fd7c48bdf4e6ae9c8","crust":"Flatbread"}]');
    }),

    test('responds to /menu/crust/:id', async () => {
        const res = await request.get('/menu/crust/6659488fd7c48bdf4e6ae9c9');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(404);
        expect(res.text).toBe('"Crust not found"');
    }),

    test('responds to /menu/crust/:id', async () => {
        const res = await request.get('/menu/crust/1');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(400);
        expect(res.text).toBe('"Must use a valid crust id"');
    })
})