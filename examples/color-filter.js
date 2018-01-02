var cv = require('../lib/opencv');

// (B)lue, (G)reen, (R)ed
var lower_threshold = [90, 150, 90];
var upper_threshold = [170, 255, 255];

cv.readImage('./files/kidball.jpg', function(err, im) {
  if (err) throw err;
  if (im.width() < 1 || im.height() < 1) throw new Error('Image has no size');

  im.inRange(lower_threshold, upper_threshold);
  im.save('./tmp/ball_detected.jpg');
  console.log('Image saved to ./tmp/kidball_detected.jpg');
});
