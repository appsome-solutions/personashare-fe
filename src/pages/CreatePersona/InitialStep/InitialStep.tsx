import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { APP_ROUTES } from 'global/AppRouter/routes';
import { PageWrapperSpaceBetween } from 'components/PageWrapper';
import { InfoCard } from 'components/InfoCard/InfoCard';
import { WideButton } from 'components/Button';
import { Stepper } from 'components/Stepper';
import { TopNav } from 'components/TopNav/TopNav';
import { SpotAndPersona } from 'components/CreateSpotAndPersona/SpotAndPersonaProps';
import ContentImg from 'assets/ContentImg.svg';
import QrImg from 'assets/QrImg.svg';
import TeamImg from 'assets/TeamImg.svg';
import GpsImg from 'assets/GpsImg.svg';
import SchemeImg from 'assets/SchemeImg.svg';
import styled from 'styled-components';

const WideButtonStyled = styled(WideButton)`
  margin-top: 46px;
`;
export const InitialStep: FC = () => {
  const history = useHistory();

  const onNextClick = useCallback((): void => {
    history.push({
      pathname: APP_ROUTES.PERSONA_CREATION_STEP_2,
    });
  }, [history]);

  return (
    <div>
      <TopNav isWithBackArrow />
      <PageWrapperSpaceBetween>
        <div>
          <Stepper items={[1, 2, 3]} current={1} mb={31} />
          <InfoCard title="Let's create your persona!">
            Persona is any set of data connected with your person. You can create many personas to fit different
            situations in your business, hobby or private life!
          </InfoCard>
        </div>
        <SpotAndPersona
          svgLink={ContentImg}
          title="Boosted business card"
          content="It is always up to date.
You can insert there not only contact details, but also
links to surveys, your social media, groups, products,
services, booking pages, blogs, tutorials, books,
articles, actually.. Anything you want! Just take a look at our build-in editor! "
        />
        <SpotAndPersona
          svgLink={QrImg}
          title="Share it easily"
          content="You can place your qr
code anywhere: on events, conferences, in b2b
relations. And also sign your articles, books, texts,
comments, photos and medias. Use your creativity and make your brand be visible everywhere."
        />
        <SpotAndPersona
          svgLink={TeamImg}
          title="Use spots"
          content="Spots are places where you can left your persona. It can be events, webinars, coffee bars, offices and any place where people meets together. You can join as spot participant, show persona and brief message to your viewers."
        />
        <SpotAndPersona
          svgLink={GpsImg}
          title="Recommendations network"
          content="Encourage your friends,
partners and clients to recommend you. You are linked with your recommendators. Whenever they share persona you are visible there. Create you own recomendation net!"
        />
        <SpotAndPersona
          svgLink={SchemeImg}
          title="Recommendations network"
          content="Encourage your friends,
partners and clients to recommend you. You are linked with your recommendators. Whenever they share persona you are visible there. Create you own recomendation net!"
        />
        <WideButtonStyled onClick={onNextClick}>Next Step</WideButtonStyled>
      </PageWrapperSpaceBetween>
    </div>
  );
};
