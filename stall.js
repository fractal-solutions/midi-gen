const MidiWriter = require('midi-writer-js');

// Create a new track
let track = new MidiWriter.Track();

// Set tempo (adjust for faster or slower warning beep intervals)
track.setTempo(120); // Higher tempo creates faster beeps

// Add a program change event to select an instrument
// Use a high-pitched instrument, e.g., a sine wave, square wave, or a simple tone
track.addEvent(new MidiWriter.ProgramChangeEvent({instrument: 81}));  // 81 = Lead 1 (Square)

// Define the stall warning beep notes
const stallWarningBeep = new MidiWriter.NoteEvent({
    pitch: ['E6'],   // High-pitched tone (E6 or another high note works for alarm)
    duration: '16',  // Short beep (16th note)
    velocity: 100    // Loud and sharp
});

// Repeat the beep pattern several times to create the alarm effect
for (let i = 0; i < 32; i++) {  // Adjust count to change the duration of the alarm
    track.addEvent(stallWarningBeep);
}

// Write to a MIDI file
let write = new MidiWriter.Writer(track);
require('fs').writeFileSync('stall-warning-midi.mid', write.buildFile());
console.log('MIDI file generated: stall-warning-midi.mid');
