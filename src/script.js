


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
//               alert('Viendo video')
//               setTimeout(() => { track.stop() }, 3 * 1000)
//             } catch (error) {
//               alert(`${error.name}`)
//               console.error(error)
              
//             }
//           })
          

//     // })

// })


$('#reader').html5_qrcode(function(data){
    // do something when code is read
},
function(error){
  //show read errors 
}, function(videoError){
  //the video stream could be opened
}
);