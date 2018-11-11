'use strict'

/*
    Create a new fake object of type stock or ip
    and assign it customized data generator
 */

const stock = require('./objectFactories/stock');
const ip = require('./objectFactories/ip');
const sigGen = require('./generators/sigmoidGenerator');
const genFactory = require('./generators/generatorFactory');

const types = [];
types['stock'] = stock;
types['ip'] = ip;

const dataAttributes = [];
dataAttributes['stock'] = 'lastPrice';
dataAttributes['ip'] = 'packetCount';

const randomLowInteger = () => {
    return Math.floor(Math.random()*3+1);
};

const randomFraction = (val) => {
    return Math.round(val/2, 2);
};

const roundSmaller = (val) => {
    return Math.round(val * 10000) / 10000;
};

const create = (type) => {
    // create a fake object of specified type
    const fakeObject = types[type]();
    const dataAttribute = dataAttributes[type];

    // get start value from faker object
    const startValue = roundSmaller(fakeObject[dataAttribute]);

    // create a customized sigmoid wave function
    const amplitude = randomLowInteger();
    const incrementor = randomFraction(amplitude);
    const waveFunction = sigGen(amplitude, incrementor);

    // create a customized value generator
    const magnifier = randomLowInteger();
    fakeObject.generator = genFactory(startValue, magnifier, waveFunction);
    //console.log('\nfakeObject ', fakeObject);

    fakeObject.dataAttribute = dataAttribute;
    return fakeObject;
};

module.exports = create;