import { ByteStream } from "../../bytestream.js";

export class TeamGameStartingMessage {
  static encode(): number[] {
    let stream = new ByteStream([]);

    stream.writeVInt(0);
    stream.writeVInt(0);
    stream.writeDataReference(15, 10);

    return stream.payload;
  }
}
