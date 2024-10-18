import * as Tone from 'tone';  // Use for music structure (scheduling and sequencing)
import MidiWriter from 'midi-writer-js';  // For saving MIDI files
import fs from 'fs';

// Song parameters
const durationInSeconds = 60;  // 1 minute long
const bpm = 120;  // Faster tempo for an action-packed theme

// Melody (simple progression)
const melody = [
    ['C5'], ['E5'], ['G5'], ['A5'], 
    ['B5'], ['C6'], ['B5'], ['A5'], 
    ['G5'], ['E5']
];

// Define the bassline (long sustained notes, typical in energetic tracks)
const bassLine = ['C3', 'E3', 'G3', 'B3'];

// Set up a track for the melody and bass
let melodyTrack = new MidiWriter.Track();
melodyTrack.addEvent(new MidiWriter.ProgramChangeEvent({instrument: 5}));

let bassTrack = new MidiWriter.Track();
bassTrack.addEvent(new MidiWriter.ProgramChangeEvent({instrument: 5}));

let drumTrack = new MidiWriter.Track();  // Optional: Add simple drum patterns
//drumTrack.addEvent(new MidiWriter.ProgramChangeEvent({instrument: 5}));


// Set tempo
melodyTrack.setTempo(bpm);
bassTrack.setTempo(bpm);
drumTrack.setTempo(bpm);

// Add the melody, looping it to fill 1 minute
const melodyDuration = '4';  // Quarter notes
const melodyBars = melody.length;
const totalMelodyLoops = Math.floor((durationInSeconds * bpm) / 60 / melodyBars);

for (let i = 0; i < totalMelodyLoops; i++) {
    melody.forEach(note => {
        melodyTrack.addEvent(new MidiWriter.NoteEvent({
            pitch: note,
            duration: melodyDuration,
            velocity: 100
        }));
    });
}

// Add the bassline
const bassDuration = '2';  // Sustained notes for the bassline
for (let i = 0; i < totalMelodyLoops; i++) {
    bassLine.forEach(bassNote => {
        bassTrack.addEvent(new MidiWriter.NoteEvent({
            pitch: [bassNote],
            duration: bassDuration,
            velocity: 80
        }));
    });
}

// Add simple drum patterns (kick and hi-hats)
const kickNote = 'C2';  // Kick MIDI note
const hiHatNote = 'F#1';  // Hi-hat MIDI note
const totalDrumBars = totalMelodyLoops * melodyBars;

for (let i = 0; i < totalDrumBars; i++) {
    // Kick on the first beat
    drumTrack.addEvent(new MidiWriter.NoteEvent({
        pitch: [kickNote],
        duration: '1',  // Whole note for kick
        velocity: 100,
        channel: 9  // Channel 10 for drums
    }));
    // Hi-hat on every 16th note
    for (let j = 0; j < 4; j++) {
        drumTrack.addEvent(new MidiWriter.NoteEvent({
            pitch: [hiHatNote],
            duration: '16',  // 16th notes for hi-hat rolls
            velocity: 40,
            channel: 9  // Channel 10 for drums
        }));
    }
}

// Write the MIDI to a file
const writer = new MidiWriter.Writer([melodyTrack, bassTrack, drumTrack]);
fs.writeFileSync('ufo_dogfight_theme.mid', writer.buildFile());

console.log('MIDI file generated: ufo_dogfight_theme.mid');
