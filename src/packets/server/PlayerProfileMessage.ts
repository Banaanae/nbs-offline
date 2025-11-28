import { Player } from "../../player.js";
import { ByteStream } from "../../bytestream.js";
import { Config } from "../../config.js";

export class PlayerProfileMessage {
  static encode(player: Player): number[] {
    let stream = new ByteStream([]);

    // PlayerProfile::encode
    stream.writeVlong(player.id[0], player.id[1]);
    stream.writeDataReference({ high: 16, low: player.favouriteBrawler });
    stream.writeDataReference({ high: 0, low: -1 });

    const ownedBrawlersCount = Object.keys(player.ownedBrawlers).length;
    stream.writeVint(ownedBrawlersCount);

    // owned brawlers array doesnt even matter
    // HeroEntry::encode
    stream.writeVint(1);
    stream.writeDataReference({ high: 16, low: 1 });
    stream.writeDataReference({ high: 0, low: -1 });
    stream.writeVint(0);
    stream.writeVint(0);
    stream.writeVint(1);
    stream.writeVint(0);
    stream.writeVint(0);

    stream.writeVint(0); // done with hook in mainHooks.ts idk why it doesnt work

    /* ***************************************** */
    stream.writeString(player.name);
    stream.writeVint(100);
    stream.writeVint(28000000 + player.thumbnail);
    stream.writeVint(43000000 + player.namecolor);
    stream.writeVint(43000000);

    /* ***************************************** */
    stream.writeBoolean(false);
    stream.writeString("hello world");
    stream.writeVint(0);
    stream.writeVint(0);
    stream.writeVint(0);
    stream.writeDataReference({ high: 29, low: 0 });
    stream.writeDataReference({ high: 0, low: -1 });
    stream.writeDataReference({ high: 0, low: -1 });
    stream.writeDataReference({ high: 0, low: -1 });
    stream.writeDataReference({ high: 0, low: -1 });

    stream.writeBoolean(false);

    stream.writeDataReference({ high: 25, low: 0 });
    stream.writeVint(0);

    return stream.payload;
  }
}
