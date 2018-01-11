(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
  console.log('from Server: ' + e.data);
  document.write('from Server: ' + e.data)
};

ws.onclose = function (e) {
  window.removeEventListener("deviceorientation", handleOrientation, true);
}

function handleOrientation(event) {
  var gamma = event.gamma
  document.write('Client gamma: ' + gamma)

  if (shouldEmit(gamma)) {
    ws.send(convertAngleFloat(gamma))
  }
}

function shouldEmit(gamma) {
  if (gamma === null || (gamma < 10 && gamma > -10)) return false
  return true
}

// 右180 => 2.5
// 0度の位置 => 7.25
// 左180 => 12.0
function convertAngleFloat(gamma) {
  value = ((90 + gamma) / 20) + 2.5
  return value
}
},{}]},{},[1]);
