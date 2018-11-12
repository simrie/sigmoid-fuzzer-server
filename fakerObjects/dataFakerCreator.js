'use strict'

/*
    Create a new fake object of type stock or ip
    and assign it customized data generator
 */

const stock = require('./objectFactories/stock');
const ip = require('./objectFactories/ip');
const sigGen = require('./generators/sigmoidGenerator');
const genFactory = require('./generators/generatorFactory');
const rounding = require('./../utilities/rounding.js');

const randomLowInteger = rounding.randomLowInteger;
const randomFraction = rounding.randomFraction;
const roundSmaller = rounding.roundSmaller;

const types = [];
types['stock'] = stock;
types['ip'] = ip;

const dataAttributes = [];
dataAttributes['stock'] = 'lastPrice';
dataAttributes['ip'] = 'packetCount';

const create = (type) => {
    // create a fake object of specified type
    const fakeObject = types[type]();
    const dataAttribute = dataAttributes[type];

    // get start value from faker object
    const startValue = roundSmaller(fakeObject[dataAttribute]);
    const amplitude = randomLowInteger();
    const incrementor = randomFraction();
    const magnifier = randomLowInteger();

    // create a customized sigmoid wave function
    const waveFunction = sigGen(amplitude, incrementor);

    // create a customized value generator for the object
    fakeObject.generator = genFactory(startValue, magnifier, waveFunction);

    // assign the attribute that gets the generated data
    fakeObject.dataAttribute = dataAttribute;
    return fakeObject;
};

module.exports = create;