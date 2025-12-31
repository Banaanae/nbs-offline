import { createAssetManager } from "./utility/assetmanagerandroid.js";
import {
  base,
  config,
  load,
  loadAsset,
  setBase,
  version,
} from "./definitions.js";
import { installHooks } from "./mainHooks.js";
import { isAndroid } from "./platform.js";
import { Logger } from "./utility/logger.js";
import { Dumper } from "./utility/dump.js";
import { setupCustomSettings } from "./customsettings.js";
import { createStringObject } from "./util.js";

(async () => {
  try {
    if (isAndroid) await createAssetManager();
    let library = isAndroid ? "libg.so" : "laser";
    setBase(Module.getBaseAddress(library));

    load();
    Logger.info("Running on", isAndroid ? "Android" : "iOS");
    Logger.verbose(`${library} loaded at: ${base}`);
    for (const brawlerKey in config.ownedBrawlers) {
      const brawler = config.ownedBrawlers[brawlerKey];
      for (const skin of brawler.skins) {
        config.ownedSkins.push(skin);
      }
    }
    installHooks();
    if (version == 59 && config.customSettings) setupCustomSettings();
  } catch (e) {
    console.log(e);
  }
})();
