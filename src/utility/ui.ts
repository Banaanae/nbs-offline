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
import { createStringObject, strPtr } from "../util.js";
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
    x: number,
    y: number,
    frameIndex: number | undefined = undefined,
    width: number = 1,
    height: number = 1,
    multiline: boolean = true,
    fontsize: number | undefined = undefined,
  ) {
    try {
      let btn = malloc(600);
      gameButtonConstructor(btn);
      let movieClip = getMovieClip(strPtr(scFile), strPtr(item), 1);
      if (frameIndex) gotoAndStop(movieClip, frameIndex);
      new NativeFunction(
        btn.readPointer().add(Offsets.InitFn).readPointer(),
        "void",
        ["pointer", "pointer", "bool"],
      )(btn, movieClip, 1);
      let textField = getTextFieldByName(
        btn.add(Offsets.ButtonText).readPointer(),
        Memory.allocUtf8String("Text"),
      );
      setXY(btn, x, y);
      setWidth(btn, width);
      setHeight(btn, height);
      setText(textField, createStringObject(text), 1);
      setMultiline(textField, Number(multiline));
      autoAdjustText(textField, 1, 1, 1);
      addChild(guiContainer, btn);
      if (fontsize) setFontSize(textField, fontsize);
      Logger.debug("Added button", text);
    } catch (e) {
      Logger.error(e);
    }
  }
}
