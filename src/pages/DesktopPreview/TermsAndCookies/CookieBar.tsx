import React, { FunctionComponent, useEffect, useState } from 'react';
import styled from 'styled-components';
import useLocalStorage from 'react-use-localstorage';
import { useTranslation } from 'react-i18next';
import { Modal, notification } from 'antd';
import _ from 'lodash';
import { TOSContent } from '../../../components/TermandPrivacy/TOSContent';
import { PACContent } from '../../../components/TermandPrivacy/PACContent';
// import { TOSContent } from '../../../components/TermandPrivacy/TOSContent';

const CookieText = styled.p`
  ${(props) => props.theme.typography.caption};
  color: ${(props) => props.theme.colors.utils.text.dark};
`;

const TextHere = styled.span`
  ${(props) => props.theme.typography.caption};
  color: ${(props) => props.theme.colors.main.secondary};
  text-decoration-line: ${(props) => props.theme.textDecorationLine};
  text-decoration-skip: spaces;
`;

export const CookieBar: FunctionComponent = () => {
  const [isVisible, setIsVisible] = useLocalStorage('isVisible', 'true');
  const [notificationIsShow, setNotificationIsShown] = useState(false);
  const { t } = useTranslation();
  const [api, contextHolder] = notification.useNotification();
  const [regulationsApi, regulationsContextHolder] = Modal.useModal();

  useEffect(() => {
    if (isVisible === 'true' && !notificationIsShow) {
      api.info({
        message: t('COOKIES_NOTIFICATION_TEXT'),
        description: (
          <CookieText>
            {t('COOKIES_NOTIFICATION_TEXT_2')}{' '}
            <a>
              <TextHere
                onClick={() =>
                  regulationsApi.info({
                    className: 'regulation-modal',
                    title: 'Zasady użytkowania',
                    content: <TOSContent />,
                  })
                }
              >
                {t('COOKIES_NOTIFICATION_TEXT_3')}
              </TextHere>
              .
            </a>{' '}
            {t('COOKIES_NOTIFICATION_TEXT_4')} <br />
            <a>
              <TextHere
                onClick={() =>
                  regulationsApi.info({
                    className: 'regulation-modal',
                    title: 'Ciasteczka i polityka prywatności',
                    content: <PACContent />,
                  })
                }
              >
                {t('COOKIES_NOTIFICATION_TEXT_5')}
              </TextHere>
              .
            </a>
          </CookieText>
        ),
        onClose: () => {
          setIsVisible('false');
          setNotificationIsShown(false);
        },
        placement: 'bottomLeft',
        duration: 0,
      });
      setNotificationIsShown(true);
    }
  });

  if (isVisible === 'false') {
    return null;
  }

  /*if (!ref.current) {
    ref.current = api.info({
      message: t('COOKIES_NOTIFICATION_TEXT'),
      description: (
        <CookieText>
          {t('COOKIES_NOTIFICATION_TEXT_2')}{' '}
          <a>
            <TextHere
              onClick={() =>
                api.info({
                  message: 'Zasady użytkowania',
                  description: <div>test</div>,
                })
              }
            >
              {t('COOKIES_NOTIFICATION_TEXT_3')}
            </TextHere>
            .
          </a>{' '}
          {t('COOKIES_NOTIFICATION_TEXT_4')} <br />
          <a>
            <TextHere
              onClick={() =>
                api.info({
                  message: 'Ciasteczka i polityka prywatności',
                  description: <div>test</div>,
                })
              }
            >
              {t('COOKIES_NOTIFICATION_TEXT_5')}
            </TextHere>
            .
          </a>
        </CookieText>
      ),
      onClose: () => {
        setIsVisible('false');
      },
      placement: 'bottomLeft',
      duration: 0,
    });
  }*/

  return (
    <div>
      {contextHolder} {regulationsContextHolder}
    </div>
  );
};
