var ws = new WebSocket('ws://192.168.100.116:9999/');

// WebSocket Connection Opened
ws.onopen = function() {
  window.addEventListener("deviceorientation", handleOrientation, true);
};

// Error Occured
ws.onerror = function (error) {
  console.log('WebSocket Error ' + error);
};

// Received from Server
ws.onmessage = function (e) {
  console.log('Server: ' + e.data);
};

ws.onclose = function (e) {
  window.removeEventListener("deviceorientation", handleOrientation, true);
}

function handleOrientation(event) {
  var gamma = event.gamma

  if (shouldEmit(gamma)) {
    ws.send(convertAngleFloat(gamma))
  }
  document.write('gamma: ' + gamma)
}

function shouldEmit(gamma) {
  if (gamma === null || gamma < 10) return false
  return true
}

function convertAngleFloat(gamma) {
  if (-90 < gamma && gamma < 0) return '12.0'
  if (0 < gamma && gamma < 90) return '2.5'
  return '7.25'
}