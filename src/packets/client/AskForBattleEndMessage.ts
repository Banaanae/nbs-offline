import { ByteStream } from "../../bytestream.js";
import { Hero } from "../../hero.js";
import { BattleEndData } from "../../battleenddata.js";
import { Messaging } from "../../messaging.js";
import { BattleEndMessage } from "../server/BattleEndMessage.js";

export class AskForBattleEndMessage {
  static decode(stream: ByteStream): BattleEndData {
    let gamemode = stream.readVint();
    let result = stream.readVint();
    let rank = stream.readVint();
    let mapID = stream.readDataReference();
    let heroes: Hero[] = [];
    let heroCount = stream.readVint();
    for (let i = 0; i < heroCount; i++) {
      heroes.push(
        new Hero(
          stream.readDataReference(),
          stream.readDataReference(),
          stream.readVint(),
          stream.readBoolean(),
          stream.readString(),
        ),
      );
    }

    return new BattleEndData(gamemode, result, rank, mapID, heroes);
  }

  static execute(data: BattleEndData): void {
    Messaging.sendOfflineMessage(23456, BattleEndMessage.encode(data));
  }
}
