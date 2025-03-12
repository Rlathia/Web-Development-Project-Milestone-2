const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");

// We'll make this variable have the scope of the module since all database 
// functions will use it...
let db;

// connects to the database dem.db
async function makeConnection()
{
  db = await sqlite.open({
    filename: 'dem.db',
    driver: sqlite3.Database
  })
}

// select all the categories
async function getSummary(transType)
{
  const results = await db.all("SELECT SUM(amount) as value FROM Income_Expense WHERE transactionType = ?", [transType]);
  return results;
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
  console.log("Category deleted : id = ", id);
}

// insert a Category into the table
async function addCategory(category)
{
  await db.run("INSERT INTO Category (name) VALUES (?)",[category.name]);
  console.log("New category added", category);
}

// update a Category with a given id
async function updateCategory(category,id)
{
  await db.run("UPDATE Category SET name=? WHERE rowid=?",[category.name, id]);
  console.log("Category updated : id = ", id);
}

// select all the transactions
async function getAllTransaction()
{
  const alltransactions = await db.all("SELECT ie.rowid, * FROM Income_Expense ie INNER JOIN Category c ON ie.CategoryName = c.rowid INNER JOIN Transaction_Type TT ON ie.transactionType = TT.id");
  console.log(alltransactions);
  return alltransactions;
}

// select transactions with a given date
async function getTransaction(date)
{
  const result = await db.all("SELECT ie.rowid, * FROM Income_Expense ie INNER JOIN Category c ON ie.CategoryName = c.rowid INNER JOIN Transaction_Type TT ON ie.transactionType = TT.id WHERE date=?", date);
  return result;
}

// select transactions with a given month
async function getTransactionByMonth(month)
{
  const result = await db.all("SELECT ie.rowid, * FROM Income_Expense ie INNER JOIN Category c ON ie.CategoryName = c.rowid INNER JOIN Transaction_Type TT ON ie.transactionType = TT.id WHERE strftime('%m',date)= ?", month);
  return result;
}

// select transactions with a given category
async function getTransactionByCategory(category)
{
  const result = await db.all("SELECT ie.rowid, * FROM Income_Expense ie INNER JOIN Category c ON ie.CategoryName = c.rowid INNER JOIN Transaction_Type TT ON ie.transactionType = TT.id WHERE c.rowid= ?", category);
  return result;
}

// insert a Transaction into the table
async function addTransaction(trans)
{
  await db.run("INSERT INTO Income_Expense VALUES (?,?,?,?,?,?)",[trans.categoryName, trans.amount, trans.date, trans.payment_mode, parseInt(trans.transactionType), trans.description]);
  return trans;
}

// export the functions we have defined
module.exports = {makeConnection, getAllCategories, deleteCategory, addCategory, updateCategory, getAllTransaction, getTransaction, getTransactionByMonth, getTransactionByCategory, addTransaction, getSummary};
