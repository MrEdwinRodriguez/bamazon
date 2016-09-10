var mysql = require('mysql');
var inquirer = require('inquirer');




var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    password: "sigma101", //Your password
    database: "bamazon"
})


connection.connect(function(err) {
    if (err) throw err;
    menu();
    ask();

})

function menu(){
    
    console.log('Main Menu:');
    console.log('----------')
	console.log('Press "1" View Products for Sale');
	console.log('Press "2" View Low Inventory');
	console.log('Press "3" Add to Inventory');
	console.log('Press "4" Add new Product');
	
}

// ask manager what they want to do
function ask() {
    inquirer.prompt({
        name: 'action',
        type: 'input',
        message: 'What would you like to do (press number)?',
    }).then(function(answer) {


         switch(answer.action) {
            case '1':
                viewAll();
            break;
            
            case '2':
                lowInventory();
            break;
            
            case '3':
                addInventory();
            break;
            
            case '4':
                addNewProduct();
                // addProduct();
            break;

            default:
                console.log('that is not an option')
            break;
        }


    });
}

function viewAll(){

    connection.query('SELECT ID, Product_Name, Price, STOCK_QUANTITY FROM bamazon.products', function(err, res) {
        if (err) throw err;

        // console.log(res)
           for (i = 0; i < res.length; i++) {
           		// console.log(i);
            console.log(res[i].ID, res[i].Product_Name, res[i].Price, res[i].STOCK_QUANTITY);

           
            }

process.exit(1);
    });

}

function lowInventory(){

	    connection.query('SELECT ID, Product_Name, Price, STOCK_QUANTITY FROM bamazon.products', function(err, response) {
        if (err) throw err;

         for (i = 0; i < response.length; i++) {
         	
    			if(response[i].STOCK_QUANTITY < 10)
    				
    				console.log(response[i].ID, response[i].Product_Name, response[i].Price, response[i].STOCK_QUANTITY);

            	}
                process.exit(1);
    });


}

function addInventory(){
        
        inquirer.prompt({
        name: 'action',
        type: 'input',
        message: 'What product would you like to add (press ID)?',
            }).then(function(answer) {

              
                addAmount(answer.action)
    });

}


function addAmount(product){

        inquirer.prompt({
        name: 'action',
        type: 'input',
        message: 'How much inventroy do you want for this product?',
            }).then(function(answer) {
                console.log('input' +answer.action)
                addToProduct(product, answer.action);
                
    });

}

// adds to inventory 
function addToProduct(product, amount){

    connection.query("UPDATE bamazon.products SET ? WHERE ?", [{
    STOCK_QUANTITY: amount
    }, {
    ID: product
    }], function(err, res) {})
    
 process.exit(1);
}


// ask manager questions to add new product
function addNewProduct(){

        inquirer.prompt([{
            name: "id",
            message: "What is the new ID?"
        }, {
            name: "product",
            message: "What is the new product name?"
        }, {
            name: "price",
            message: "What is the new product price?"
        }, {
            name: "department",
            message: "What department is the new product in ?"
        }, {
            name: "quantity",
            message: "How much of this new product to you want (quantiity)?"
        }]).then(function(answers) {
            //INITIALIZES THE VARIABLE newGuy TO BE A Programmer OBJECT WHICH WILL TAKE IN ALL OF THE USER'S ANSWERS TO THE QUESTIONS ABOVE

            console.log(answers)

            addProduct(answers.id, answers.product, answers. price, answers.quantity, answers.department);

        })

}

// adds new product based on input from addNewProduct()
function addProduct(id, product, price, quantity, department ){

    connection.query("INSERT INTO products SET ?", {
    ID: id,
    Product_Name: product,
    Price: price,
    STOCK_QUANTITY: quantity,
    Department_Name: department
}, function(err, res) {

    process.exit(1);
});

}
