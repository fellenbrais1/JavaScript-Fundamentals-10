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
// Using the 'this' keyword and setting it manually.

console.log('=======================================');

// We can write an airline object with an interal function that makes use of the 'this' keyword to get the data it needs from the object itself.
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNumber, passengerName) {
    console.log(
      `${passengerName} booked a seat on ${this.airline} flight ${this.iataCode}, ${flightNumber}`
    );
    this.bookings.push({
      flight: `${this.iataCode} ${flightNumber}`,
      passengerName,
    });
  },
};

// We call the function by dot-indexing it as a property of the object with the required arguments.
lufthansa.book(239, 'Michael McCann');
lufthansa.book(681, 'John Smith');
console.log(lufthansa.bookings);

// We can capture the function we wrote in the lufthansa object and assign it to a variable to avoid having to copy paste it or write it again.
const book = lufthansa.book;

// Then we can define this variable as a property of another object and we will then be able to call this function on this object.
const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
  book,
};

// However, if we tried to just call the function by itself it would not work, this is because the function is using this keyword calls, and it has no associated object to call this on. If we had variables of the same name in the global scope it could still work, but this is unlikely to be the behaviour that we want.
// book(996, 'Sarah Kerrigan');

// Again, we have to call it by dot-indexing it on the object.
eurowings.book(881, 'James Raynor');
console.log(eurowings.bookings);

// Another way of thinking about this is that we are telling the function what the 'this' keyword should mean. We provide the object that will be the subject of the 'this' keyword.

// There are also three other ways to manually tell the JavaScript engine what the 'this' keyword means, three function methods called '.call()', '.apply()', and '.bind()'.

// CALL '.call()'
// We use '.call()' after the function name, then in the parentheses, the first argument is the object we want to call the function on, then we provide the other arguments that the function needs to run.
book.call(lufthansa, 885, 'Egon Stettman');
book.call(eurowings, 132, 'Arcturus Mengsk');

console.log(lufthansa.bookings);
console.log(eurowings.bookings);

// '.call()' allows things to be a bit more flexible, the function could be called on any object that has the right data for it to work. We don't need to call the function as a property of the object, rather we are setting the object to use as the first argument of the call method.

// We could make any number of other compatible objects and then easily use the function using '.call()'.
const swiss = {
  airline: 'Swiss Airlines',
  iataCode: 'LX',
  bookings: [],
  book,
};

book.call(swiss, 854, 'Rory Swann');
console.log(swiss.bookings);

// APPLY '.apply()'
// The .apply()' method does the same thing as the '.call()' method, but it takes in an array of the arguments, rather than comma seperated arguments.
const flightData = [583, 'George Cooper'];

// The first argument is the object to call the function on, the same as '.call()', but the second argument is the array of arguments that the function needs.
book.apply(swiss, flightData);
console.log(swiss.bookings);

// '.apply()' is considered a little old and clunky now, and isn't commonly used in JavaScript, usually if people need this functionality of reading an array as arguments they will just use the spread operator to split out the values from an array as part of the function call. This does exactly the same thing but is considered more modern.
book.call(swiss, ...flightData);
console.log(swiss.bookings);

// NOTES
// THE BIND METHOD '.bind()'

// The '.bind()' also allows us to maunally set the 'this' keyword for any function call, the difference is that '.bind()' does not immediately call the function, it returns a new function where the 'this' keyword is bound.

// The below code is how we used the .call() function method.
book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings.bookings);

// This will not call the book function, it will return a new function where the 'this' keyword will always be set to 'eurowings'. We can bind this to a variable and then call this whenver we need it.
const bookEuroWings = book.bind(eurowings);

// Because the 'this' keyword has already been set to something when we first use the '.bind()' method, we don't need to specify this within the parentheses.
bookEuroWings(24, 'Rachel McAdams');
console.log(eurowings.bookings);

// This allows us to make a specific function only for this object that we can call upon whenever we want. It ultimately acheives the same goal, but has its specific uses.

// We could create specific functions for all of the other airlines if we wanted to. This can be a little easier than using the '.call()' all the time.
const bookLuftHansa = book.bind(lufthansa);
const bookSwiss = book.bind(swiss);

bookLuftHansa(48, 'Jiminy Cricket');
console.log(lufthansa.bookings);

bookSwiss(999, 'Tom Riddle');
console.log(swiss.bookings);

// We could also use '.bind()' to lock in arguments that we feed into the function. For example, we could make it so that the function always books a certain kind of flight for example.

// To do this, we also feed in some of the arguments that we want to be automatically fed into the function in additional to what the 'this' keyword should equate to.
const bookEuroWings48 = book.bind(eurowings, 48);

