const weatherform = document.querySelector("form");
const messageTwo = document.querySelector("#message2");
const messageOne = document.querySelector("#message1");
const site = 0;
let link = "";
if(site == 1){
    link = "http://localhost:3000";
}else {
    link = "";
}

const getForCast = function (location){
    fetch(link + "/weather?address=" + location).then((response)=>{
        response.json().then((data)=>{
            if(data.eror){
                console.log("no adddress..!")
            }else{
                messageOne.textContent = JSON.stringify(data.location);
                messageTwo.textContent = data.forcast;
            }
        });
    });
}


weatherform.addEventListener("submit",(e) => {
    e.preventDefault();
    const location = search.value
    getForCast(location);
    return 0;
});
