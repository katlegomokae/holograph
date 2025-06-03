AFRAME.registerComponent('play-robot-voice', {
  init: function () {
    const voiceLine = new Audio('assets/greeting.mp3');
    voiceLine.preload = 'auto';

    // Play on model load
    this.el.addEventListener('model-loaded', () => {
      voiceLine.play();
    });

    // Replay on tap
    this.el.addEventListener('click', () => {
      voiceLine.play();
    });
  }
});
