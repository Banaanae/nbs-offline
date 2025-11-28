import { ByteStream } from "../../bytestream.js";
import { writeConfig } from "../../config.js";
import { config } from "../../definitions.js";
import { LogicCommand } from "../../logiccommand.js";

export class LogicSelectFavouriteHeroCommand {
  static decodeAndExecute(stream: ByteStream): ByteStream {
    stream = LogicCommand.decode(stream);
    let heroID = stream.readDataReference().low;
    console.log("New hero id:", heroID);
    config.favouriteBrawler = heroID;
    writeConfig(config);
    return stream;
  }
}
