import { ByteStream } from "../../bytestream.js";
import { Hero } from "../../hero.js";
import { BattleEndData } from "../../battleenddata.js";
import { Messaging } from "../../messaging.js";
import { BattleEndMessage } from "../server/battleendmessage.js";

export class AskForBattleEndMessage {
  static decode(stream: ByteStream): BattleEndData {
    let gamemode = stream.readVInt();
    let result = stream.readVInt();
    let rank = stream.readVInt();
    let mapID = stream.readDataReference();
    let heroes: Hero[] = [];
    let heroCount = stream.readVInt();
    for (let i = 0; i < heroCount; i++) {
      heroes.push(
        new Hero(
          stream.readDataReference(),
          stream.readDataReference(),
          stream.readVInt(),
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
