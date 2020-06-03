import React, { FC, useState, useRef } from 'react';
import styled from 'styled-components';
import { Carousel as AntCarousel } from 'antd';
import { TopNav } from 'components/TopNav/TopNav';
import { PageWrapperSpaceBetween } from 'components/PageWrapper';
import { useQuery } from '@apollo/react-hooks';
import { PersonaCard } from 'components/PersonaCard/PersonaCard';
import Carousel from 'components/Carousel/Carousel';
import { gqlEntity } from 'global/graphqls/schema';
import { Spinner } from 'components/Spinner/Spinner';
import { Overlay } from 'components/Overlay/Overlay';
import { MySpotsWithoutSpots } from './MySpotsWithoutSpots';
import { NavLink, Route, useHistory } from 'react-router-dom';
import { GET_SPOTS, GetSpotType } from 'global/graphqls/Spot';
import AddIcon from 'assets/AddIcon.svg';
import ShareQrCode from 'assets/ShareQrCode.svg';
import isEmpty from 'lodash/isEmpty';
import { APP_ROUTES } from 'global/AppRouter/routes';

const CaruouselItem = styled.div`
  padding: 0 20px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CreateSpot = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  position: fixed;
  bottom: 66px;
  right: 18px;
  background-color: ${(props) => props.theme.colors.main.primary};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ShareQr = styled.div`
  margin-top: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  flex-direction: column;
`;

const TextInShare = styled.div`
  ${(props) => props.theme.typography.subtitle2};
  margin-bottom: 20px;
`;
const ShareQrIcon = styled.img`
  padding-right: 12px;
`;

export const MySpots: FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { loading, data } = useQuery<GetSpotType>(GET_SPOTS);
  const carousel = useRef<AntCarousel>(null);
  const history = useHistory();

  if (loading) {
    return (
      <Overlay>
        <Spinner />
      </Overlay>
    );
  }
  if (isEmpty(data?.userSpots) || !data) {
    return <Route path={APP_ROUTES.MY_SPOTS} exact component={MySpotsWithoutSpots} />;
  }

  return (
    <div>
      <TopNav isWithBackArrow />
      <PageWrapperSpaceBetween>
        <Carousel afterChange={setCurrentSlide} ref={carousel}>
          {data.userSpots &&
            data.userSpots.map((spots: gqlEntity) => (
              <CaruouselItem key={spots.uuid}>
                <Wrapper
                  onClick={() =>
                    history.push({
                      pathname: `${APP_ROUTES.SPOT_PREVIEW(spots.uuid)}`,
                    })
                  }
                >
                  <PersonaCard card={spots.card} uuid={spots.uuid} isWithEdit={true} />
                </Wrapper>
              </CaruouselItem>
            ))}
        </Carousel>
        <ShareQr>
          <img src={`${data.userSpots[currentSlide].qrCodeLink}`} alt="QrCode" />
          <TextInShare>
            <ShareQrIcon src={ShareQrCode} alt="Share Qr Code" />
            <a href={`${data.userSpots[currentSlide].qrCodeLink}`}>Share your QR</a>
          </TextInShare>
        </ShareQr>
      </PageWrapperSpaceBetween>
      <NavLink to={APP_ROUTES.SPOT_CREATION_STEP_1}>
        <CreateSpot>
          <img src={AddIcon} alt="Create Icon" />
        </CreateSpot>
      </NavLink>
    </div>
  );
};
