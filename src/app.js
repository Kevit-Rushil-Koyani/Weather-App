const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
const geoCode = require("./utils/geocode.js");
const forCast = require("./utils/forcast.js");

const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,"../templates/partials")

app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(path.join(__dirname,"../public")))

app.get("",(req,res) => {
    res.render("index",{
        'title':'weather app',
        'name' : 'R K'
    });
});


app.get("/about",(req,res) => {
    res.render("about",{
        'title':'About app',
        'name' : 'R K'
    });
});

app.get("/help",(req,res) => {
    res.render("help",{
        'title':'Help app',
        'name' : 'R K'
    });
});

app.get("/weather",(req,res) => {
    if(!req.query.address){
        return res.send({
            error:"no address"
        })
    }
    geoCode(req.query.address,(error,{latitude,longitude,location} = {}) => {
        if(error){
            return res.send({error});
        }
        else{
            forCast(latitude,longitude,(error,body) => {
                if(error){
                    return res.send({error});
                }
                res.send({
                    forcast: body,
                    location,
                    address:req.query.address
                })
            });
        }
    });
});

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"no games"
        })
    }
    const product = req.query.search
    const rating = req.query.rating
    res.send({
        products:[product,rating]
    });
});

app.get("/help/*",(req,res) => {
    res.render("404",{
        title:'404',
        'name' : 'R K',
        error:'Error: 404. Help Page not Found'

    })
});

app.get('*',(req,res) => {
    res.render("404",{
        title:'404',
        'name' : 'R K',
        error:'Error: 404. Page not Found'

    })
})


app.listen(3000,() => {
    console.log("port No : 3000");
});