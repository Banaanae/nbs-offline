import { ByteStream } from "../bytestream.js";
import { config } from "../definitions.js";
import { LogicPlayerBattleIntroDetails } from "./logicplayerbattleintrodetails.js";

export class LogicPlayer {
  constructor() {}

  encode(stream: ByteStream): ByteStream {
    stream.writeLong(config.id.high, config.id.low);
    stream.writeBoolean(true); // LogicPlayerBattleIntroDetails::encode
    stream = LogicPlayerBattleIntroDetails.encode(stream);
    stream.writeVint(1); // player index
    stream.writeVint(0); // team index
    stream.writeVint(0);

    return stream;
  }
}
