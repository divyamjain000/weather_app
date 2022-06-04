
// getLatLon();
// async function getLatLon(){
    
    if('geolocation' in navigator){
        console.log('geolocation available');
        navigator.geolocation.getCurrentPosition((position)=>{
        let lat=position.coords.latitude;
        let lon = position.coords.longitude;

        document.getElementById('latitude').innerText=lat;
        document.getElementById('longitude').innerText=lon;
        document.getElementById("send").addEventListener("click",async()=>{
        const response=await fetch('/api');
        const data=await response.json();
        
        });
        
        });
    }
    else{
        console.log('geolocation not available');
    }
// }