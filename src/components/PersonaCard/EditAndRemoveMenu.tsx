import React, { FC } from 'react';
import { Dropdown, Menu, message } from 'antd';
import styled from 'styled-components';
import EditIcon from 'assets/EditIcon.svg';
import RemoveIcon from 'assets/RemoveIcon.svg';
import EditMenu from 'assets/EditMenu.svg';
import { NavLink, useLocation } from 'react-router-dom';
import {
  GET_PERSONA,
  GET_PERSONAS,
  GetCardType,
  REMOVE_PERSONA,
  RemovePersonaResponse,
  RemoveSpotResponse,
  SET_DEFAULT_PERSONA,
  SetDefaultPersonaResponse,
  UPDATE_PERSONA,
} from 'global/graphqls/Persona';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_SPOT, GET_SPOTS, REMOVE_SPOT, UPDATE_SPOT_PAYLOAD } from 'global/graphqls/Spot';
import { APP_ROUTES } from 'global/AppRouter/routes';
import _ from 'lodash';
import { Spinner } from 'components/Spinner/Spinner';
import { Overlay } from 'components/Overlay/Overlay';
import { useUserContext } from 'global/UserContext/UserContext';
import { GET_USER } from 'global/graphqls/User';
import { AgregatedPersona, Entity } from 'global/graphqls/schema';
import { useTranslation } from 'react-i18next';

const EditMenuBox = styled.div`
  position: relative;
  float: right;
  margin-top: 8px;
`;

const EditAndRemoveBox = styled.div`
  ${(props) => props.theme.typography.caption};
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 84px;
`;

const MenuStyled = styled(Menu)`
  padding: 0px;
  border-radius: 0;
`;

const MenuEditStyled = styled(Menu.Item)`
  border-bottom: 1px ${(props) => props.theme.colors.main.primary} solid;
  padding: 4px 4px 4px 8px;
`;

const MenuRemoveStyled = styled(Menu.Item)`
  border-top: 1px ${(props) => props.theme.colors.main.primary} solid;
  padding: 4px 4px 4px 8px;
`;

const NavLinkStyled = styled(NavLink)`
  text-decoration: none;
  color: rgba(0, 0, 0, 0.65);
`;

type EditAndRemoveMenuType = {
  uuid: string;
  isDefaultPersona?: boolean;
};

const StyledOverlay = styled(Overlay)`
  top: 31px;
  width: 262px;
`;

