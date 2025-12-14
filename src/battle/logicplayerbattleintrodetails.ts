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
    stream.writeVint(0);
    stream.writeDataReference({ high: 100, low: 1 });
    stream.writeDataReference({ high: 28, low: -1 });
    stream.writeDataReference({ high: 28, low: -1 });
    stream.writeDataReference({ high: 52, low: -1 });
    stream.writeVint(0);
    stream.writeVint(0);

    return stream;
  }
}
