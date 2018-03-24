let width = 500,
    height = 0,
    streaming = false

const video = document.getElementById('video');
const canvas = document.getElementById('canvas')

navigator.mediaDevices.getUserMedia({video: true, audio: false})
  .then(function(stream) {
    video.srcObject = stream
    video.play()
  })
  .catch((err) => console.log(err))

  video.addEventListener('canplay', function(e) {
    if(!streaming) {
      // Set video / canvas height
      height = video.videoHeight / (video.videoWidth / width)

      video.setAttribute('width', width)
      video.setAttribute('height', height)
      canvas.setAttribute('width', width)
      canvas.setAttribute('height', height)

      streaming = true
    }
  }, false)

  function takePicture() {
    // Create canvas
    const context = canvas.getContext('2d')
    if(width && height) {

      canvas.width = width
      canvas.height = height
      
      context.drawImage(video, 0, 0, width, height)

      const imgUrl = canvas.toDataURL('image/jpeg')

      return imgUrl
    }
  }

  function sendPicture()
  {
    let picture = takePicture()
    let xhr = new XMLHttpRequest()
    xhr.open('POST', 'http://192.168.43.106:8000/api-client/test', true)
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*")

    xhr.onloadend= () => {
      console.log('ok')
    }
    xhr.send({'img': picture })
  }