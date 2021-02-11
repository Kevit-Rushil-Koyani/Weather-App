const request = require("request");
// const postmanRequest = require("postman-request");

const geoCode = (addres,callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/ " + encodeURIComponent(addres) + ".json?access_token=pk.eyJ1IjoicnVzaGlsa295YW5pIiwiYSI6ImNra3l5aGhveDBoMzMydXBnc251a2h3cWgifQ.Aip-eV3kVHs4bdUj8u_l1w"
    request({url,json:true},(error,{body} = {})=>{
        if(error){
            callback("Unable to connect to GeoLocation service..!",undefined);
        } else if(body.features.length == 0){
            callback("Unable to find location..!  Try another Search",undefined);
        }
        else{
            const latitude = body.features[0].center[1];
            const longitude = body.features[0].center[0];
            const location = body.features[0].place_name;
            const geoLocation = {
                latitude ,
                longitude,
                location
            }
            callback(undefined,geoLocation);
        }
    });
}

module.exports = geoCode ;  