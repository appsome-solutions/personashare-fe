import React from 'react';
import styled from 'styled-components';

const TermOfUseText = styled.div`
  color: ${(props) => props.theme.colors.utils.background.mid.color};
  text-align: center;
  white-space: pre-wrap;
  word-break: break-word;
`;

export const TOSContent = () => {
  return (
    <TermOfUseText>
      <b>
        {`REGULAMIN korzystania z serwisu www.personashare.com przez użytkowników
Art. I.
Postanowienia Ogólne
`}
      </b>
      <b>§1.</b>
      {`
Niniejszy regulamin (zwany dalej „Umową”) stanowi prawnie wiążącą umowę pomiędzy prywatną osobą fizyczną / konsumentem (zwaną dalej „Użytkownikiem”) lub osobą prawną / osobą fizyczną prowadzącą działalność gospodarczą / jednostką organizacyjną nieposiadającą osobowości prawnej, a posiadającą zdolność prawną (zwaną dalej „Firmą”) a PersonaShare Mateuszem Żukowskim (działalność nierejestrowa), adres: ul. Drzymały 9/4, 78-100 Kołobrzeg, kontakt:`}
      <a href="email: contact@personashare.com"> contact@personashare.com</a>
      {` tel.:`} <a href="tel: 660791170"> 660791170</a>
      {` (zwanego dalej „Dostawcą”).
`}
      <b>§2.</b>
      {`
Dodatkowe definicje i ich znaczenie w Umowie:
a) Persona – osobista karta / wizytówka / profil osoby. Na jednym koncie można mieć stworzonych wiele Person.
b) Spot - profil / karta firmowa / karta konferencji / karta miejsca / karta wydarzenia, itp. prezentująca informacje o danym Spocie. Zeskanowanie QR kodu Spota lub otworzenie go (innym sposobem) automatycznie zapisuje ten Spot w osobnej sekcji, aby Użytkownik / Firma mógł powrócić do tego Spota w dowolnym momencie.
c) Manager – Persona dodana do Spota przez osobę, która ten spot stworzyła (np. prelegenci na konferencji). Persona Managera jest widoczna dla wszystkich osób wyświetlających profil Spota. Manager może być zaproszony e-mailem z poziomu aplikacji.Na odbiór takich wiadomości e-mail wyrażają zgodę wszyscy Użytkownicy oraz Firmy korzystające z serwisu. Jednocześnie Użytkownik / Firma oświadcza, że jeżeli zaprasza do Spota osobę, która nie jest Użytkownikiem aplikacji, uzyskał/a uprzednio zgodę od tej osoby na przesłanie jej maila z zaproszeniem, a jej dane (Imię, Nazwisko i nazwa Spota) pojawią się w ww. mailu.
d) Uczestnik – Persona, która dołączyła do Spota poprzez przycisk „Dołącz” (ang.„Check-in”)(np. uczestnicy na konferencji). Persona Uczestnika jest widoczna dla wszystkich osób wyświetlających profil Spota.
e) Czynność rekomendacji – następuje po wciśnięciu przycisku „Rekomenduj” (ang. „Recommend”) przy Spocie lub Personie. Dzięki niej w profilu wyświetlają się Persony lub Spoty, które dana osoba poleca. Czynność rekomendacji jest czasowa, trwa 2 tygodnie i nie jest możliwe, aby ją wycofać. W Personie można rekomendować maksymalnie: 3 Persony i 3 Spoty na raz. W profilu osoby rekomendującej będą wyświetlać się profile osób rekomendowanych. Osoba rekomendująca pojawi się również w osobnej sekcji osobie rekomendowanej.
f) Czynność dołączenia do Spota – następuje po wciśnięciu przycisku „Dołącz” (ang. „Check-in”) przy Spocie. Od tej pory użytkownik staje się Uczestnikiem tego Spota.
g) Czynność zapisywania Persony – następuje po wciśnięciu przycisku „Zapisz” (ang. „Save”) przy Personie. Powoduje to zapisanie danej Persony do osobnej sekcji, aby mieć do niej dostęp później (bo nas np. zainteresowała). Każda Persona ma wgląd w Persony osób, które ich zapisały.
h) Serwis – platforma internetowa dostępna pod adresem https://www.personashare.com; należąca i zarządzana przez Dostawcę, za pośrednictwem której Dostawca świadczy usługi.
`}
      <b>§3.</b>
      {`
1. Dostawca oferuje Usługi (zdefiniowane poniżej) za pośrednictwem Serwisu w celu zapewnienia Użytkownikom i Firmom technicznych rozwiązań z zakresu umożliwiania przeglądania i tworzenia Person oraz Spotów Użytkowników lub Firm i wzajemnego polecania swoich Person lub Spotów osobom trzecim (dalej „Usługi”).
2 Jeżeli nie ustalono z Dostawcą inaczej w formie odrębnej umowy lub na mocy postanowień niniejszej Umowy, Usługi udostępnia się Użytkownikom i Firmomwy łącznie do osobistego, niekomercyjnego użytku.
`}
      <b>§4.</b>
      {`
1. Użytkownik oświadcza, że jest osobą fizyczną posiadającą pełną zdolność do czynności prawnych i będącą uprawnioną do zawarcia niniejszej Umowy oraz gwarantującą wykonanie jej postanowień w zakresie w jakim nakłada onaobowiązki na Użytkownika. Użytkownik oświadcza również, że jego aktywność wserwisie nie będzie naruszała praw innych osób / podmiotów.
2. Przedstawiciel Firmy, akceptujący postanowienia Umowy w jej imieniu, oświadcza że jest umocowany do samodzielnego przyjmowania zobowiązań narzecz Firmy, wskazanych w Umowie i gwarantuje wykonanie jej postanowień w zakresie w jakim nakłada ona obowiązki na Firmę. Przedstawiciel Firmy oświadcza również, że jego aktywność w serwisie nie będzie naruszała praw innych osób /podmiotów.
3. Wyłączenia odpowiedzialności po stronie Dostawcy dotyczą również osób odwiedzających serwis, które nie posiadają w nim zarejestrowanego konta.
`}
      <b>§5.</b>
      {`
Użytkownik / Firma przyjmuje do wiadomości i zgadza się, że Dostawca to dostawca usług technologicznych, który nie świadczy usług oferowanych przez poszczególnych Użytkowników lub Firmy posiadające konto w Serwisie ani w żadnym stopniu nie odpowiada za działania lub zaniechania Użytkowników i Firm posiadających konto w Serwisie.
`}
      <b>§6.</b>
      {`
1. Aby skorzystać z Usług, Użytkownik / Firma musi wyrazić zgodę na określone poniżej postanowienia. Po akceptacji niniejszej Umowy przez Użytkownika / Firmę, Użytkownik / Firma i Dostawca będą związani postanowieniami zawartymi wniniejszej Umowie.
2. Niezaakceptowanie niniejszej Umowy oznacza brak możliwości uzyskiwania dostępu do Usług oraz korzystania z nich.
3. Niniejsza Umowa zastępuje zawarte wcześniej umowy oraz porozumienia.
`}
      <b>Art. II.</b>
      {`
`}
      <b>Korzystanie z Usług</b>
      {`
`}
      <b>§7.</b>
      {`
1. W ramach korzystania z serwisu bez rejestracji Dostawca umożliwia Użytkownikom / Firmom przeglądanie Person lub Spotów innych Użytkowników /Firm i dostęp do treści w nich zawartych. Dostęp do nich następuje po zeskanowaniu kodu QR lub bezpośrednim przejściu do linku. Równocześnienie zarejestrowany Użytkownik / Firma jest w stanie poruszać się po serwisie w ograniczonym stopniu (np. poprzez kliknięcie na kartę Persony będzie w stanie wyświetlić jej profil). 
2. Niezarejestrowany Użytkownik / Firma może również skorzystać z wbudowanego skanera kodów QR.
3. Dla niezarejestrowanego Użytkownika / Firmy wszelkie aktywności wymagające zalogowania prowadzą pierwszo do ekranu rejestracji.
`}
      <b>§8.</b>
      {`
1. Dostawca, w ramach Usług, umożliwia zalogowanym Użytkownikom oraz Firmom stworzenie własnej Persony lub kilku Person wraz ze zdjęciem / grafiką, opisem tekstowym i dodatkowymi funkcjonalnościami (np. linki, filmy) oraz zawierającej ersony polecane innych Użytkowników lub Firm. Dostawca umożliwia również tworzenie Spotów dla zalogowanych Użytkowników / Firm z zastrzeżeniem pkt. 4.
2. W ramach poleceń, można wskazać maksymalnie trzy polecane Persony /Spoty.
3. Korzystanie z Person jest bezpłatne, jednak strony zgadzają się, że w przyszłości mogą zostać ustalone opłaty.
4. Korzystanie ze Spota jest bezpłatne w następującym zakresie:
a) do Spota można dodać maksymalnie trzech Managerów;
b) do Spota można dołączyć maksymalnie dwudziestu Uczestników;
c) Spot może być rekomendowany przez maksymalnie pięć Person;
d) Spot posiada ograniczenia edytorskie dotyczące jego opisu.
5. Aby skorzystać ze Spota w inny niż przedstawiony ustępie 4. powyżej sposób,należy skontaktować się ze Dostawcą mailowo lub telefonicznie w celu ustalenia indywidualnych warunków współpracy.6. Persona / Spot Użytkownika / Firmy jest widoczna/y dla wszystkich osób postronnych, posiadających dostęp do odpowiedniego kodu QR lub link lub w przypadku gdy jest on widoczny jako Persona / Spot polecana/y w Personie innego Użytkownika / Firmy. Karty Person mogą być również widoczne na Spotach jako Uczestnik lub Manager.
7. Założenie konta w Serwisie przez Użytkownika / Firmę wymaga odpowiednio akceptacji niniejszej Umowy oraz podania następujących danych:
1) W przypadku Użytkownika: adres e-mail oraz przy tworzeniu Persony imię i nazwisko oraz zdjęcie przedstawiające osobę tworzącą Personę
2) W przypadku Firmy: adres e-mail oraz przy tworzeniu Persony imię i nazwisko oraz zdjęcie osoby umocowanej do samodzielnego przyjmowania zobowiązań narzecz Firmy, wskazanych w Umowie i gwarantującej wykonanie jej postanowień w zakresie w jakim nakłada ona obowiązki na Firmę oraz w przypadku tworzenia Spota dotyczącego Firmy: nazwy Firmy.
`}
      <b>Art. III. </b>
      {`
`}
      <b>Odpowiedzialność</b>
      {`
`}
      <b>§9.</b>
      {`
1. Dostawca nie gwarantuje dostępności ani właściwego funkcjonowania Usług.
2.Użytkownik / Firma przyjmuje do wiadomości i zgadza się, że Usługi mogą byćniedostępne w dowolnym czasie i z dowolnego powodu. Ponadto w przypadku Usług mogą występować ograniczenia, opóźnienia oraz inne problemy nieodłącznie związane z korzystaniem z Internetu i komunikacji elektronicznej,zaś Dostawca nie odpowiada za żadne opóźnienia, problemy z przesyłaniem ani inne szkody czy straty wynikające z takich problemów.
3. Użytkownik / Firma zwalnia (i na życzenie Dostawcy udzieli pomocy w zakresie postępowania sądowego) Dostawcę, jego pracowników, pełnomocników,następców prawnych i cesjonariuszy z wszelkiej odpowiedzialności, obowiązkupokrycia wydatków (w tym honorariów adwokackich), wypłaty odszkodowań,opłacenia kar, grzywien, składek na ubezpieczenie społeczne oraz podatków wynikających lub powiązanych z roszczeniem podmiotów zewnętrznych bezpośrednio lub pośrednio związanym z korzystaniem z Usług przez Użytkownika / Firmę.
`}
      <b>§10.</b>
      {`
1. Rejestracja konta wymaga przekazania Dostawcy określonych danychosobowych.
2. Użytkownik / Firma zobowiązuje się, że dane zapisane na jego koncie będą rzetelne, kompletne i aktualne. Niewywiązanie się z obowiązku zapewnieniarzetelności, kompletności oraz aktualności danych konta, może uniemożliwić uzyskiwanie dostępu do Usług oraz korzystanie z nich.
3.Użytkownik / Firma ponosi odpowiedzialność z tytułu wszelkich czynności realizowanych za pośrednictwem jego konta, jak również zobowiązuje się zawsze zabezpieczać i utrzymywać w tajemnicy nazwę użytkownika oraz hasło do konta.O ile Dostawca wyraźnie nie dopuści innej możliwości, Użytkownik / Firma może mieć tylko jedno konto.
`}
      <b>§11.</b>
      {`
1. Użytkownikowi / Firmie nie wolno zezwalać osobom trzecim na korzystanie z jego / jej konta.
2. Użytkownikowi / Firmie nie wolno, bez uprzedniej zgody Dostawcy, dokonać cesji ani w inny sposób przenieść swojego konta na rzecz żadnej innej osoby ani podmiotu.
3. Użytkownik / Firma zobowiązuje się przestrzegać wszystkich przepisów obowiązującego prawa podczas korzystania z Usług i może korzystać z Usług tylko w celach zgodnych z prawem i niniejszą Umową oraz wyłącznie w dobrej wierze.
4. W ramach korzystania z Usług Użytkownikowi / Firmie nie wolno utrudniać,przeszkadzać, powodować niewygody ani szkód majątkowych zarówno, Dostawcy jak i innym osobom trzecim w tym pozostałym Użytkownikom / Firmom.
5. Zabrania się korzystania z Usług w innym celu niż wyraźnie dozwolony przez Dostawcę; dekompilowania, odtwarzania kodu źródłowego oraz rozkładania Usługna czynniki składowe, z wyjątkiem przypadków, w których dopuszczają to przepisy obowiązującego prawa; doprowadzania do uruchomienia jakich kolwiek programów ub skryptów w celu ekstrakcji danych techniką scrapingu,indeksowania, badania lub stosowania innych technik pozyskiwania danych (datamining) z jakiej kolwiek części Usług, jak również nadmiernego obciążania lub uniemożliwiania działania lub ograniczania funkcjonalności jakiegokolwiek aspektu Usług; lub podejmowania prób uzyskania nieupoważnionego dostępu lub ograniczania jakiegokolwiek aspektu Usług lub związanych z nimi systemów lub sieci.
6. Użytkownik / Firma jest wyłącznie odpowiedzialny/a za treści udostępniane przez siebie w ramach profilu w Serwisie. Użytkownik / Firma zobowiązuje się do korzystania z Serwisu wyłącznie w dobrej wierze. Zabronione jest w szczególności przekazywanie treści, które mogą narazić na niebezpieczeństwo innych Użytkowników / Firmy (linki do wirusów, złośliwego oprogramowania,podejrzanych stron, stron zabronionych, stron pornograficznych itp.). Zabronione jest również przekazywanie treści wulgarnych, oczerniających, dyskryminującychczy obraźliwych. Jednocześnie Użytkownik / Firma akceptuje fakt, że treści udostępnione przez Użytkownika / Firmę mogą zostać usunięte przez Dostawcę w uzasadnionych przypadkach, w tym w szczególności, gdy istnieje podejrzenie, że mogą one naruszać przepisy powszechnie obowiązującego prawa w tym prawa osób trzecich, wedle wyłącznego uznania Dostawcy.
`}
      <b>§12.</b>
      {`
Dostawca nie będzie ponosić odpowiedzialności na mocy niniejszej Umowy ani w związku z niniejszą Umową z tytułu jakichkolwiek z następujących szkód,niezależnie do tego, czy byłaby to odpowiedzialność umowna, deliktowa czy oparta na innych przepisach prawa, nawet jeśli daną osobę nie poinformowano o możliwości wystąpienia takich szkód: 
a) wszelkie szkody przypadkowe, szczególne, przykładowe, wynikowe, odszkodowania retorsyjne lub inne pośrednie szkody dowolnego typu czy rodzaju;lub
b)szkody majątkowe Użytkownika / Firmy lub jakiegokolwiek podmiotu zewnętrznego lub też utrata danych, utrata transakcji, przychodu, zysków, możliwości użytkowania lub innych korzyści ekonomicznych.
`}
      <b>§13.</b>
      {`
Użytkownik / Firma przyjmuje do wiadomości i zgadza się, że o wszelkich roszczeniach, które żytkownik / Firma wnosi wobec Dostawcy, należy poinformować Dostawcę w ciągu 1 (jednego) roku po zaistnieniu wydarzenia,które było podstawą takiego roszczenia oraz że Użytkownik / Firma zrzeka się wszystkich praw w odniesieniu do takiego roszczenia, jeśli tego nie zrobi. Takie ograniczenia nie mają na celu ograniczenia odpowiedzialności,której nie można wyłączyć na podstawie przepisów obowiązującego prawa. W takiej sytuacji postanowienie to uznaje się za nieważne.
`}
      <b>Art. IV.</b>
      {`
`}
      <b>Reklamacje</b>
      {`
`}
      <b>§14.</b>
      {`
1.Dostawca odpowiada w ograniczonym zakresie wyłącznie za właściwe świadczenie usług (ich dostępność i poprawne działanie techniczne) w ramach Serwisu i w żadnym przypadku nie odpowiada za jakiekolwiek usługi świadczone przez Użytkownika / Firmę w związku z posiadaniem konta w Serwisie.
2.Reklamacje dot. usług świadczonych przez Dostawcę należy składać na adres email: `}
      <a href="email: contact@personashare.com"> contact@personashare.com</a>
      {` tel.:`} <a href="tel: 660791170"> 660791170</a>{' '}
      {` (zwanego dalej „Dostawcą”).
`}
      {`
3.Dostawca w ciągu maksymalnie 14 (czternastu) dni ustosunkuje się dootrzymanej reklamacji, z zastrzeżeniem, że Użytkownik / Firma akceptującniniejszą Umowę jest świadomy/a i zgadza się na wyłączenie odpowiedzialności Dostawcy za problemy techniczne oraz innego rodzaju błędy w działaniu Usług w tym w szczególności za błędy spowodowane działaniem siły wyższej.
`}
      <b>Art. V.</b>
      {`
`}
      <b>Czas trwania umowy</b>
      {`
`}
      <b>§15.</b>
      {`
Niniejsza Umowa wchodzi w życie w dniu zaakceptowania jej przez Użytkownika /Firmę i będzie obowiązywać do momentu jej wygaśnięcia w sposób opisany wniniejszej Umowie (umowa na czas nieokreślony). Niezalogowany (niezarejestrowany) Użytkownik / Firma przyjmuje do wiadomości i zgadza się, że niniejsza Umowa obowiązuje go od momentu rozpoczęcia korzystania z serwisu.
`}
      <b>§16.</b>
      {`
1. Każda ze stron może skutecznie rozwiązać niniejszą Umowę:
a) bez podania przyczyny w dowolnym momencie za uprzednim poinformowaniem drugiej strony z zastrzeżeniem, że w przypadku zarejestrowanego Użytkownika / Firmy jest to realizowane poprzez usunięcie /dezaktywowanie swojego konta w ramach Usług i zaprzestanie użytkowania serwisu, natomiast niezarejestrowanego (niezalogowanego) poprzez zaprzestanie użytkowania serwisu;
b) ze skutkiem natychmiastowym, bez wypowiedzenia, w przypadku istotnego naruszenia postanowień niniejszej Umowy przez drugą stronę; lub
c) ze skutkiem natychmiastowym, bez wypowiedzenia, w przypadku niewypłacalności lub upadłości drugiej strony.
2. Ponadto Dostawca może rozwiązać niniejszą Umowę lub dezaktywować konto Użytkownika/Firmy ze skutkiem natychmiastowym, bezwypowiedzenia, w odniesieniu do Użytkownika / Firmy, w przypadku gdy Użytkownik / Firma niekwalifikuje się już – na mocy przepisów obowiązującego prawa lub standardów i polityk Dostawcy – do korzystania z usług, czy też w innym zakresie podanym w niniejszej Umowie (np. utrata pełnej zdolności do czynności prawnych).
3. Użytkownik / Firma, którzy rozwiązali umowę nie są zwolnieni z odpowiedzialności za szkody wyrządzone Dostawcy lub innym Użytkownikom /Firmom lub wykorzystywanie serwisu lub danych w nim zawartych (również danych przekazywanych przez innych Użytkowników / Firmy) w sposób niezgodny z ich przeznaczeniem lub w złej wierze (w tym zbieraniem tych danych w automatyczny lub nieautomatyczny sposób) nawet po rozwiązaniu umowy.
`}
      <b>§17.</b>
      {`
Wygaśnięcie niniejszej umowy nie powoduje wygaśnięcia zobowiązań związanych z działalnością Użytkownika / Firmy podjętą w czasie obowiązywania niniejszej Umowy w tym w szczególności związanych z ewentualnymi rozliczeniami oraz odpowiedzialnością Użytkownika / Firmy wobec Dostawcy.
`}
      <b>Art. VI.</b>
      {`
`}
      <b>Postanowienia końcowe</b>
      {`
`}
      <b>§18.</b>
      {`
Jeżeli które kolwiek z postanowień niniejszej Umowy zostanie uznane za niezgodne z prawem, nieważne lub niewykonalne w całości lub w części, na mocy jakichkolwiek obowiązujących przepisów prawa, to postanowienie lub jego część zostanie w tym zakresie uznane za niestanowiące części niniejszej Umowy,natomiast pozostaje to bez uszczerbku dla zgodności z prawem, ważności oraz wykonalności pozostałych postanowień niniejszej Umowy. W takimp rzypadku,strony niezwłocznie zastąpią niezgodne z prawem, nieważne lub niewykonalne postanowienie lub jego część postanowieniem lub częścią postanowienia, które będzie zgodne z prawem, ważne i wykonalne i które, w maksymalnym możliwym zakresie, będzie miało podobny skutek co niezgodne zprawem, nieważne lub niewykonalne postanowienie lub część postanowienia,uwzględniając treść oraz cel niniejszej Umowy. Niniejsza Umowa stanowi całość umowy oraz porozumienia zawartego między stronami w odniesieniu do jej przedmiotu i zastępuje oraz jest nadrzędna względem wszystkich wcześniejszych lub zawartych równolegle umów lub porozumień dotyczących jej przedmiotu.
`}
      <b>§19.</b>
      {`
W niniejszej Umowie sformułowania „w tym” oraz formy słowa „obejmować” oznaczają „w tym w szczególności”.
`}
      <b>§20.</b>
      {`
1.Użytkownik / Firma nie ma prawa przenieść praw ani obowiązków wynikających z niniejszej Umowy w całości ani w części bez uzyskania uprzedniej wyraźnej zgody Dostawcy.
2.Użytkownik / Firma udziela Dostawcy zgody na przeniesienie praw i obowiązków wynikających z niniejszej Umowy w całości lub w części na:
a) jednostkę stowarzyszoną lub jednostkę zależną;
b) podmiot przejmujący udziały Dostawcy, jej przedsiębiorstwo lub majątek w całości lub części; lub
c)następcę prawnego.
`}
      <b>§21.</b>
      {`
1.W przypadku zaistnienia sporu między Dostawcą a Użytkownikiem / Firmą,będzie on rozstrzygany przez sąd, którego właściwość zostanie wyznaczona zgodnie z przepisami polskiego prawa.
2.Spory, o ile to możliwe, w pierwszej kolejności powinny być rozwiązywanemiędzy stronami na drodze polubownej, co nie oznacza zapisu na sądpolubowny.
3.O ile obowiązujące przepisy prawa dopuszczają taką możliwość, sądem właściwym dla rozwiązania sporu jest sąd właściwy dla siedziby Dostawcy.
`}
      <b>§22.</b>
      {`
Niniejsza Umowa jest dostępna do wglądu w formie elektronicznej na stronie internetowej https:\\\\www.personashare.com\\termsofuse w formacie umożliwiającym pobranie jej na dysk twardy, odczyt oraz wydruk.
`}
      <b>§23.</b>
      {`
1.Dostawca przetwarza dane osobowe Użytkowników zgodnie z prawem.
2.Szczegółowe zasady gromadzenia i wykorzystywania przez Dostawcę danych osobowych w związku z Usługami określono w Polityce Prywatności, dostępnej pod adresem https:\\\\www.personashare.com\\privacyandcookiespolicy.
`}
      <b>§24.</b>
      {`
Wszelkie powiadomienia dostarczane Użytkownikowi / Firmie przez Dostawcę na mocy niniejszej Umowy będą dostarczane pocztą elektroniczną na adres e-mail powiązany z kontem Użytkownika / Firmy lub poprzez ich publikacją na portalu internetowym dostępnym dla Użytkownika / Firmy pod adresem:https:\\\\www.personashare.com
`}
      <b>§25.</b>
      {`
1.Dostawca zastrzega sobie prawo wprowadzania zmian do postanowień niniejszej Umowy w dowolnym momencie, za uprzednim poinformowaniem oplanowanych zmianach, przy czym zmiany te będą wchodzić w życie w momencie opublikowania zaktualizowanej wersji niniejszej Umowy, w Serwisie dostępnym dla Użytkownika / Firmy w ramach Usług.
2.Dostawca zastrzega sobie prawo okresowego modyfikowania wszelkich informacji, do których prowadzą łącza (linki / adresy) zamieszczone w niniejszej Umowie. Użytkownik / Firma niniejszym przyjmuje do wiadomości i potwierdza, że korzystając z Usług będzie związany postanowieniami wszelkich wprowadzanych w przyszłości zmian oraz uzupełnień niniejszej Umowy, informacji, do których prowadzą łącza zamieszczone w niniejszej Umowie lub też dokumentów włączonych w zakres niniejszej Umowy.
3.Dalsze korzystanie z Usług po każdej takiej zmianie stanowić będzie zgodę Użytkownika / Firmy na takie zmiany.
`}
      <b>§26.</b>
      {`
1.Korzystanie przez Użytkownika / Firmę z Usług może podlegać postanowieniom dodatkowym, takim jak polityki lub warunki dotyczące konkretnych funkcji i funkcjonalności, które mogą być okresowo modyfikowane (zwane dalej „Postanowieniami Dodatkowymi„).Użytkownikowi / Firmie mogą być od czasu do czasu przedstawiane określone Postanowienia Dodatkowe.
2.Postanowienia Dodatkowe stanowią uzupełnienie i będą uważane za część niniejszej Umowy. W przypadku sprzeczności Postanowienia Dodatkowe będą mieć znaczenie nadrzędne względem niniejszej Umowy.`}
    </TermOfUseText>
  );
};
