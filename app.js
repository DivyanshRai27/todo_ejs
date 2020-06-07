//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


const mongodb_URI = 'mongodb+srv://divyanshrai:divyanshrai@todolist-atzzr.mongodb.net/ToDoList?retryWrites=true&w=majority'

mongoose.connect(mongodb_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const itemsSchema = {
  name: String
}

const Item = mongoose.model("Item", itemsSchema)

const item1 = new Item({
  name: "Welcome to your todo list"
})

const item2 = new Item({
  name: "Click the plus button to add"
})

const item3 = new Item({
  name: "click the check button"
})

const defaultItems = [item1, item2, item3]

// Item.insertMany(defaultItems, function(err) {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log("Success")
//   }
// })


app.get("/", function(req, res) {
  Item.find({}, function(err, foundItems){
    res.render("list", {listTitle: "Today", newListItems: foundItems});
  })

});

app.post("/", function(req, res){

  const itemName = req.body.newItem;

  const item = new Item({
    name: itemName
  })
  item.save()
  res.redirect("/")
  
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
