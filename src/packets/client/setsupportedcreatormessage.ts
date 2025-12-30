import { ByteStream } from "../../bytestream.js";
import { Messaging } from "../../messaging.js";
import { config } from "../../definitions.js";
import { writeConfig } from "../../config.js";
import { SetSupportedCreatorResponseMessage } from "../server/setsupportedcreatorresponsemessage.js";
import { LogicSetSupportedCreatorCommand } from "../../commands/server/logicsetsupportedcreatorcommand.js";
import { Logger } from "../../utility/logger.js";

export class SetSupportedCreatorMessage {
  static decode(stream: ByteStream) {
    let ccc = stream.readString();
    return ccc;
  }

  static execute(ccc: string) {
    if (ccc == "") {
      Logger.debug("Clearing CCC");
    } else {
      Logger.debug("New CCC:", ccc);
    }

    let creatorCodes = config.creatorCodes.map((v) => v.toLowerCase());
    let cccLower = ccc.toLowerCase();

    if (
      ccc != "" &&
      !config.allCreatorCodesValid &&
      !creatorCodes.includes(cccLower)
    ) {
      return Messaging.sendOfflineMessage(
        28686,
        SetSupportedCreatorResponseMessage.encode(),
      );
    }

    if (ccc != "") {
      let correctCaseIndex = creatorCodes.indexOf(cccLower);
      config.supportedCreator = config.creatorCodes[correctCaseIndex];
    } else {
      config.supportedCreator = "";
    }

    writeConfig(config);

    Messaging.sendOfflineMessage(
      24111,
      LogicSetSupportedCreatorCommand.encode(),
    );
  }
}
