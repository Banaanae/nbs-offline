// This is a simple tool to dump structure

import { base } from "../definitions";
import { GlobalID } from "../globalid";
import { Offsets } from "../offsets";

export class Dumper {
  // hooks
  writeDataReference: InvocationListener | undefined = undefined;
  writeVInt: InvocationListener | undefined = undefined;
  writeInt: InvocationListener | undefined = undefined;
  writeBoolean: InvocationListener | undefined = undefined;
  writeLongLong: InvocationListener | undefined = undefined;
  writeString: InvocationListener | undefined = undefined;

  /**
   * @param offset Offset of the encode function
   */
  dump(offset: NativePointer) {
    const addr = base.add(offset);
  }

  hookWrites() {
    this.writeDataReference = Interceptor.attach(
      base.add(Offsets.WriteDataReference),
      {
        onEnter(args) {
          const globalID = args[1].add(Offsets.GlobalID).readInt();
          const classID = GlobalID.getClassID(globalID);
          const instanceID = GlobalID.getInstanceID(globalID);
        },
      },
    );
  }
}
