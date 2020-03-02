import { storage } from 'firebase';

export enum AssetType {
  CARD_AVATAR = 'CARD_AVATAR',
  CARD_BACKGROUND = 'CARD_BACKGROUND',
  PAGE_AVATAR = 'PAGE_AVATAR',
  PAGE_BACKGROUND = 'PAGE_BACKGROUND',
}

export type AssetWithBlob = {
  name: string;
  metaData?: storage.SettableMetadata;
  blob: Blob;
};

export type AssetBlob = Pick<AssetWithBlob, 'name' | 'metaData'> & {
  blob: Blob | null;
};

type UploadedAsset = {
  url: string;
  assetType: AssetType;
};

export const uploadAssets = async (
  storageRef: storage.Reference,
  dir: string,
  assets: AssetBlob[]
): Promise<UploadedAsset[]> => {
  const filteredAssets = assets.filter(asset => asset.blob !== null) as AssetWithBlob[];
  return await Promise.all<UploadedAsset>(
    filteredAssets.map(asset =>
      storageRef
        .child(`${dir}/${asset.name}`)
        .put(asset.blob, asset.metaData)
        .then(ref => ref.ref.getDownloadURL())
        .then(
          url =>
            ({
              url,
              assetType: asset.metaData?.customMetadata?.assetType,
            } as UploadedAsset)
        )
    )
  );
};

export const getUrl = (assets: UploadedAsset[], assetType: AssetType) =>
  assets.filter(asset => asset.assetType === assetType).map(entry => entry.url)[0] || '';
