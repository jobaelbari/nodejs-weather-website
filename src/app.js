const path = require('path')
const geolocation = require('./utils/geolocation')
const weatherForecast = require('./utils/weatherForecast')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views locaiton
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title:'Weather',
        name: 'Jobael Bari'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jobael Bari'
    })
})

app.get('/help', (rep, res) => {
    res.render('help', {
        body: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using "Content here, content here", making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for "lorem ipsum" will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
        title: 'Help',
        name: 'Jobael Bari'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
        error: 'You must provide an address!'
      })
    }
    geolocation(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error })
        }
        weatherForecast(latitude, longitude, location, (error, {Address, Prediction}) => {
            if(error) {
                return res.send({ error })
            }
            res.send({
                forecast: Prediction,
                location,
                address: req.query.address,
                
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page',{
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Jobael Bari'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        errorMessage: 'Page not found.',
        name: 'Jobael Bari'
    })
})

app.listen('3000', () => {
    console.log('The server is up on port 3000')
})