


document.addEventListener('DOMContentLoaded', ()=> {
    const video = document.querySelector("#video");
    const btnCamara = document.querySelector("#CameraAccess");
    btnCamara.addEventListener('click', ()=> {
        console.log();
        navigator.mediaDevices.getUserMedia({
            audio: true,
            video: {
                facingMode: { exact: "User" } //User / left / right
            }
        }).then(stream => {
            video.srcObject = stream;
        }).catch(console.error())

    })

})
