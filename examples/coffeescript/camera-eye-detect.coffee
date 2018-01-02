cv = require '/Users/jeff/Sites/node-opencv/lib/opencv'

# First we create a new VideoCapture object to get
# video from the camera (0 for default camera)
camera = new cv.VideoCapture(1)

# we create a window to display the Video frames
namedWindow = new cv.NamedWindow('Video',1)
color = [255,0,0]

# We set an interval to retrieve frames from the
# video source and we get the intervalId so we can
# stop the program from the video feed window.
intervalId = setInterval(()->

  # camera.read allows us to retrieve the current
  # frame to be displayed in the video window.
  camera.read((err, im) ->
    # We can check for errors and even break the
    # program execution if an error is detected here.
    console.log "The err ==>#{ err }" if err

    # There is no need to display the image width or Height
    # but I leave this here in case anyone needs to check them.
    #console.log("Width: #{im.width()}")
    #console.log("height: #{im.height()}")

    # Before working with the frame we need to check the image
    # is already available and has a width and height greater than 0,
    # otherwise it will fail when trying to do namedWindow.show()
    # and the image has width or height equal or less than 0.

    console.log "Image Size: " + im.width() + "x" + im.height()

    #draw centerpoint
    im.line([im.width()/2, im.height()/2+50], [(im.width()/2), (im.height()/2-50)], [255,249,125], 1)
    im.line([im.width()/2+50, im.height()/2], [(im.width()/2-50), (im.height()/2)], [255,249,125], 1)

    if im.width() > 0 and im.height() > 0
      im.detectObject('/Users/jeff/Sites/node-opencv/data/haarcascade_mcs_eyepair_big.xml', {}, (err, faces) ->
        for face in faces
          console.log face
          im.rectangle([face.x, face.y], [face.width, face.height], [0,255,0], 2)
          whichQuadrant(face)

        # We use the previously created namedWindow to display the
        # video frame to wich we applied the blur and filter.
        namedWindow.show(im)
      )

    # Finally we get the key pressed on the window to terminate
    # execution of the program.
    res = namedWindow.blockingWaitKey(0, 50)

    # In this case I terminate the program if any key is pressed.
    if res >= 0 then clearInterval(intervalId)
  )
, 150)

# Detects which quadrant the (first) face is located in
function whichQuadrant(face){
  console.log("found at: " + face.x +"x"+ face.y)
  return q;
}
