const MidiWriter = require('midi-writer-js');

// Create a new track for chords
let track = new MidiWriter.Track();

// Set the tempo (you can adjust based on genre)
track.setTempo(90);  // Slower tempo for vaporwave, increase for complextro/cyberpunk (e.g., 128 BPM for faster beats)

// Add a synth pad instrument for the chord progression
track.addEvent(new MidiWriter.ProgramChangeEvent({instrument: 89}));  // 89 = Pad 2 (Warm), suitable for vaporwave/cyberpunk pads

// Define a chord progression (in A minor, typical for darker moods)
const chords = [
    ['A3', 'C4', 'E4'],  // A minor
    ['F3', 'A3', 'C4'],  // F major
    ['D3', 'F3', 'A3'],  // D minor
    ['G3', 'B3', 'D4']   // G major
];

// Create a looping chord progression
for (let i = 0; i < chords.length; i++) {
    let chordEvent = new MidiWriter.NoteEvent({
        pitch: chords[i],
        duration: '1',  // Whole note chords for a slower, atmospheric feel
        velocity: 70    // Soft and smooth
    });
    track.addEvent(chordEvent);
}

// Create a melody track on top of the chords
let melodyTrack = new MidiWriter.Track();
melodyTrack.setTempo(90);  // Same tempo as the chords

// Add a lead synth instrument for the melody (complextro/cyberpunk)
melodyTrack.addEvent(new MidiWriter.ProgramChangeEvent({instrument: 81}));  // 81 = Lead 1 (Square), typical for glitchy complextro leads

// Melody notes (simple, atmospheric)
const melodyNotes = [
    ['A4'], ['C5'], ['E5'], ['C5'],  // A minor melody
    ['F4'], ['A4'], ['C5'], ['A4'],  // F major melody
    ['D4'], ['F4'], ['A4'], ['F4'],  // D minor melody
    ['G4'], ['B4'], ['D5'], ['B4']   // G major melody
];

// Add the melody on top of the chords
for (let i = 0; i < melodyNotes.length; i++) {
    let melodyEvent = new MidiWriter.NoteEvent({
        pitch: melodyNotes[i],
        duration: '4',  // Quarter notes for a melodic line over the progression
        velocity: 80    // Louder, brighter lead
    });
    melodyTrack.addEvent(melodyEvent);
}

// Write both tracks to a MIDI file
let writer = new MidiWriter.Writer([track, melodyTrack]);
require('fs').writeFileSync('cyberpunk-vaporwave-midi.mid', writer.buildFile());
console.log('MIDI file generated: cyberpunk-vaporwave-midi.mid');
