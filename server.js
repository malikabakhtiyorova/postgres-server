const express = require('express')
const {rows, row} = require('./pg')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 4002
const {sign, verify} = require('./jwt')

app.use(cors())

// app.use(bodyParser.urlencoded({extended: false}))
// app.use(bodyParser.json())
app.use(express.json())

app.use((req, res, next) => {
    let accessToken = req.headers.token

    if (!accessToken){
        return res.status(403).send()
    }

    let payload
    try{
        payload = verify(accessToken)
        next()
    }
    catch(e){
        return res.status(401).send()
    }
})

app.get('/books', async (req,res) => {
    try {
        let books = await rows('Select * from books;')
        res.status(200).send(books)
    } catch (e) {
        console.log(e)
        res.status(500).end()
    }
})

app.get('/books/:id', async (req,res) => {
    try {
        let {id} = req.params
        let book = await row('Select * from books where book_id = $1;', id)
        res.status(200).send(book)
    } catch (e) {
        console.log(e)
        res.status(500).end()
    }
})

app.post('/books', async (req, res) => {

    console.log(req.body)

    try {
        let { id: user_id } = verify(req.headers.token)
        let { book_name, book_description, file_id } = req.body

        const book = await row('insert into books (user_id, book_name, book_description, file_id) VALUES ($1, $2, $3, $4) returning *;', user_id, book_name, book_description, file_id)

        res.status(201).send(book)
    } catch (e) {
        res.status(501).send({message: e.message})
    }
})

app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));