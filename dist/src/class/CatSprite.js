import { z } from "zod";
const optionsSchema = z.object({
    sheet: z.array(z.string()).min(1),
    width: z.number().min(1).positive(),
    height: z.number().min(1).positive(),
});
export default class CatSprite {
    sheet;
    width;
    height;
    constructor(params) {
        const options = optionsSchema.parse(params);
        this.sheet = options.sheet;
        this.width = options.width;
        this.height = options.height;
    }
}