// When we call this function, the flight number of 23 is already passed in, so we only have to pass in the name for it to work.
bookEuroWings48('John Smithe');
bookEuroWings48('Martha Cooper');
console.log(eurowings.bookings);

// Specifying some of the arguments beforehand is a common practice to save time and labour, and is called 'partial application'.

// A common application of the '.bind()' method is when using functions and event listeners together.

lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

// In an eventhandler function, the 'this' keyword always points to the element that the function is attached to, we don't want that in this situation, so we have to bind the 'this' keyword to 'lufthansa' to get the behaviour we want.
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application is another big usecase for the '.bind()' method.

// We could create a standard function to add tax to a purchase amount, but we might also need more specific functions for fized tax rates in different countries etc, to do this we could use the '.bind()' method to present some of the values via partial application.
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

// If we are not interesting in what the 'this' keyword should point to, in this case it isn't even used in the function, we can set it to 'null' as seen here.
const addVAT = addTax.bind(null, 0.175);
console.log(addVAT(200));

// The order of the arguments when using partial application is important, therefore, we should put something we want to change as the first argument of a function.

// Of course, we could do all of this using default values on a function as well, but .bind() gives us the ability to dynamically create custom functions when we want to using partial application.

// To create a similar function without using the '.bind()' method we could create a function that takes in just the rate which returns another function we can specify the value with, this effectively creates a custom function for our tax purposes much in the sam way as we did before.

// This is my first attempt.
function createFunc(rate = 0.1) {
  const vatTax = function (value) {
    console.log(rate, value);
    const finalAmount = value + value * rate;
    return finalAmount;
  };
  return vatTax;
}

// We create a custom function by supplying the rate first of all.
const addVAT2 = createFunc(0.55);
// Then we can call this custom function by supplying the tax amount.
console.log(addVAT2(12500));

// This is a cleaner attempt after watching the tutorial to the end of the section.
const addTaxrate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const addVAT3 = addTaxrate(0.23);
console.log(addVAT3(100));

// We could also chain call this inner function as well like so.
console.log(addTaxrate(0.175)(5000));

// NOTES
// CHALLENGE 1
// Builing a simple poll using some of the methods we have learnt so far.

// My first blind attempt
const poll = {
  question: 'What is your favourite programming language?',
  options: ['1: JavaScript', '2: Python', '3: Rust', '4: C++'],
  // This creates a new array of 4 elements in length, with all elements filled with the value 0
  answers: new Array(4).fill(0),
};

function registerNewAnswer() {
  // Defining a tabSize variable that can be used to influence the amount of spacing in a string.
  const tabSize = 6;

  let promptMessage = '';
  const paddedQuestion = ' '.repeat(tabSize) + poll.question;
  promptMessage += paddedQuestion;
  promptMessage += '\n';
  console.log(paddedQuestion);

  poll.options.forEach(element => {
    const paddedOption = ' '.repeat(tabSize) + element;
    console.log(paddedOption);
    promptMessage += paddedOption;
    promptMessage += '\n';
  });

  const userAnswer = Number(prompt(promptMessage));
  console.log(typeof userAnswer, userAnswer);
  if (
    userAnswer !== 1 &&
    userAnswer !== 2 &&
    userAnswer !== 3 &&
    userAnswer !== 4
  ) {
    [alert('Please enter one of the valid answers')];
  } else {
    console.log(userAnswer);
    poll.answers[userAnswer - 1]++;
    displayResults();
  }
}

function displayResults() {
  const tabSize = 6;
  const maxOptionLength = Math.max(
    ...poll.options.map(option => option.length)
  );
  let alertMessage = '';

  poll.options.forEach((element, index) => {
    const padding = ' '.repeat(maxOptionLength - element.length + tabSize);
    const paddedOption =
      ' '.repeat(tabSize) + element + ': ' + padding + poll.answers[index];
    alertMessage += paddedOption;
    alertMessage += '\n';
  });
  alert(alertMessage);
}

// Commented out so the second example can be run on the webpage.
// document.querySelector('.poll').addEventListener('click', registerNewAnswer);

// Second attempt after following the challenge lecture's advice.
const poll2 = {
  question: 'What is your favourite cheese?',
  options: ['1: Camembert', '2: Cheddar', '3: Emmental', '4: Red Leicester'],
  answers: new Array(4).fill(0),

  // Adding the function as part of the object, this means that the 'this' keyword will point to this object, allowing us to access data from this object.
  registerNewAnswer2() {
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );
    console.log(answer);

    // Using short-circuiting to handle this next part, if any of the conditions before the incrementation is false then the and operator will short-circuit and the incrementation at the end will not happen.
    typeof answer === 'number' &&
      answer < this.answers.length + 1 &&
      answer !== 0 &&
      this.answers[answer - 1]++;

    // Testing out the displayResults function both with the default type of 'array' and the specified type of 'string'.
    console.log(this.answers);
    this.displayResults();
    this.displayResults('string');
  },

  // Another function included within the object that will display the results by default as a simple console.log or as a string if that is specified in the 'type' argument.
  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};

