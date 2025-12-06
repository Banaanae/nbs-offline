import { ByteStream } from "../../bytestream.js";
import { writeConfig } from "../../config.js";
import { config } from "../../definitions.js";
import { LogicCommand } from "../../logiccommand.js";

export class LogicSelectCharacterCommand {
  static decodeAndExecute(stream: ByteStream): ByteStream {
    stream = LogicCommand.decode(stream);
    let brawlerID = stream.readDataReference().low;
    console.log("New brawler id:", brawlerID);
    config.selectedBrawlers[0] = brawlerID;
    writeConfig(config);
    return stream;
  }
}
