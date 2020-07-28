import React, { FC } from 'react';
import { NavLink, Router, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { APP_ROUTES } from 'global/AppRouter/routes';
import { PageWrapperSpaceBetween } from 'components/PageWrapper';
import { InfoCard } from 'components/InfoCard/InfoCard';
import { WideButton } from 'components/Button';
import { Stepper } from 'components/Stepper';
import { TopNav } from 'components/TopNav/TopNav';
import { SpotAndPersona } from 'components/CreateSpotAndPersona/SpotAndPersonaProps';
import ContentImg from 'assets/ContentImg.svg';
import TeamImg from 'assets/TeamImg.svg';
import EyeImg from 'assets/EyeImg.svg';
import SchemeImg from 'assets/SchemeImg.svg';
import CustomImg from 'assets/CustomImg.svg';
import { useTranslation } from 'react-i18next';
import { StickyNavigation } from '../../global/Layouts/StickyNavigation/StickyNavigation';

const InformationUnderText = styled(InfoCard)`
  margin: 40px 0 46px 0;
`;

const TextInInfo = styled.p`
  ${(props) => props.theme.typography.subtitle2};
  white-space: pre-wrap;
`;

const ContactUs = styled(NavLink)`
  ${(props) => props.theme.typography.subtitle2};
  margin-left: 4px;
  color: ${(props) => props.theme.colors.main.primary};
  text-decoration: underline;
`;

export const CreateSpotsStep1: FC = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const onNextClick = (): void => {
    history.push({
      pathname: APP_ROUTES.SPOT_CREATION_STEP_2,
    });
  };

  return (
    <div>
      <TopNav isWithBackArrow />
      <PageWrapperSpaceBetween>
        <div>
          <Stepper items={[1, 2, 3]} current={1} mb={31} />
          <InfoCard title={`${t('CREATION_STEP_1_SPOT_TOP_TAB_HEADING')}`}>
            {t('CREATION_STEP_1_SPOT_TOP_TAB')}
          </InfoCard>
        </div>
        <SpotAndPersona
          svgLink={ContentImg}
          title={t('CREATION_STEP_1_SPOT_TAB_1_TITLE')}
          content={t('CREATION_STEP_1_SPOT_TAB_1')}
        />
        <SpotAndPersona
          svgLink={CustomImg}
          title={t('CREATION_STEP_1_SPOT_TAB_2_TITLE')}
          content={t('CREATION_STEP_1_SPOT_TAB_2')}
        />
        <SpotAndPersona
          svgLink={TeamImg}
          title={t('CREATION_STEP_1_SPOT_TAB_3_TITLE')}
          content={t('CREATION_STEP_1_SPOT_TAB_3')}
        />
        <SpotAndPersona
          svgLink={EyeImg}
          title={t('CREATION_STEP_1_SPOT_TAB_4_TITLE')}
          content={t('CREATION_STEP_1_SPOT_TAB_4')}
        />
        <SpotAndPersona
          svgLink={SchemeImg}
          title={t('CREATION_STEP_1_SPOT_TAB_5_TITLE')}
          content={t('CREATION_STEP_1_SPOT_TAB_5')}
        />
        <InformationUnderText title="">
          <TextInInfo>
            {t('CREATION_STEP_1_SPOT_LIMITATIONS_TAB')}
            <ContactUs to={APP_ROUTES.CONTACT}>{t('CREATION_STEP_1_SPOT_CONTACT_US')}</ContactUs>
          </TextInInfo>
        </InformationUnderText>
        <WideButton onClick={onNextClick}>{t('CREATION_STEP_1_SPOT_NEXT_STEP')}</WideButton>
      </PageWrapperSpaceBetween>
      <StickyNavigation />
    </div>
  );
};
