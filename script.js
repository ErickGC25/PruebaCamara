


document.addEventListener('DOMContentLoaded', ()=> {
    // const video = document.querySelector("#video");
    const btnCamara = document.querySelector("#CameraAccess");
    btnCamara.addEventListener('click', ()=> {
        if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
            const videoStream = await navigator.mediaDevices.getUserMedia({ video: true })
          }
          const video = document.querySelector('#video')
          const videoStream = await navigator.mediaDevices.getUserMedia(constraints)
          video.srcObject = videoStream
    })

})
