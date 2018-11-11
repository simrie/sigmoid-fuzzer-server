'use strict'

/*
    Rounding functions
 */

const roundMe = (me) => {
    return Math.round(me * 10000) / 10000;
}

const randomLowInteger = () => {
    return Math.floor(Math.random()*3+1);
};

const randomFraction = (val) => {
    return Math.round(val/2, 2);
};

const roundSmaller = (val) => {
    return Math.round(val * 10000) / 10000;
};

const rounding = {
    roundMe,
    randomLowInteger,
    randomFraction,
    roundSmaller
};

module.exports = rounding;




