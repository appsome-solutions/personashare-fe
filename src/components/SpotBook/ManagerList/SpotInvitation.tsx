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
  padding: 28px 12px 38px 12px;
  background: #ffffff;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
`;

const MarginInvitationText = styled.div`
  text-align: left;
`;

const ButtonInvitation = styled.div`
  margin: 0 12px;
`;

const WideButtonStyled = styled(WideButton as any)`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
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
      uuid: data?.spot?.uuid,
      spot: {
        card: {
          ...data?.spot?.card,
          __typename: undefined,
        },
        page: {
          ...data?.spot?.page,
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
          <MarginInvitationText>
            <InvitationText>
              You got an invitation to a {data?.spot?.card.name}. If you will accept it then your default persona will
              be visible for others!
            </InvitationText>
          </MarginInvitationText>
          <ButtonInvitation>
            <WideButtonStyled onClick={onClickFunctions}>ACCEPT</WideButtonStyled>
          </ButtonInvitation>
        </BackgroundBox>
      </MainComponent>
    </>
  );
};
