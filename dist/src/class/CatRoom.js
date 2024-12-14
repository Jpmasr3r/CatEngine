import { z } from "zod";
import { initializeKeyHandler } from "../CatKeyboard.js";
import CatObject from "./CatObject.js";
import { initializeMouseHandler } from "../CatMouse.js";
const optionsSchema = z.object({
    maxFPS: z.number().min(1).positive().default(60).optional(),
    width: z.number().min(1).positive(),
    height: z.number().min(1).positive(),
    element: z.custom((val) => val instanceof HTMLDivElement, {
        message: "Expected div element",
    }),
});
export default class CatRoom {
    maxFPS;
    width;
    height;
    instanceds = [];
    element;
    constructor(params) {
        const options = optionsSchema.parse(params);
        this.maxFPS = options.maxFPS ?? 60;
        this.width = options.width;
        this.height = options.height;
        this.element = options.element;
        this.stylization();
    }
    instance(catObject) {
        //inicialize
        initializeKeyHandler();
        initializeMouseHandler();
        const catObjectSchema = z
            .instanceof(CatObject)
            .refine((val) => val instanceof CatObject, {
            message: "Expected CatObject class",
        });
        const validCatObject = catObjectSchema.parse(catObject);
        const objectElement = document.createElement("div");
        objectElement.classList.add(validCatObject.name, "object");
        objectElement.style.width = `${validCatObject.sprite.width}px`;
        objectElement.style.height = `${validCatObject.sprite.height}px`;
        objectElement.style.backgroundImage = `url(${validCatObject.sprite.sheet[0]})`;
        objectElement.style.backgroundSize = `${validCatObject.sprite.width}px ${validCatObject.sprite.height}px`;
        objectElement.style.backgroundRepeat = "no-repeat";
        objectElement.style.position = "absolute";
        this.element.appendChild(objectElement);
        this.instanceds.push(validCatObject);
        let frameIndex = 0;
        let frameCounter = 0;
        const framesPerImage = Math.floor(this.maxFPS / validCatObject.sprite.sheet.length);
        const step = () => {
            validCatObject.step();
            objectElement.style.left = `${validCatObject.X}px`;
            objectElement.style.top = `${validCatObject.Y}px`;
            if (frameCounter >= framesPerImage) {
                objectElement.style.backgroundImage = `url(${validCatObject.sprite.sheet[frameIndex]})`;
                frameIndex = (frameIndex + 1) % validCatObject.sprite.sheet.length;
                frameCounter = 0;
            }
            else {
                frameCounter++;
            }
            setTimeout(() => {
                requestAnimationFrame(step);
            }, 1000 / this.maxFPS);
        };
        step();
    }
    stylization() {
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.border = "1px solid #000";
        this.element.style.position = "relative";
    }
}
