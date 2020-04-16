import React from 'react';
import { Dropdown, Menu } from 'antd';
import styled from 'styled-components';
import EditIcon from 'assets/EditIcon.svg';
import RemoveIcon from 'assets/RemoveIcon.svg';
import EditMenu from 'assets/EditMenu.svg';
import { NavLink, useLocation } from 'react-router-dom';

const EditMenuBox = styled.div`
  position: relative;
  float: right;
  margin-top: 8px;
`;
const EditAndRemoveBox = styled.div`
  ${props => props.theme.typography.caption};
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
  border-bottom: 1px ${props => props.theme.colors.main.primary} solid;
  padding: 4px 4px 4px 8px;
`;

const MenuRemoveStyled = styled(Menu.Item)`
  border-top: 1px ${props => props.theme.colors.main.primary} solid;
  padding: 4px 4px 4px 8px;
`;

const NavLinkStyled = styled(NavLink)`
  text-decoration: none;
  color: rgba(0, 0, 0, 0.65);
`;
type EditAndRemoveMenuType = {
  uuid: string;
};

export const EditRemoveMenu = ({ uuid }: EditAndRemoveMenuType) => {
  const { pathname } = useLocation();

  const NavLinkFunctionality = () => {
    if (pathname.includes('personas')) {
      return (
        <div>
          <NavLinkStyled to={`/edit/persona/${uuid}/step/1`}>
            <MenuEditStyled key="0">
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
          <NavLinkStyled to={`/edit/spot/${uuid}/step/1`}>
            <MenuEditStyled key="0">
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
  const menuBuild = (
    <MenuStyled>
      <NavLinkFunctionality />
      <MenuRemoveStyled key="1">
        <EditAndRemoveBox onClick={() => console.log('siema')}>
          Remove
          <img src={RemoveIcon} alt="Remove Icon" />
        </EditAndRemoveBox>
      </MenuRemoveStyled>
    </MenuStyled>
  );

  return (
    <>
      <Dropdown overlay={menuBuild} trigger={['click']} placement="bottomRight">
        <EditMenuBox>
          <img src={EditMenu} alt="Edit Menu" onClick={e => e.preventDefault()} />
        </EditMenuBox>
      </Dropdown>
    </>
  );
};
