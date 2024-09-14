const express = require("express");
const cors = require('cors');
const fs = require("fs");
const app = express();
const port = 8080;

app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to the Chord Library API!');
});

app.get("/chord-library/:chord", (req, res) => {
    const chord = req.params.chord;
    const filePath = `./data/chord-library/${chord}.json`;
    
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.status(404).send("Chord file not found");
            } else {
                res.status(500).send("Error reading chords file");
            }
        } else {
            res.send(JSON.parse(data));
        }
    });
});

app.get("/chord-library", (req, res) => {
  fs.readdir("./data/chord-library", (err, files) => {
      if (err) {
          res.status(500).send("Error reading chord library directory");
      } else {
          const chords = files
              .filter(file => file.endsWith('.json'))
              .map(file => file.replace('.json', ''));
          res.send(chords);
      }
  });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});


