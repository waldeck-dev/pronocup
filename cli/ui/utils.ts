export function clear(messages?: string | string[]) {
  console.log("\x1Bc");

  if (messages) {
    if (typeof messages === "string") {
      messages = [messages];
    }

    messages.forEach((msg) => {
      console.error(msg);
    });
  }
}
