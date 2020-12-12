const mongoose = require('mongoose');
require('dotenv').config();
const colors = require('colors');
const users = require('./data/users.js');
const parents = require('./data/parents');
// const products = require( './data/products.js';
const User = require('./models/user.js');
const Parent = require('./models/parent.js');
// const Product = require( './models/productModel.js')
// const Order = require( './models/orderModel.js')
const connectDB = require('./config/db.js');

connectDB();

const importData = async () => {
  try {
    // await Order.deleteMany()
    // await Product.deleteMany()
    await User.deleteMany();
    await Parent.deleteMany();

    const createdUsers = await User.insertMany(users);
    const createdParents = await Parent.insertMany(parents);

    // const adminUser = createdUsers[0]._id;

    // const sampleProducts = products.map((product) => {
    //   return { ...product, user: adminUser }
    // })

    // await Product.insertMany(sampleProducts)

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // await Order.deleteMany()
    // await Product.deleteMany()

    await User.deleteMany();
    await Parent.deleteMany();
    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
