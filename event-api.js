const logEl = document.getElementById('log');

function log(msg) {
  logEl.textContent += msg + '\n';
  logEl.scrollTop = logEl.scrollHeight;
  console.log(msg); // Optional console output
}

window.ongamepadconnected = (connectEvent) => {
  const connectedGamepads = navigator.getGamepads();
  const gamepad = connectedGamepads[connectEvent.gamepad.index];

  log(`🎮 Gamepad connected: ${gamepad.id} (index: ${gamepad.index})`);

  gamepad.onrawgamepadinputchange = (changeEvent) => {
    const snapshot = changeEvent.gamepadSnapshot;
    const liveGamepad = changeEvent.target;

    for (const axisIndex of changeEvent.axesChanged) {
      const snap = snapshot.axes[axisIndex];
      const live = liveGamepad.axes[axisIndex];
      log(`Axis ${axisIndex} changed → snapshot: ${snap}, live: ${live}`);
    }

    for (const buttonIndex of changeEvent.buttonsValueChanged) {
      const snap = snapshot.buttons[buttonIndex].value;
      const live = liveGamepad.buttons[buttonIndex].value;
      log(`Button ${buttonIndex} value changed → snapshot: ${snap}, live: ${live}`);
    }

    for (const buttonIndex of changeEvent.buttonsPressed) {
      const snap = snapshot.buttons[buttonIndex].pressed;
      const live = liveGamepad.buttons[buttonIndex].pressed;
      log(`Button ${buttonIndex} pressed → snapshot: ${snap}, live: ${live}`);
    }

    for (const buttonIndex of changeEvent.buttonsReleased) {
      const snap = snapshot.buttons[buttonIndex].released;
      const live = liveGamepad.buttons[buttonIndex].released;
      log(`Button ${buttonIndex} released → snapshot: ${snap}, live: ${live}`);
    }
  };
};

window.ongamepaddisconnected = (e) => {
  log(`❌ Gamepad disconnected: ${e.gamepad.id} (index: ${e.gamepad.index})`);
};
