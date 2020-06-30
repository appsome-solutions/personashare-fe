import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { APP_ROUTES } from 'global/AppRouter/routes';
import { PageWrapperSpaceBetween } from 'components/PageWrapper';
import { InfoCard } from 'components/InfoCard/InfoCard';
import { WideButton } from 'components/Button';
import { Stepper } from 'components/Stepper';
import { TopNav } from 'components/TopNav/TopNav';
import { SpotAndPersona } from 'components/CreateSpotAndPersona/SpotAndPersonaProps';
import ContentImg from 'assets/ContentImg.svg';
import QrImg from 'assets/QrImg.svg';
import TeamImg from 'assets/TeamImg.svg';
import GpsImg from 'assets/GpsImg.svg';
import SchemeImg from 'assets/SchemeImg.svg';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const WideButtonStyled = styled(WideButton)`
  margin-top: 46px;
`;
export const InitialStep: FC = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const onNextClick = useCallback((): void => {
    history.push({
      pathname: APP_ROUTES.PERSONA_CREATION_STEP_2,
    });
  }, [history]);

  return (
    <div>
      <TopNav isWithBackArrow />
      <PageWrapperSpaceBetween>
        <div>
          <Stepper items={[1, 2, 3]} current={1} mb={31} />
          <InfoCard title={`${t('CREATION_STEP_1_PERSONA_TOP_TAB_HEADING')}`}>
            {t('CREATION_STEP_1_PERSONA_TOP_TAB')}
          </InfoCard>
        </div>
        <SpotAndPersona
          svgLink={ContentImg}
          title={t('CREATION_STEP_1_PERSONA_TAB_1_TITLE')}
          content={t('CREATION_STEP_1_PERSONA_TAB_1')}
        />
        <SpotAndPersona
          svgLink={QrImg}
          title={t('CREATION_STEP_1_PERSONA_TAB_2_TITLE')}
          content={t('CREATION_STEP_1_PERSONA_TAB_2')}
        />
        <SpotAndPersona
          svgLink={TeamImg}
          title={t('CREATION_STEP_1_PERSONA_TAB_3_TITLE')}
          content={t('CREATION_STEP_1_PERSONA_TAB_3')}
        />
        <SpotAndPersona
          svgLink={GpsImg}
          title={t('CREATION_STEP_1_PERSONA_TAB_4_TITLE')}
          content={t('CREATION_STEP_1_PERSONA_TAB_4')}
        />
        <SpotAndPersona
          svgLink={SchemeImg}
          title={t('CREATION_STEP_1_PERSONA_TAB_5_TITLE')}
          content={t('CREATION_STEP_1_PERSONA_TAB_5')}
        />
        <WideButtonStyled onClick={onNextClick}>{t('CREATION_STEP_1_PERSONA_NEXT_STEP')}</WideButtonStyled>
      </PageWrapperSpaceBetween>
    </div>
  );
};
