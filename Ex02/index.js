//Question 1 

const greeter = (myArray, counter) => {
    const greetText = 'Hello ';
    
    for (const name of myArray) {
      console.log(`${greetText}${name}`);
    }
  };
  
  console.log("Question 1 :");
  greeter(['Randy Savage', 'Ric Flair', 'Hulk Hogan'], 3);

//Question 2

  const capitalize = (str) => {
    const [first, ...rest] = str;
    return `${first.toUpperCase()}${rest.join('').toLowerCase()}`;
  };
  
  console.log("Question 2 :");
  console.log(capitalize('fooBar'));  
  console.log(capitalize('nodeJs'));  

//Question 3

const colors = ['red', 'green', 'blue'];

const capitalizedColors = colors.map(color => capitalize(color));

console.log("Question 3 :");
console.log(capitalizedColors); 

//Question 4 

const values = [1, 60, 34, 30, 20, 5];

const filterLessThan20 = values.filter(value => value < 20);

console.log("Question 4 :");
console.log(filterLessThan20); 

//Question 5 

const array = [1, 2, 3, 4];

const calculateSum = array.reduce((sum, num) => sum + num, 0);

const calculateProduct = array.reduce((product, num) => product * num, 1);

console.log("Question 5 :");
console.log(calculateSum);     // Output: 10
console.log(calculateProduct); // Output: 24


//Question 6 

// Car class
class Car {
  constructor(model, year) {
    this.model = model;
    this.year = year;
  }

  details() {
    return `Model: ${this.model} Engine ${this.year}`;
  }
}

// Sedan subclass
class Sedan extends Car {
  constructor(model, year, balance) {
    super(model, year); // Call the parent constructor with model and year
    this.balance = balance;
  }

  info() {
    return `${this.model} has a balance of $${this.balance.toFixed(2)}`;
  }
}

console.log("Question 6 :");
const car2 = new Car('Pontiac Firebird', 1976);
console.log(car2.details()); 

const sedan = new Sedan('Volvo SD', 2018, 30000);
console.log(sedan.info()); 






  