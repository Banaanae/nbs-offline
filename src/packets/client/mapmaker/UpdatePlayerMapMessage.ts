import { ByteStream } from "../../../bytestream.js";
import { Messaging } from "../../../messaging.js";
import { Long } from "../../../long.js";
import { UpdatePlayerMapResponseMessage } from "src/packets/server/mapmaker/updateplayermapresponsemessage.js";

export class UpdatePlayerMapMessage {
  static decode(stream: ByteStream): Long {
    let id = stream.readVLongAsLong(); // map id
    return id;
  }

  static execute(id: Long): void {
    Messaging.sendOfflineMessage(
      22103,
      UpdatePlayerMapResponseMessage.encode(id),
    );
  }
}
