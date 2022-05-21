import express from "express";
import "reflect-metadata"

const app = express()

app.get('/', (req, res) => {
     res.send('Hi')
})

app.listen(3000)
