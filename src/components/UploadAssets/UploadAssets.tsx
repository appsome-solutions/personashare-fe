import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { Upload as UploadAnt, Button, message } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import { v4 } from 'uuid';
import UploadImg from 'assets/backup-24px.svg';
import UploadImageImg from 'assets/upload-img.svg';

import { Icon } from '../Icon';

const MAXIMUM_FILE_SIZE = 10; //in MBs
const MAXIMUM_FILES = 5;

const Upload = styled(UploadAnt)`
  width: 100%;

  &&& {
    .ant-upload {
      width: 100%;
    }

    .ant-btn {
      height: 36px;
      width: 100%;
      display: flex;
      align-items: center;
    }

    .ant-upload-list-item-thumbnail img {
      object-fit: contain;
    }

    .ant-upload-list-picture .ant-upload-list-item {
      background-color: ${(props) => props.theme.colors.utils.background.light};
    }
  }
`;

const ButtonText = styled.span`
  margin-left: 45px;
`;

const UploadWrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 20px 0;
`;

export type UploadAssetsProps = {
  onAddFile?: (file: File) => void;
  onRemoveFile?: (file: UploadFile) => void;
  asImageUpload?: boolean;
  asPreview?: boolean;
  assetsList?: UploadFile[];
};

export const UploadAssets: FC<UploadAssetsProps> = ({
  onAddFile,
  onRemoveFile,
  asImageUpload = false,
  asPreview = false,
  assetsList = [],
}: UploadAssetsProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>(assetsList);

  return (
    <UploadWrapper>
      <Upload
        disabled={asPreview}
        accept={asImageUpload ? 'image/*' : '*'}
        listType="picture"
        fileList={fileList}
        beforeUpload={(file) => {
          const isLessThan10MB = file.size / 1024 / 1024 < MAXIMUM_FILE_SIZE;
          const maximumFilesExceed = fileList.length + 1 > MAXIMUM_FILES;

          if (!isLessThan10MB) {
            message.error(`File must smaller than ${MAXIMUM_FILE_SIZE}MB!`);
          }

          if (maximumFilesExceed) {
            message.error(`You cant upload more than ${MAXIMUM_FILES} files!`);
          }

          return isLessThan10MB && !maximumFilesExceed;
        }}
        customRequest={(options) => {
          onAddFile?.(options.file);
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
        onRemove={(file) => {
          setFileList(fileList.filter((fileToRemove) => fileToRemove.uid !== file.uid));
          onRemoveFile?.(file);
          if (file.url) {
            URL.revokeObjectURL(file.url);
          }
        }}
      >
        {!asPreview && (
          <Button>
            <Icon svgLink={asImageUpload ? UploadImageImg : UploadImg} />
            <ButtonText>{asImageUpload ? 'Image' : 'File'} upload</ButtonText>
          </Button>
        )}
      </Upload>
    </UploadWrapper>
  );
};
