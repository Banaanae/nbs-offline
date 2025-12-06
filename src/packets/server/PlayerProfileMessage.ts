import { Player } from "../../player.js";
import { ByteStream } from "../../bytestream.js";
import { Config } from "../../config.js";

export class PlayerProfileMessage {
  static encode(player: Player): number[] {
    let stream = new ByteStream([]);

    // PlayerProfile::encode
    stream.writeVlong(player.id[0], player.id[1]);
    stream.writeDataReference({ high: 16, low: player.favouriteBrawler });
    stream.writeDataReference({ high: 0, low: -1 }); // winstreak brawler

    const ownedBrawlersCount = Object.keys(player.ownedBrawlers).length;
    //stream.writeVint(ownedBrawlersCount);

    // owned brawlers array doesnt even matter
    // HeroEntry::encode
    stream.writeVint(1); // hero entry
    
    stream.writeDataReference({ high: 16, low: 1 }); // character id
    stream.writeDataReference({ high: 0, low: -1 }); // skin equipped
    stream.writeVint(0); // trophies
    stream.writeVint(0); // highest trophies
    stream.writeVint(1); // highest season trophies
    stream.writeVint(0); // power level
    stream.writeVint(0); // mastery

    //stream.writeVint(0); // done with hook in mainHooks.ts idk why it doesnt work

    stream.writeVInt(0); // stat count
    // stream.writeVInt(1) // stat id
    // stream.writeVInt(0) // stat value
    
    /* ***************************************** */
    stream.writeString(player.name);
    stream.writeVint(100);
    stream.writeVint(28000000 + player.thumbnail);
    stream.writeVint(43000000 + player.namecolor);
    stream.writeVint(43000000); // haspremiumpass == + player.namecolor

    /* ***************************************** */
    stream.writeBoolean(false);
    stream.writeString("hello world");
    stream.writeVint(0);
    stream.writeVint(0);
    stream.writeVint(0); // max winstreak
    stream.writeDataReference({ high: 29, low: 0 }); // hero skin
    stream.writeDataReference({ high: 0, low: -1 }); // thumbnail 1
    stream.writeDataReference({ high: 0, low: -1 }); // thumbnail 2
    stream.writeDataReference({ high: 0, low: -1 }); // emote
    stream.writeDataReference({ high: 0, low: -1 }); // title

    stream.writeBoolean(false); // alliance header 
    stream.writeDataReference({ high: 0, low: 0}); // alliance role
    
    stream.writeVint(0);

    return stream.payload;
  }
}
