import { getDocumentsDirectory } from "./util.js";

export let Offsets: Record<string, string>;

export function getOffsetsFromJSON(): number {
  const data = File.readAllText(getDocumentsDirectory() + "/version.json");
  const raw = JSON.parse(data);
  const offsets = raw.offsets;
  //console.log(JSON.stringify(offsets));
  Offsets = Object.fromEntries(
    Object.entries(offsets).map(([k, v]) => [k, String(v)]),
  );
  return raw.version;
}
