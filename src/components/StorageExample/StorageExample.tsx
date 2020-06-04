/**
 *  This is an example component to test uploading from Storage provider
 */

import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { useStorage } from '../../global/Storage';
import { OnStateChange, StorageItem } from '../../global/Storage/namespace';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > * {
    margin-top: 20px;
  }
`;

const Image = styled.img`
  width: 64px;
`;

const dirName = 'persona';

export const StorageExample: FC = () => {
  const { upload, remove, list } = useStorage();
  const [disabled, setDisabled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [items, setItems] = useState<StorageItem[]>([]);

  const fetchItems = (): void => {
    list(dirName).then((result) => {
      if (result.items) {
        setItems(result.items);
      }
    });
  };

  const onUploadStateChange: OnStateChange = (result) => {
    if (result.status === 'running') {
      setDisabled(true);
    }

    if (result.status === 'success' && result.downloadUrl && result.refPath) {
      setDisabled(false);
      fetchItems();
    }

    setProgress(result.progress);
  };

  const handleChange = (fileList: FileList | null): void => {
    if (fileList && fileList[0]) {
      upload(`${dirName}/${fileList[0].name}`, fileList[0], onUploadStateChange);
    }
  };

  const handleRemove = async (path: string): Promise<void> => {
    await remove(path);
    fetchItems();
  };

  return (
    <Wrapper>
      <progress max={100} value={progress} />
      <input
        type="file"
        onChange={(e) => handleChange(e.target.files)}
        multiple={false}
        disabled={disabled}
        accept="images"
      />
      {items && (
        <div>
          {items.map((item) => (
            <div key={item.downloadUrl}>
              <Image src={item.downloadUrl} />
              <button onClick={(_e) => handleRemove(item.refPath || '')}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </Wrapper>
  );
};
