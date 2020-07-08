import React, { FC, useEffect } from 'react';
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

const InputField = styled.input`
  width: 100%;
  height: 36px;
  ${(props) => props.theme.typography.caption}
  padding:12px;
  background: ${(props) => props.theme.colors.utils.background.light};
  border: 1px solid ${(props) => props.theme.colors.utils.border.mid};
  box-sizing: border-box;
  border-radius: 4px;
`;

const CheckBoxComponent = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  padding-top: 14px;
  margin-bottom: 36px;
  .ant-checkbox {
    margin: 8px 8px 8px 0;
  }
  .mce_inline_error {
    background-color: ${(props) => props.theme.colors.utils.background.mid} !important;
    color: red !important;
    margin: 0 !important;
    padding-left: 0 !important;
    font-weight: normal !important;
  }
`;

const CheckboxWithText = styled.div`
  flex-direction: row;
  display: flex;
`;

const TextInCheckBoxDiv = styled.div`
  margin-left: 8px;
`;

const CheckBoxStyled = styled.input`
  && {
    flex-direction: column;
    align-self: start;
    margin-top: 8px;
  }
`;

const InputButtonStyled = styled.input`
  && {
    color: ${(props) => props.theme.colors.utils.text.light};
    background-color: ${(props) => props.theme.colors.main.primary};
    height: 36px;
    cursor: pointer;
    border-radius: 4px;
    padding: 8px 0;
    border-width: 0;
    width: 100%;
    &&:disabled {
      cursor: not-allowed;
      background-color: ${(props) => props.theme.colors.functional.disabled};
      border: 1px solid ${(props) => props.theme.colors.utils.border.mid};
    }
    :hover,
    :active {
      border: 1px solid ${(props) => props.theme.colors.utils.border.mid} !important;
    }
  }
`;

const InputWrapper = styled.div`
  &&& {
    #mc_embed_signup,
    #mc-embedded-subscribe-form,
    div.mce_inline_error {
      background-color: ${(props) => props.theme.colors.utils.background.mid} !important;
      color: red !important;
      margin: 0 !important;
      padding-left: 0 !important;
      font-weight: normal !important;
    }
    input.mce_inline_error {
      border: 1px solid red !important;
    }
  }
  position: relative;
`;

const ResponseDisplayNone = styled.div`
  display: none;
`;

const EmailIconStyled = styled.img`
  position: absolute;
  top: 13px;
  right: 16px;
`;

const MceResponseStyled = styled.div`
  #mce-error-response {
    margin-bottom: 8px;
  }
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
          <div id="mc_embed_signup">
            <form
              action="https://personashare.us19.list-manage.com/subscribe/post?u=01f2d8ab4101619d0906d8e99&amp;id=040e730107"
              method="post"
              name="mc-embedded-subscribe-form"
              className="validate"
              id="mc-embedded-subscribe-form"
              target="_blank"
              noValidate
            >
              <div id="mc_embed_signup_scroll">
                <InputWrapper className="mc-field-group">
                  <InputField
                    type="email"
                    name="EMAIL"
                    className="required email"
                    id="mce-EMAIL"
                    placeholder={t('PERSONA_SHARE_BUTTON_PLACEHOLDER')}
                  />
                  <EmailIconStyled src={EmailIconSvg} />
                </InputWrapper>
                <CheckBoxComponent className="mc-field-group input-group">
                  <CheckboxWithText>
                    <CheckBoxStyled
                      className="required"
                      type="checkbox"
                      value="1"
                      name="group[13404][1]"
                      id="mce-group[13404]-13404-0"
                    />
                    <TextInCheckBoxDiv>
                      {t('PERSONA_SHARE_REGULATIONS_TEXT_1')}
                      {t('PERSONA_SHARE_REGULATIONS_TEXT_2')}
                      {t('PERSONA_SHARE_REGULATIONS_TEXT_3')}
                    </TextInCheckBoxDiv>
                  </CheckboxWithText>
                </CheckBoxComponent>
                <MceResponseStyled id="mce-responses" className="clear">
                  <ResponseDisplayNone className="response" id="mce-error-response" />
                  <ResponseDisplayNone className="response" id="mce-success-response" />
                </MceResponseStyled>
                <InputButtonStyled type="submit" value={`${t('JOIN_TO_NEWSLETTER')}`} name="subscribe" />
              </div>
            </form>
          </div>
          <WideButtonStyled onClick={onNextClick}>{t('WHAT_MORE')}</WideButtonStyled>
        </TextAndButtonsComponent>
      </MainComponent>
    </>
  );
};
