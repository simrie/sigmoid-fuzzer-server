# sigmoid-fuzzer-server

Author:  Susan Imrie

Developed in Node.js v8.1.1.

## Description

This application generates objects representing corporate stocks and IP address using the Faker library.

Each Faker object is assigned its own wave pattern, but all are variations on sigmoid curve output. A sigmoid curve fluctuates between 0 and 1.

The data is emitted as a stream, which may be useful as "fuzzed" testing data or neural network training data to represent fairly regular data fluctuations that don't drop below zero.

## Installation

    npm install
    
    npm start

### When the server starts...

The application will start an Express server with Socket.io, and should automatically launch a browser window.

Clicking the "start" button in the browser window will create six objects using the Faker library.  

Each object is then assigned a sigmoid wave generator function which starts updating the object's numeric data.

Each objects's data is plotted on a d3 line graph which rescales itself into the available space on the browser page.

In the initial proof-of-concept iteration no provision has been made to age out the data, so leaving this running for a long time could crash a browser.
 
## Faker Objects and their Wave Functions

Faker objects are created using the Faker library's built-in types.

Each Faker object then gets assigned a wave data generator.

Each wave data generator is actually composed of two generators, where one calls the other.

The sigmoidGenerator function accepts two parameters: amplitude and incrementor.

The sigmoidGenerator calls a normal mathematical sigmoid function with a value t, which starts out as the negative value of the amplitude argument.  On each "next()" call the "t" value is incremented by the inrementor value until t is equal to the absolute value of amplitude, at which point the t incrementation changes to decrementing, until the t is equal to the opposite absolute value of amplitude.

The generatorFactory creates a generator function by accepting three arguments: startValue, magnifier, and waveFunction.

The startValue is the random number that the Faker object got when it was created.

The waveFunction would be the sigmoidFunction created for the object.

The magnifier is a multiplier for the value returned by the waveFunction.

The amplitude, magnifier and increment numbers are random values so each object should get a wave pattern that is different from the others.




