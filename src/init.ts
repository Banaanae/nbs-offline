import { createAssetManager } from "./utility/assetmanagerandroid.js";
import { base, load, player, setBase } from "./definitions.js";
import { installHooks } from "./mainHooks.js";
import { isAndroid } from "./platform.js";
import { Logger } from "./utility/logger.js";

(async () => {
  Logger.debug("Hello, world!");
  if (isAndroid) await createAssetManager();
  setImmediate(() => {
    let library = isAndroid ? "libg.so" : "laser";
    setBase(Module.getBaseAddress(library));
    Logger.info("Running on", isAndroid ? "Android" : "iOS");
    Logger.verbose(`${library} loaded at: ${base}`);

    load();
    for (const brawlerKey in player.ownedBrawlers) {
      const brawler = player.ownedBrawlers[brawlerKey];
      for (const skin of brawler.skins) {
        player.ownedSkins.push(skin);
      }
    }
    installHooks();
  });
})();
