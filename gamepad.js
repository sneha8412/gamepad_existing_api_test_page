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

window.addEventListener("gamepadrawinputchanged", (event) => {
  if (event.gamepadSnapshot && containsAnyPhraseCI(event.gamepadSnapshot.id, ["Xbox", "Wireless"])) {
    gamepadIndex = event.gamepadSnapshot.index;

    let summary = `Gamepad input changed at index ${gamepadIndex}: ${event.gamepadSnapshot.id}\n\n`;

    // Buttons pressed
    if (event.buttonsPressed.length > 0) {
      summary += `Buttons pressed: ${event.buttonsPressed.join(", ")}\n`;
      event.buttonsPressed.forEach(index => {
        const btn = event.gamepadSnapshot.buttons[index];
        summary += `  Button ${index}: pressed=${btn.pressed}, value=${btn.value}\n`;
      });
    }

    // Buttons released
    if (event.buttonsReleased.length > 0) {
      summary += `Buttons released: ${event.buttonsReleased.join(", ")}\n`;
      event.buttonsReleased.forEach(index => {
        const btn = event.gamepadSnapshot.buttons[index];
        summary += `  Button ${index}: pressed=${btn.pressed}, value=${btn.value}\n`;
      });
    }

    // Buttons value changed
    if (event.buttonsValueChanged.length > 0) {
      summary += `Buttons value changed: ${event.buttonsValueChanged.join(", ")}\n`;
      event.buttonsValueChanged.forEach(index => {
        const btn = event.gamepadSnapshot.buttons[index];
        summary += `  Button ${index}: pressed=${btn.pressed}, value=${btn.value}\n`;
      });
    }

    // Axes changed
    if (event.axesChanged.length > 0) {
      summary += `Axes changed: ${event.axesChanged.join(", ")}\n`;
      event.axesChanged.forEach(index => {
        const axisValue = event.gamepadSnapshot.axes[index];
        summary += `  Axis ${index}: value=${axisValue.toFixed(2)}\n`;
      });
    }

    // Touches if present
    if (event.touchesChanged?.length > 0) {
      summary += `Touches changed: ${event.touchesChanged.join(", ")}\n`;
    }
    if (event.touchesDown?.length > 0) {
      summary += `Touches down: ${event.touchesDown.join(", ")}\n`;
    }
    if (event.touchesUp?.length > 0) {
      summary += `Touches up: ${event.touchesUp.join(", ")}\n`;
    }

    // Show the summary on the page
    rawEventOutput.textContent = summary;

    // Also keep the detailed polling view
    console.log("Full raw event payload:", event);
  }
});
