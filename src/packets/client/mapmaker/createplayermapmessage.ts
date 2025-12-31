import { ByteStream } from "../../../bytestream.js";
import { Messaging } from "../../../messaging.js";
import { config } from "../../../definitions.js";
import { writeConfig } from "../../../config.js";
import { SetSupportedCreatorResponseMessage } from "../../server/setsupportedcreatorresponsemessage.js";
import { LogicSetSupportedCreatorCommand } from "../../../commands/server/logicsetsupportedcreatorcommand.js";
import { PlayerMap } from "../../../playermap.js";
import { CreatePlayerMapResponseMessage } from "../../server/mapmaker/createplayermapresponsemessage.js";

export class CreatePlayerMapMessage {
  static decode(stream: ByteStream): PlayerMap {
    let mapName = stream.readString();
    let gmv = stream.readVInt();
    let theme = stream.readDataReference().low;
    return new PlayerMap(mapName, gmv, theme);
  }

  static execute(map: PlayerMap) {
    Messaging.sendOfflineMessage(
      22100,
      CreatePlayerMapResponseMessage.encode(map),
    );
  }
}
