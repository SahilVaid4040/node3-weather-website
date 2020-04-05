const request = require('request')
const forecast = (latitude,longitude,callback)=>
{
    const url = 'https://api.darksky.net/forecast/749ec52cb70a1e0b4a64262830e69487/'+latitude+','+longitude+'?units=si'
    request({url,json:true},(error,{body})=>{
        if(error)
        {
            callback('Unable to connect to weather services',undefined)
        }
        else if(body.error)
        {
            callback('Try again for a diffrent location',undefined)
        }
        else
        {
            callback(undefined,{
                temperature: 'Currently the weather is '+body.currently.summary+',Temprature is'+body.currently.temperature+'\nThe high temperature is '+body.daily.data[0].temperatureHigh+'\nThe Lowest temperature is '+body.daily.data[0].temperatureLow
            })
        }
    })
}
module.exports = forecast