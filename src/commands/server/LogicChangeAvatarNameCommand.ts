import { ByteStream } from "../../bytestream.js";
import { config } from "../../definitions.js";
import { LogicCommand } from "../../logiccommand.js";

export class LogicChangeAvatarNameCommand {
  static encode(): number[] {
    let stream = new ByteStream([]);

    stream.writeVInt(201);
    stream.writeString(config.name);
    stream.writeVInt(0);
    stream.payload.concat(LogicCommand.encode());

    return stream.payload;
  }
}
