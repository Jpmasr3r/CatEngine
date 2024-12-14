import { z } from "zod";
const keysPressed = {};
export function initializeKeyHandler() {
    window.addEventListener("keydown", (event) => {
        const key = event.key.toLowerCase();
        keysPressed[key] = true;
    });
    window.addEventListener("keyup", (event) => {
        const key = event.key.toLowerCase();
        keysPressed[key] = false;
    });
}
export function isKeyPressed(key) {
    const validKey = z.string().length(1).parse(key).toLowerCase();
    return !!keysPressed[validKey];
}
