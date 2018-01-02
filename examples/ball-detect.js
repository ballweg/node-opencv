var cv = require('../lib/opencv');

// (B)lue, (G)reen, (R)ed
var lower_threshold = [90, 150, 90];
var upper_threshold = [170, 255, 255];
var vid = new cv.VideoCapture(1);

vid.save('./tmp/ballweg.jpg');
//
// vid.read('./files/kidball.jpg', function(err, im) {
//   if (err) throw err;
//   if (im.width() < 1 || im.height() < 1) throw new Error('Image has no size');
//   im.cvtColor(frame, cv2.COLOR_BGR2HSV)
//   im.inRange(lower_threshold, upper_threshold);
//   im.canny(5, 300);
//   im.save('./tmp/ball.jpg');
//   console.log('Image saved to ./tmp/kidball_detected.jpg');
// });
