const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

describe('menu', () => {
    let connection;
    let db;

    beforeAll(async () => {

        connection = await MongoClient.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = await connection.db()
    });
    afterAll(async() => {
        await connection.close()
    })

    it('should get all products from the menu', async () => {
        const products = db.collection('product');


        const allProducts = await products.find();

        expect(allProducts).not.toBeNull();
    },

    it('should get a product from the menu', async () => {
        const products = db.collection('product');

        const product = await products.findOne({product: 'Pepperoni'});

        expect(product.product).toEqual('Pepperoni');
    }),

    it('should get all toppings from the menu', async () => {
        const toppings = db.collection('topping');

        const allToppings = await toppings.find();

        expect(allToppings).not.toBeNull();
    }),

    it('should get a topping from the menu', async () => {
        const toppings = db.collection('topping');

        const topping = await toppings.findOne({topping: 'Mushrooms'});

        expect(topping.topping).toEqual('Mushrooms');
    }),

    it('should get all sizes from the menu', async () => {
        const sizes = db.collection('size');

        const allSizes= await sizes.find();

        expect(allSizes).not.toBeNull();
    }),

    it('should get a size from the menu', async () => {
        const sizes = db.collection('size');

        const size = await sizes.findOne({size: 'Personal'});

        expect(size.size).toEqual('Personal');
    }),

    it('should get all crusts from the menu', async () => {
        const crusts = db.collection('crust');

        const allCrusts = await crusts.find();

        expect(allCrusts).not.toBeNull();
    }),
    
    it('should get a crust from the menu', async () => {
        const crusts = db.collection('crust');

        const crust = await crusts.findOne({crust: 'Thin'});

        expect(crust.crust).toEqual('Thin');
    }),

    it('should get all orders from the menu', async () => {
        const orders = db.collection('order');

        const allOrders = await orders.find();

        expect(allOrders).not.toBeNull();
    }),

    it('should get an order from the menu', async () => {
        const orders = db.collection('order');

        const order = await orders.findOne({customer_id: '126966735'});

        expect(order.status).toEqual('pending');
    }),

    it('should get all users', async () => {
        const users = db.collection('user');

        const allUsers = await users.find();

        expect(allUsers).not.toBeNull();
    }),

    it('should get a user', async () => {
        const users = db.collection('user');

        const user = await users.findOne({oauth_id: '126966735'});

        expect(user.name).toEqual('Nathan');
    }),
)})