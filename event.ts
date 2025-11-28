interface LogicGemOffer {
  id: number;
  amount: number;
  csvID: number[];
  skinID: number;
}

interface ChronosFileEntry {
  scName: string;
  scFile: string;
}

interface ChampionShipInfo {
  maxWins: number;
  chronosTextEntry: string;
  logicGemOffer: LogicGemOffer;
  chronosFileEntry: ChronosFileEntry;
}

interface Event {
  slot: number;
  timeToEnd: number;
  tokens: number;
  mapID: number;
  claimedTokens: number[];
  championShipInfo?: ChampionShipInfo;
}

