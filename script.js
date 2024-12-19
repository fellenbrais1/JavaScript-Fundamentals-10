'use strict';

// NOTES
// DEFAULT PARAMETERS
// We can set up a function to have default values for a parameter if another value is not supplied or if we don't want to pass something in or change from a default value.

const newBooking = [];

// In this function, without specifying default values for these parameters, we will create an incomplete booking object if we don't feed in enough arguments, the first argument will be set, but the others will be undefined.
const createBooking = function (flightNumber, numberOfPassengers, price) {
  const booking = {
    flightNumber,
    numberOfPassengers,
    price,
  };
  console.log(`Create Booking:`);
  console.log(booking);
  newBooking.push(booking);
};

// So, if we supply only one argument, only the first of the three fields in the object will be filled in and the rest will be undefined.
createBooking('LH123');

const createBooking2 = function (flightNumber, numberOfPassengers, price) {
  // This is the old way to assign default values to parametes that was used before ES6, it is ugly and takes up space, but it does work. The OR operator is used for short circuiting, if the first value is truthy,that will be assigned to the parameter, otherwise the default value will be.
  flightNumber = flightNumber || 'Unknown';
  numberOfPassengers = numberOfPassengers || 1;
  price = price || 199;

  const booking = {
    flightNumber,
    numberOfPassengers,
    price,
  };
  console.log(`Create Booking 2:`);
  console.log(booking);
  newBooking.push(booking);
};

createBooking2();

// The post ES6 way of doing things is to define the default values in the parameter parentheses, like this. This is much easier and lines up with how things are done in other languages like Python.
const createBooking3 = function (
  flightNumber = 'Not given',
  numberOfPassengers = 100,
  price = 1299
) {
  const booking = {
    flightNumber,
    numberOfPassengers,
    price,
  };
  console.log(`Create Booking 3:`);
  console.log(booking);
  newBooking.push(booking);
};

createBooking3();

// The default parameter statements can contain any expression, so we can assign default values based on the value of other things, even other parameters fed into the function.

// For example, we could assign the price a default value computationally from another parameter like the number of passengers. Parameters are computed in the order they are listed, so we cannot assign things out of turn.

const createBooking4 = function (
  flightNumber = 'Not given',
  numberOfPassengers = 90,
  price = numberOfPassengers <= 100 ? 100 : 160
) {
  const booking = {
    flightNumber,
    numberOfPassengers,
    price,
  };
  console.log(`Create Booking 4:`);
  console.log(booking);
  newBooking.push(booking);
};

createBooking4();

// We cannot selectively feed in values as arguments to a function because the parameters are calculated in order, so we could not skip the numberOfPassengers argument but provide values for the others. The first argument will always be mapped to the first parameter, the second will always be mapped to the second parameter, and so on.

// However, to get this skipping functionality, we can supply an argument as 'undefined'. This counts as the parameter not being assigned a value at all, so the default value will be used instead.

createBooking4('ML52', 188, undefined);
createBooking4('ML52', undefined, 200);

// NOTES
// HOW PASSING ARGUMENTS WORKS: VALUE VS. REFERENCE

const flight = 'LH234';

const michael = {
  name: 'Michael McCann',
  passportNumber: 48322815,
  gender: 'M',
};

const sarah = {
  name: 'Sarah Kerrigan',
  passportNumber: 11268432,
  gender: 'F',
};

// Mengsk is not cleared for travel, so his passport number will cause an alert in the checkIn() function.
const arcturus = {
  name: 'Arcturus Mengsk',
  passportNumber: 11265576,
  gender: 'M',
};

const errorObject = {
  name: 'Unknown',
  passportNumber: 'Unknown',
  gender: 'Unknown',
};

// An array to check against to see if a passport number is cleared for travel or not. Only Michael and Sarah are cleared to fly.
const approvedPassports = [48322815, 11268432];

function checkIn(flightNumber = 'Unknown', passengerObject = errorObject) {
  if (passengerObject === errorObject) {
    console.log(
      `An error has occurred, a valid passenger object has not been provided.`
    );
    return;
  }
  let passengerName = passengerObject.gender === 'M' ? 'Mr. ' : 'Mrs. ';
  passengerName += passengerObject.name;
  if (approvedPassports.includes(passengerObject.passportNumber)) {
    // alert(`Check in approved for ${passengerName}!`);
  } else {
    // alert(
    //   `Contact spaceport authorities, passport of ${passengerName} not cleared for travel!`
    // );
    return;
  }
  console.log(
    `${passengerName} of passport number: ${passengerObject.passportNumber}, has checked in for flight: ${flightNumber}`
  );
}

