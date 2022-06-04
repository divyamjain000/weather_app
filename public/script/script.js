getGeo();
function getGeo(){

   if('geolocation' in navigator){
        console.log('geolocation available');
        navigator.geolocation.getCurrentPosition((position)=>{
        let lat=position.coords.latitude;
        let lon = position.coords.longitude;
        let btn=document.getElementById('send');
        document.getElementById('latitude').innerText=lat;
        document.getElementById('longitude').innerText=lon;
        document.getElementById('send');
        send.addEventListener("click",async()=>{
        const data={lat,lon};

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