var mysql = require('mysql');
var inquirer = require ('inquirer');

var idNum = 'string';

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    password: "sigma101", //Your password
    database: "bamazon"
})


connection.connect(function(err) {
    if (err) throw err;
    listItems();

})


// reads the SQL table and list items
function listItems(){

	connection.query('SELECT ID, Product_Name, Price FROM bamazon.products', function(err,res){   
    if(err) throw err;
	console.log('                  ');    
	console.log('Available Products');
	console.log('                  ');
	console.log('ID' + ' '+ 'Products');
	console.log('--------------------');

	for(i=0; i<10; i++){

		console.log(res[i].ID, res[i].Product_Name, res[i].Price);

			if(i == 9){
					ask();
			}
	}

});

	
}

// ask custumer which item they want to purchase
function ask(){
	inquirer.prompt({
		name: 'action',
		type: 'input',
		message: 'Enter the ID of the product you want to buy',
	 }).then(function(answer) {			
	 	console.log(answer);
	 	console.log(answer.action);
	 	var idNum = answer.action - 1;
	 	
		amount(idNum);

	});


}

// ask customer how much they would like to purchase
function amount(selID){
	inquirer.prompt({
		name: 'amount',
		type: 'input',
		message: 'How much would you like to purchase?',
	 }).then(function(response) {			

	 	console.log(response.amount);
		console.log('checkTwo');
		var amnt =  response.amount;
		checkInventory(selID, amnt);
		// return
		// connection.end();
	});

}

// checks the inventory and makes sure there is enought to fulfull the order
function checkInventory(itemSelected, number){

	connection.query('SELECT ID, Product_Name, STOCK_QUANTITY FROM bamazon.products', function(err,res){   
    if(err) throw err;

    console.log(res)
    console.log('amount ordered' + ' ' + number);
    console.log(res[itemSelected].STOCK_QUANTITY);

    if(number < res[itemSelected].STOCK_QUANTITY){

    	
    	console.log(res[itemSelected].Product_Name)

    	var newQuantity = res[itemSelected].STOCK_QUANTITY - number;
    	console.log(newQuantity)

    	var sql = "UPDATE products SET STOCK_QUANTITY = " + newQuantity + " WHERE ID = " + itemSelected + ";"

    	connection.query(sql, function(err, outcome) {
				console.log('check')
				console.log(outcome);
				console.log('new quant should be ' + newQuantity)
				console.log('actual' + ' ' + res[itemSelected].STOCK_QUANTITY);

			});

   //  	connection.query("UPDATE products SET ? WHERE ?", [{
   //  		STOCK_QUANTITY: newQuantity
			// }, {
   //  		// Product_Name: "res[itemSelected].Product_Name"
   //  		ID: itemSelected
			// }], function(err, outcome) {
			// 	console.log('check')
			// 	console.log(outcome);
			// 	console.log('new quant should be ' + newQuantity)
			// 	console.log('actual' + ' ' + res[itemSelected].STOCK_QUANTITY);

			// });




    }else
    {
    	console.log('Insufficient quantity!  Please choose an amount that does not exceed' + ' ' + res[itemSelected].STOCK_QUANTITY);
  		// asks the customer again to purchase a lesser amount
  		// amount(idNum);
    }

});


}


// constructor for purchase
// function Purchase (id, product, price){

// 	this.id = id;
// 	this.product = product;
// 	this.price = price;
// 	this.quantity = function(){
// 		//quantity funciton goes here
		
// 	};
// 	this.inventoryCheck = function (){
// 				//check inventory function goes here
// 			}

// 	this.cost = function(){
// 		//total cost to customer
// 	};		
// };
//  //values come from original prompt



// var myPurchase = new Purchase ()