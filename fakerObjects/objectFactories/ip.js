'use strict'

const faker = require('faker');

const ip = () => {
    return {
        identifier: faker.fake(`{{internet.ip}}`),
        domainName: faker.fake(`{{internet.domainName}}`),
        domainSuffix: faker.fake(`{{internet.domainSuffix}}`),
        packetCount: faker.fake(`{{random.number}}`)
    };
};

module.exports = ip;