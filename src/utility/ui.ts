import { Offsets } from "../offsets";
import {
  addChild,
  autoAdjustText,
  gameButtonConstructor,
  getMovieClip,
  getTextFieldByName,
  gotoAndStop,
  malloc,
  setFontSize,
  setHeight,
  setMultiline,
  setScaleX,
  setScaleY,
  setText,
  setTextAndScaleIfNecessary,
  setWidth,
  setXY,
} from "../definitions.js";
import { createStringObject } from "../util.js";
import { Logger } from "./logger";

export class UI {
  static hide(displayObject: NativePointer) {
    setXY(displayObject, NaN, NaN);
  }

  static createButton(
    guiContainer: NativePointer,
    scFile: string,
    item: string,
    text: string,
    textFieldName: string,
    x: number,
    y: number,
    width: number | undefined = undefined,
    height: number | undefined = undefined,
    frameIndex: number | undefined = undefined,
    multiline: boolean = false,
    fontsize: number | undefined = undefined,
  ) {
    let btn = malloc(600);
    gameButtonConstructor(btn);
    let movieClip = getMovieClip(
      Memory.allocUtf8String(scFile),
      Memory.allocUtf8String(item),
      1,
    );
    if (frameIndex) gotoAndStop(movieClip, frameIndex);
    new NativeFunction(
      btn.readPointer().add(Offsets.InitFn).readPointer(),
      "void",
      ["pointer", "pointer", "bool"],
    )(btn, movieClip, 1);
    let textField = getTextFieldByName(
      btn.add(Offsets.ButtonText).readPointer(),
      Memory.allocUtf8String(textFieldName),
    );
    setXY(btn, x, y);
    if (width) setWidth(btn, width);
    if (height) setHeight(btn, height);
    setText(textField, createStringObject(text), 1);
    setMultiline(textField, Number(multiline));
    autoAdjustText(textField, 1, 1, 1);
    addChild(guiContainer, btn);
    if (fontsize) setFontSize(textField, fontsize);
    Logger.debug("Added button", text);
  }
}
