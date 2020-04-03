const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
console.log(__dirname)
console.log(path.join(__dirname,'../public'))
const app = express()
//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
//set handlebar engine and view location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)
app.get('',(req,res)=>{
    res.render('index',{
      title: 'Weather App',
      name: 'Sahil Vaid'  
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me!',
        name:'Sahil Vaid'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is some helping text',
        name:'Sahil Vaid',
        title: 'Help!'
    })
})
//setting static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please provide an adress'
        })
    
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(forecasterror,forecastData)=>{
            if(forecasterror){
                return res.send({forecasterror})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })

        })
    })
   
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Sahil Vaid',
        errorMessage:'Help article not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Sahil Vaid',
        errorMessage:'Page not found'  
    })
})
app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})