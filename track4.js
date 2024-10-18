import * as Tone from 'tone';  // Use for music structure (scheduling and sequencing)
import MidiWriter from 'midi-writer-js';  // For saving MIDI files
import fs from 'fs';

// Song parameters
const durationInSeconds = 60;  // 1 minute long
const bpm = 70;  // Slow tempo for dark RnB and phonk

// Chord progression (in F minor, typical for dark RnB/Phonk)
const chords = [
    ['F3', 'Ab3', 'C4', 'Eb4'],  // Fm7
    ['Db3', 'F3', 'Ab3', 'C4'],  // Dbmaj7
    ['Eb3', 'G3', 'Bb3', 'D4'],  // Ebmaj7
    ['Ab3', 'C4', 'Eb4', 'G4']   // Abmaj7
];

// Define the bassline (long sustained notes, typical in Phonk)
const bassLine = ['F2', 'Db2', 'Eb2', 'Ab2'];

// Set up a track for the chords and bass
let chordTrack = new MidiWriter.Track();
let bassTrack = new MidiWriter.Track();
let drumTrack = new MidiWriter.Track();  // Optional: Add simple trap hi-hats

// Set tempo
chordTrack.setTempo(bpm);
bassTrack.setTempo(bpm);
drumTrack.setTempo(bpm);

// Add the chord progression, looping it to fill 1 minute
const chordDuration = '1';  // Whole notes
const barsPerLoop = chords.length;
const totalBars = (durationInSeconds / (60 / bpm)) / barsPerLoop;

for (let i = 0; i < totalBars; i++) {
    chords.forEach(chord => {
        chordTrack.addEvent(new MidiWriter.NoteEvent({
            pitch: chord,
            duration: chordDuration,
            velocity: 70
        }));
    });
}

// Add the bassline
const bassDuration = '1';  // Same as chords for sustained notes
for (let i = 0; i < totalBars; i++) {
    bassLine.forEach(bassNote => {
        bassTrack.addEvent(new MidiWriter.NoteEvent({
            pitch: [bassNote],
            duration: bassDuration,
            velocity: 80
        }));
    });
}

// Add simple trap hi-hats (16th notes)
const hiHatNote = 'F#1';  // Hi-hat MIDI note
for (let i = 0; i < totalBars * 4; i++) {
    drumTrack.addEvent(new MidiWriter.NoteEvent({
        pitch: [hiHatNote],
        duration: '16',  // 16th notes for fast hi-hat rolls
        velocity: 40,
        channel: 9  // Channel 10 for drums
    }));
}

// Write the MIDI to a file
const writer = new MidiWriter.Writer([chordTrack, bassTrack, drumTrack]);
fs.writeFileSync('nu-rnb-phonk-song.mid', writer.buildFile());

console.log('MIDI file generated: nu-rnb-phonk-song.mid');
