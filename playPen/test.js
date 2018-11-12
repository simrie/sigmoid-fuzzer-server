/*
    Play area for Developer
 */


const create = require('../fakerObjects/dataFakerCreator.js');
const _ = require('lodash');

const stocks = [];
const ips = [];


_.forEach(_.range(0, 3), (key) => {
    console.log(key);
    stocks[key] = create('stock');
    ips[key] = create('ip');
});

const updateObject = (item) => {
    //console.log(item);
    const data = item.dataAttribute;
    const val = item.generator.next();
    item[data] = val.value;
    console.log(item);
};

/*
_.forEach(_.range(0, 20), (key) => {
    _.forEach(stocks, updateObject);
});
*/

const msecs = 1000;

_.forEach(stocks, (key) => {
    setInterval(updateObject, msecs, key);
});
_.forEach(ips, (key) => {
    setInterval(updateObject, msecs, key);
});


