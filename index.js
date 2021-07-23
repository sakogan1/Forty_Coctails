const express = require("express")
const fs = require("fs")
const app = express()
const PORT = process.env.PORT || 3000

const fetch = require("node-fetch")

app.use(express.static(`public`))
app.use(express.static(`img`))
app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

let jsonData = []


// app.get("/", (req,res)=>{
//     res.render("index",{ title: "Home"})
// })

// app.get('/', (req, res) => {
//     fetch(`http://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink`)
//         .then(res => res.json())
//         .then(json => {
//             console.log(json)
//             res.render('index', { data: json.drinks})
//         });
// })

app.get('/', (req, res) => {
    fetch(`http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka`)
        .then(res => res.json())
        .then(json => {
            console.log(json)
            res.render('index', { data: json.drinks})
        });
        
})
app.get("/coctail/:id", (req,res)=>{
    let id = req.params.id
    console.log(req.params.id)
    fetch(`http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${id}`)
    .then(res => res.json())
    .then(json => {
        console.log(json)
        res.render('coctail', { data: json.drinks})
    });

})


app.get("/details/:id", (req,res)=>{
    let id = req.params.id
    console.log(req.params.id)
    fetch(`http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => res.json())
    .then(json => {
        console.log(json)
        res.render('modalComponent', { data: json.drinks})
    });

})



app.post("/search", (req,res)=>{
    let id = req.body.search
    console.log(req.body.search)
    fetch(`http://www.thecocktaildb.com/api/json/v1/1/search.php?s=${id}`)
    .then(res => res.json())
    .then(json => {
        console.log(json)
        res.render('search', { data: json.drinks})
    });

})

app.get('/Alkoholfrei', (req, res) => {
    fetch(`http://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic`)
        .then(res => res.json())
        .then(json => {
            console.log(json)
            res.render('coctail', { data: json.drinks})
        });
        
})
app.get('/random', (req, res) => {
    fetch(`http://www.thecocktaildb.com/api/json/v1/1/random.php`)
        .then(res => res.json())
        .then(json => {
            console.log(json)
            res.render('coctail', { data: json.drinks})
        });
        
})



// app.post('/', (req, res) => {

//     fetch(`http://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink`)
//         .then(res => res.json())
//         .then(json => {
//             console.log(json)
//             res.render('index', { data: json.drinks })
//         });
// })
 
// fetch('https://newsapi.org/v2/everything?q=tesla&from=2021-06-21&sortBy=publishedAt&apiKey=9e340e4b19664220be3bd0e04a3bbb15')
//     .then(res => res.json())
//     .then(json => console.log(json));


app.listen(PORT, ()=>console.log(`http://localhost:${PORT}`))