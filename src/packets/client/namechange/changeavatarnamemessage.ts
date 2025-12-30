import { ByteStream } from "../../../bytestream.js";
import { Messaging } from "../../../messaging.js";
import { LogicChangeAvatarNameCommand } from "../../../commands/server/logicchangeavatarnamecommand.js";
import { config, player } from "../../../definitions.js";
import { writeConfig } from "../../../config.js";
import { Logger } from "../../../utility/logger.js";

export class ChangeAvatarNameMessage {
  static decode(stream: ByteStream): string {
    return stream.readString(); // theres also a bool but who gives a shit
  }

  static execute(name: string): void {
    config.name = name;
    config.registered = true;
    writeConfig(config);
    Logger.verbose("Changed name to", name);
    Messaging.sendOfflineMessage(24111, LogicChangeAvatarNameCommand.encode());
  }
}
