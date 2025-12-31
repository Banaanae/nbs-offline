import { ByteStream } from "../../bytestream.js";
import { writeConfig } from "../../config.js";
import { config } from "../../definitions.js";
import { LogicCommand } from "../../logiccommand.js";
import { Logger } from "../../utility/logger.js";

export class LogicSelectCharacterCommand {
  static decode(stream: ByteStream): any {
    stream = LogicCommand.decode(stream);
    let character = stream.readDataReference().low;
    return { stream, character };
  }

  static execute(brawlerID: number) {
    Logger.verbose("New brawler id:", brawlerID);
    config.selectedBrawlers[0] = brawlerID;
    writeConfig(config);
  }
}
