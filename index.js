const express = require("express")
const cors = require('cors');
const fs = require("fs")
const app = express()
const port = 8080

app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to the Chord Library API!');
  });

app.get("/chord-library/c-major", (req, res) => {
  fs.readFile("./data/chord-library/c-major.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading chords file")
    } else {
      res.send(JSON.parse(data))
    }
  })
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
