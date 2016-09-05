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

	// connection.end();
}

function ask(){
	inquirer.prompt({


		console.log('check');
	});
}
