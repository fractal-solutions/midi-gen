const MidiWriter = require('midi-writer-js');

// Create a new track
let track = new MidiWriter.Track();

// Set a slower tempo for the engine hum, you can adjust as needed
track.setTempo(90); // Lower tempo to represent slower engine hum

// Add a program change event to select an instrument
// Use a synthesizer pad or bass sound for the low-end engine rumble
track.addEvent(new MidiWriter.ProgramChangeEvent({instrument: 89}));  // 89 = Pad 2 (Warm), or try 81 = Lead 1 (Square)

// Create the low-pitched engine rumble
const engineRumble = new MidiWriter.NoteEvent({
    pitch: ['C2'],   // Very low note for deep engine hum
    duration: '1',   // Long sustained note for a continuous sound
    velocity: 70     // Medium intensity for a deep, resonant sound
});

// Add a high-pitched futuristic oscillation layer
const highOscillation = new MidiWriter.NoteEvent({
    pitch: ['G5', 'A5'],  // Higher tones to give a techy feel
    duration: '8',        // Shorter duration to create oscillation effect
    velocity: 50          // Softer sound, creating a contrast with the rumble
});

// Pitch bend event to simulate an evolving, dynamic engine sound
track.addEvent(new MidiWriter.PitchBendEvent({value: 8191, tick: 64})); // Pitch up halfway through

// Combine events for a futuristic sound
for (let i = 0; i < 16; i++) {
    track.addEvent(engineRumble);       // Repeated engine hum
    track.addEvent(highOscillation);    // Repeated high-pitched oscillations
}

// Write to a MIDI file
let write = new MidiWriter.Writer(track);
require('fs').writeFileSync('futuristic-plane-engine-midi.mid', write.buildFile());
console.log('MIDI file generated: futuristic-plane-engine-midi.mid');
