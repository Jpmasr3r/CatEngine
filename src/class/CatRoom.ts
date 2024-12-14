import { z } from "zod";
import CatObject from "./CatObject.js";

const optionsSchema = z.object({
	maxFPS: z.number().min(1).positive().default(60).optional(),
	width: z.number().min(1).positive(),
	height: z.number().min(1).positive(),
	element: z.custom<HTMLDivElement>((val) => val instanceof HTMLDivElement, {
		message: "Expected div element",
	}),
});

export default class CatRoom {
	public maxFPS: number;
	public width: number;
	public height: number;
	public intanceds: Array<CatObject> = [];
	public element: HTMLDivElement;

	constructor(params: z.infer<typeof optionsSchema>) {
		const options = optionsSchema.parse(params);

		if (options.maxFPS) {
			this.maxFPS = options.maxFPS;
		} else {
			this.maxFPS = 60;
		}

		this.width = options.width;
		this.height = options.height;
		this.element = options.element;
	}

	public instance(params: Array<CatObject>) {
		const catObjectsSchema = z
			.array(
				z.instanceof(CatObject).refine((val) => val instanceof CatObject, {
					message: "Expected CatObject class",
				}),
			)
			.min(1);

		const catObjects = catObjectsSchema.parse(params);
		for (const catObject of catObjects) {
			const object: HTMLDivElement = document.createElement("div");
			object.classList.add(catObject.name);

			this.element.appendChild(object);
		}
	}
}
