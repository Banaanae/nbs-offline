import { Brawler } from "./brawler.js";
import { configPath } from "./definitions.js";
import { getDefaultConfig } from "./util.js";

export class Config {
    name = "Natesworks";
    coins = 0;
    gems = 0;
    starpoints = 0;
    experienceLevel = 0;
    experience = 0;
    namecolor = 0;
    thumbnail = 0;
    trophyRoadTier = 0;
    tokens = 0;
    tokenDoublers = 0;
    trioWins = 0;
    soloWins = 0;
    duoWins = 0;
    challengeWins = 0;
    selectedBrawlers = [0, 1, 2];
    enableShop = false;
    enableBrawlPass = false;
    lobbyinfo = "";
    enableClubs = false;
    brawlPassPremium = true;
    ownedBrawlers: Record<number, Brawler> = [];
    disableBots = false;
    infiniteAmmo = false;
    infiniteSuper = false;
    china = false;
    artTest = false;
    customLoadingScreen = true;
    debugMenu = true;
}
export function tryLoadDefaultConfig() {
    try {
        File.readAllText(configPath);
        return;
    } catch (e) { }
    const defaultConfig = getDefaultConfig();
    //console.log(defaultConfig);
    File.writeAllText(configPath, JSON.stringify(defaultConfig, null, 2));
}

export function readConfig() {
    tryLoadDefaultConfig();
    const json = JSON.parse(File.readAllText(configPath));
    const config = new Config();

    config.coins = json.coins;
    config.gems = json.gems;
    config.starpoints = json.starpoints;
    config.experienceLevel = json.level;
    config.experience = json.experience;
    config.namecolor = json.namecolor;
    config.thumbnail = json.thumbnail;
    config.trophyRoadTier = json["trophyRoadTier"];
    config.selectedBrawlers = json.selectedBrawlers;
    config.tokens = json.tokens;
    config.tokenDoublers = json.tokenDoublers;
    config.trioWins = json["3v3Victories"]; // cant use . cuz names with numbers are invalid thats also why i named it trio victories
    config.soloWins = json.soloVictories;
    config.duoWins = json.duoVictories;
    config.challengeWins = json.mostChallengeWins;
    config.lobbyinfo = json.lobbyinfo;
    config.enableBrawlPass = json.enableBrawlPass == null ? false : json.enableBrawlPass;
    config.enableShop = json.enableShop == null ? false : json.enableShop;
    config.enableClubs = json.enableClubs == null ? false : json.enableClubs;
    config.brawlPassPremium = json.brawlPassPremium == null ? true : json.brawlPassPremium;
    config.disableBots = json.disableBots == null ? false : json.disableBots;
    config.infiniteAmmo = json.infiniteAmmo == null ? false : json.infiniteAmmo;
    config.infiniteSuper = json.infiniteSuper == null ? false : json.infiniteSuper;
    config.china = json.china == null ? false : json.china;
    config.name = json.name == null ? "Natesworks" : json.name;
    config.artTest = json.artTest == null ? false : json.artTest;
    config.customLoadingScreen = json.customLoadingScreen == null ? true : json.customLoadingScreen;
    config.debugMenu = json.debugMenu == null ? true : json.debugMenu;
    for (const [id, brawler] of Object.entries(json.unlockedBrawlers as Record<string, any>)) {
        config.ownedBrawlers[Number(id)] = new Brawler(
            brawler.cardID,
            brawler.skins,
            brawler.trophies,
            brawler.highestTrophies,
            brawler.powerlevel,
            brawler.powerpoints,
            brawler.state,
            brawler.masteryPoints,
            brawler.masteryClaimed
        );
    }

    return config;
}