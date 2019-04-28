const RaspiCam = require('raspicam')

var isHighResolution = process.argv[2] === 'high'
var date = new Date()
var imgDir = isHighResolution ? 'img-high' : 'img'

var camera = new RaspiCam({
  mode: 'photo',
  output: `${imgDir}/${date.getTime()}.jpg`,
  encoding: 'jpg',
  timeout: 0,
  w: isHighResolution ? 2592 : 1280,
  h: isHighResolution ? 1944 : 960,  
  q: 100
})

camera.on("start", function( err, timestamp ){
  console.log("photo started at " + timestamp)
})

camera.on("read", function( err, timestamp, filename ){
  console.log("photo image captured with filename: " + filename)
  camera.stop()
})

camera.on("exit", function( timestamp ){
  console.log("photo child process has exited at " + timestamp)
})

camera.start()

