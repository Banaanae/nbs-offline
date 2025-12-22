import { Logger } from "./utility/logger";
import { UI } from "./utility/ui";

export class DebugMenu {
  static createDebugButton(guiContainer: NativePointer) {
    Logger.debug("Creating debug button");
    try {
      UI.createButton(
        guiContainer,
        "sc/debug.sc",
        "debug_button",
        "D",
        "txt",
        -40,
        575,
      );
    } catch (e) {
      Logger.error("Failed to create debug button", e);
    }
  }
}
