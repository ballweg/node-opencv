var cv = require('../lib/opencv');

var color = [255,0,0];
var color2 = [255,255,0];
var black = [50,50,50];

try{
  var camera = new cv.VideoCapture(1);
  var window = new cv.NamedWindow('Video',1);
  var ivl = setInterval(function(){
    camera.read(function(err, im){
      if(err) throw err;
      if (im.width() > 0 && im.height() > 0){
        drawCrossHairs(im);
        drawGrid(im, 3);
        im.detectObject('../data/haarcascade_mcs_eyepair_big.xml', {}, function(err, faces) {
          if (err) throw err;
          if(faces.length > 0){
            console.log("found someone! ", faces);
          } else {
            console.log("I\'m all alone. :(");
          }
          for (var i = 0; i < faces.length; i++) {
            var face = faces[i];
            im.rectangle([face.x, face.y], [face.width, face.height], black, 2);
            var q = whichQuadrant(im, face);
            drawVector(im, q);
            console.log("quad: "+ q);
          }
          window.show(im);
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
function whichQuadrant(im, object){
  var im_width = im.width();
  var im_height = im.height();
  var x = object.x+(object.width/2);
  var y = object.y+(object.height/2);
  im.line([x, y], [x,y], color2, 3);
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
  var size = 25;
  im.line([im.width()/2-size, im.height()/2], [im.width()/2+size,im.height()/2], color, 1);
  im.line([im.width()/2, im.height()/2-size], [im.width()/2,im.height()/2+size], color, 1);
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
  im.line(origin, vector, color2, 2);
}

// Draw an overlay grid. "Segments" is on each side. If you want a 3x3 (9 grid)
// enter "3" for segments. You can't do different numbers for x and y for now.
function drawGrid(im, segments){
  for (var i = 1; i < segments; i++) {
    im.line([im.width()/segments*i, 0], [im.width()/segments*i, im.height()], black, 1);
    im.line([0, im.height()/segments*i], [im.width(), im.height()/segments*i], black, 1);
  }
}

function positionCamera(im){
  var x_servo_range = [0,90];
  var y_servo_range = [0,90];
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
