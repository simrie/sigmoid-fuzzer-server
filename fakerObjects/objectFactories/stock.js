'use strict'

const faker = require('faker');

const stock = () => {
    return {
        identifier: faker.fake(`{{commerce.productName}}`),
        lastPrice: faker.fake(`{{random.number}}`)
    }
};

module.exports = stock;