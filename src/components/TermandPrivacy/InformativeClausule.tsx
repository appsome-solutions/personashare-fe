import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { TopNav } from '../TopNav/TopNav';
import { StickyNavigation } from '../../global/Layouts/StickyNavigation/StickyNavigation';
import { Router } from 'react-router-dom';

const MainComponent = styled.div`
  padding: 16px 26px;
`;

const InformativeText = styled.div`
  color: ${(props) => props.theme.colors.utils.background.mid.color};
  text-align: center;
  white-space: pre-wrap;
  word-break: break-word;
`;

export const InformativeClause: FunctionComponent = () => {
  return (
    <>
      <TopNav isWithBackArrow />
      <MainComponent>
        <InformativeText>
          <b>
            {`Klauzula informacyjna dla użytkowników serwisu www.personashare.comw związku z Rozporządzeniem RODO o Ochronie Danych Osobowych
`}
            {`
`}
          </b>
          {`Dnia 25 maja 2018 roku weszło w życie Rozporządzenie Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (w skrócie  „`}
          <b> {`RODO`}</b>
          {`”). Wykonując obowiązki informacyjne, zgodnie z art. 13 ust. 1 i 2 RODO, PersonaShare Mateusz Żukowski przekazuje niniejszą informację:`}
          {`
          `}
          {`
1. administratorem Pani/Pana danych osobowych jest PersonaShare Mateusz Żukowski (działalność nierejestrowa) z siedzibą przy ul. Drzymały 9 / 4, 78-100 Kołobrzeg; Tel. 660 791 170;`}
          {`
          `}
          {`
2. korespondencję w kwestiach związanych z ochroną danych osobowych należykierować na adres e-mail: contact@personashare.com;`}
          {`
`}
          {`
3. Pani/Pana dane osobowe przetwarzane będą w następujących celach:`}
          {`
`}
          {`
a.  realizacji umowy, której jest Pani/ Pan stroną, na podstawie art. 6 ust. 1 lit. b RODO,`}
          {`
`}
          {`
b. wypełnieniuobowiązków prawnych ciążących na administratorze danych osobowych, na podstawie art. 6 ust. 1 lit. c RODO;`}
          {`
          `}
          {`
c. realizacji dodatkowych świadczeń, w przypadku wyrażenia zgody na przetwarzanie Pana/Pani danych osobowych w tym celu, na podstawie art. 6 ust. 1 lit. a RODO;`}
          {`
`}
          {`
4. odbiorcą Pani/Pana danych osobowych mogąbyć: podmioty świadcząceusługi przechowywania danych i zarządzania nimi, o ile wyrazi Pani/Pan zgodę na przekazanie im Pani/Pana dane osobowe;`}
          {`
`}
          {`
5. Pani/Pana dane osobowe będą przechowywane przez okres niezbędny do wykonania umowy łączącejPanią/ Pana z PersonaShare Mateuszem Żukowskim i obowiązków z niej wynikających,jak również w celu dochodzenia roszczeń i obrony przed roszczeniami wynikających z biegu ogólnych terminów przedawnienia roszczeń i wydłużonych o pięć lat lub cofnięcia przez Panią/Pana zgody w określonym przez Panią/ Pana zakresie bez wpływu na zgodność z prawem przetwarzania, którego dokonano przed cofnięciem przez Panią/ Pana zgody (gdy takie przetwarzanie odbywa się na podstawie zgody);`}
          {`
`}
          {`
6. posiada Pani/Pan prawo dostępu do treści swoich danych oraz prawo ich sprostowania, usunięcia, ograniczenia przetwarzania, prawo do przenoszenia danych, prawo wniesienia sprzeciwu, prawo do cofnięcia zgody na ich przetwarzanie w dowolnym momencie bez wpływuna zgodność z prawem przetwarzania, którego dokonano na podstawie zgody wyrażonej przed jej cofnięciem;`}
          {`
          `}
          {`
7. przysługuje Pani/Panu prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych, gdy uzna Pani/Pan, iż przetwarzanie danych osobowych Pani/Pana dotyczących narusza przepisy RODO;`}
          {`
          `}
          {`
8. podanie przez Panią/Pana danych osobowych jest obowiązkowe i niezbędne w związku z zawartą z Panią/ Panem umową z PersonaShare Mateuszem Żukowskim, zaś w zakresie o którym mowa w pkt 4 powyżej dobrowolne, lecz konieczne do korzystania z serwisu;`}
          {`
          `}
          {`
9. powinna Pani/ powinien Pan, w swoim interesie, zadbać o niezwłoczną aktualizację podanych danych osobowych.
`}
        </InformativeText>
      </MainComponent>
      <StickyNavigation />
    </>
  );
};
