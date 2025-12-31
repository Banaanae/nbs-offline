import { ByteStream } from "../../../bytestream.js";
import { Long } from "../../../long.js";

export class DeletePlayerMapResponseMessage {
  static encode(id: Long): number[] {
    let stream = new ByteStream([]);

    stream.writeVInt(0); // err
    stream.writeVLong(id.high, id.low);

    return stream.payload;
  }
}
