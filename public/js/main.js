const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');
const city_name = document.getElementById('city_name')
const temp = document.getElementById('temp');
const temp_status = document.getElementById('temp_status');
const dataHide=document.querySelector('.middle_layer');
const today_date = document.getElementById('today_date');
const day=document.getElementById('day');
var month="";
var date = new Date();
if(date.getMonth()==0){
    month="JAN"
}else if(date.getMonth()==1){
    month="FEB"
}else if(date.getMonth()==2){
    month="MAR"
}else if(date.getMonth()==3){
    month="APR"
}else if(date.getMonth()==4){
    month="MAY"
}else if(date.getMonth()==5){
    month="JUN"
}else if(date.getMonth()==6){
    month="JUL"
}else if(date.getMonth()==7){
    month="AUG"
}else if(date.getMonth()==8){
    month="SEP"
}else if(date.getMonth()==9){
    month="OCT"
}else if(date.getMonth()==10){
    month="NOV"
}else {
    month="DEC"
}
today_date.innerText= `${date.getDate()} ${month}`;

var dayname="";
if(date.getDay()==0){
    dayname="SUNDAY";
}else if(date.getDay()==1){
   dayname="MONDAY";
}else if(date.getDay()==2){
    dayname="TUESDAY";
}
else if(date.getDay()==3){
    dayname="WEDNESDAY";
}
else if(date.getDay()==4){
    dayname="THURSDAY";
}
else if(date.getDay()==5){
    dayname="FRIDAY";
}
else if(date.getDay()==6){
    dayname="SATURDAY";
}



day.innerText = `${dayname}`;

const getInfo = async(event) =>{
    event.preventDefault();
    let cityVal = cityName.value;
    if(cityVal === ""){
        city_name.innerText = `Please Write the name before you search`;
        dataHide.classList.add('data_hide');
    }else{
        
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=2b0c2b92bbda53df84bfcfedc08287a2`;
             
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];
            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            
            temp.innerHTML=`${(arrData[0].main.temp-273.15).toFixed(2)}<sup>o</sup>C`;
            
            const tempMood = arrData[0].weather[0].main;
             console.log(tempMood)
            if(tempMood == "Clear"){
                temp_status.innerHTML = `<i class="fa fa-sun" style="color:#eccc68"></i>`;
            }else if(tempMood == "Clouds"){
                temp_status.innerHTML = `<i class="fa fa-cloud" style="color:#f1f2f6"></i>`;
            }else if(tempMood=="Rain"){
                temp_status.innerHTML = `<i class="fa fa-cloud-showers-heavy" style="color:#a4b0be"></i>`;
            }else{
                temp_status.innerHTML = `<i class="fa fa-cloud" style="color:#f1f2f6"></i>`;
            }
            dataHide.classList.remove('data_hide');

        }catch{
            city_name.innerText = `Please enter proper city name`;
            dataHide.classList.add('data_hide');
        }

    }
    
}
submitBtn.addEventListener('click',getInfo);