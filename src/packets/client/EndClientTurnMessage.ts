import { Player } from "../../player.js";
import { ByteStream } from "../../bytestream.js";
import { CommandHandler } from "../../commandhandler.js";
import { Logger } from "../../utility/logger.js";

export class EndClientTurnMessage {
  static decode(stream: ByteStream) {
    stream.readBoolean();
    let tick = stream.readVint();
    let checksum = stream.readVint();
    let count = stream.readVint();
    Logger.verbose("Command amount:", count);
    return { stream, tick, checksum, count };
  }

  // idk how to do this well fuck this
  static execute(data: {
    stream: ByteStream;
    tick: number;
    checksum: number;
    count: number;
  }) {
    let { stream, count } = data;
    for (let i = 0; i < count; i++) {
      let id = stream.readVint();
      Logger.verbose("Command ID:", id);
      stream = CommandHandler.handleCommand(id, stream);
    }
  }
}
