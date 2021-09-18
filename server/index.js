const express = require('express')
const bodyParser = require('body-parser')
const port = 4000

const UUID = require('uuid')
const { JsonDB } = require('node-json-db')
const { Config } = require('node-json-db/dist/lib/JsonDBConfig')
const db = new JsonDB(new Config('db.json', true, true, '/'))

const app = express()

app.use(bodyParser.json()) // support json encoded bodies, needed por post x-www-form-urlencoded to work
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

/**
 * CRUD Routes
 */

/*
   CRUD Seasons
 */

   app.get('/api/v1/fort_track',async(req,res)=>{
    res.json({
      data:[
       {
         uuid: 'be9bee60-07a2-4e9e-b9f3-9af6449a353b',
         name: 'Fortnite: Chapter 2 Season 6'
       },
       {
         uuid: '93e6abb5-3348-414d-bb34-5d9b955c47ca',
         name: 'Fortnite: Chapter 2 Season 7'
       },
       {
         uuid: '1b49f7d9-d609-4c26-9460-fd6ba6dcc86c',
         name: 'Fortnite: Chapter 2 Season 8'
       }
      ]
    })
  })





// Create
app.post('/api/articles', async (req, res) => {
  // Using any other database... (pseudo-code)
  // const post = MySQL.collection('articles').insert({req.body...})
  // const post = ArticlesModel.insert({ ... })

  const id = UUID.v4()
  db.push(`/articles/${id}`, {
    id,
    title: req.body.title,
    contents: req.body.contents
  })
  const article = db.getData(`/articles/${id}`)
  res.send(article)
})

// Read
app.get('/api/articles/:id', (req, res) => {
  const id = req.params.id
  const article = db.getData(`/articles/${id}`)
  res.send(article)
})

// List
app.get('/api/articles', (req, res) => {
  const articles = Object.values(db.getData('/articles'))
  res.send(articles)
})

// Delete
app.delete('/api/articles/:id', (req, res) => {
  const id = req.params.id
  db.delete(`/articles/${id}`)
  res.send({ deleted: true })
})

// Update
app.put('/api/articles/:id', (req, res) => {
  const id = req.params.id
  db.push(`/articles/${id}`, {
    title: req.body.title,
    contents: req.body.contents
  }, false)
  const article = db.getData(`articles/${id}`)
  res.send(article)
})


app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
