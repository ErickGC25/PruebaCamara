


// document.addEventListener('DOMContentLoaded', ()=> {
//     // const video = document.querySelector("#video");
//     const btnCamara = document.querySelector("#CameraAccess");
//     // btnCamara.addEventListener('click', ()=> {
//         document.querySelector('#CameraAccess').addEventListener('click', async function init(e) {
//             try {
//               const stream = await navigator.mediaDevices.getUserMedia({
//                 audio: false,
//                 video: {

//                     facingMode: { exact: "environment" } 
//                 }
//               })
//               alert('Viendo video')
//               const videoTracks = stream.getVideoTracks()
//               const track = videoTracks[0]
//               alert(`Getting video from: ${track.label}`)
//               document.querySelector('video').srcObject = stream
//               document.querySelector('#get-access').setAttribute('hidden', true)
//               setTimeout(() => { track.stop() }, 3 * 1000)
//             } catch (error) {
//               alert(`${error.name}`)
//               console.error(error)
//               alert('Viendo video')
//             }
//           })
          

//     // })

// })


const qrcode = window.qrcode;

const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

const qrResult = document.getElementById("qr-result");
const outputData = document.getElementById("outputData");
const btnScanQR = document.getElementById("btn-scan-qr");

let scanning = false;

qrcode.callback = res => {
  if (res) {
    outputData.innerText = res;
    scanning = false;

    video.srcObject.getTracks().forEach(track => {
      track.stop();
    });

    qrResult.hidden = false;
    canvasElement.hidden = true;
    btnScanQR.hidden = false;
  }
};

btnScanQR.onclick = () => {
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function(stream) {
      scanning = true;
      qrResult.hidden = true;
      btnScanQR.hidden = true;
      canvasElement.hidden = false;
      video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      video.srcObject = stream;
      video.play();
      tick();
      scan();
    });
};

function tick() {
  canvasElement.height = video.videoHeight;
  canvasElement.width = video.videoWidth;
  canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

  scanning && requestAnimationFrame(tick);
}

function scan() {
  try {
    qrcode.decode();
  } catch (e) {
    setTimeout(scan, 300);
  }
}
