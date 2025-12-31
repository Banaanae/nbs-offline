import { ByteStream } from "../../bytestream.js";
import { writeConfig } from "../../config.js";
import { config } from "../../definitions.js";
import { LogicCommand } from "../../logiccommand.js";
import { Logger } from "../../utility/logger.js";

export class LogicSelectFavouriteHeroCommand {
  static decode(stream: ByteStream): any {
    stream = LogicCommand.decode(stream);
    let character = stream.readDataReference().low;
    return { stream, character };
  }

  static execute(characterID: number) {
    Logger.verbose("New favourite brawler id:", characterID);
    config.favouriteBrawler = characterID;
    writeConfig(config);
  }
}
