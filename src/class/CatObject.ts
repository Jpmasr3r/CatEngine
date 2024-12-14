import { z } from "zod";
import CatSprite from "./CatSprite.js";

const optionsSchema = z.object({
	sprite: z.instanceof(CatSprite).refine((val) => val instanceof CatSprite, {
		message: "Expected CatSprite class",
	}),
	name: z.string().min(3),
	X: z.number(),
	Y: z.number(),
});

export default class CatObject {
	public sprite: CatSprite;
	public name: string;
	public step: () => void;
	public X: number;
	public Y: number;

	constructor(params: z.infer<typeof optionsSchema>) {
		const options = optionsSchema.parse(params);

		this.sprite = options.sprite;
		this.name = options.name;
		this.X = options.X;
		this.Y = options.Y;
		this.step = () => {};
	}

	public defineStep(func: () => void) {
		this.step = func;
	}
}
