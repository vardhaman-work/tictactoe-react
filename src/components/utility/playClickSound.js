
export const playClickSound = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = "clicky";  // "clicky" / "square"
    oscillator.frequency.setValueAtTime(300, audioCtx.currentTime); // Adjust frequency for different tones
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime); // Lower volume

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.05); // Play for 50ms
  }