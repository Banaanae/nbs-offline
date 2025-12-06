import { config, player } from "../../definitions.js";
import { ByteStream } from "../../bytestream.js";
import { Player } from "../../player";

export class SetSupportedCreatorResponseMessage {
  static encode(player: Player): number[] {
    let stream = new ByteStream([]);

    stream.writeVint(1);
    stream.writeString(config.supportedCreator);

    return stream.payload;
  }
}
