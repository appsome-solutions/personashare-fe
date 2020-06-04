import React, { FC } from 'react';
import styled from 'styled-components';
import LogoInTerms from 'assets/LogoInTerms.svg';
import Hey from 'assets/Hey.svg';
import { WideButton } from 'components/Button';
import { TopNav } from 'components/TopNav/TopNav';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { ADD_MANAGER, AddManagerResponse, GET_SPOT, GetCardType, UPDATE_SPOT } from 'global/graphqls/Spot';
import { useUserContext } from 'global/UserContext/UserContext';
import { Entity } from 'global/graphqls/schema';

const MainComponent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 26px;
  background-color: ${(props) => props.theme.colors.utils.background.mid};
  ${(props) => props.theme.typography.subtitle2};
  text-align: center;
  height: 86vh;
`;

const InvitationText = styled.div`
  ${(props) => props.theme.typography.body1};
  margin: 24px 12px 40px 12px;
`;

const BackgroundBox = styled.div`
  background-color: ${(props) => props.theme.colors.utils.background.light};
  padding: 28px 0 38px 0;
`;

const WideButtonStyled = styled(WideButton as any)`
  padding-bottom: 40px;
`;

export const SpotInvitation: FC = () => {
  const { uuid } = useParams();
  const { data } = useQuery<GetCardType>(GET_SPOT, {
    variables: { uuid: uuid },
  });
  const { user } = useUserContext();
  const [addManager] = useMutation<AddManagerResponse>(ADD_MANAGER, {
    variables: { personaId: user?.defaultPersona, spotId: uuid },
  });
  const [updateSpot] = useMutation<Entity>(UPDATE_SPOT, {
    variables: {
      uuid: data?.spot.uuid,
      spot: {
        card: {
          ...data?.spot.card,
          __typename: undefined,
        },
        page: {
          ...data?.spot.page,
          __typename: undefined,
        },
        invitedManagerEmails: { email: user?.email, status: 'accepted' },
      },
    },
  });

  const onClickFunctions = async () => {
    await addManager();
    await updateSpot();
  };

  return (
    <>
      <TopNav isWithBackArrow />
      <MainComponent>
        <img src={LogoInTerms} />
        <BackgroundBox>
          <img src={Hey} />
          <InvitationText>
            You got an invitation to a {data?.spot.card.name}. If you will accept it then your default persona will be
            visible for others!
          </InvitationText>
          <WideButtonStyled onClick={onClickFunctions}>ACCEPT</WideButtonStyled>
        </BackgroundBox>
      </MainComponent>
    </>
  );
};
