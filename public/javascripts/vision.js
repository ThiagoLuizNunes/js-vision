const player = document.getElementById('player');
const snapshotCanvas = document.getElementById('snapshot');
const captureButton = document.getElementById('capture');
const clearButton = document.getElementById('clear');
const enableRecognition = document.getElementById('enable');
const disableRecognition = document.getElementById('disable');
let videoTracks;

const handleSuccess = function(stream) {
    // Attach the video stream to the video element and autoplay.
    player.srcObject = stream;
    player.style.display = 'block';
    captureButton.style.display = 'block';
    disableRecognition.style.display = 'block';
    enableRecognition.style.display = 'none';

    videoTracks = stream.getVideoTracks();
};

captureButton.addEventListener('click', function() {
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

clearButton.addEventListener('click', function () {
    captureButton.style.display = 'block';
    player.style.display = 'block';
    disableRecognition.style.display = 'block';
    snapshotCanvas.style.display = 'none';
    clearButton.style.display = 'none';
});

enableRecognition.addEventListener('click', function () {
    player.removeAttribute("controls");
    navigator.mediaDevices.getUserMedia({video: true})
    .then(handleSuccess);
});

disableRecognition.addEventListener('click', function () {
    player.style.display = 'none';
    captureButton.style.display = 'none';
    disableRecognition.style.display = 'none';
    enableRecognition.style.display = 'block';

    videoTracks.forEach(function(track) {track.stop()});
    navigator.mediaDevices.getUserMedia({video: false})
    .then(handleSuccess);
});
