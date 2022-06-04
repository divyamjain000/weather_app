const {response}=require('express');
const express=require('express');
const app=express();
const Datastore=require('nedb');
app.listen(5000,()=>console.log("listening at 5000"));
app.use(express.static('weather'));
app.use(express.json({limit:'1mb'}));
const database=new Datastore('database.db');
database.loadDatabase();



