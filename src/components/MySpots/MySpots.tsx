import React, { FC, useState, useRef } from 'react';
import styled from 'styled-components';
import { Carousel as AntCarousel } from 'antd';
import { PageWrapper, PageWrapperSpaceBetween } from 'components/PageWrapper';
import { useQuery } from '@apollo/react-hooks';
import { PersonaCard } from 'components/PersonaCard/PersonaCard';
import Carousel from 'components/Carousel/Carousel';
import { gqlEntity } from 'global/graphqls/schema';
import { MySpotsWithoutSpots } from './MySpotsWithoutSpots';
import { NavLink, Router, useHistory } from 'react-router-dom';
import { GET_SPOTS, GetSpotType } from 'global/graphqls/Spot';
import AddIcon from 'assets/AddIcon.svg';
import ShareQrCode from 'assets/ShareQrCode.svg';
import isEmpty from 'lodash/isEmpty';
import { APP_ROUTES } from 'global/AppRouter/routes';
import { Loader } from 'components/Loader/Loader';
import { LoginOrHamburger } from '../QrScanner/LoginOrHamburger';
import { useTranslation } from 'react-i18next';
import { StickyNavigation } from '../../global/Layouts/StickyNavigation/StickyNavigation';

const CaruouselItem = styled.div``;

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

const StyledPageWrapper = styled(PageWrapper)`
  padding: 0px;
`;

const StyledCarousel = styled(Carousel)`
  && {
    .slick-track {
      margin: auto;
    }
  }
`;

export const MySpots: FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { loading, data } = useQuery<GetSpotType>(GET_SPOTS);
  const carousel = useRef<AntCarousel>(null);
  const history = useHistory();
  const { t } = useTranslation();

  if ((isEmpty(data?.userSpots) || !data) && !loading) {
    return <MySpotsWithoutSpots />;
  }

  return (
    <div>
      <LoginOrHamburger />
      <StyledPageWrapper>
        <Loader loading={loading} data={data}>
          <PageWrapperSpaceBetween>
            <StyledCarousel afterChange={setCurrentSlide} ref={carousel}>
              {data?.userSpots &&
                data?.userSpots.map((spots: gqlEntity) => (
                  <CaruouselItem key={spots.uuid}>
                    <Wrapper
                      onClick={() =>
                        history.push({
                          pathname: `${APP_ROUTES.MY_SPOT_PREVIEW(spots.uuid)}`,
                        })
                      }
                    >
                      <PersonaCard card={spots.card} uuid={spots.uuid} isWithEdit={true} isWithAddPhoto={true} />
                    </Wrapper>
                  </CaruouselItem>
                ))}
            </StyledCarousel>
            <ShareQr>
              <img src={`${data?.userSpots[currentSlide]?.qrCodeLink}`} alt="QrCode" />
              <TextInShare>
                <ShareQrIcon src={ShareQrCode} alt="Share Qr Code" />
                <a href={`${data?.userSpots[currentSlide]?.qrCodeLink}`}>{t('MY_SPOTS_SHARE_QR')}</a>
              </TextInShare>
            </ShareQr>
          </PageWrapperSpaceBetween>
          <NavLink to={APP_ROUTES.SPOT_CREATION_STEP_1}>
            <CreateSpot>
              <img src={AddIcon} alt="Create Icon" />
            </CreateSpot>
          </NavLink>
        </Loader>
      </StyledPageWrapper>
      <StickyNavigation />
    </div>
  );
};
