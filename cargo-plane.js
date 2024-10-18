const MidiWriter = require('midi-writer-js');

// Create a new track
let track = new MidiWriter.Track();

// Set a slow tempo to represent the deep, powerful hum of a cargo plane engine
track.setTempo(50);  // Slow and heavy engine sound, adjust tempo as needed

// Add a program change event to select a deep, resonant instrument
// Use a bass sound for the low, powerful engine rumble
track.addEvent(new MidiWriter.ProgramChangeEvent({instrument: 33}));  // 33 = Acoustic Bass

// Create the low-pitched engine rumble (continuous)
const lowRumble = new MidiWriter.NoteEvent({
    pitch: ['C1'],   // Very low C note for a deep, powerful rumble
    duration: '1',   // Long sustained note for a continuous engine sound
    velocity: 90     // Strong, powerful sound
});

// Add lower harmonic overtones to add depth and texture to the sound
const harmonicOvertones = new MidiWriter.NoteEvent({
    pitch: ['E2', 'G2'],  // Low overtones to simulate depth and power of engines
    duration: '2',        // Shorter sustained notes to give variety
    velocity: 70          // Slightly softer than the main rumble
});

// Add the low-frequency rumble and harmonic overtones repeatedly
for (let i = 0; i < 16; i++) {
    track.addEvent(lowRumble);       // Repeated deep engine hum
    track.addEvent(harmonicOvertones);  // Repeated overtones for depth
}

// Write to a MIDI file
let write = new MidiWriter.Writer(track);
require('fs').writeFileSync('cargo-plane-engine-midi.mid', write.buildFile());
console.log('MIDI file generated: cargo-plane-engine-midi.mid');
