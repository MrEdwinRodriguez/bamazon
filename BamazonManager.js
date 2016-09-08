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

function ask() {
    inquirer.prompt({
        name: 'action',
        type: 'input',
        message: 'What would you like to do (press number)?',
    }).then(function(answer) {

       console.log(answer.action)

         switch(answer.action) {
            case 1:
                artistSearch();
            break;
            
            case 2:
                multiSearch();
            break;
            
            case 3:
                rangeSearch();
            break;
            
            case 4:
                songSearch();
            break;

            default:
                console.log('that is not an option')
            break;
        }

        
    });

}

