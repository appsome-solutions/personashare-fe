import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { EntityPreviewWrapper } from './EntityPreviewWrapper';
import { AgregatedPersona } from 'global/graphqls/schema';

export interface PropsType {
  visibilityOrNetworkQuery: any;
  savedOrRecommend: string;
  spotsOrPersonsText: string;
  link: any;
}

const HowManyUsers = styled.div`
  ${(props) => props.theme.typography.body1}
`;

const SeeMoreText = styled.a`
  text-decoration-line: underline;
  text-align: center;
`;

export const CheckEntity: FC<PropsType> = ({
  visibilityOrNetworkQuery,
  savedOrRecommend,
  spotsOrPersonsText,
  link,
}) => {
  const [showMore, setShowMore] = useState(false);

  const handleClick = () => {
    setShowMore(true);
  };
  const numberOfVisibilityList = showMore ? visibilityOrNetworkQuery.length : 4;

  const CheckEntityList = () => {
    if (!visibilityOrNetworkQuery) {
      return (
        <>
          <HowManyUsers>
            0 {spotsOrPersonsText} {savedOrRecommend} your profile
          </HowManyUsers>
          {visibilityOrNetworkQuery?.slice(0, numberOfVisibilityList).map((spotsOrPersonsText: AgregatedPersona) => (
            <EntityPreviewWrapper
              showMore={showMore}
              visibilityOrNetworkQuery={visibilityOrNetworkQuery}
              key={spotsOrPersonsText.uuid}
              spotOrPersona={spotsOrPersonsText}
              link={link}
            />
          ))}
        </>
      );
    } else {
      return (
        <>
          <HowManyUsers>
            {visibilityOrNetworkQuery.length} {spotsOrPersonsText} {savedOrRecommend} your profile
          </HowManyUsers>
          {visibilityOrNetworkQuery?.slice(0, numberOfVisibilityList).map((spotsOrPersonsText: AgregatedPersona) => (
            <EntityPreviewWrapper
              visibilityOrNetworkQuery={visibilityOrNetworkQuery}
              showMore={showMore}
              key={spotsOrPersonsText.uuid}
              spotOrPersona={spotsOrPersonsText}
              link={link}
            />
          ))}
          <SeeMoreText onClick={handleClick}>SEE MORE</SeeMoreText>
        </>
      );
    }
  };

  return <CheckEntityList />;
};
