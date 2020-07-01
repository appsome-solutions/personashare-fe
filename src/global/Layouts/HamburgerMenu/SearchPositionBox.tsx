import styled from 'styled-components';
import React, { FC } from 'react';
import SearchIcon from 'assets/SearchIcon.svg';
import { useTranslation } from 'react-i18next';

export interface SearchProps {
  searchValue?: string;
  setSearchValue?: any;
}
const SearchPositionBoxStyled = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

const SearchInputStyled = styled.input`
  width: 100%;
  padding-left: 32px;
  background: #9db9ff;
  height: 32px;
  margin-right: 28px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-sizing: border-box;
  border-radius: 4px;
  :: placeholder {
    ${(props) => props.theme.typography.body2};
    color: rgba(50, 50, 93, 0.5);
  }
  :focus {
    outline: none;
  }
  :hover {
    border: 1px solid ${(props) => props.theme.colors.utils.background.light};
  }
`;

const SearchImg = styled.img`
  position: absolute;
  margin-left: 8px;
`;

export const SearchPositionBox: FC<SearchProps> = ({ searchValue, setSearchValue }) => {
  const { t } = useTranslation();
  const handleChangeInput = (event: any) => {
    setSearchValue(event.target.value);
  };

  return (
    <SearchPositionBoxStyled>
      <SearchInputStyled placeholder={t('SPOT_BOOK_NAVBAR')} value={searchValue} onChange={handleChangeInput} />
      <SearchImg src={SearchIcon} alt="something " />
    </SearchPositionBoxStyled>
  );
};