// Adding the function to a button click on the webpage.
document
  .querySelector('.poll')
  .addEventListener('click', poll2.registerNewAnswer2.bind(poll2));

// We can repurpose the displayResults function inside the poll2 object but using the '.call()' method to set a different 'this' keyword.
const testData1 = [5, 2, 3];
const testData2 = [1, 5, 3, 9, 6, 1];

// However, the function is looking for 'this.answers' which will never work unless we create a new object with an answers property. We can feed the values of the test arrays into this object by using the spread operator.
poll2.displayResults.call({ answers: [...testData1] });
poll2.displayResults.call({ answers: [...testData1] }, 'string');

poll2.displayResults.call({ answers: [...testData2] });
poll2.displayResults.call({ answers: [...testData2] }, 'string');

// NOTES
// IMMEDIATELY INVOKED FUNCTION EXPRESSIONS (IIFES)

// Sometimes we want to create a function but only have it run once straight away, and then never again.

// IIFES are functions that dissapear once being called once.

// We could create a function like this and then just run it once, but the point of IIFE's is that we don't even want to have them assigned to a variable at all.
const runOnce = function () {
  console.log(`This will never run again`);
};

runOnce();

// We could define a function without assigning it to a variable, but this will raise an error at first. We solve the error by wrapping the whole thing in parentheses to make it into an expression.
(function () {
  console.log(`This will never run again`);
})();

// To immediately call the function we place a pair of parentheses directly after the expression. This calls the function straight away and executes the code without the function being added to any variables and memory outside of its immediate execution context.

// The same would also work for an arrow function. Notice that to get it to be called instantly we also need to put the pair of parentheses after the expression.
(() => console.log(`This will never run again`))();

// It also works if the function takes arguments, we can just define the arguments in the parentheses after the expression to instantly invoke the function with those arugments.
(number => console.log(number * 2))(4);

// But what is the point of IIFEs?
// Functions create scopes, one scope does not have access to any variables within an inner scope. The scope chain only runs upwards through layers of scopes.

// Data defined inside a scope is private to the scope and is encapsulated inside the scope that created it. It is important to know that variables are private and protected from being overwritten by other parts of the program or by external scripts and libraries.

// Scopes are a good tool for protecting variables. IIFEs allow us to protect the variables that a scope uses by making the scope run and then be deleted immediately afterwards.

// The variable declared in the below scope is private to the scope and encapsulated within it.
// {
//   const isPrivate = 23;
// }

// If we try to access thius variable outside of the scope we cannot use it at all, as it is private and encapsulated.
// console.log(isPrivate);

// IIFEs are available to use but are not actually that useful, much like we can use var to defined variables in a way that they are not private to a scope, IIFEs can help us in the other way, by only allowing a variable to be used within a specific scope and then discarded immediately afterwards, therefore being immune from being manipulated.

// NOTES
// CLOSURES

// Closures are often cited as the hardest JavaScript concept to understand. Clousures bring a lot of the concepts we have already studied together.

// Closures are not features that we explicity create and use, they just happen automatically in certain situations.

// The function is called secureBooking as it cannot be manipulated from outside of its scope, making the value of the variable within secure.
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

console.log(`====================================`);

// Before the below line of code is executed, we are running within the global EC. When the 'secureBooking()' function is called, a new EC is created on the stack that contains the 'passengerCount' variable. When the function is returned, a new variable called 'booker' is created within the global EC. Once the 'secureBooking()' function has done its job, its EC will be popped off the stack, but the variable environment for 'passengerCount' variable still lives on in the engine's memory, specifically in the heap now instead of the stack. This means that even though the EC for the function is popped off the stack, we can still manipulate this created variable.
const booker = secureBooking();

// If we call 'booker()' multiple times we can see the value of 'passengerCount' can still be incremented. The variable's value can still be manipulated. However, it can only be manipulated through 'booker()', as the variable does not exist on the stack, but in memory, with 'booker()' being our reference to its location.
booker();
booker();
booker();

// Closures allow this kind of behaviour to happen. Closures make a function remember all of the variables that were created in its birthplace at the time of its creation.

