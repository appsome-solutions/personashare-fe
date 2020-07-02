import React from 'react';
import styled from 'styled-components';

const TermOfUseText = styled.div`
  color: ${(props) => props.theme.colors.utils.background.mid.color};
  text-align: center;
  white-space: pre-wrap;
  word-break: break-word;
`;

const TableStyle = styled.table`
  border: 1px solid black;
`;

const TrStyle = styled.tr`
  border: 1px solid black;
`;

const ThStyle = styled.th`
  border: 1px solid black;
`;

export const PACContent = () => (
  <TermOfUseText>
    <b>
      {`POLITYKA PRYWATNOŚCI
`}
    </b>
    {`Niniejsza polityka prywatności zawiera wymagane przez prawo informacje dotyczące przetwarzania danych osobowych przetwarzanych przez PersonaShareMateusza Żukowskiego, ul. Drzymały 9 / 4, 78-100 Kołobrzeg,`}
    <a href="email: contact@personashare.com"> contact@personashare.com</a>
    {` tel.:`} <a href="tel: 660791170"> 660791170</a>
    {`
`}
    <b>§1.</b>
    {`
Wszelkie zwroty bezpośrednie takie jak „Tobie”, „Ty”, „Ci” oraz podobne dotyczą użytkownika odwiedzającego stronę internetową(niezarejestrowanego): www.personashare.com lub użytkownika odwiedzającego stronę internetową (zarejestrowanego):www.personashare.com i korzystającego z jej usług (adresata niniejszej politykiprywatności).`}
    {`
2. Pozostałe definicje użyte w niniejszej 
Polityce Prywatności:
`}
    <b>a)</b>
    {` Dostawca - usługodawca świadczący usługę za pośrednictwem serwisu,będący jednocześnie Administratorem Danych Osobowych;
`}
    <b>b)</b>
    {` RODO - Rozporządzenie Parlamentu Europejskiego i Rady (UE) 2016/679 zdnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku zprzetwarzaniem danych osobowych i w sprawie swobodnego przepływutakich danych oraz uchylenia dyrektywy 95/46/WE (ogólne rozporządzenieo ochronie danych);
`}
    <b>c)</b>
    {` usługa –usługi świadczone przez Dostawcę i dostępne w serwisie;
`}
    <b>d)</b>
    {` serwis - strona internetowa: www.personashare.com oraz świadczona za jejpośrednictwem usługa;
`}
    <b>e)</b>
    {` dane osobowe/ dane- wszelkie uzyskane od Ciebie w ramach usługi iserwisu   informacje,   które   mogą   pozwolić   Cię   zidentyfikować,   szersządefinicję znajdziesz w art. 4 pkt 1 RODO;
`}
    <b>f)</b>
    {` przetwarzanie danych - operacja lub zestaw operacji jakie wykonuje się nadanych   osobowych   –   w   szczególności   zbieranie,   przechowywanie,wykorzystywanie tych danych.
`}
    <b>§2.</b>
    {`
Administratorem Twoich danych jest Dostawca, a więc: PersonaShare Mateusz Żukowski (działalność nierejestrowa), z siedzibą przy ul. Drzymały 9 / 4, 78 –100 Kołobrzeg, contact@personashare.com, Tel: 660791170.`}
    <b>§3.</b>
    {`
Dostawca stosuje odpowiednie środki techniczne i organizacyjne służąceochronie przetwarzanych danych osobowych przed ich udostępnieniemosobom nieupoważnionym, przypadkową lub niezgodną z prawem utratą lub zniszczeniem, niedozwolonemu ujawnieniu oraz wszelkimi niezgodnymi z prawem formami przetwarzania.
`}
    <b>§4.</b>
    {`
Dostawca przetwarza dane, które podajesz w ramach dostępnych na stronie formularzy lub pozostawiasz w ramach korzystania z Usług. Są to przede wszystkim dane niezbędne do udostępnienia Ci konta w serwisie oraz umożliwienia Ci korzystania z poszczególnych usług, dane związane z kontaktem z Dostawcą (formularze kontaktowe), jak również dane, które pozostawiasz w ramach poruszania się po serwisie, czyli m.in. te które znajdują się w tzw. plikach cookies.`}
    {`
`}
    <b>§5.</b>
    {`
`}
    <TableStyle>
      <TrStyle>
        <ThStyle>
          <b>Cel przetwarzania</b>
        </ThStyle>
        <ThStyle>
          <b>Podstawa prawna</b>
        </ThStyle>
        <ThStyle>
          <b>Okres przechowywania</b>
        </ThStyle>
      </TrStyle>
      <TrStyle>
        <ThStyle>Rejestracja w Serwisie</ThStyle>
        <ThStyle>Art. 6 ust. 1 lit. b RODO (przetwarzanie w celu wykonania umowy)</ThStyle>
        <ThStyle>
          Do momentu wygaśnięcia umowy pomiędzy Dostawcą a użytkownikiem – do momentu usunięcia konta użytkownika.
        </ThStyle>
      </TrStyle>
      <TrStyle>
        <ThStyle>Świadczenie usługi na rzecz Użytkowników</ThStyle>
        <ThStyle>Art. 6 ust. 1 lit. b RODO (przetwarzanie wcelu wykonania umowy)</ThStyle>
        <ThStyle>Do momentu przedawnienia roszczeń związanych z wykonaniem usługi.</ThStyle>
      </TrStyle>
      <TrStyle>
        <ThStyle>Prawidłowe funkcjonowanie serwisu,zapewnienie dostępu do serwisu</ThStyle>
        <ThStyle>Art. 6 ust. 1 lit. b RODO (przetwarzanie wcelu wykonania umowy)</ThStyle>
        <ThStyle>Do momentu przedawnienia roszczeń związanych z wykonaniem usługi.</ThStyle>
      </TrStyle>
      <TrStyle>
        <ThStyle>Pomiary statystyczne</ThStyle>
        <ThStyle>Art. 6 ust. 1 lit. b RODO (przetwarzanie wcelu wykonania umowy)</ThStyle>
        <ThStyle>Do momentu przedawnienia roszczeń związanych z wykonaniem usługi.</ThStyle>
      </TrStyle>
      <TrStyle>
        <ThStyle>Marketing własny</ThStyle>
        <ThStyle>Art. 6 ust. 1 lit. f RODO</ThStyle>
        <ThStyle>Do momentu zgłoszenia skutecznego sprzeciwu</ThStyle>
      </TrStyle>
      <TrStyle>
        <ThStyle> Wysyłka newslettera</ThStyle>
        <ThStyle>Art. 6 ust. 1 lit. f RODO</ThStyle>
        <ThStyle>Do momentu zgłoszenia skutecznego sprzeciwu</ThStyle>
      </TrStyle>
    </TableStyle>
    <b>§6.</b>
    {`
1. Podanie danych osobowych jest dobrowolne. Jednocześnie, podanie danych oznaczonych w ramach usługi jako niezbędne jest konieczne do świadczenia usług na Twoją rzecz. W przypadku gdy podasz nieprawdziwe lub nieprawidłowe dane osobowe Dostawca nie będzie mógł zrealizować usług na Twoją rzecz.
2. W przypadku uzyskania przez Dostawcę wiarygodnej wiadomości okorzystaniu z serwisu przez użytkownika niezgodnie z Regulaminem lub zobowiązującymi przepisami, Dostawca może przetwarzać dane osobowe użytkownika w zakresie niezbędnym do ustalenia jego odpowiedzialności.
`}
    <b>§7.</b>
    {`
1. Dostawca, w określonych okolicznościach, może przekazywać Twoje dane do innych podmiotów w tym także do podmiotów z państw trzecich (spoza Europejskiego Obszaru Gospodarczego). Są to zaufane podmioty przetwarzające, gwarantujące dochowanie zasad bezpieczeństwa przetwarzania, którym powierzono dokonanie pewnych czynności, tak aby najlepiej jak to możliwe zrealizować świadczone Ci usługi. 
2. Możliwe jest także przekazanie Twoich danych osobowych władzom państwowym, jednak tylko wówczas, gdy na Dostawcy będzie ciążył w takiej sytuacji prawny obowiązek wynikający z art. 6 ust. 1 lit. c RODO.
`}
    <b>§8.</b>
    {`
1. Przysługuje Ci:
a) prawo dostępu do Twoich danych, w tym do uzyskania kopii danych;
b) prawo żądania sprostowania danych;
c) prawo do usunięcia danych (w przypadkach przewidzianych w RODO);
d) prawo ograniczenia przetwarzania Twoich danych osobowych;
e) prawo do wycofania zgody – w zakresie w jakim Twoje dane sąprzetwarzane na podstawie tej zgody. Z zastrzeżeniem, że wycofanie zgodynie ma wpływu na zgodność z prawem przetwarzania, którego dokonano napodstawie zgody przed jej wycofaniem;
f) prawo do przenoszenia danych osobowych, tj. do otrzymania od administratora Twoich danych osobowych, w ustrukturyzowanym,powszechnie używanym formacie nadającym się do odczytu maszynowego.
g) prawo wniesienia skargi do organu nadzorczego – Prezesa Urzędu OchronyDanych Osobowych;
2. Aby skorzystać ze swoich praw skontaktuj się ze Dostawcą zapośrednictwem adresu e-mail: contact@personashare.com
`}
    <b>§9.</b>
    {`
Podmiotem zamieszczającym informacje w formie plików cookies (tzw. ciasteczek) i innych podobnych technologii w Twoim urządzeniu oraz uzyskującym do nich dostęp jest Dostawca oraz podmioty, którym Dostawca przekazuje Twoje dane, czyli przykładowo podmioty świadczące na rzecz Dostawcy usługi techniczne, w tym analityczne oraz marketingowe. Cookies stanowią dane informatyczne, w szczególności pliki tekstowe, które przechowywane są w urządzeniu końcowym Użytkownika serwisów i aplikacji WPM. Cookies zazwyczaj zawierają nazwę domeny serwisu internetowego, zktórego pochodzą, czas przechowywania ich na urządzeniu końcowym orazunikalny numer. Pliki cookies nie służą identyfikacji użytkownika i na ich podstawie nie jest ustalana tożsamość użytkownika. Strona internetowa może umieścić plik cookie w przeglądarce, jeśli przeglądarka to umożliwia.Przeglądarka zezwala stronie internetowej na dostęp jedynie do plików cookies umieszczonych przez tę stronę, a nie do plików umieszczonych przez innestrony internetowe.`}
    {`
`}
    <b>§10.</b>
    {`
1. Ze względu na okres funkcjonowania cookies i innych podobnych technologii, stosuje się dwa zasadnicze rodzaje tych plików: 4
a) sesyjne - pliki tymczasowe przechowywane w urządzeniu końcowym użytkownika do czasu wylogowania, opuszczenia strony internetowej i aplikacji lub wyłączenia oprogramowania (przeglądarki internetowej);
b) stałe - przechowywane w urządzeniu końcowym użytkownika przez czas określony w parametrach plików cookies lub do czasu ich usunięcia przez użytkownika.
2. Ze względu na cel, jakiemu służą pliki cookies i inne podobne technologie,stosuje się ich następujące rodzaje:
a) niezbędne do działania usługi i aplikacji - umożliwiające korzystanie znaszych usług, np. uwierzytelniające pliki cookies wykorzystywane do usługwymagających uwierzytelniania;
b) służące do zapewnienia bezpieczeństwa, np. wykorzystywane dowykrywania nadużyć w zakresie uwierzytelniania
c) wydajnościowe - umożliwiające zbieranie informacji o sposobie korzystaniaze stron internetowych i aplikacji;
d) funkcjonalne - umożliwiające "zapamiętanie" wybranych przez Użytkownika ustawień i personalizację interfejsu, np. w zakresie wybranego języka lub regionu, z którego pochodzisz;
e) reklamowe - umożliwiające dostarczanie treści reklamowych bardziej dostosowanych do Twoich zainteresowań;
f) statystyczne - służące do zliczana statystyk dotyczących stron internetowych i aplikacji.
`}
    <b>§11.</b>
    {`
 Pliki cookies i inne podobne technologie są stosowane w celach:
a) świadczenia usług;
b) dostosowywania zawartości serwisów i aplikacji do preferencji użytkownika oraz optymalizacji korzystania ze stron internetowych;
c) tworzenia statystyk, które pomagają zrozumieć, w jaki sposób użytkownicy korzystają ze serwisów i aplikacji, co umożliwia ulepszanie ich struktury i zawartości;
d) utrzymania sesji użytkownika (po zalogowaniu), dzięki czemu użytkowniknie musi na każdej podstronie internetowej danego serwisu i aplikacji ponownie wpisywać loginu i hasła;
e) prezentacji reklam, m.in. w sposób uwzględniający zainteresowania użytkownika czy jego miejsce zamieszkania i z gwarancją wyłączenia możliwości wielokrotnego prezentowania użytkownikowi tej samej reklamy.5`}
    {`
`}
    <b>§12.</b>
    {`
W wielu przypadkach oprogramowanie służące do przeglądania stron internetowych (przeglądarka internetowa) domyślnie dopuszcza przechowywanie informacji w formie plików cookies i innych podobnych technologii w urządzeniu końcowym użytkownika. Możesz w każdym czasie dokonać zmiany tych ustawień. Niedokonanie zmian oznacza, że w/w informacje mogą być zamieszczane i przechowywane w jego urządzeniu końcowym, a tym samym że Dostawca będzie przechowywać informacje w urządzeniu końcowym użytkownika i uzyskiwać dostęp do tych informacji. Z poziomu przeglądarki internetowej, z której korzystasz możliwe jest np.samodzielne zarządzanie plikami cookies. W najpopularniejszych przeglądarkach istnieje m.in. możliwość: zaakceptowania obsługi cookies, co umożliwia Ci pełne korzystanie z opcji oferowanych przez witryny internetowe;zarządzania plikami cookies na poziomie pojedynczych, wybranych przez Ciebie witryn; określania ustawień dla różnych typów plików cookie, naprzykład akceptowania plików stałych jako sesyjnych itp.; blokowania lubusuwania cookies. Kompleksowe informacje na ten temat dostępne są w ustawieniach oprogramowania (przeglądarki internetowej). Szczegóły dla osób korzystających z poszczególnych przeglądarek internetowych, m.in.: InternetExplorer, Mozilla Firefox, Chrome i innych. Ograniczenia bądź wyłączenia stosowania plików cookies i innych podobnych technologii mogą wpłynąć na niektóre funkcjonalności dostępne w serwisie.`}
    {`
`}
    <b>§13.</b>
    {`
Kontakt z Dostawcą w sprawie przetwarzania danych osobowych jest możliwy przez wysłanie wiadomości e-mail na adres: `}
    <a href="email: contact@personashare.com"> contact@personashare.com</a>
    {`
`}
    <b>§14.</b>
    {`
Niniejsza polityka prywatności może podlegać zmianom, w szczególności w celu dostosowania jej postanowień do zmieniającego się porządku prawnego.Obowiązująca wersja polityki prywatności jest dostępna pod adresem:
`}
    <a href="https:\\\\www.personashare.com/privacyandcookiespolicy">www.personashare.com/privacyandcookiespolicy</a>
    {`w formie umożliwiającej jej skopiowanie, pobranie na dysk twardy oraz wydruk.`}
  </TermOfUseText>
);
