import React, { FunctionComponent, useRef } from 'react';
import styled from 'styled-components';
import useLocalStorage from 'react-use-localstorage';
import { NavLink } from 'react-router-dom';
import { APP_ROUTES } from 'global/AppRouter/routes';
import { useTranslation } from 'react-i18next';
import { Modal } from 'antd';

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

export const TermAndCookies: FunctionComponent = () => {
  const [isVisible, setIsVisible] = useLocalStorage('isVisible', 'true');
  const { t } = useTranslation();
  const ref = useRef<any>();
  const [modal, contextHolder] = Modal.useModal();

  if (isVisible === 'false') {
    return null;
  }

  if (!ref.current) {
    ref.current = modal.info({
      title: t('COOKIES_NOTIFICATION_TEXT'),
      content: (
        <CookieText>
          {t('COOKIES_NOTIFICATION_TEXT_1')}{' '}
          <NavLink to={APP_ROUTES.TERM_OF_USE}>
            <TextHere>{t('COOKIES_NOTIFICATION_TEXT_2')}</TextHere>.
          </NavLink>{' '}
          {t('COOKIES_NOTIFICATION_TEXT_3')} <br />
          <NavLink to={APP_ROUTES.PRIVACY_AND_COOKIES_POLICY}>
            <TextHere>{t('COOKIES_NOTIFICATION_TEXT_4')}</TextHere>.
          </NavLink>
        </CookieText>
      ),
      onOk: () => {
        setIsVisible('false');
      },
      okText: t('COOKIES_NOTIFICATION_BUTTON'),
    });
  }

  return <div>{contextHolder}</div>;
};
