const player = document.getElementById('player');
const snapshotCanvas = document.getElementById('snapshot');
const captureButton = document.getElementById('capture');
const clearButton = document.getElementById('clear');
const authButton = document.getElementById('auth');
const enableRecognition = document.getElementById('enable');
const disableRecognition = document.getElementById('disable');
const sendImage = document.getElementById('send');
let videoTracks;
let isCamOpen;

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
});

clearButton.addEventListener('click', () => {
  captureButton.style.display = 'block';
  player.style.display = 'block';
  disableRecognition.style.display = 'block';
  snapshotCanvas.style.display = 'none';
  clearButton.style.display = 'none';
});

enableRecognition.addEventListener('click', () => {
  isCamOpen = true;
  navigator.mediaDevices.getUserMedia({video: true})
  .then(handleSuccess);
});

disableRecognition.addEventListener('click', () => {
  isCamOpen = false;
  // player.style.display = 'none';
  player.removeAttribute('src');
  player.load();
  captureButton.style.display = 'none';
  disableRecognition.style.display = 'none';
  enableRecognition.style.display = 'block';

  videoTracks.forEach((track) => {track.stop()});
  navigator.mediaDevices.getUserMedia({video: false})
  .then(handleSuccess);
});

sendImage.addEventListener('click', () => {
  const dataURL = snapshotCanvas.toDataURL('image/png');
  const username = document.getElementById('username').value;
  $.ajax({
    url: 'http://localhost:3000/face-uploader',
    dataType: 'json',
    data: { id: Math.floor(Math.random() * 20), data: dataURL, name: username },
    type: 'POST',
    success: (data) => {
      console.log(data);
    }
  });
});

authButton.onclick = () => {
  if (isCamOpen) {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const dataURL = snapshotCanvas.toDataURL('image/png');
    $.ajax({
      url: 'http://localhost:3000/auth',
      dataType: 'json',
      data: { username: username, password: password, data: dataURL },
      type: 'POST',
      success: (data) => {
        console.log(data);
      }
    });
  }
}
