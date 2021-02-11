const request = require("request");
// const postmanRequest = require("postman-request");

const forCast = (latitude,longitude,callback) => {
    const url= "http://api.weatherstack.com/current?access_key=8186b0a724eda72087c1e92440d5da0a&query=" + latitude + "," + longitude;
    request({url,json:true},(error,{body} = {} )=>{
        if(error){
            console.log("Unable to connect to weather service..!")
        }else if (body.error){
            console.log("Unable to find location");
        }
        else {
            callback(undefined,body.current.weather_descriptions[0] +" It is currently " + body.current.temperature + " degress out. It feels like " + body.current.feelslike + " degress out.");
        }
    });
}

module.exports = forCast; 