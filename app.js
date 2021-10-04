/*---------------------------------------------------
 |  Name:    Weather Search App
 |  File:    app.js
 |  Author:  David Eftink
 |  Date:    2021.10.03
 ---------------------------------------------------*/
const express = require('express');
const app = express();
const axios = require('axios');
const path = require('path');
const port = 3000;
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?appid=cf002751564a4c78f5f7ed479f1b9ba3&units=imperial";

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.render("search");
});

// Get Weather API Data by City, State, & Country
app.get('/resultsbycity', function(req, res) {
    let queryCity = req.query.city + ',' + req.query.state + ',' + req.query.country;
    let url = baseUrl + '&q=' + queryCity;
    axios.get(url)
        .then(response => {
            res.render("results", {data: response.data});
			console.log(response.data);
        })
        .catch(err => {
            res.render("error", {err: err});
			console.log(err);
        });
});

// Get Weather API Data by Zip Code
app.get('/resultsbyzip', function(req, res) {
    let url = baseUrl + '&zip=' + req.query.zipcode;
    axios.get(url)
        .then(response => {
            res.render("results", {data: response.data});
			console.log(response.data);
        })
        .catch(err => {
            res.render("error", {err: err});
			console.log(err);
        });
});

// Get Weather API Data by Geo Location Coordinates
app.get('/resultsbycoord', function(req, res) {
    let url = baseUrl + '&lat=' + req.query.lat + '&lon=' + req.query.lon;
    axios.get(url)
    .then(response => {
        res.render("results", {data: response.data});
		console.log(response.data);
    })
    .catch(err => {
        res.render("error", {err: err});
		console.log(err);
    });
});

app.listen(port, function() {
	console.log("listening...");
});
