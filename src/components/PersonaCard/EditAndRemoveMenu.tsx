import React, { FC } from 'react';
import { Dropdown, Menu } from 'antd';
import styled from 'styled-components';
import EditIcon from 'assets/EditIcon.svg';
import RemoveIcon from 'assets/RemoveIcon.svg';
import EditMenu from 'assets/EditMenu.svg';
import { NavLink, useLocation } from 'react-router-dom';
import { REMOVE_PERSONA, RemoveResponse } from 'global/graphqls/Persona';
import { useMutation } from '@apollo/react-hooks';
import { REMOVE_SPOT } from 'global/graphqls/Spot';
import { APP_ROUTES } from 'global/AppRouter/routes';

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
};

export const EditRemoveMenu: FC<EditAndRemoveMenuType> = ({ uuid }) => {
  const { pathname } = useLocation();
  const [personaRemove] = useMutation<RemoveResponse>(REMOVE_PERSONA, {
    variables: { personaUuid: uuid },
  });
  const [spotRemove] = useMutation<RemoveResponse>(REMOVE_SPOT, {
    variables: { spotUuid: uuid },
  });

  const NavLinkFunctionality = () => {
    if (pathname.includes('personas')) {
      return (
        <div>
          <NavLinkStyled to={`/edit/persona/${uuid}/step/1`}>
            <MenuEditStyled>
              <EditAndRemoveBox>
                Edit
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
                Edit
                <img src={EditIcon} alt="Edit Icon" />
              </EditAndRemoveBox>
            </MenuEditStyled>
          </NavLinkStyled>
        </div>
      );
    }
  };

  const RemoveFunctionality = () => (
    <MenuRemoveStyled>
      <EditAndRemoveBox onClick={() => (pathname.includes('personas') ? personaRemove() : spotRemove())}>
        Remove
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
