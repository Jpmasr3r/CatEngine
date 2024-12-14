import { z } from "zod";
import CatSprite from "./CatSprite.js";

const optionsSchema = z.object({
	sprite: z.instanceof(CatSprite).refine((val) => val instanceof CatSprite, {
		message: "Expected CatSprite class",
	}),
	name: z
		.string()
		.min(3)
		.transform((val) => {
			return `object ${val}`;
		}),
});

export default class CatObject {
	public sprite: CatSprite;
	public name: string;
	constructor(params: z.infer<typeof optionsSchema>) {
		const options = optionsSchema.parse(params);

		this.sprite = options.sprite;
		this.name = options.name;
	}

	public step(): void {}
}
