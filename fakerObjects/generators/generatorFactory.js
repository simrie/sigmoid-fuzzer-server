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

const roundMe = require('./../../utilities/rounding.js').roundMe;

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
            value = startValue + valueChange;
        } else {
            value = startValue - valueChange;
        }
        lastNewNext = newNext;
        yield roundMe(value);
    }
}

const create = (startValue, magnifier, waveFunction) => {
    return nextValue(startValue, magnifier, waveFunction);
};

module.exports = create;
