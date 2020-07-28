import React, { FC, useEffect } from 'react';
import { TopNav } from 'components/TopNav/TopNav';
import { WideButton } from 'components/Button/WideButton';
import { Stepper } from 'components/Stepper';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { APP_ROUTES } from '../../global/AppRouter/routes';
import { useHistory } from 'react-router-dom';
import { NewsletterForm } from './NewsletterForm';
import { StickyNavigation } from '../../global/Layouts/StickyNavigation/StickyNavigation';

const MainComponent = styled.div`
  background-color: ${(props) => props.theme.colors.utils.background.mid};
  min-height: ${(props) => props.theme.contentHeight};
  padding: 32px 24px;
`;

const TextAndButtonsComponent = styled.div`
  flex-direction: column;
  display: flex;
  justify-align: center;
  align-items: center;
`;

const TextComponent = styled.div`
  text-align: left;
  font-size: 13px;
  line-height: 15px;
  margin-bottom: 32px;
`;

const TextWithMargin = styled.div`
  margin-top: 16px;
`;

const StepperStyled = styled.div`
  margin-bottom: 32px;
`;

const WideButtonStyled = styled(WideButton)`
  margin-top: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PersonaFamily: FC = () => {
  const { t } = useTranslation();
  const history = useHistory();

  useEffect(() => {
    const script = document.createElement('script');

    script.src = '//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const onNextClick = (): void => {
    history.push({
      pathname: APP_ROUTES.PERSONA_FAMILY_STEP_2,
    });
  };

  return (
    <>
      <TopNav isWithBackArrow />
      <MainComponent>
        <StepperStyled>
          <Stepper items={[1, 2, 3, 4]} current={1} mb={31} />
        </StepperStyled>
        <TextAndButtonsComponent>
          <TextComponent>
            <b>{t('PERSONA_SHARE_FAMILY')}</b>
            <TextWithMargin>{t('PERSONA_SHARE_FAMILY_TEXT_1')} </TextWithMargin>
            <b>{t('PERSONA_SHARE_FAMILY_TEXT_2')}</b>
            {t('PERSONA_SHARE_FAMILY_TEXT_3')}
            <TextWithMargin>
              <b>{t('PERSONA_SHARE_FAMILY_TEXT_4')}</b>
            </TextWithMargin>
          </TextComponent>
          <NewsletterForm />
          <WideButtonStyled onClick={onNextClick}>{t('WHAT_MORE')}</WideButtonStyled>
        </TextAndButtonsComponent>
      </MainComponent>
      <StickyNavigation />
    </>
  );
};
