import { z } from "zod";

const keysPressed: { [key: string]: boolean } = {};

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

export function isKeyPressed(key: string): boolean {
	const validKey = z.string().length(1).parse(key).toLowerCase();
	return !!keysPressed[validKey];
}
