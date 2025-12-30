import { ByteStream } from "./bytestream.js";
import { LogicSelectCharacterCommand } from "./commands/client/logicselectcharactercommand.js";
import { LogicSelectFavouriteHeroCommand } from "./commands/client/logicselectfavouriteherocommand.js";
import { LogicSelectSkinCommand } from "./commands/client/logicselectskincommand.js";
import { LogicSetPlayerNameColorCommand } from "./commands/client/logicsetplayernamecolorcommand.js";
import { LogicSetPlayerThumbnailCommand } from "./commands/client/logicsetplayerthumbnailcommand.js";
import { Logger } from "./utility/logger.js";

export class CommandHandler {
  static handleCommand(id: number, stream: ByteStream): ByteStream {
    switch (id) {
      case 527:
        var namecolor = 0;
        ({ stream, namecolor } = LogicSetPlayerNameColorCommand.decode(stream));
        LogicSetPlayerNameColorCommand.execute(namecolor);
        break;
      case 505:
        var thumbnail = 0;
        ({ stream, thumbnail } = LogicSetPlayerThumbnailCommand.decode(stream));
        LogicSetPlayerThumbnailCommand.execute(thumbnail);
        break;
      case 570:
        var character = 0;
        ({ stream, character } =
          LogicSelectFavouriteHeroCommand.decode(stream));
        LogicSelectFavouriteHeroCommand.execute(character);
        break;
      case 525:
        var character = 0;
        ({ stream, character } = LogicSelectCharacterCommand.decode(stream));
        LogicSelectCharacterCommand.execute(character);
        break;
      case 506:
        var skin = 0;
        ({ stream, skin } = LogicSelectSkinCommand.decode(stream));
        LogicSelectSkinCommand.execute(skin);
        break;
      default:
        Logger.warn("Unhandled command of type:", id);
        break;
    }
    return stream;
  }
}