// Usually variables are deleted via garbage collection when they are no longer reachable, but if a closure can still reach a variable, it will persist in memory indefinitely. The engine moves the variable environment to the heap in the case of closures so that these variables can be 'remembered' by functions that need them later.

// When we invoke 'booker()' it has its own EC created on the stack, this will be empty of all variables. The scope chain doesn't explain how this EC can access the passengerCount variable as it is not connected to the global EC in the scope chain.

// When 'booker()' was created, it is granted access to the variable environment containing 'passengerCount', just as it was when the function was first created. It is connected directly to the appropriate VE on the heap. This is what is called a CLOSURE.

// In summary:
// A function has access to the VE of the EC in which it was created.
// Closure: VE attached to the function, exactly as it was at the time and place the function was created.
// This attached VE is sometimes known as a 'closed over' VE, hence the term closures.
// Thanks to a closure, a function does not lose access to variables that were created at the place and time of its birth.
// If a variable a function needs cannot be immediately found, the JavaScript engine will prioritise looking in any closures attached the function to find that variable, then looking at the scope chain after that.

// Definitions from very formal to casual.
// A closure is the closed-ver variable environment of the execution content in which a function was created, even after that execution context is gone.

// A closure gives a function access to all the variables of its parent function, even after that parent function has returned. The function keeps a reference to its outer scope, which preserves the scope chain throughout time.

// A closure makes sure that a function doesn't lose connection to the variables that existed at the function's birth place.

// A closure is like a backpack that a function carries around wherever it goes. This backpack has all the variables that were present in the environment where the function was created.

// IMPORTANT POINT
// We do not have to manually create closures, this is a JavaScript function the happens automatically. We can't even access closed-over variables explicitly. A closure is not a tangiable JavaScript object.

// We can take a look at this internal property of a variable, to see what is in there.

// Using console.dir() allows us to look into the internal properties of a function. We can click into the 'scopes' tab and see what variables etc are accessible by the function. We can see things in this output surrounded by double brackets [[]] which denotes that these are internal properties that cannot be manipulated explicitly.
console.dir(booker);

// NOTES
// MORE CLOSURE EXAMPLES

// We don't need to return a function from a function in order for a closure to be created, it is an inherent process and actually can happen with all functions if the variable environment has its execution context deleted where the variables might still be useful.

// EXAMPLE 1
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(`a times 2 is ${a * 2}`);
  };
};

// Function g creates a function called f, which we can then call after it has been created. The value of f as as a function is assigned to the f variable we defined earlier, and it can use the variable a, even though the EC of g is no longer in operation. The function f has inherited all variables it needs at the time and place of its creation in g via a closure. f has access to the variable a, even when called outside of g. This works even though a is not actually defined anywhere within f. f closed over the variable environment of the g function, which includes a.

g();
f();

const h = function () {
  const b = 777;
  f = function () {
    console.log(`b times 2 is ${b * 2}`);
  };
};

// Reassigning the f function, when it is recreated it closes over the new EC and VE where it was recreated, which now means that it has access to the variable b instead of a, which has been forgotten by f.
h();
f();

// When we reassign functions, even without returning them, a new closure will be created, which will potentially change what the function has access to.

// EXAMPLE 2
const boardPassengers = function (number, wait) {
  const perGroup = number / 3;

  // We can set a timer by specifying setTimeout(), it takes two arguments, a function to be executed, and then a time in milliseconds before it is run. This callback function is being used independently from the boardPassengers function, which shows us that thete is a closure being created so that this function has access to the variables it needs.
  setTimeout(function () {
    console.log(`We are now boarding all ${number} passengers.`);
    console.log(`There are three groups each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds.`);
};

setTimeout(function () {
  console.log(`TIMER STARTED`);
}, 1000);

boardPassengers(180, 3);

// Closures have priority over the scope chain. If there is a variable in the closure with the same name as a variable in the scope chain, the function will use the variable saved in the closure over the other one.

// NOTES
// CHALLENGE 2
// Take an IIFE defined below and at the end of the function attach an event listener that changes the colour of the header element to blue each time the body is clicked. We have to do this without selecting the h1 element again. This is to demonstate what is happening when closures are involved.

console.log(`===============================`);

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  // Added code
  const alpha = function () {
    header.style.color = 'blue';
  };
  document.querySelector('body').addEventListener('click', alpha);
  // End of added code
})();

// EXPLANATION
// When the IIFE is executed, the final line is run straight away, so the eventListener is added to the body of the page, the internal function alpha is defined and this is run to execute on the click. alpha changes the header based on the const header. This variable is closed over by alpha at the time of its execution, so even once the IIFE has been excecuted and deleted, alpha can still have access to this variable in order to carry out its tasks. The IIFE is the birthplace of the function alpha.
