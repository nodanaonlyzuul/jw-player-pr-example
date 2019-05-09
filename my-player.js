$(function() {
  window.setupJwPlayer = function(playerOptions, autoplay) {
    if (autoplay == null) {
      autoplay = false;
    }
    window.player = jwplayer("videoContainer").setup(playerOptions)
      .on('error', function(events) {
        console.error("Looks like these was a problem with quality", player.getCurrentQuality());
        // remove the current/not-loading source
        playerOptions["sources"].splice(player.getCurrentQuality(), 1);
        if (playerOptions["sources"].length === 0) {
          return $('.video-player-error-container').slideDown(300);
        } else {
          return setupJwPlayer(playerOptions, true);
        }
      });

    if (autoplay) {
      player.play();
    }
  };

  setupJwPlayer({
    sources: [
      {file: "https://s3.amazonaws.com/kriskelleyrulez/low.mp4", label: "low"},
      {file: "https://s3.amazonaws.com/kriskelleyrulez/medium.mp4", label: "medium"},
      {file: "https://s3.amazonaws.com/kriskelleyrulez/high.mp4", label: "high", default: true}
  ]});

})
