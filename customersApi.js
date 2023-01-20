let express = require("express");
let app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH,DELETE,HEAD"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
var port = process.env.PORT||2410;
app.listen(port, () => console.log(`Node app listening on port jai~ ${port}!`));
let {customers}=require("./customersData.js");
app.get("/customers",function(req,res){
    let cityStr=req.query.city;
    let genderStr=req.query.gender;
    let paymentStr=req.query.payment;
    let sortByStr=req.query.sortBy;
    let arr1=customers;
    if(cityStr){
        arr1=arr1.filter(e=>e.city===cityStr);
    }
    if(genderStr){
        arr1=arr1.filter(e=>e.gender===genderStr);
    }
    if(paymentStr){
        arr1=arr1.filter(e=>e.payment===paymentStr);
    }
    if(sortByStr==="city"){
        arr1.sort((c1,c2)=>c1.city.localeCompare(c2.city));
    }
    if(sortByStr==="payment"){
        arr1.sort((c1,c2)=>c1.payment.localeCompare(c2.payment));
    }
    if(sortByStr==="name"){
        arr1.sort((c1,c2)=>c1.name.localeCompare(c2.name));
    }
    if(sortByStr==="gender"){
        arr1.sort((c1,c2)=>c1.gender.localeCompare(c2.gender));
        console.log(arr1);
    }
    if(sortByStr==="id"){
        arr1.sort((c1,c2)=>c1.id.localeCompare(c2.id));
    }
    if(sortByStr==="age"){
        arr1.sort((c1,c2)=>(+c1.age)-(+c2.age));
    }
    //console.log(arr1);
    res.send(arr1);
});
app.get("/customers/:id",function(req,res){
    let id =req.params.id
    console.log(id);
    let arr=customers.find(e=>e.id===id);
    res.send(arr);
});

app.post("/customers",function(req,res){
    let body=req.body;
    console.log(body);
    customers.push(body);
    res.send(body);
});
app.put("/customers/:id",function(req,res){
    let id=req.params.id;
    let body=req.body;
    let index=customers.findIndex(e=>e.id===id);
    if(index>=0){
        let updatedCustomer={id:id,...body};
        customers[index]=updatedCustomer;
        res.send(updatedCustomer);
        console.log(updatedCustomer);
    }
    else{
        res.status(404).send("No Customer Found")
    }
});
app.delete("/customers/:id",function(req,res){
    let id=req.params.id;
    let body=req.body;
    let index=customers.findIndex(e=>e.id===id);
    if(index>=0){
        let updatedCustomer={id:id,...body};
        customers.splice(index,1);
        res.send(updatedCustomer);
    }
    else{
        res.status(404).send("No Customer Found")
    }
});
