import { useQuery } from '@apollo/react-hooks';
import { GET_PERSONA, GetCardType } from 'global/graphqls/Persona';
import { LoginBar } from 'components/LoginBar/LoginBar';
import { HamburgerMenu } from 'global/Layouts/HamburgerMenu/HamburgerMenu';
import React, { FC } from 'react';
import { Overlay } from '../Overlay/Overlay';
import { Spinner } from '../Spinner/Spinner';
import { useUserContext } from '../../global/UserContext/UserContext';

export const LoginOrHamburger: FC = () => {
  const { user } = useUserContext();
  const { loading: isPersonaLoading, data: personaData } = useQuery<GetCardType>(GET_PERSONA, {
    skip: !user?.defaultPersona,
    variables: { uuid: user?.defaultPersona },
  });

  if (isPersonaLoading) {
    return (
      <Overlay>
        <Spinner />
      </Overlay>
    );
  }

  if (!user) {
    return <LoginBar isLogged={true} />;
  } else if ((personaData && user) || (!personaData && user)) {
    // @ts-ignore
    return <HamburgerMenu isWithHamburger={true} uuid={user.defaultPersona} card={personaData?.persona?.card} />;
  } else return null;
};
