getGeo();
function getGeo(){

   if('geolocation' in navigator){
        console.log('geolocation available');
        navigator.geolocation.getCurrentPosition(async position=>{
        let lat=position.coords.latitude;
        let lon = position.coords.longitude;
        let btn=document.getElementById('send');
        document.getElementById('latitude').innerText=lat;
        document.getElementById('longitude').innerText=lon;
        const api_url=`/weather/${lat},${lon}`;
        // const api_url=`/weather`;
        const response=await fetch(api_url);
        const json=await response.json();
        console.log(json);
        let temp_max=json.main.temp_max;
        let temp_min=json.main.temp_min;
        let weather=json.weather[0].description;
        
        
        document.getElementById('send');
        
        
        
        
        send.addEventListener("click",async()=>{
        const data={lat,lon,temp_max,temp_min,weather};

        const option={
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
        };
        const response=await fetch('/api',option);
        const json=await response.json();
        console.log(json);
            
        });
        
        });
    }
    else{
        console.log('geolocation not available');
   }
}