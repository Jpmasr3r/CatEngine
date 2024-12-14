import { z } from "zod";

const mouseButtonsPressed: { [key: string]: boolean } = {
	left: false, // Botão esquerdo
	middle: false, // Botão do meio (roda)
	right: false, // Botão direito
	m4: false, // Botão lateral 1
	m5: false, // Botão lateral 2
};

export let mouseX = 0;
export let mouseY = 0;

export function initializeMouseHandler() {
	window.addEventListener("mousedown", (event) => {
		const button = getMouseButton(event.button);
		if (button) {
			mouseButtonsPressed[button] = true;
		}
	});

	window.addEventListener("mouseup", (event) => {
		const button = getMouseButton(event.button);
		if (button) {
			mouseButtonsPressed[button] = false;
		}
	});

	window.addEventListener("mousemove", (event) => {
		mouseX = event.clientX;
		mouseY = event.clientY;
	});
}

function getMouseButton(button: number): string | null {
	switch (button) {
		case 0:
			return "left"; // Botão esquerdo
		case 1:
			return "middle"; // Botão do meio (roda)
		case 2:
			return "right"; // Botão direito
		case 3:
			return "m4"; // Botão lateral 1
		case 4:
			return "m5"; // Botão lateral 2
		default:
			return null;
	}
}

export function isMousePressed(button: string): boolean {
	const validButton = z.enum(["left", "middle", "right", "m4", "m5"]).parse(button);
	return !!mouseButtonsPressed[validButton];
}

// Função para detectar um clique único (pressionamento e liberação do botão)
export function mouseClick(button: string): Promise<boolean> {
	const validButton = z.enum(["left", "middle", "right", "m4", "m5"]).parse(button);

	return new Promise((resolve) => {
		function onMouseDown(event: MouseEvent) {
			if (getMouseButton(event.button) === validButton) {
				resolve(true); // Detecta o clique
				cleanup();
			}
		}

		function onMouseUp(event: MouseEvent) {
			if (getMouseButton(event.button) === validButton) {
				cleanup();
			}
		}

		function cleanup() {
			removeEventListener("mousedown", onMouseDown);
			removeEventListener("mouseup", onMouseUp);
		}

		addEventListener("mousedown", onMouseDown);
		addEventListener("mouseup", onMouseUp);
	});
}

// Função para detectar enquanto o botão do mouse está pressionado (segurando)
export function mouseHold(button: string): boolean {
	const validButton = z.enum(["left", "middle", "right", "m4", "m5"]).parse(button);

	return mouseButtonsPressed[validButton];
}
