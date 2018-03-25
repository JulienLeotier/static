let width = 500,
  height = 0,
  streaming = false

const video = document.getElementById('video');
const canvas = document.getElementById('canvas')

navigator.mediaDevices.getUserMedia({ video: true, audio: false })
  .then(function (stream) {
    video.srcObject = stream
    video.play()
  })
  .catch((err) => console.log(err))

video.addEventListener('canplay', function (e) {
  if (!streaming) {
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
  if (width && height) {

    canvas.width = width
    canvas.height = height

    context.drawImage(video, 0, 0, width, height)

    // canvas.toBlob(function (blob) {

    //   saveAs(blob, "image.png")
    // });
    const imgUrl = canvas.toDataURL('image/jpeg')

    return imgUrl
  }
}

function sendPicture() {
  let picture = takePicture()
  let xhr = new XMLHttpRequest()
  xhr.open('POST', 'http://localhost/serverImages', true)
  xhr.onloadend= () => {
    console.log('ok')
  }

  xhr.send(form)

  // let img = takePicture()

  // setTimeout(function () {
  //   let params = {
  //     // Request parameters
  //     "visualFeatures": "Categories,Description,Color",
  //     "details": "",
  //     "language": "en",
  //   };
  //   $.ajax({
  //     url: "https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Description,Tags&subscription-key=e161ebfcf86444509fdb1df05381f724",
  //     beforeSend: function (xhrObj) {
  //       // Request headers
  //       //xhrObj.setRequestHeader("Content-Type","application/json");
  //       xhrObj.setRequestHeader("Content-type: application/json");
  //       // xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "e161ebfcf86444509fdb1df05381f724");
  //     },
  //     type: "POST",
  //     // Request body
  //     data: '{"url": ' + '"' + document.getElementById('url').url + '"}',
  //   })
  //     .done(function (data) {
  //       console.log(data)
  //     })
  //     .fail(function () {

  //     });
  // }, 1000)
}


