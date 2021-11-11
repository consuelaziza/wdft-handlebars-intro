// setup for express
const express = require("express");
const app = express();


const port = 3000;

// require some data form your data.js file
let {students, instructors: teachers, getStudents, getTeachers} = require('./data')

// just a simple middleware to show you how it works
// you will always see that console.log when you visit any page
app.use((req, res, next) => {
    console.log("Hello im the middleware");
    next();
});

// letting your middleware know where to find all static files
app.use(express.static(__dirname + "/public"));

// ROUTES DEFINED BELOW



/*
app.get("/speak/:animal", (req, res) => {
      let {animal} = req.params
      if (animal == 'pig') {
        res.send("The pig says 'Oink!'")
      } 
      else if(animal == 'cow') {
        res.send("The cow says 'Mooo!'")
      }
      else {
        res.send("Is that a dog!!")
      } 
});
app.get("/greet/:text/:num", (req, res) => {
     let {text, num} = req.params
     let string = (text+' ').repeat(num)
     res.send(string)
});
app.get("/home/:country", (req, res) => {
    console.log( req.params  )
    res.send('My dynamic route')
});
app.get("/user/:name", (req, res) => {
    let {name} =  req.params 
    res.send(`My dynamic ${name} route `)
});
*/

// Letting express know we are using a template engine
app.set('view engine', 'hbs');

const hbs = require('hbs')
hbs.registerPartials(__dirname + '/views/partials')


app.get("/", (req, res) => {
    let name = 'Manish';
    res.render(__dirname + '/views/landing.hbs', {text: name, age: 21})
});

app.get("/students", (req, res) => {

    //Making a promise requst here
    getStudents()
        .then((data) => {
            // the promise returns us some informations which we store in the 'data' parameter

            // we use that data to send it to our hbs file
            res.render(__dirname + '/views/students.hbs', {students: data, layout: false})
        })
        .catch(() => {
            console.log('Error while fetching students')
        })

});


app.get("/teachers", (req, res) => {

    let upperCaseTeachers = teachers.map((elem) => {
        elem.name = elem.name.toUpperCase()
        return elem
    })
    console.log(upperCaseTeachers)

    res.render(__dirname + '/views/teachers.hbs', {teachers: upperCaseTeachers})
});


app.get('*', (req, res) => {
    res.send('Page not found')
})

// Express setup to listen for all client requests on a certain port
app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);