getGeo();
function getGeo(){
    
    
    
    if('geolocation' in navigator){
        console.log('geolocation available');
        navigator.geolocation.getCurrentPosition(async position=>{
            let lat=position.coords.latitude;
            let lon = position.coords.longitude;
            const map=L.map('map').setView([lat,lon],3);
            const attribution =
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
        const tiles=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
            attribution
        });
        tiles.addTo(map);
        let mkr=L.marker([lat,lon]).addTo(map);
        // let btn=document.getElementById('send');
        document.getElementById('latitude').innerText=lat;
        document.getElementById('longitude').innerText=lon;
        const api_url=`/weather/${lat},${lon}`;
        // const api_url=`/weather`;
        const response=await fetch(api_url);
        const json=await response.json();
        console.log(json);
        let temp_max=json.main.temp_max;
        let temp=json.main.temp;
        let weather=json.weather[0].description;
        document.getElementById('condition').textContent=weather;
        document.getElementById('temp').textContent=temp;

        
        
        // document.getElementById('send');
        
        
        
        const data={lat,lon,temp_max,temp,weather};

        const option={
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
        };
        const fetch_response=await fetch('/api',option);
        const fetch_json=await fetch_response.json();
        console.log(fetch_json);
            
        });
        
    }
    else{
        console.log('geolocation not available');
   }
}