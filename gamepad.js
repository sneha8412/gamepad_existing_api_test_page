// let gamepadIndex = null;

// function containsAnyPhraseCI(text, phrases) {
//   const lowerText = text.toLowerCase();
//   return phrases.some(phrase => lowerText.includes(phrase.toLowerCase()));
// }
 
// window.addEventListener("gamepadconnected", (event) => {
//   if(containsAnyPhraseCI(event.gamepad.id, ["Xbox", "Wireless"])) {
//     gamepadIndex = event.gamepad.index;
//     console.log(`Gamepad connected at index ${gamepadIndex}: ${event.gamepad.id}`);

//     console.log(
//       "Gamepad connected at index %d: %s. %d buttons, %d axes.",
//       event.gamepad.index,
//       event.gamepad.id,
//       event.gamepad.buttons.length,
//       event.gamepad.axes.length,
//   );
//   }
// });

// window.addEventListener("gamepadrawinputchanged", (event) => {
//   if(containsAnyPhraseCI(event.gamepadSnapshot.id, ["Xbox", "Wireless"])) {
//     gamepadIndex = event.gamepadSnapshot.index;
//     console.log(`Gamepad input changed at index ${gamepadIndex}: ${event.gamepadSnapshot.id}`);

//     console.log("Event payload: " + JSON.stringify(event, null, 2))

//     console.log(
//       "Gamepad connected at index %d: %s. %d buttons, %d axes.",
//       event.gamepadSnapshot.index,
//       event.gamepadSnapshot.id,
//       event.gamepadSnapshot.buttons.length,
//       event.gamepadSnapshot.axes.length,
//   );
//   }
// });

// window.addEventListener("gamepaddisconnected", () => {
//   console.log("Gamepad disconnected");
//   gamepadIndex = null;
// });

// function updateGamepad() {
//   const output = document.getElementById("output");
//   const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];

//   if (gamepadIndex !== null && gamepads[gamepadIndex]) {
//     const gp = gamepads[gamepadIndex];
//     let log = `Gamepad: ${gp.id}\n\nButtons:\n`;

//     gp.buttons.forEach((btn, i) => {
//       log += `Button ${i}: ${btn.pressed ? "Pressed" : "Released"}\n`;
//     });

//     log += "\nAxes:\n";
//     gp.axes.forEach((axis, i) => {
//       log += `Axis ${i}: ${axis.toFixed(2)}\n`;
//     });

//     output.textContent = log;
//   }

//   requestAnimationFrame(updateGamepad);
// }

// requestAnimationFrame(updateGamepad);

let gamepadIndex = null;

function containsAnyPhraseCI(text, phrases) {
  const lowerText = text.toLowerCase();
  return phrases.some(phrase => lowerText.includes(phrase.toLowerCase()));
}

window.addEventListener("gamepadconnected", (event) => {
  if (containsAnyPhraseCI(event.gamepad.id, ["Xbox", "Wireless"])) {
    gamepadIndex = event.gamepad.index;
    console.log(`Gamepad connected at index ${gamepadIndex}: ${event.gamepad.id}`);

    console.log(
      "Gamepad connected at index %d: %s. %d buttons, %d axes.",
      event.gamepad.index,
      event.gamepad.id,
      event.gamepad.buttons.length,
      event.gamepad.axes.length,
    );
  }
});

// window.addEventListener("gamepadrawinputchanged", (event) => {
//   if (containsAnyPhraseCI(event.gamepadSnapshot.id, ["Xbox", "Wireless"])) {
//     gamepadIndex = event.gamepadSnapshot.index;
//     console.log(`Gamepad input changed at index ${gamepadIndex}: ${event.gamepadSnapshot.id}`);

//     // Show payload on page
//     const rawOutput = document.getElementById("rawEventOutput");
//     if (rawOutput) {
//       rawOutput.textContent = "Event payload:\n" + JSON.stringify(event, null, 2);
//     }

//     console.log("Event payload: " + JSON.stringify(event, null, 2));

//     console.log(
//       "Gamepad connected at index %d: %s. %d buttons, %d axes.",
//       event.gamepadSnapshot.index,
//       event.gamepadSnapshot.id,
//       event.gamepadSnapshot.buttons.length,
//       event.gamepadSnapshot.axes.length,
//     );
//   }
// });

window.addEventListener("gamepadrawinputchanged", (event) => {
  if (containsAnyPhraseCI(event.gamepadSnapshot.id, ["Xbox", "Wireless"])) {
    gamepadIndex = event.gamepadSnapshot.index;
    console.log(`Gamepad input changed at index ${gamepadIndex}: ${event.gamepadSnapshot.id}`);

    // Extract payload details
    const payload = {
      gamepadId: event.gamepadSnapshot.id,
      index: event.gamepadSnapshot.index,
      axesChanged: event.axesChanged,
      buttonsValueChanged: event.buttonsValueChanged,
      buttonsPressed: event.buttonsPressed,
      buttonsReleased: event.buttonsReleased,
      touchesChanged: event.touchesChanged,
      touchesDown: event.touchesDown,
      touchesUp: event.touchesUp,
    };

    // Show payload on page
    const rawOutput = document.getElementById("rawEventOutput");
    if (rawOutput) {
      rawOutput.textContent = "Event payload:\n" + JSON.stringify(payload, null, 2);
    }

    console.log("Event payload: ", payload);

    console.log(
      "Gamepad connected at index %d: %s. %d buttons, %d axes.",
      event.gamepadSnapshot.index,
      event.gamepadSnapshot.id,
      event.gamepadSnapshot.buttons.length,
      event.gamepadSnapshot.axes.length,
    );
  }
});

window.addEventListener("gamepaddisconnected", () => {
  console.log("Gamepad disconnected");
  gamepadIndex = null;

  // Optionally clear raw event payload
  const rawOutput = document.getElementById("rawEventOutput");
  if (rawOutput) {
    rawOutput.textContent = "";
  }
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
