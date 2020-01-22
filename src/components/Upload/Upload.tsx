/**
 *  This is an example component to test uploading from Storage provider
 */

import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { useStorage } from '../../global/Storage';
import { OnStateChange } from '../../global/Storage/Storage';

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
  width: 100%;
`;

export const Upload: FC = () => {
  const { upload } = useStorage();
  const [disabled, setDisabled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imgSrc, setImgSrc] = useState('');

  const onUploadStateChange: OnStateChange = result => {
    if (result.status === 'running') {
      setDisabled(true);
    }

    if (result.status === 'success' && result.downloadUrl) {
      setDisabled(false);
      setImgSrc(result.downloadUrl);
    }

    setProgress(result.progress);
  };

  const handleChange = (fileList: FileList | null): void => {
    if (fileList && fileList[0]) {
      upload(fileList[0].name, fileList[0], {}, onUploadStateChange);
    }
  };

  return (
    <Wrapper>
      <progress max={100} value={progress} />
      <input
        type="file"
        onChange={e => handleChange(e.target.files)}
        multiple={false}
        disabled={disabled}
        accept="images"
      />
      {imgSrc && (
        <div>
          <Image src={imgSrc} />
        </div>
      )}
    </Wrapper>
  );
};
