import React, { FC, memo } from 'react';
import ShareQrCode from 'assets/ShareQrCode.svg';
import styled from 'styled-components';

const ShareQr = styled.div`
  margin-top: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  flex-direction: column;
`;

const ShareQrIcon = styled.img`
  padding-right: 12px;
`;

const TextInShare = styled.div`
  ${(props) => props.theme.typography.subtitle2};
  margin-bottom: 20px;
`;

const LinkStyled = styled.a`
  color: ${(props) => props.theme.colors.utils.text.dark};
  ${(props) => props.theme.typography.subtitle2}
  text-decoration: none;
`;

type ShareQrComponentProps = {
  qrCodeLink?: string;
};

const ShareQrComponent: FC<ShareQrComponentProps> = memo<ShareQrComponentProps>(({ qrCodeLink }) => (
  <ShareQr>
    <img src={qrCodeLink} alt="QrCode Icon" />
    <TextInShare>
      <ShareQrIcon src={ShareQrCode} alt="Share Qr Code" />
      <LinkStyled href={qrCodeLink} download="output.png">
        Share your QR
      </LinkStyled>
    </TextInShare>
  </ShareQr>
));

ShareQrComponent.displayName = 'ShareQrComponent';

export { ShareQrComponent };
