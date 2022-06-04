const {response}=require('express');
const express=require('express');
const app=express();
const Datastore=require('nedb');
app.listen(5000,()=>console.log("listening at 5000"));
app.use(express.static('public'));
app.use(express.json({limit:'1mb'}));
const database=new Datastore('database.db');
database.loadDatabase();

app.get('/api',(request, response)=>{
    database.find({},(err,data)=>{

        if(err){
            response.end();
            return;
        }
        response.json(data);
    }
    );
        
});

app.post('/api',(request,response)=>{
    const data=request.body;
    const timestamp=Date.now();
    data.timestamp=timestamp;
    database.insert(data);
    console.log(database);
    response.json(data);
});
