


document.addEventListener('DOMContentLoaded', ()=> {
    // const video = document.querySelector("#video");
    const btnCamara = document.querySelector("#CameraAccess");
    btnCamara.addEventListener('click', ()=> {
        navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        }).then(stream => {
            // video.srcObject = stream;
        }).catch(console.error())

    })

})
