cv = require('../../lib/opencv')


cv.readImage("./images/mona.png", (err, im) ->
  # Create new NamedWindow object to hold the image
  # NamedWindow takes two arguments String WindowName and String windowSize
  namedWindow = new cv.NamedWindow('Display Window', '400x400')

  # We add a couple of basic shapes to the image, just to show how
  # to create basic shapes.
  # im.rectangle([startX, StartY], [width, height], color(array of RGB)
  im.rectangle([50, 50], [200, 200], [0, 255, 0], 2)
  # im.ellipse(centerX, centerY, width, height, color(array of RGB)
  im.ellipse(150, 150, 50, 50, [255, 255, 0], 2)

  # We then tell the image to show the image we loaded.
  namedWindow.show(im)

  console.log("Image should be displayed inside a window.")
  # Finally we tell the NamedWindow to wait for any key being pressed to close
  # itself (by passing a 0 as the first param, or wait a defined amount of time
  # by passing the time as a second argument (in milliseconds)
  #
  # If we do not tell the window to wait it will just load and show the image
  # and close so fast that it will appear nothing happened.
  namedWindow.blockingWaitKey(0, 5000)

  console.log("And the window should close automatically or by pressing any key on it.")
)
