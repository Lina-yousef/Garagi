'use strict';


// create constructor 
function Car (carModel , modelYear , manufacturer){
this.carModel = carModel ;
this.modelYear = modelYear ;
this.manufacturer =manufacturer;
 // for calculate random price 
this.price = randomPrice() ;

// each time create new car object, it will push inside array allCars 
Car.prototype.allCars.push(this);

}
// array contain all of car models 
Car.prototype.allCars= [];

// to add new car using form
var form =document.getElementById('carsForm');
form.addEventListener('submit' , addCar);

// event ==> contains info. about submit data 
function addCar (event){
    
    // this will not refresh page when form will submitted 
    event.preventDefault();
    
    // to get values for new car from event 
    //  without .value ==> it will pass just element NOT value
    var carModelValue     = event.target.carModel.value;
    var modelYearValue    = event.target.modelYear.value;
    var manufacturerValue = event.target.manufacturer.value;
    
    // Create car object to pass values 
   var userCar = new Car (carModelValue , modelYearValue , manufacturerValue ) ;
   console.log(Car.prototype.allCars);
   
   // after adding => update local storage 
    // each time I'm calling addCar fun, it will update local storage to contain value of new car
    localStorage.setItem('carsObjects' , JSON.stringify(Car.prototype.allCars));
    
    // calling render function to add new data inside table 
    userCar.render();
    
    
}
// to get random price between 7000 - 10000 
function randomPrice (){
    //return => to get the value out of function 
    return  Math.floor(Math.random() * ( 100000 - 7000 ) + 7000);
}

// create table to add data from the form
// table must be global
 var table = document.getElementById('carsTable');
createTable();

function createTable (){
    table.innerHTML = '';
    
    // create & append Row to table 
    var headerRow = document.createElement('tr');
    table.appendChild(headerRow);
    
    //create carModel header  & append to headerRow
    var carModelHeader = document.createElement('th');
    carModelHeader.textContent = 'Car Model' ;
    headerRow.appendChild(carModelHeader);
    
    //create modelYear header & append to headerRow
    var modelYearHeader = document.createElement('th');
    modelYearHeader.textContent = ' Model Year' ;
    headerRow.appendChild(modelYearHeader);
    
    // create price header & append to headerRow
    var priceHeader = document.createElement('th');
    priceHeader.textContent = 'Price' ;
    headerRow.appendChild(priceHeader);
    
    // create manufaturer header & append to headerRow
    var manHeader = document.createElement('th');
    manHeader.textContent = 'Manufacturer' ;
    headerRow.appendChild(manHeader);
    
}


// create render fun to add new row
Car.prototype.render =function (){
var carRow = document.createElement('tr');
table.appendChild(carRow);

// create & append car model data to carRow 
var carModelData = document.createElement('td');
carRow.appendChild(carModelData);
// this => call using (this) to refere all object prop.
carModelData.textContent = this.carModel;

// create & append modelYear data to carRow 
var modelYearData = document.createElement('td');
carRow.appendChild(modelYearData);
modelYearData.textContent = this. modelYear ;

// create & append Price data to carRow
var priceData = document.createElement('td');
carRow.appendChild(priceData);
priceData.textContent = this.price ; 

// create & append manufacturer data to carRow 

var manData = document.createElement('td');
carRow.appendChild(manData);
manData.textContent = this.manufacturer ;
}

// loop over the array to (get)object inside it 
if(localStorage.getItem('carsObjects')){
    var lsArray = JSON.parse(localStorage.getItem('carsObjects'));
console.log('lsArray',lsArray);
    for(var i=0 ; i <lsArray.length ; i++){
      var x= new Car(lsArray[i].carModel , lsArray[i].modelYear , lsArray[i].manufacturer);
       x.render();

    }
}