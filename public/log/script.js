getData();
async function getData(){
    const response=await fetch('/api');
    const data=await response.json();

    for(item of data){
        const root=document.createElement('p');
        const geo=document.createElement('div');
        const date=document.createElement('div');
        const temp=document.createElement('div');
        const weather=document.createElement('div');
        const dateString=new Date(item.timestamp).toDateString();
        date.textContent=dateString;
        weather.textContent=`weather: ${item.weather}`;
        temp.textContent=`min_temp: ${item.temp_min},max_temp: ${item.temp_max}`
        geo.textContent=`${item.lat},${item.lon}`;
        root.append(geo,date,temp,weather);
        document.body.append(root);
    }
    console.log(data);
}