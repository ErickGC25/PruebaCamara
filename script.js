


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

(function($) {
    jQuery.fn.extend({
        html5_qrcode: function(qrcodeSuccess, qrcodeError, videoError) {
            return this.each(function() {
                var currentElem = $(this);

                var height = currentElem.height();
                var width = currentElem.width();

                if (height == null) {
                    height = 250;
                }

                if (width == null) {
                    width = 300;
                }

                var vidElem = $('<video width="' + width + 'px" height="' + height + 'px" autoplay playsinline></video>').appendTo(currentElem);
                var canvasElem = $('<canvas id="qr-canvas" width="' + (width - 2) + 'px" height="' + (height - 2) + 'px" style="display:none;"></canvas>').appendTo(currentElem);

                var video = vidElem[0];
                var canvas = canvasElem[0];
                var context = canvas.getContext('2d');
                var localMediaStream;

                var scan = function() {
                    if (localMediaStream) {
                        context.drawImage(video, 0, 0, 307, 250);

                        try {
                            qrcode.decode();
                        } catch (e) {
                            qrcodeError(e, localMediaStream);
                        }

                        $.data(currentElem[0], "timeout", setTimeout(scan, 500));

                    } else {
                        $.data(currentElem[0], "timeout", setTimeout(scan, 500));
                    }
                };//end snapshot function

                window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;


                navigator.mediaDevices.getUserMedia({video: { facingMode: "environment" }}).then(function successCallback(stream) {
                    video.srcObject = stream;
                    localMediaStream = stream;
                    $.data(currentElem[0], "stream", stream);

                    video.play();
                    $.data(currentElem[0], "timeout", setTimeout(scan, 1000));
                }).then(function(error) {
                    videoError(error, localMediaStream);
                });

                qrcode.callback = function (result) {
                    qrcodeSuccess(result, localMediaStream);
                    alert(result);
                };
            }); // end of html5_qrcode
        },
        html5_qrcode_stop: function() {
            return this.each(function() {
                //stop the stream and cancel timeouts
                $(this).data('stream').getVideoTracks().forEach(function(videoTrack) {
                    videoTrack.stop();
                });

                clearTimeout($(this).data('timeout'));
            });
        }
    });
})(jQuery);

