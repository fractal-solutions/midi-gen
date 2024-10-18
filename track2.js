const MidiWriter = require('midi-writer-js');

// Create a new track for chords
let chordTrack = new MidiWriter.Track();

// Set a slower, dark tempo for phonk/RnB (adjust as needed)
chordTrack.setTempo(70);  // 70 BPM for a dark, slow vibe

// Add a smooth pad instrument for the chord progression (good for dark RnB vibes)
chordTrack.addEvent(new MidiWriter.ProgramChangeEvent({instrument: 90}));  // 90 = Pad 1 (New Age)

// Define a chord progression in F minor
const chords = [
    ['F3', 'Ab3', 'C4', 'Eb4'],  // Fm7 chord (F minor 7th)
    ['Db3', 'F3', 'Ab3', 'C4'],  // Dbmaj7 chord (Db major 7th)
    ['Eb3', 'G3', 'Bb3', 'D4'],  // Ebmaj7 chord (Eb major 7th)
    ['Ab3', 'C4', 'Eb4', 'G4']   // Abmaj7 chord (Ab major 7th)
];

// Add the chord progression
for (let i = 0; i < chords.length; i++) {
    let chordEvent = new MidiWriter.NoteEvent({
        pitch: chords[i],
        duration: '1',  // Whole notes for a smooth progression
        velocity: 70    // Soft and smooth
    });
    chordTrack.addEvent(chordEvent);
}

// Create a new track for the trap drums
let drumTrack = new MidiWriter.Track();

// Drum mapping for General MIDI (Percussion channel 10 is typical)
drumTrack.addEvent(new MidiWriter.ProgramChangeEvent({instrument: 0}), {channel: 9});  // Percussion (Channel 10 in MIDI)

// Define drum pattern (using MIDI note numbers for drums)
// Kick (C1 = 36), Snare (D1 = 38), Closed Hi-hat (F#1 = 42)
const kick = new MidiWriter.NoteEvent({pitch: ['C1'], duration: '4', velocity: 80, channel: 9});
const snare = new MidiWriter.NoteEvent({pitch: ['D1'], duration: '4', velocity: 90, channel: 9});
const hiHatClosed = new MidiWriter.NoteEvent({pitch: ['F#1'], duration: '16', velocity: 50, channel: 9});  // Fast hi-hats

// Create a trap drum loop pattern (basic 4/4 beat)
for (let i = 0; i < 4; i++) {
    drumTrack.addEvent(kick);           // Kick on beat 1 and 3
    drumTrack.addEvent(hiHatClosed);    // Hi-hat on all 16th notes
    if (i % 2 === 1) {
        drumTrack.addEvent(snare);      // Snare on beats 2 and 4
    }
}

// Write both tracks to a MIDI file
let writer = new MidiWriter.Writer([chordTrack, drumTrack]);
require('fs').writeFileSync('dark-rnb-phonk-midi.mid', writer.buildFile());
console.log('MIDI file generated: dark-rnb-phonk-midi.mid');
