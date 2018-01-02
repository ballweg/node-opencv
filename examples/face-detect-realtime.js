var cv = require('../lib/opencv');

var color = [255,0,0];

try{
  var camera = new cv.VideoCapture(1);
  var window = new cv.NamedWindow('Video',1);
  var ivl = setInterval(function(){
    camera.read(function(err, im){
      if(err) throw err;
      if (im.width() > 0 && im.height() > 0){
        im.detectObject('../data/haarcascade_mcs_eyepair_big.xml', {}, function(err, faces) {
          if (err) throw err;
          if(faces.length > 0){
            console.log("found someone! ", faces);
          } else {
            console.log("I\'m all alone. :(");
          }
          for (var i = 0; i < faces.length; i++) {
            var face = faces[i];
            im.rectangle([face.x, face.y], [face.width, face.height], color, 2);
            drawCrossHairs(im);
            var q = whichQuadrant(im, face.x, face.y);
            drawVector(im, q);
            console.log("quad: "+ q);
            window.show(im);
          }
        });
      }


    res = window.blockingWaitKey(0, 50);
    if (res >= 0){
      clearInterval(ivl);
      console.log("user exit");
    }
  });
}, 150);
} catch (e){
  console.log("Couldn't start camera:", e)
}

// takes two inputs and finds which quadrant they're in.
function whichQuadrant(im, x, y){
  var im_width = im.width();
  var im_height = im.height();
  if(x < (im_width/2)){
    // left side
    if(y <= im_height/2){
      console.log("left top");
      return 1;
    } else {
      console.log("left bottom");
      return 3;
    }
  } else {
    // right side
    if(y <= im_height/2){
      console.log("right top");
      return 2;
    } else {
      console.log("right bottom");
      return 4;
    }
  }
  return -1;
}

function drawCrossHairs(im){
  var size = 50;
  im.line([im.width()/2-size, im.height()/2], [im.width()/2+size,im.height()/2], color, 2);
  im.line([im.width()/2, im.height()/2-size], [im.width()/2,im.height()/2+size], color, 2);
  return im;
}

function drawVector(im, q){
  var origin = [im.width()/2, im.height()/2];
  var vector = [im.width()/2,im.height()/2];
  switch (q){
    case 1:
      vector = [im.width()/2-100, im.height()/2-100];
      break;
    case 2:
      vector = [im.width()/2+100, im.height()/2-100];
      break;
    case 3:
      vector = [im.width()/2-100, im.height()/2+100];
      break;
    case 4:
      vector = [im.width()/2+100, im.height()/2+100];
      break;
  }
  im.line(origin, vector, color, 2);
}

// cv.readImage("./files/people.jpg", function(err, im){
//   if (err) throw err;
//   if (im.width() < 1 || im.height() < 1) throw new Error('Image has no size');
//
//   im.detectObject("../data/haarcascade_frontalface_alt.xml", {}, function(err, faces){
//     if (err) throw err;
//
//     for (var i = 0; i < faces.length; i++){
//       var face = faces[i];
//       im.ellipse(face.x + face.width / 2, face.y + face.height / 2, face.width / 2, face.height / 2);
//     }
//
//     im.save('./tmp/face-detection.png');
//     console.log('Image saved to ./tmp/face-detection.png');
//   });
// });
