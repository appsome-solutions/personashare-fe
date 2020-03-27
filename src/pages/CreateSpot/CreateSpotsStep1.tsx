import React, { FC } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { PageWrapperSpaceBetween } from 'components/PageWrapper';
import { InfoCard } from 'components/InfoCard/InfoCard';
import { WideButton } from 'components/Button';
import { Stepper } from 'components/Stepper';
import { TopNav } from 'components/TopNav/TopNav';
import { SpotAndPersona } from 'components/CreateSpotAndPersona/SpotAndPersonaProps';
import ContentImg from 'assets/ContentImg.svg';
import TeamImg from 'assets/TeamImg.svg';
import EyeImg from 'assets/EyeImg.svg';
import SchemeImg from 'assets/SchemeImg.svg';
import CustomImg from 'assets/CustomImg.svg';

const InformationUnderText = styled(InfoCard)`
  && .iTLFNI {
    padding: 0 8px 16px 12px;
  }
  && .dVWmBa {
    ${props => props.theme.typography.subtitle2};
  }
  margin: 40px 0 46px 0;
`;

const ContactUs = styled(NavLink)`
  ${props => props.theme.typography.subtitle2};
  margin-left: 4px;
  color: ${props => props.theme.colors.main.primary};
  text-decoration: underline;
`;

export const CreateSpotsStep1: FC = () => {
  const history = useHistory();

  const onNextClick = () => {
    history.push({
      pathname: '/creation/step/2/entity/spot',
    });
  };

  return (
    <div>
      <TopNav isWithBackArrow />
      <PageWrapperSpaceBetween>
        <div>
          <Stepper items={[1, 2, 3]} current={1} mb={31} />
          <InfoCard title="Welcome in a Persona Share!">
            The only application on the market where you decide which data you want share. Just create your first
            predefined set of data you want to exchange with 3 simple steps.
          </InfoCard>
        </div>
        <SpotAndPersona
          svgLink={ContentImg}
          title="Boosted business page"
          content="It is always up to date. You can insert there not only contact details, but also links to surveys, your social media, groups, products, services, booking pages, blogs, tutorials, books, articles, actually.. Anything you want! Just take a look at our build-in editor!"
        />
        <SpotAndPersona
          svgLink={CustomImg}
          title="Spot managers"
          content="You can add important personas to your spot. With that you promote their brands and increase your spot value."
        />
        <SpotAndPersona
          svgLink={TeamImg}
          title="Participant list"
          content="You can allow any persona to be visible on your spot. It will help integrate people and give them possibility to share brief message with others."
        />
        <SpotAndPersona
          svgLink={EyeImg}
          title="Make your brand visible"
          content="By using qr codes you can encourage others to see your spot details. With that you can show them your services and products, redirect to social medias and give them access to anything they should know. It all depends on creative usage!"
        />
        <SpotAndPersona
          svgLink={SchemeImg}
          title="Recommendations network"
          content="Get a recommendation from your friends, partners and clients. You are linked with your recommendators. Whenever they share persona you are visible there. Create you own recommendation net!"
        />
        <InformationUnderText title="">
          <div>
            You can use spots totally for free, but there are some limitations:
            <br /> - maximum 3 manager personas in spot
            <br /> - maximum 20 personas can join to spot
            <br />
            - your spot can be recommended up to 5 times
            <br /> - editor limitations
            <br />
            If you would be interested in exceeding them
            <ContactUs to="/contact">contact us</ContactUs>.
          </div>
        </InformationUnderText>
        <WideButton onClick={onNextClick}>CREATE FREE SPOT</WideButton>
      </PageWrapperSpaceBetween>
    </div>
  );
};
