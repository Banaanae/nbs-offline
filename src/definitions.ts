import { Config, readConfig, tryLoadDefaultConfig } from "./config.js";
import { getOffsetsFromJSON, Offsets } from "./offsets.js";
import { isAndroid } from "./platform.js";
import { Player } from "./player.js";
import { getDocumentsDirectory, getPackageName } from "./util.js";
import { Logger } from "./utility/logger.js";

export let base = NULL;

export const libc = isAndroid
  ? Process.getModuleByName("libc.so")
  : Process.getModuleByName("libSystem.B.dylib");

export const malloc = new NativeFunction(
  libc.getExportByName("malloc"),
  "pointer",
  ["uint"],
);

export let player = new Player();
export let documentsDirectory: string;
export let configPath: string;
export let config: Config;
export let pkgName: string;
export let botNames: string[];

export let createMessageByType: any;
export let operator_new: any;
export let messageManagerReceiveMessage: any;
export let stringCtor: any;
export let messagingSend: any;
export let stageAddChild: any;
export let setTextAndScaleIfNecessary: any;
export let getString: any;
export let getDataByID: any;

export function load() {
  if (isAndroid) {
    pkgName = getPackageName();
    Logger.verbose("Package name:", pkgName);
  }
  getOffsetsFromJSON();

  createMessageByType = new NativeFunction(
    base.add(Offsets.CreateMessageByType),
    "pointer",
    ["pointer", "int"],
  );
  operator_new = new NativeFunction(base.add(Offsets.OperatorNew), "pointer", [
    "uint",
  ]);
  messageManagerReceiveMessage = new NativeFunction(
    base.add(
      isAndroid
        ? Offsets.MessageManagerReceiveMessage
        : Offsets.MessageManagerReceiveMessageThunk,
    ),
    "int",
    ["pointer", "pointer"],
  );
  stringCtor = new NativeFunction(
    base.add(Offsets.StringConstructor),
    "pointer",
    ["pointer", "pointer"],
  );
  messagingSend = new NativeFunction(base.add(Offsets.Send), "bool", [
    "pointer",
    "pointer",
  ]);
  setTextAndScaleIfNecessary = new NativeFunction(
    base.add(Offsets.SetTextAndScaleIfNecessary),
    "void",
    ["pointer", "pointer", "bool", "bool"],
  );
  getString = new NativeFunction(
    base.add(
      isAndroid
        ? Offsets.StringTableGetString
        : Offsets.StringTableGetStringThunk,
    ),
    "pointer",
    ["pointer"],
  );
  getDataByID = new NativeFunction(
    base.add(
      isAndroid
        ? Offsets.LogicDataTablesGetDataByID
        : Offsets.LogicDataTablesGetDataByIDThunk,
    ),
    "pointer",
    ["int"],
  );

  documentsDirectory = getDocumentsDirectory();
  configPath = documentsDirectory + "/config.json";
  config = readConfig();
  player.applyConfig(config);
}

export function setBase(ptr: NativePointer) {
  base = ptr;
}

export const credits = `NBS Offline

Made by Natesworks 
Discord: dsc.gg/nbsoffline

SPECIAL THANKS TO

S.B:
- Making an amazing guide on reverse engineering/making Brawl Stars Offline
- Answering my questions when I didn't understand something

xXCooBloyXx:
- Telling me how to get some of the required offsets for sendOfflineMessage

kubune:
- Player profile message 
- Ranked reputation
- Helping me when I'm an idiot

banaanae:
- Draft map limit config option allowing for more maps
`;

export function setBotNames(x: string[]) {
  botNames = x;
}
