const express = require('express')
const db = require('../models')
const router = express.Router()
const axios = require('axios')

// GET /pokemon/home ——> home.ejs
router.get('/home', async (req,res) => {

    let pokemonAPIData = await axios('https://pokeapi.co/api/v2/pokemon?limit=25')

    let pokeResults = pokemonAPIData.data.results

    res.render('pokemon/home.ejs', {pokemons: pokeResults, message: 'Hello'})
})


// (Form) POST /pokemon/new ——> redirect to /pokemon/favorites

router.post('/new', async (req,res) => {
    console.log('req.body ', req.body)
    //Find user
    // let user = await db.user.findByPk(res.locals.user.id)
    let user = res.locals.user
    //Create pokemon
    let [newPokemon, created] = await db.pokemon.findOrCreate({
        where: {
            name: req.body.name
        }
    })
    //Associate pokemon to user
    await user.addPokemon(newPokemon)
    let poke = await db.pokemon.findByPk(newPokemon.id)
    // res.json(poke)
    res.redirect('/pokemon/favorites')
})


// GET /pokemon/favorites ——> favourites.ejs

router.get('/favorites', async (req,res) => {
// Grab users' pokemon data
// let user = await db.user.findByPk(res.locals.user.id)
    // let user = res.locals.user
    //wait for DB to return data before moving on
    let userPokemons = await res.locals.user.getPokemons()
    // console.log('user pokemons', userPokemons)
    // res.json(userPokemons)
    res.render('pokemon/favorites', {userPokemons})
})


// (Form) DELETE /pokemon/delete —> redirect to /pokemon/favorites

router.delete('/:pokeId', async (req,res) => {

    //We need to delete pokemon with id pokeId
    //look at previous code/labs/hw/lessons
    //Search on google ---> delete item/data using sequelize
    await db.pokemon.destroy({
        where: { id: req.params.pokeId }
    })
    res.redirect('/pokemon/favorites')
})


// (Link) GET /pokemon/:id ——> details.ejs

router.get('/:pokeId', async (req,res) => {

// Get Details of ONE pokemon

let pokemon = await db.pokemon.findOne({
    where: { id : req.params.pokeId},
    include: [db.comment]
})

// let pokemonAndComments = pokemon.getComments()
// res.json(pokemon)
res.render('pokemon/details.ejs', {pokemon})
})





module.exports = router