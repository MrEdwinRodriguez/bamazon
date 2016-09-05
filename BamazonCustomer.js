var mysql = require('mysql');
var inquirer = require ('inquirer');

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

function ask(){
	inquirer.prompt({
		name: 'action',
		type: 'input',
		message: 'Enter the ID of the product you want to buy',
	 }).then(function(answer) {			

	 	console.log(answer.action);
	 	var idNum = answer.action - 1;
		amount(idNum);
	});


}


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


function checkInventory(itemSelected, number){

	connection.query('SELECT ID, Product_Name, STOCK_QUANTITY FROM bamazon.products', function(err,res){   
    if(err) throw err;

    console.log(res)
    console.log('amount ordered' + number);
    console.log(res[itemSelected].STOCK_QUANTITY);
    // console.log(amnt)

});


}