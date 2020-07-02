import React, { FC, memo, ReactElement, Fragment, useMemo } from 'react';
import { uniqueId } from 'lodash';
import styled from 'styled-components';

import SocialMediaMarketing from 'assets/social-media-marketing.svg';
import QrImg from 'assets/QrImg.svg';
import SchemeImg from 'assets/SchemeImg.svg';
import CameraImg from 'assets/camera.svg';
import PaymentImg from 'assets/payment.svg';

import RoadMapElement, { RoadMapElementProps } from './RoadMapElement';
import { TextUppercase } from '../TextUppercase';
import { ElementConnector } from './ElementConnector';
import { useTranslation } from 'react-i18next';

type RoadMapElementPayload = RoadMapElementProps & {
  text: string;
};

const RoadMapWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const RoadMap: FC = () => {
  const { t } = useTranslation();
  const roadMap: RoadMapElementPayload[] = useMemo(
    () => [
      {
        text: t('INSERT_ANYTHING'),
        childrenPosition: 'right',
        svgLink: SocialMediaMarketing,
      },
      {
        text: t('SHARE_EASILY'),
        childrenPosition: 'left',
        svgLink: QrImg,
      },
      {
        text: t('CREATE_YOUR_OWN'),
        childrenPosition: 'right',
        svgLink: SchemeImg,
      },
      {
        text: t('BE_PREPARED'),
        childrenPosition: 'left',
        svgLink: CameraImg,
      },
      {
        text: t('ACHIEVE_YOUR'),
        childrenPosition: 'right',
        svgLink: PaymentImg,
      },
    ],
    [t]
  );

  return (
    <RoadMapWrapper>
      {roadMap.map<ReactElement>(({ svgLink, text, childrenPosition }, index) => (
        <Fragment key={uniqueId('roadMapElement')}>
          <RoadMapElement svgLink={svgLink} childrenPosition={childrenPosition}>
            <TextUppercase>{text}</TextUppercase>
          </RoadMapElement>
          {roadMap[index + 1] && <ElementConnector key={uniqueId('roadMapElement2')} />}
        </Fragment>
      ))}
    </RoadMapWrapper>
  );
};

export default memo(RoadMap);
