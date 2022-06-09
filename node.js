// import fetch from 'node-fetch';f
// const fetch = require('node-fetch');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const {response}=require('express');
const express=require('express');
const app=express();
const Datastore=require('nedb');
require('dotenv').config();
const port =process.env.PORT;
app.listen(port,()=>{console.log(`starting server at ${port}`)
});
app.use(express.static('public'));
app.use(express.json({limit:'1mb'}));
const database=new Datastore('./database/database.db');
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
app.get('/weather/:latlon',async (request, response)=>{
    console.log(request.params);
    const latlon=request.params.latlon.split(',');
    console.log(latlon);
    const lat=latlon[0];
    const api_key=process.env.API_KEY;
    const lon=latlon[1];
    console.log(lat,lon);
    // const api_url=`https://api.weather.gov/points/${lat},${lon}`;
    // const api_url=`https://api.openweathermap.org/data/2.5/weather?lat=29.101060859999993&lon=75.97290038999998&appid=2ebfb556052b3814f2c4315f9ff22850`;
    const api_url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;


            const fetch_response=await fetch(api_url);
            const json=await fetch_response.json();
            response.json(json);
            
});
app.post('/weather/:latlon',(request,response)=>{
    const data=request.body;
    
    database.insert(data);
    console.log(database);
    response.json(data);
});