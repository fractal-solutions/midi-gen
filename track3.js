import * as Tone from 'tone';

// Use Tone.js in Node.js or Bun to generate a MIDI sequence
async function createMidiSequence() {
    // Set up a synth, this is mainly for browser playback, but logic works in Node
    const synth = new Tone.PolySynth(Tone.Synth);

    // Set up a simple sequence (could be dark RnB or any genre)
    const notes = [
        ["C4", "E4", "G4"], // C major
        ["A3", "C4", "E4"], // A minor
        ["F3", "A3", "C4"], // F major
        ["G3", "B3", "D4"], // G major
    ];

    // Create a simple looped sequence using Tone.js
    const part = new Tone.Part((time, chord) => {
        synth.triggerAttackRelease(chord, "1n", time);
    }, notes).start(0);

    // Set the BPM (for a darker vibe, slower tempo)
    Tone.getTransport.bpm.value = 90;

    // Start the Tone.js Transport
    await Tone.start();
    Tone.getTransport.start();
}

createMidiSequence();
