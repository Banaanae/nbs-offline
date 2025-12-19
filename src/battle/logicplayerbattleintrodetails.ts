import { ByteStream } from "../bytestream.js";
import { config } from "../definitions.js";
import { PlayerDisplayData } from "../playerdisplaydata.js";

export class LogicPlayerBattleIntroDetails {
  static encode(stream: ByteStream): ByteStream {
    let displayData = new PlayerDisplayData(
      config.name,
      config.thumbnail,
      config.namecolor,
    );
    stream = displayData.encode(stream);

    return stream;
  }
}
