import { config, player } from "../../definitions.js";
import { ByteStream } from "../../bytestream.js";
import { Player } from "../../player";

export class SetSupportedCreatorResponseMessage {
  static encode(): number[] {
    let stream = new ByteStream([]);

    stream.writeVInt(1);
    stream.writeString(config.supportedCreator);

    return stream.payload;
  }
}
