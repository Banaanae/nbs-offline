import { ByteStream } from "../bytestream.js";
import { config } from "../definitions.js";
import { LogicPlayerBattleIntroDetails } from "./logicplayerbattleintrodetails.js";

export class LogicPlayer {
  constructor() {}

  encode(stream: ByteStream): ByteStream {
    stream.writeLong(config.id.high, config.id.low);
    stream.writeBoolean(true); // LogicPlayerBattleIntroDetails::encode
    stream = LogicPlayerBattleIntroDetails.encode(stream);
    stream.writeVInt(1); // player index
    stream.writeVInt(0); // team index
    stream.writeVInt(0);

    return stream;
  }
}