checkIn(flight, michael); // Use supplied arguments for both parameters
checkIn(flight, undefined); // Use the default errorObject for the passengerObject
checkIn(undefined, michael); // Use the default value for the flight
checkIn(undefined, undefined); // Use the default values for both the flight and passengerObject

checkIn(flight, sarah); // Cleared for check in from her passport number
checkIn(flight, arcturus); // Not cleared for check in from his paspport number

// VALUES
// We have to take care when changing values of variables inside functions, if they are of primitive type like a string, any changes carried out during the function will not be reflected later, outside of the function, unless we explicitly redefine the variable with the changes. This is because copies are made of all primitive values for use in functuions. The data on the stack is just a copy of a VALUE, so changes made are not preserved.

// REFERENCES
// However, for complex types like Objects, we can actually change their values in a function without explicitly defining the variable with the changes. This is because the parameter is only using a REFERENCE to these complex types. The data on the heap can be changed and so changes made are preserved.

// As we can see in this example, the value of a simple type variable is not permanently altered by a function, only the copy is altered, unless we return it and then redefine the original version of the variable.
const simple = 'Hello';
console.log(`Before: ${simple}`); // Hello

function changeValue(value) {
  value = 'Goodbye'; // Goodbye
  console.log(value);
}

changeValue(simple);
console.log(`After: ${simple}`); // Hello

// For complex variables though, a function can actually permanently change the values in the variable. This is because the engine is directly acting on a reference to a site in the heap.
const complex = {
  name: 'James Raynor',
  passportNumber: 11987657,
  gender: 'M',
};
console.log(`Before: ${complex.name}`); // Jim Raynor

function changeComplex(complex) {
  complex.name = 'This is Jimmy';
  console.log(complex.name); // This is Jimmy
}

changeComplex(complex);
console.log(`After: ${complex.name}`); // This is Jimmy

// We have to be careful of this, as changing objects and other complex types in this way can have disasterous consequences and could introduce a lot of bugs, especially in a multi-person team.

// It is better to make a temporary clone or shallow copy of the object to play with, and only apply changes back to the original if that is the intended and understood behaviour of the function.

// Programmers often refer to these two things as 'passing by reference' and 'passing by values'. Technically, there is no 'passing by reference' in JavaScript. In JavaScript, a reference is passed by passing in the address of the memory address, which is axctually a value, so in JavaScript, we are technically always passing by values.

// NOTES
// FIRST-CLASS AND HIGHER-ORDER FUNCTIONS

// FIRST-CLASS FUNCTIONS
// JavaScript has something called first-class functions, which means:
// JavaScript treats functions as 'first-class citizens'.
// This means that functions are simply values.
// Functions are just another 'type' of object.

// All of this means that we can store functions in variables and properties.
// const add = (a, b) => a + b;
// const counter = {
//   value: 23,
//   inc: function () {
//     this.value++;
//   },
// };

// We can also pass functions as arguments to other functions, such as when adding functions to addEventHandler.
// const greet = () => console.log('Hey, Michael');
// btnClose.addEventListener('click', greet);

// We can also return functions from other functions, which sounds crazy but can actually be quite useful.

// There are also methods we can call on functions
// counter.inc.bind(someOtherObject);

// HIGHER-ORDER FUNCTIONS
// Having first-class functions allows us to write higher-order functions.
// A function that receives another function as an argument, that returns a new function, or both.
// This is only possible by first-order functions.

// We can use this to make functions that receive another function.
// The function that receives another function as an input is the higher-order function, and the function fed in is referred to as the callback function. The callback function can be called when the higher-order function is ready to do so.

// Here, addEventListener is a higher-order function, whereas greet is a callback function.
// const greet2 = () => console.log('Hello Michael');
// btnClose.addEventListener('click', greet);

// We can also create functions that return a new function.
// count() is the higher-order function and the returned function is called the returned function.
// function count() {
//   let counter = 0;
//   return function () {
//     counter++;
//   };
// }

// All functions are values in JavaScript. This means that technically, all functions are first-class functions in JavaScript, unlike other languages. Depending on their setup some functions are higher-order functions in JavaScript, and some are not.

