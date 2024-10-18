const MidiWriter = require('midi-writer-js');

// Create a new track
let track = new MidiWriter.Track();

// Set a moderate tempo to represent the smooth, powerful hum of a commercial jet engine
track.setTempo(70);  // Adjust as needed (lower for idle, higher for takeoff)


// Add a program change event to select an instrument for the deep engine sound
// Use a smooth bass or pad instrument for the core sound
track.addEvent(new MidiWriter.ProgramChangeEvent({instrument: 91}));  // 91 = Pad 3 (Polysynth)

// Create the low-pitched engine hum (continuous)
const lowHum = new MidiWriter.NoteEvent({
    pitch: ['C2'],   // Low C note for a deep, smooth hum
    duration: '1',   // Long sustained note to create a continuous sound
    velocity: 80     // Medium intensity for a deep, constant sound
});

// Add a high-pitched turbine whine to simulate the spinning fans
const turbineWhine = new MidiWriter.NoteEvent({
    pitch: ['G5', 'A5'],  // Higher-pitched notes to simulate the turbine sound
    duration: '8',        // Shorter notes to create the sense of a fast whine
    velocity: 50          // Softer sound to not overpower the engine hum
});

// Add the low-frequency hum and high-pitched whine repeatedly
for (let i = 0; i < 32; i++) {
    track.addEvent(lowHum);          // Repeated deep hum for the engine
    track.addEvent(turbineWhine);    // Repeated whine for the turbine
}

// Write to a MIDI file
let write = new MidiWriter.Writer(track);
require('fs').writeFileSync('commercial-jet-engine-midi.mid', write.buildFile());
console.log('MIDI file generated: commercial-jet-engine-midi.mid');
