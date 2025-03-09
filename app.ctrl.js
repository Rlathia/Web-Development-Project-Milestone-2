// include express
const express = require('express');
const app = express();

// include the mustache template engine for express
const mustacheExpress = require('mustache-express');

// include the model so the controller can use its functions
const Model = require('./app.model.js')

// create database connection 
Model.makeConnection();

// registers the mustache engine with express
app.engine("mustache", mustacheExpress());

// sets mustache to be the view engine
app.set('view engine', 'mustache');

// sets /views to be the /views folder
// files should have the extension filename.mustache
app.set('views', __dirname + '/views');

// render the home page
// - notice how we set the template boolean homenav to true... this tells
// the navigation template that we want the home navigation item to be
// highlighted when the home page is selected.  We do the same for the other
// pages as well.
app.get("/", function(req, res)
{
  res.render("home", {homenav: true});
});

// render the contact page
app.get("/transaction", async function(req, res)
{
  res.render("transaction", {transactionnav: true});
});


// render the contact page
app.get("/history", function(req, res)
{
  res.render("history", {historynav: true});
  // retrieve all the transactions 
  //const categoryArray = await Model.getAllCategories();
  //res.render("transactions", {transactionnav: true, transaction: true, transactions: categoryArray});
});

// render the contact page
app.get("/categories", async function(req, res)
{
  // retrieve all the categories 
  const categoryArray = await Model.getAllCategories();
  res.render("categories", {categorynav: true, categories: true, categories: categoryArray});
});

// ************************* CONTROLLER ACTIONS ****************************

// delete a category action (given an id parameter)
app.get('/categories/delete/:id', async function(req,res) 
{
  // delete the category with id
  await Model.deleteCategory(req.params.id);

  // retrieve all the categories 
  const categoryArray = await Model.getAllCategories();

  // render the page
  res.render('categories', { categorynav: true, categories: categoryArray});
});

// addcategoryform action puts the add category form on the page
app.get('/addcategoryform', async function(req,res)
{
  // retrieve all the categories 
  const categoryArray = await Model.getAllCategories();

  // render the page with the category data AND display the add form
  res.render('categories', {categorynav: true, addcategory: true, categories: categoryArray});
});

// addcategory action handles add form submit, inserts new category into table
app.get('/categories/addcategory', async function(req,res) 
{
  // Insert category into table using form data
  await Model.addCategory(req.query);

  // retrieve all the categories 
  const categoryArray = await Model.getAllCategories();

  // render the page
  res.render('categories', {categorynav: true, categories: categoryArray});
});

// updateform action puts the update category form on the page
app.get('/categories/updateform/:id', async function(req,res) 
{
  // retrieve all the categories 
  const categoryArray = await Model.getAllCategories();

  // render the page with update form populated with the data for the 
  // category with the relevant id
  res.render('categories',
    {categorynav: true, updatecategory: true
    ,updateid: req.params.id
    ,formdata : categoryArray.filter(x => (x.rowid == req.params.id))[0]
    ,categories: categoryArray
    });
});

// updatecategory action handles updating the category in the database
app.get('/categories/updatecategory/:id', async function(req,res)
{
  // update the category in the database
  await Model.updateCategory(req.query, req.params.id);

  // retrieve all the categories 
  const categoryArray = await Model.getAllCategories();

  // render the page
  res.render('categories', { categorynav: true, categories: categoryArray});
});


// catch-all router case intended for static files
app.get(/^(.+)$/, function(req,res) {
  res.sendFile(__dirname + req.params[0]);
});

app.listen(3000, function() { console.log("server listening on port 3000..."); } );