import React, { FC } from 'react';
import { TopNav } from 'components/TopNav/TopNav';
import { WideButton } from 'components/Button/WideButton';
import { Stepper } from 'components/Stepper';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { APP_ROUTES } from '../../global/AppRouter/routes';
import { useHistory } from 'react-router-dom';
import { InputWithSuffixIcon } from '../../components/InputWithSuffixIcon/InputWithSuffixIcon';
import EmailIconSvg from 'assets/email.svg';

const MainComponent = styled.div`
  background-color: ${(props) => props.theme.colors.utils.background.mid};
  min-height: ${(props) => props.theme.contentHeight};
  padding: 32px 24px 0 24px;
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
`;

const TextWithMargin = styled.div`
  margin-top: 16px;
`;

const TextWithRightMargin = styled.div`
  margin-right: 2px;
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

const InputField = styled.input`
  margin-top: 32px;
  width: 100%;
  height: 36px;
  ${(props) => props.theme.typography.caption}
  padding:12px;
`;

const CheckBoxStyledWithText = styled.div`
  display: flex;
  text-align: left;
  padding-top: 14px;
  margin-bottom: 36px;
`;

const TextInCheckBoxDiv = styled.div`
  margin-left: 8px;
`;

const CheckBoxStyled = styled.input`
  && {
    align-self: start;
    margin-top: 8px;

    .ant-checkbox {
      margin: 8px 8px 8px 0;
    }
  }
`;

const InputButtonStyled = styled.input`
  width: 100%;
  && {
    color: ${(props) => props.theme.colors.utils.text.light};
    background-color: ${(props) => props.theme.colors.main.primary};
    height: 36px;
    cursor: pointer;
    border-radius: 4px;
    padding: 8px 0;
    border-width: 0;

    &&:disabled {
      cursor: not-allowed;
      background-color: ${(props) => props.theme.colors.functional.disabled};
    }
    &&:active,
    &&:hover {
      color: ${(props) => props.theme.colors.utils.text.light};
    }
  }
`;

export const PersonaFamily: FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
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
          <div id="mc_embed_signup">
            <form
              action="https://personashare.us19.list-manage.com/subscribe/post?u=01f2d8ab4101619d0906d8e99&amp;id=040e730107"
              method="post"
              id="mc-embedded-subscribe-form"
              name="mc-embedded-subscribe-form"
              className="validate"
              target="_blank"
              noValidate
            >
              <div id="mc_embed_signup_scroll">
                <div className="mc-field-group">
                  <InputField
                    type="email"
                    value=""
                    name="EMAIL"
                    className="required email"
                    id="mce-EMAIL"
                    placeholder={t('PERSONA_SHARE_BUTTON_PLACEHOLDER')}
                  />
                </div>
                <CheckBoxStyledWithText className="mc-field-group input-group">
                  <CheckBoxStyled type="checkbox" value="1" placeholder="email" />
                  <TextInCheckBoxDiv>
                    {t('PERSONA_SHARE_REGULATIONS_TEXT_1')}
                    {t('PERSONA_SHARE_REGULATIONS_TEXT_2')}
                    {t('PERSONA_SHARE_REGULATIONS_TEXT_3')}
                  </TextInCheckBoxDiv>
                </CheckBoxStyledWithText>
                <div id="mce-responses" className="clear">
                  <div className="response" id="mce-error-response" />
                  <div className="response" id="mce-success-response" />
                </div>
                <div className="clear">
                  <InputButtonStyled
                    type="submit"
                    value={`${t('JOIN_TO_NEWSLETTER')}`}
                    name="subscribe"
                    id="mc-embedded-subscribe"
                    className="button"
                  />
                </div>
              </div>
            </form>
          </div>
          <WideButtonStyled onClick={onNextClick}>{t('WHAT_MORE')}</WideButtonStyled>
        </TextAndButtonsComponent>
      </MainComponent>
    </>
  );
};
