import { Player } from "../../../player.js";
import { ByteStream } from "../../../bytestream.js";
import { Config } from "../../../config.js";

export class StartLoadingMessage {
  static encode(player: Player): number[] {
    let stream = new ByteStream([]);

    stream.writeInt(1); // player count
    stream.writeInt(0); // team index
    stream.writeInt(1); // own index
    stream.writeInt(1); // players array

    return stream.payload;
  }
}
