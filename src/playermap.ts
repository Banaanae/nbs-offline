import { ByteStream } from "./bytestream";

export class PlayerMap {
  id: number[] = [0, 1];
  name: string;
  gmv: number;
  theme: number;
  data: number[] = [];
  accountID: number[] = [0, 1];
  mapEnvironmentData = 0;
  avatarName = "";

  constructor(name: string, gmv: number, theme: number) {
    this.name = name;
    this.gmv = gmv;
    this.theme = theme;
  }

  encode(stream: ByteStream): ByteStream {
    stream.writeVlong(this.id[0], this.id[1]);
    stream.writeString(this.name);
    stream.writeVint(this.gmv);
    stream.writeDataReference({ high: 54, low: this.mapEnvironmentData });
    if (this.data.length > 0) stream.writeBytes(this.data, this.data.length);
    else stream.writeInt(-1);
    stream.writeVlong(this.accountID[0], this.accountID[1]);
    stream.writeString(this.avatarName);
    stream.writeVint(1); // state
    stream.writeLong(0, 0); // update time since epoch
    stream.writeVint(0);
    stream.writeVint(0); // friendly signoff count
    stream.writeVint(0); // likes
    stream.writeVint(0); // dislikes
    stream.writeVint(0);

    return stream;
  }
}
