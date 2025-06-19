let gamepadIndex = null;

window.addEventListener("gamepadconnected", (event) => {
  gamepadIndex = event.gamepad.index;
  console.log(`Gamepad connected at index ${gamepadIndex}: ${event.gamepad.id}`);
});

window.addEventListener("gamepaddisconnected", () => {
  console.log("Gamepad disconnected");
  gamepadIndex = null;
});

function updateGamepad() {
  const output = document.getElementById("output");
  const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];

  if (gamepadIndex !== null && gamepads[gamepadIndex]) {
    const gp = gamepads[gamepadIndex];
    let log = `Gamepad: ${gp.id}\n\nButtons:\n`;

    gp.buttons.forEach((btn, i) => {
      log += `Button ${i}: ${btn.pressed ? "Pressed" : "Released"}\n`;
    });

    log += "\nAxes:\n";
    gp.axes.forEach((axis, i) => {
      log += `Axis ${i}: ${axis.toFixed(2)}\n`;
    });

    output.textContent = log;
  }

  requestAnimationFrame(updateGamepad);
}

requestAnimationFrame(updateGamepad);
