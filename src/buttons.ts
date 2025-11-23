import { gameButtonConstructor, getMovieClip, malloc, setText, setXY } from "./definitions.js";
import { Offsets } from "./offsets.js";
import { createStringObject, strPtr } from "./util.js";

export function createButton(scFile: string, item: string, text: string, x: number, y: number) {
    let btn = malloc(384);
    gameButtonConstructor(btn);
    let movieClip = getMovieClip(strPtr(scFile), strPtr(item));
    new NativeFunction(btn.readPointer().add(Offsets.InitFn).readPointer(), "void", ["pointer", "pointer", "bool"])(btn, movieClip, 1);
    setText(btn, createStringObject(text), 1);
    setXY(btn, x, y);
}