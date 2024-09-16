  
      const fs = require('fs');

      function calculateFrequenciesAndNotes() {
        const tuning = [
          { string: "E2", frequency: 82.41, note: "E" },
          { string: "A2", frequency: 110.00, note: "A" },
          { string: "D3", frequency: 146.83, note: "D" },
          { string: "G3", frequency: 196.00, note: "G" },
          { string: "B3", frequency: 246.94, note: "B" },
          { string: "E4", frequency: 329.63, note: "E" },
        ];
      
        const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
        
        const enharmonicEquivalents = {
        "B": "Cb",
        "C": "B#",
        "C#": "Db",
        "D#": "Eb",
        "E": "Fb",
        "F#": "Gb",
        "G#": "Ab",
        "A#": "Bb",
         } 
      
        function getNoteNameAndAlt(baseNote, fret) {
          const baseNoteIndex = noteNames.indexOf(baseNote);
          const totalNoteIndex = (baseNoteIndex + fret) % 12;
          const octaveShift = Math.floor((baseNoteIndex + fret) / 12);
          
          // Get base octave
          const octave = octaveShift; // Calculate the correct octave
      
          const noteName = `${noteNames[totalNoteIndex]}${octave}`;
          const altNote = enharmonicEquivalents[noteNames[totalNoteIndex]]
            ? `${enharmonicEquivalents[noteNames[totalNoteIndex]]}${octave}`
            : null;
      
          return { noteName, altNote };
        }
      
        let guitarFrequencies = {};
      
        tuning.forEach(tune => {
          let frets = [];
          for (let fret = 0; fret <= 24; fret++) {
            let freq = tune.frequency * Math.pow(2, fret / 12);
            const { noteName, altNote } = getNoteNameAndAlt(tune.note, fret);
            frets.push({ fret, frequency: freq.toFixed(2), note: noteName, alt_note: altNote });
          }
          guitarFrequencies[tune.string] = frets;
        });
      
        return guitarFrequencies;
      }
      
      // Calculate the frequencies and note names
      const guitarNotesJSON = calculateFrequenciesAndNotes();
      
      // Convert the result to a JSON string with indentation
      const jsonString = JSON.stringify(guitarNotesJSON, null, 2);
      
      // Write the JSON data to a file
      fs.writeFileSync('guitar_frequencies.json', jsonString, (err) => {
        if (err) throw err;
        console.log('Error occurred while writing the file.');
      });
      
      // Show success message in the terminal
      console.log('File guitar_frequencies.json has been successfully created with enharmonic equivalents.');
      
  