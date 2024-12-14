import { z } from "zod";

const optionsSchema = z.object({
	sheet: z.array(z.string()).min(1),
	width: z.number().min(1).positive(),
	height: z.number().min(1).positive(),
});

export default class CatSpite {
	public sheet: Array<string>;
	public width: number;
	public height: number;

	constructor(params: z.infer<typeof optionsSchema>) {
		const options = optionsSchema.parse(params);

		this.sheet = options.sheet;
		this.width = options.width;
		this.height = options.height;
	}
}
