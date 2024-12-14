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
    sprite;
    name;
    step;
    X;
    Y;
    constructor(params) {
        const options = optionsSchema.parse(params);
        this.sprite = options.sprite;
        this.name = options.name;
        this.X = options.X;
        this.Y = options.Y;
        this.step = () => { };
    }
    defineStep(func) {
        this.step = func;
    }
}
