import React, { FC, memo, ReactElement, Fragment } from 'react';
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

const roadmap: RoadMapElementPayload[] = [
  {
    text: 'Insert anything you want',
    childrenPosition: 'right',
    svgLink: SocialMediaMarketing,
  },
  {
    text: 'Share easily and rapidly with anyone',
    childrenPosition: 'left',
    svgLink: QrImg,
  },
  {
    text: 'Create your own recommendation net',
    childrenPosition: 'right',
    svgLink: SchemeImg,
  },
  {
    text: 'be prepared for any situation',
    childrenPosition: 'left',
    svgLink: CameraImg,
  },
  {
    text: 'Achieve your business and personal goals',
    childrenPosition: 'right',
    svgLink: PaymentImg,
  },
];

const RoadMap: FC = () => (
  <RoadMapWrapper>
    {roadmap.map<ReactElement>(({ svgLink, text, childrenPosition }, index) => (
      <Fragment key={uniqueId('roadMapElement')}>
        <RoadMapElement svgLink={svgLink} childrenPosition={childrenPosition}>
          <TextUppercase>{text}</TextUppercase>
        </RoadMapElement>
        {roadmap[index + 1] && <ElementConnector key={uniqueId('roadMapElement2')} />}
      </Fragment>
    ))}
  </RoadMapWrapper>
);

export default memo(RoadMap);
