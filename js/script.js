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
  const context = canvas.getContext('2d')
  if (width && height) {
    canvas.width = width
    canvas.height = height
    context.drawImage(video, 0, 0, width, height)
    const imgUrl = canvas.toDataURL('image/jpeg')
    return imgUrl
  }
}

function sendPicture() {
  let picture = takePicture()
  let xhr = new XMLHttpRequest()
  xhr.open('POST', 'https://www.rendreservice.fr/images/', true)
  xhr.setRequestHeader("Content-type", "application/json");
  let data = {
    'img': picture
  }
  xhr.send(JSON.stringify(data))
  xhr.onloadend = (response) => {
    console.log(response)
  }
  setTimeout(()=>{
    $.ajax({
      url: "https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Description&details=Landmarks&language=en",
      beforeSend: function (xhrObj) {
        xhrObj.setRequestHeader("Content-type", "application/json");
        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "e161ebfcf86444509fdb1df05381f724");
      },
      type: "POST",
      data: '{"url":"http://www.rendreservice.fr:8080/images.png"}',
    })
      .done(function (data) {
        console.log(data)
        console.log(data.categories)
        var hello = document.getElementById("video");
        hello.innerHTML = "<video  class='responsive-video'  controls=''  name='media'><source src='https://code.responsivevoice.org/getvoice.php?t=" + data.description.captions.text +"&amp;tl=fr&amp;sv=&amp;vn=&amp;pitch=0.5&amp;rate=0.5&amp;vol=1' type='audio/mpeg'></source></video"})
      .fail(function () {
        console.log('toto')
      });
  },3000)
}


