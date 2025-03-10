// You can use this file to create your employee database and populate it
// with some initial data.  You can run it with: node initdb.js

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("dem.db");

db.serialize(function() {

  // create Category table
  db.run("DROP TABLE IF EXISTS Category");
  //db.run("CREATE TABLE Category (id INTEGER PRIMARY KEY, name TEXT)");
  db.run("CREATE TABLE Category (name TEXT)");

  // insert records into the Category table
  //db.run("INSERT INTO Category VALUES (?)", [1, 'Groceries']);
  //db.run("INSERT INTO Category VALUES (?)", [2, 'Hydro']);
  //db.run("INSERT INTO Category VALUES (?)", [3, 'Internet']);
  //db.run("INSERT INTO Category VALUES (?)", [4, 'Rent']);
  //db.run("INSERT INTO Category VALUES (?)", [5, 'Transportation']);
  db.run("INSERT INTO Category (name) VALUES (?)", ['Groceries']);
  db.run("INSERT INTO Category (name) VALUES (?)", ['Hydro']);
  db.run("INSERT INTO Category (name) VALUES (?)", ['Internet']);
  db.run("INSERT INTO Category (name) VALUES (?)", ['Rent']);
  db.run("INSERT INTO Category (name) VALUES (?)", ['Transportation']);

  // create Category table
  db.run("DROP TABLE IF EXISTS Transaction_Type");
  //db.run("CREATE TABLE Transaction_Type (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL)");
  db.run("CREATE TABLE Transaction_Type (name TEXT PRIMARY KEY)");

  // insert records into the Category table
  //db.run("INSERT INTO Transaction_Type VALUES (?,?)", [1, 'Income']);
  //db.run("INSERT INTO Transaction_Type VALUES (?,?)", [2, 'Expense']);
  db.run("INSERT INTO Transaction_Type (name) VALUES (?)", ['Income']);
  db.run("INSERT INTO Transaction_Type (name) VALUES (?)", ['Expense']);

  // create transaction table
  db.run("DROP TABLE IF EXISTS Income_Expense");
  db.run("CREATE TABLE Income_Expense (categoryName TEXT, amount REAL, date TEXT, payment_mode TEXT, transactionType TEXT, description TEXT, FOREIGN KEY (categoryName) REFERENCES Category(name), FOREIGN KEY (transactionType) REFERENCES Transaction_Type(name))");
});