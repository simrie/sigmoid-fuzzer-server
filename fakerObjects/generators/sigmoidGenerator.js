'use strict'

/*
    Factory for a sigmoid wave data generator
    that always returns values between
    0 and 1,
    but where amplitude,
    incrementation,
    and initial direction
    can be customized.
*/

const roundMe = require('./../../utilities/rounding.js').roundMe;

const sigmoid = (t) => {
    return 1 / (1 + Math.pow(Math.E, -t));
}

function* sigmoidGenerator(amplitude, incrementor, rising=true) {
    // determine the first t as amplitude low or high point
    let t = rising ? -amplitude: amplitude;
    // determine positive or negative incrementing
    let inc = rising ? true : false;
    while (true) {
        if (inc) {
            t = t + incrementor;
        } else {
            t = t - incrementor;
        };
        // switch direction if t hits a high or low point
        if (Math.abs(t) >= Math.abs(amplitude)) {
            inc = !inc;
        };
        let s = sigmoid(t);
        yield roundMe(s);
    }
};

const create = (amplitude, incrementor) => {
    return sigmoidGenerator(amplitude, incrementor);
};

module.exports = create;

