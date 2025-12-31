import { ByteStream } from "../../../bytestream.js";
import { TeamManager } from "../../../teams/teammanager.js";

export class TeamCreateMessage {
  static decode(stream: ByteStream): any {
    stream.readLong();
    let type = stream.readVInt();
    let slot = stream.readVInt();
    stream.readVInt();
    return { type: type, slot: slot };
  }

  static execute(data: any): void {
    TeamManager.createTeam();
  }
}
