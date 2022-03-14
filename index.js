const express= require("express");
const mongoose=require("mongoose");

const app=express();
app.use(express.json())
app.listen(5500,async()=>{
    await connect();
    console.log("Listening to the port 5500");
});

// connect database //
const connect=()=>{
    return mongoose.connect("mongodb+srv://jitender004:jitender@cluster0.bb3an.mongodb.net/bankdetails?retryWrites=true&w=majority");
};

//create schema for users
const UserSchema= new mongoose.Schema({
    firstName : {type: String, required : true},
    middleName : {type: String},
    lastName : {type: String, required : true},
    age : {type: Number, required : true},
    email : {type: String, required : true},
    address : {type: String, required : true},
    gender : {type: String, default : "Female"},
    type : {type: String, default : "Customer"},
},{
    versionKey : false,
    timestamps : true
})
 
// creating user model
const User= mongoose.model("user",UserSchema);

// get method for user

app.get("/user",async (req,res)=>{
    try {
        const user = await User.find().lean().exec();
        return res.send(user);
    } catch (error) {
        return res.status(500).send(error.message);
    }
})

// BranchDetail schema

const branchSchema = new mongoose.Schema({
    name : {type: String, required : true},
    address : {type: String, required : true},
    IFSC : {type: String, required : true},
    MICR : {type: Number, required : true},
},{
    versionKey : false,
    timestamps : true
})

// branch model 
  
const Branch =mongoose.model("branch", branchSchema);


//MasterAccount schema

const masterSchema=new mongoose.Schema({
  
    balance : {type: Number, required : true},
    
},{
   versionKey : false,
   timestamps : true
});

// master model
const Master= mongoose.model("master",masterSchema);

// get method for master account
app.get("/master", async(req,res)=>{
    try {
        const master = await Master.create(req.body);
        return res.send(master);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

// SavingsAccount schema

const savingSchema= new.mongoose.Schema({
    account_number :{ type:mongoose.Schema.Types.ObjectId, ref :"account" , unique :true, required:true},
    balance : {type:Number , required: true},
    balinterestRateance : {type:Number , required: true},
},{
    versionKey: false,
    timestamps: true
});

// connection model for schema
const Saving= mongoose.model("saving",savingSchema);

// post method for saving account
app.post("/saving", async(req,res)=>{
    try {
        const saving = await Saving.create(req.body);
        return res.status(201).send(saving);
    } catch (error) {
        return res.status(500).send(error.message);
    }
})
// get for saving account
app.get("/saving", async(req,res)=>{
    try {
        const saving = await Saving.find().lean().exec();
        return res.send(saving);
    } catch (error) {
        return res.status(500).send(error.message);
    }
})


//FixedAccount schema
const fixedSchema = new.mongoose.Schema({
    balance : {type: Number, required : true},
    interestRate : {type: Number, required : true},
    startDate : {type: String, required : true},
    maturityDate : {type: String, required : true},
},{
    versionKey : false,
    timestamps: true
});

// create model for fixed account 
const Fixed =mongoose.model("fixed",fixedSchema);

// post method for fixed account
app.post("/fixed", async(req,res)=>{
    try {
        const fixed = await Fixed.create(req.body);
        return res.status(201).send(fixed);
    } catch (error) {
        return res.status(500).send(error.message);
    }
})
// get method for fixed account
app.get("/fixed", async(req,res)=>{
    try {
        const fixed = await Fixed.find().lean().exec();
        return res.send(fixed);
    } catch (error) {
        return res.status(500).send(error.message);
    }
})