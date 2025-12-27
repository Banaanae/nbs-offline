import { getDocumentsDirectory } from "./util.js";
import { version } from 'version'

export let Offsets: Record<string, string>;

export function getOffsetsFromJSON(): number {
  // const data = File.readAllText(getDocumentsDirectory() + "/version.json");
  // const raw = JSON.parse(raw);
  const offsets = version.offsets;
  //console.log(JSON.stringify(offsets));
  Offsets = Object.fromEntries(
    Object.entries(offsets).map(([k, v]) => [k, String(v)]),
  );
  return version.gmv;
}
