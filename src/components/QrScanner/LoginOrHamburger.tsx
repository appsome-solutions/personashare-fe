import { useQuery } from '@apollo/react-hooks';
import { GET_PERSONA, GetCardType } from 'global/graphqls/Persona';
import { LoginBar } from 'components/LoginBar/LoginBar';
import { HamburgerMenu } from 'global/Layouts/HamburgerMenu/HamburgerMenu';
import React, { FC } from 'react';
import { gqlUser } from 'global/graphqls/schema';
import { GET_USER } from 'global/graphqls/User';
import { Overlay } from '../Overlay/Overlay';
import { Spinner } from '../Spinner/Spinner';

export const LoginOrHamburger: FC = () => {
  const { data, loading } = useQuery<{ user: gqlUser }>(GET_USER);
  const { loading: isPersonaLoading, data: personaData } = useQuery<GetCardType>(GET_PERSONA, {
    variables: { uuid: data?.user.defaultPersona },
  });

  if (isPersonaLoading || loading) {
    return (
      <Overlay>
        <Spinner />
      </Overlay>
    );
  }

  if (!data) {
    return <LoginBar isLogged={true} />;
  } else if (personaData && data) {
    return <HamburgerMenu isWithHamburger={true} uuid={data?.user.defaultPersona} card={personaData?.persona?.card} />;
  } else return null;
};
