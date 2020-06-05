import React, { FC } from 'react';
import styled from 'styled-components';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/lib/upload/interface';

const UploadWrapper = styled.div`
  display: flex;
  margin: 20px 0;
`;

type UploadAssetsProps = {
  onAddFile(file: File): void;
  onRemoveFile(file: UploadFile): void;
};

export const UploadAssets: FC<UploadAssetsProps> = ({ onAddFile, onRemoveFile }: UploadAssetsProps) => (
  <UploadWrapper>
    <Upload
      customRequest={(options) => {
        onAddFile(options.file);
      }}
      progress={{
        successPercent: 100,
        status: 'success',
        showInfo: false,
      }}
      previewFile={(file) => {
        return Promise.resolve(file.type);
      }}
      onRemove={(file) => {
        onRemoveFile(file);
      }}
    >
      <Button>
        <UploadOutlined /> Upload
      </Button>
    </Upload>
  </UploadWrapper>
);
