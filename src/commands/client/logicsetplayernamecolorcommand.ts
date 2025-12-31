import { ByteStream } from "../../bytestream.js";
import { writeConfig } from "../../config.js";
import { config } from "../../definitions.js";
import { LogicCommand } from "../../logiccommand.js";
import { Logger } from "../../utility/logger.js";

export class LogicSetPlayerNameColorCommand {
  static decode(stream: ByteStream): any {
    stream = LogicCommand.decode(stream);
    let namecolor = stream.readDataReference().low;
    return { stream, namecolor };
  }

  static execute(colorID: number) {
    Logger.verbose("New color id:", colorID);
    config.namecolor = colorID;
    writeConfig(config);
  }
}