// NOTES
// FUNCTIONS ACCEPTING CALLBACK FUNCTIONS

// These are just standard function declarations, so they are first-class functions but not gigher-order functions as they do not return, make, or accept other functions as arguments.
const oneWord = function (str) {
  return str.replaceAll(' ', '').toLowerCase();
};

const upperFirstWord = function (str) {
  return (
    str.slice(0, str.indexOf(' ')).toUpperCase() + str.slice(str.indexOf(' '))
  );
};

console.log(oneWord('Hello my baby, hello my darling, hello my good time gal'));
console.log(
  upperFirstWord('Hello my baby, hello my darling, hello my good time gal')
);

// Higher-order function
// This function takes in a string then another function, we can then process the string by the specified function inside this function, which is quite a powerful tool that can be used for multiple things. The functions that we pass in are called the callback functions, this is because we are not calling them, but the function is actually calling them.

// We can see in this function that methods can be called on a function, I have called the .name function on the fn parameter to print the name that the fed in function has.
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Using '${fn.name}' to transform.`);
  console.log(`Transformed string: ${fn(str)}`);
  return fn(str);
};

transformer('Hello my cheeky chango', oneWord);
transformer('Hello my cheeky chango', upperFirstWord);

function high5() {
  console.log('🖐️');
}

// In this case, the 'click' in the event listener is the higher-order function, and high5 is the callback function it will later call.
document.body.addEventListener('click', high5);

const namesArray = ['James', 'Sarah', 'Samir', 'Arcturus'];

// The forEach loop iterates through elements in an array or other iterable and then executes some code for each element.
namesArray.forEach(element => {
  high5();
  console.log(`${element}`);
});

const myName = 'Michael McCann';
[...myName].forEach(element => {
  console.log(element);
});

// Using callback functions is very useful in programming to add abstraction. For example, the transformer function defined above does not care about how the string is transformed, we could run any function to transfer the string and transformer would still work just the same.

// This can allow us to make versatile code that can handle many different things in the future and we are not locking ourselves in to any one way of doing things.

// This is especially important when dealing with OOP, which will be covered later.

// Higher-order functions are called that because they run at a 'higher' level of abstraction, they more run things than do things. This isn't set in stone and is just one interpretation.

// My own experiments with a higher-order function 'eat()', and two callback functions 'eatPizza()' and 'eatMikan()'.
function eat(fn, pieces) {
  let food = '';
  if (fn.name === 'eatMikan') {
    food = 'mikans';
  }
  if (fn.name === 'eatPizza') {
    food = 'pizza';
  }
  console.log(`Processing ${food} using ${fn.name}, with ${pieces} pieces.`);
  fn(pieces);
}

function eatPizza(slices = 6) {
  let counter = 1;
  while (counter <= slices) {
    console.log('You eat a slice of pizza, yum!');
    counter++;
  }
  console.log(`You ate all ${slices} slices of pizza!`);
}

eat(eatPizza, 12);

function eatMikan(mikans = 2) {
  let counter = 1;
  while (counter <= mikans) {
    console.log('You scoff a mikan.');
    counter++;
  }
  console.log(`You ate ${mikans} mikans!`);
}

eat(eatMikan, 20);

// NOTES
// FUNCTIONS RETURNING FUNCTIONS

// This greet function returns another function, when we run this function, the returned function isn't inherently called, but we can capture it as a variable.
const greet = function (greeting) {
  console.log(greeting);
  return function (name) {
    console.log(`${greeting}, ${name}`);
  };
};

// As the return value is a function, we can assign it to a variable like so.
const greeterHey = greet('Hey');

// Then we can call this function while specifying any arguments it might need.
greeterHey('Michael');

// This works because of closures, as this is quite a difficult subject, it will be covered later on in this module.

// greet() returned another function and we assigned it to a variable so it can be called at any time.

// As the greet function returns a function, we can actually call that function directly by calling it by specifying its argument(s) right after the first function call.
greet('Hello')('Sarah');

// This looks a bit weird, but it does work.

// This is the same greet function and its returned function written as only arrow functions, this looks a little confusing, but still works just the same for a much-reduced amount of code. Some people think this is a lot more confusing andtend to use the more traditional method as above.
const greet2 = greeting => name => console.log(`${greeting}, ${name}`);

greet2('Yo')('Chrissy');

// NOTES
// THE CALL AND APPLY METHODS
