import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { Upload as UploadAnt, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/lib/upload/interface';
import { v4 } from 'uuid';

const Upload = styled(UploadAnt)`
  width: 100%;
`;

const UploadWrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 20px 0;
`;

type UploadAssetsProps = {
  onAddFile(file: File): void;
  onRemoveFile(file: UploadFile): void;
};

export const UploadAssets: FC<UploadAssetsProps> = ({ onAddFile, onRemoveFile }: UploadAssetsProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  return (
    <UploadWrapper>
      <Upload
        listType="picture"
        fileList={fileList}
        customRequest={(options) => {
          onAddFile(options.file);
          const url = URL.createObjectURL(options.file);
          const fileObj: UploadFile = {
            size: options.file.size,
            type: options.file.type,
            uid: v4(),
            name: options.file.name,
            status: 'done',
            url,
            thumbUrl: url,
          };
          setFileList(fileList.concat([fileObj]));
        }}
        progress={{
          successPercent: 100,
        }}
        previewFile={(file) => {
          return Promise.resolve(file.type);
        }}
        onRemove={(file) => {
          setFileList(fileList.filter((fileToRemove) => fileToRemove.uid !== file.uid));
          onRemoveFile(file);
          if (file.url) {
            URL.revokeObjectURL(file.url);
          }
        }}
      >
        <Button>
          <UploadOutlined /> Upload
        </Button>
      </Upload>
    </UploadWrapper>
  );
};
