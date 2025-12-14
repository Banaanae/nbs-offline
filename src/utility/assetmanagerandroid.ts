// gud <3

export let gAssetManager: AssetManager | null = null;

export async function createAssetManager() {
  return new Promise<void>((resolve) => {
    gAssetManager = new AssetManager(() => resolve());
  });
}

export class AssetManager {
  assetManagerPtr: NativePointer | null = null;
  AAssetManager_open_hook: InvocationListener | null = null;

  constructor(onReady: () => void) {
    const self = this;
    this.AAssetManager_open_hook = Interceptor.attach(
      Module.getExportByName("libandroid.so", "AAssetManager_open"),
      {
        onEnter(args) {
          if (self.assetManagerPtr === null) {
            self.assetManagerPtr = args[0];
            if (self.AAssetManager_open_hook) {
              self.AAssetManager_open_hook.detach();
            }
            onReady();
          }
        },
      },
    );
  }

  readFromAssets(assetName: string): string | null {
    if (!this.assetManagerPtr) return null;

    const AAssetManager_open = new NativeFunction(
      Module.getExportByName("libandroid.so", "AAssetManager_open"),
      "pointer",
      ["pointer", "pointer", "int"],
    );

    const AAsset_getLength = new NativeFunction(
      Module.getExportByName("libandroid.so", "AAsset_getLength"),
      "int",
      ["pointer"],
    );

    const AAsset_read = new NativeFunction(
      Module.getExportByName("libandroid.so", "AAsset_read"),
      "int",
      ["pointer", "pointer", "int"],
    );

    const AAsset_close = new NativeFunction(
      Module.getExportByName("libandroid.so", "AAsset_close"),
      "void",
      ["pointer"],
    );

    const filename = Memory.allocUtf8String(assetName);
    const asset = AAssetManager_open(this.assetManagerPtr, filename, 2);
    if (asset.isNull()) return null;

    const length = AAsset_getLength(asset);
    const buffer = Memory.alloc(length);
    AAsset_read(asset, buffer, length);
    AAsset_close(asset);

    return buffer.readUtf8String(length);
  }
}
