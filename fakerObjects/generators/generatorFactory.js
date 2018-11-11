'use strict'

/*
    Factory for a customized data generator
    where start value,
    magnitude of change to apply to
    wave generated data,
    and already customized wave generator
    are passed in as arguments.
    A fourth wobblePoint argument can also be passed in
    but this is defaulting to 0.5 since we know
    the customized wave generator function is
    going to be of type sigmoid.
 */

const roundMe = (me) => {
    return Math.round(me * 10000) / 10000;
}
//const roundMe = require('./sigmoidGenerator').roundMe;

function* nextValue(startValue, magnifier, waveFunction, wobblePoint=0.5) {
    let value;
    let lastNewNext = wobblePoint;
    while(true) {
        if (!value) {
            value = startValue;
        }
        let newNext = waveFunction.next();
        newNext = roundMe(newNext.value);
        // apply magnifier
        let valueChange = roundMe(newNext * magnifier);
        // increase or decrease the value
        if (lastNewNext < newNext) {
            value = value + valueChange;
        } else {
            value = value - valueChange;
        }
        lastNewNext = newNext;
        yield roundMe(value);
    }
}

const create = (startValue, magnifier, waveFunction) => {
    return nextValue(startValue, magnifier, waveFunction);
};

module.exports = create;
