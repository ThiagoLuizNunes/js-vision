const player = document.getElementById('player');
const snapshotCanvas = document.getElementById('snapshot');
const captureButton = document.getElementById('capture');
const clearButton = document.getElementById('clear');
const enableRecognition = document.getElementById('enable');
const disableRecognition = document.getElementById('disable');
const sendImage = document.getElementById('send');
let videoTracks;

const handleSuccess = (stream) => {
  // Attach the video stream to the video element and autoplay.
  player.srcObject = stream;
  player.style.display = 'block';
  captureButton.style.display = 'block';
  disableRecognition.style.display = 'block';
  enableRecognition.style.display = 'none';

  videoTracks = stream.getVideoTracks();
};

captureButton.addEventListener('click', () => {
  const context = snapshot.getContext('2d');
  context.drawImage(player, 0, 0, snapshotCanvas.width, snapshotCanvas.height);
  
  snapshotCanvas.style.display = 'block';
  clearButton.style.display = 'block';
  player.style.display = 'none';
  captureButton.style.display = 'none';
  disableRecognition.style.display = 'none';
  // Stop all video streams.
  // videoTracks.forEach(function(track) {track.stop()});
});

clearButton.addEventListener('click', () => {
  captureButton.style.display = 'block';
  player.style.display = 'block';
  disableRecognition.style.display = 'block';
  snapshotCanvas.style.display = 'none';
  clearButton.style.display = 'none';
});

enableRecognition.addEventListener('click', () => {
  player.removeAttribute('controls');
  navigator.mediaDevices.getUserMedia({video: true})
  .then(handleSuccess);
});

disableRecognition.addEventListener('click', () => {
  player.style.display = 'none';
  captureButton.style.display = 'none';
  disableRecognition.style.display = 'none';
  enableRecognition.style.display = 'block';

  videoTracks.forEach(function(track) {track.stop()});
  navigator.mediaDevices.getUserMedia({video: false})
  .then(handleSuccess);
});

sendImage.addEventListener('click', () => {
  const dataURL = snapshotCanvas.toDataURL('image/png');
  $.ajax({
    url: 'http://localhost:3000/upload-image',
    dataType: 'json',
    data: { data: dataURL},
    type: 'POST',
    success: function(data) {
      console.log(data);
      }
    });
});
