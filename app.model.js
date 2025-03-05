const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");

// We'll make this variable have the scope of the module since all database 
// functions will use it...
let db;

// connects to the database employees.db
async function makeConnection()
{
  db = await sqlite.open({
    filename: 'dem.db',
    driver: sqlite3.Database
  })
}

// select all the categories
async function getAllCategories()
{
  const results = await db.all("SELECT rowid, * FROM Category");
  return results;
}

// delete a Category with a given id
async function deleteCategory(id)
{
  await db.run("DELETE FROM Category WHERE rowid=?", id);
}

// insert a Category into the table
async function addCategory(category)
{
  await db.run("INSERT INTO Category VALUES (?)",[category.name]);
}

// update a Category with a given id
async function updateCategory(category,id)
{
  await db.run("UPDATE Category SET name=? WHERE rowid=?",[category.name, id]);
}

// select all the transactions
async function getAllTransaction()
{
  const results = await db.all("SELECT rowid, * FROM Income_Expense");
  return results;
}

// select number of transactions with a given category id
async function getTransaction(categoryName)
{
  const result = await db.all("SELECT Count(*) FROM Income_Expense WHERE categoryName=?", categoryName);
  return result;
}

// delete a Transaction with a given id
async function deleteTransaction(id)
{
  await db.run("DELETE FROM Income_Expense WHERE rowid=?", id);
}

// insert a Transaction into the table
async function addTransaction(trans)
{
  await db.run("INSERT INTO Income_Expense VALUES (?,?,?,?,?,?)",[trans.categoryName, trans.amount, trans.date, trans.payment_mode, trans.transaction_type, trans.description]);
}

// update a Transaction with a given id
async function updateTransaction(trans,id)
{
  await db.run("UPDATE Income_Expense SET categoryName=?, amount=?, date=?, payment_mode=?, description=? WHERE rowid=? and transaction_type=?",[trans.categoryName, trans.amount, trans.date, trans.payment_mode, trans.description, id, trans.transaction_type]);
}

// export the functions we have defined
module.exports = {makeConnection, getAllCategories, deleteCategory, addCategory, updateCategory, getAllTransaction, getTransaction, deleteTransaction, addTransaction, updateTransaction};