export const EditRemoveMenu: FC<EditAndRemoveMenuType> = ({ uuid, isDefaultPersona }) => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const { user } = useUserContext();
  const { data: userPersonasData } = useQuery<{ userPersonas: Array<AgregatedPersona> }>(GET_PERSONAS);
  const { data: personaData } = useQuery<GetCardType>(GET_PERSONA, {
    skip: !isDefaultPersona,
    variables: { uuid: uuid },
  });
  const [setDefaultPersona, { loading: isSetDefaultPersonaLoading }] = useMutation<SetDefaultPersonaResponse>(
    SET_DEFAULT_PERSONA
  );

  // todo: remove it when deletion of all elements will be on place [BE]
  // it updates spot to removed data before removal
  const [updateSpot] = useMutation<{ updateSpot: Entity }>(UPDATE_SPOT_PAYLOAD, {
    update(cache, { data }) {
      if (!data) {
        return;
      }
      const { updateSpot } = data;
      const { userSpots } = cache.readQuery({ query: GET_SPOTS }) as { userSpots: any };
      cache.writeQuery({
        query: GET_SPOTS,
        data: {
          userSpots: userSpots.map((spot: Entity) => {
            if (spot.uuid === updateSpot.uuid) {
              return updateSpot;
            }
            return spot;
          }),
        },
      });
      cache.writeQuery({
        query: GET_SPOT,
        data: {
          spot: updateSpot,
        },
        variables: {
          uuid: updateSpot.uuid,
        },
      });
    },
  });
  // it updates persona to removed data before removal
  const [updatePersona, { loading: updatePersonaLoading }] = useMutation<{ updatePersona: Entity }>(UPDATE_PERSONA, {
    update(cache, { data }) {
      if (!data) {
        return;
      }
      const { updatePersona } = data;
      const { userPersonas } = cache.readQuery({ query: GET_PERSONAS }) as { userPersonas: any };
      cache.writeQuery({
        query: GET_PERSONAS,
        data: {
          userPersonas: userPersonas.map((persona: Entity) => {
            if (persona.uuid === updatePersona.uuid) {
              return updatePersona;
            }
            return persona;
          }),
        },
      });
      cache.writeQuery({
        query: GET_PERSONA,
        data: {
          persona: updatePersona,
        },
        variables: {
          uuid: updatePersona.uuid,
        },
      });
    },
  });

  const [personaRemove, { loading: isPersonaRemovalLoading }] = useMutation<RemovePersonaResponse>(REMOVE_PERSONA, {
    variables: { personaUuid: uuid },
    update(cache) {
      const { userPersonas } = cache.readQuery({ query: GET_PERSONAS }) as { userPersonas: any };
      cache.writeQuery({
        query: GET_PERSONAS,
        data: { userPersonas: _.filter(userPersonas, (userPersona) => userPersona.uuid !== uuid) },
      });
    },
    onCompleted: () => {
      if (isDefaultPersona && personaData) {
        if (!user || !userPersonasData) {
          return;
        }
        const userPersonasIdWithoutRemoved = _.filter(userPersonasData.userPersonas, (persona) => {
          return persona.uuid !== uuid;
        });

        // todo: when BE will support removing default persona
        /*// if removed last default persona:
        if (userPersonasData.userPersonas.length <= 2) {
          const { user } = client.cache.readQuery({ query: GET_USER }) as { user: any };
          client.cache.writeQuery({
            query: GET_USER,
            data: {
              user: {
                ...user,
                photo: '',
                defaultPersona: null,
              },
            },
          });
          setUser(null);
        } else {*/
        setDefaultPersona({
          variables: {
            uuid: userPersonasIdWithoutRemoved[0].uuid,
          },
          update(cache, { data }) {
            if (!data) {
              return;
            }
            const {
              setDefaultPersona: { uuid },
            } = data;
            const { user } = cache.readQuery({ query: GET_USER }) as { user: any };
            cache.writeQuery({
              query: GET_USER,
              data: {
                user: {
                  ...user,
                  photo: personaData.persona.card.avatar ? personaData.persona.card.avatar : '',
                  defaultPersona: uuid,
                },
              },
            });
          },
        });
      }
    },
  });
  const [spotRemove, { loading: isSpotRemovalLoading }] = useMutation<RemoveSpotResponse>(REMOVE_SPOT, {
    variables: { spotUuid: uuid },
    update(cache) {
      const { userSpots } = cache.readQuery({ query: GET_SPOTS }) as { userSpots: any };
      cache.writeQuery({
        query: GET_SPOTS,
        data: { userSpots: _.filter(userSpots, (userSpot) => userSpot.uuid !== uuid) },
      });
    },
  });

  if (isPersonaRemovalLoading || isSpotRemovalLoading || isSetDefaultPersonaLoading || updatePersonaLoading) {
    return (
      <StyledOverlay>
        <Spinner />
      </StyledOverlay>
    );
  }

  const NavLinkFunctionality = () => {
    if (pathname.includes('personas')) {
      return (
        <div>
          <NavLinkStyled to={`/edit/persona/${uuid}/step/1`}>
            <MenuEditStyled>
              <EditAndRemoveBox>
                {t('MY_PERSONA_CARD_MENU_EDIT')}
                <img src={EditIcon} alt="Edit Icon" />
              </EditAndRemoveBox>
            </MenuEditStyled>
          </NavLinkStyled>
        </div>
      );
    } else {
      return (
        <div>
          <NavLinkStyled to={APP_ROUTES.EDIT_SPOT_UUID_STEP_1(uuid)}>
            <MenuEditStyled>
              <EditAndRemoveBox>
                {t('MY_PERSONA_CARD_MENU_EDIT')}
                <img src={EditIcon} alt="Edit Icon" />
              </EditAndRemoveBox>
            </MenuEditStyled>
          </NavLinkStyled>
        </div>
      );
    }
  };

  const removePersonaIfNotLastOne = async () => {
    if (userPersonasData?.userPersonas.length === 1) {
      message.error(`${t('MY_PERSONA_REMOVING_LAST_PERSONA_NOTIFICATION')}`);
    } else {
      await updatePersona({
        variables: {
          uuid,
          payload: {
            card: {
              name: 'Removed Persona',
              description: 'Removed Persona',
              avatar: null,
              background: null,
            },
          },
        },
      });
      personaRemove();
    }
  };

  // todo: remove this when BE will handle chaning removal
  const removeSpotHandler = async () => {
    await updateSpot({
      variables: {
        uuid,
        payload: {
          card: {
            name: 'Removed Spot',
            description: 'Removed Spot',
            avatar: null,
            background: null,
          },
        },
      },
    });
    spotRemove();
  };

  const RemoveFunctionality = () => (
    <MenuRemoveStyled>
      <EditAndRemoveBox
        onClick={() => (pathname.includes('personas') ? removePersonaIfNotLastOne() : removeSpotHandler())}
      >
        {t('MY_PERSONA_CARD_MENU_REMOVE')}
        <img src={RemoveIcon} alt="Remove Icon" />
      </EditAndRemoveBox>
    </MenuRemoveStyled>
  );

  const menuBuild = (
    <MenuStyled>
      <NavLinkFunctionality />
      <RemoveFunctionality />
    </MenuStyled>
  );

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Dropdown overlay={menuBuild} trigger={['click']} placement="bottomRight">
        <EditMenuBox>
          <img src={EditMenu} alt="Edit Menu" onClick={(e) => e.preventDefault()} />
        </EditMenuBox>
      </Dropdown>
    </div>
  );
};
