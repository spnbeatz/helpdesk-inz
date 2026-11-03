# Helpdesk – dokumentacja modułu `orders/mock.ts`

Dokumentacja opisuje sposób korzystania z danych, zmiennych i funkcji dostępnych w mockach modułu **Orders + Inventory**. Obejmuje zarówno publiczne eksporty używane w aplikacji, jak i wewnętrzne funkcje oraz kolekcje wykorzystywane podczas generowania danych.

> **Założenie:** `PRD-*` to produkt/model z katalogu, a `EQ-*` to konkretny egzemplarz sprzętu. `order_items.item_id` odnosi się do produktu, nie do egzemplarza.

## 1. Główne zmienne – dane zamówień

Te kolekcje można importować bezpośrednio w serwisach, hookach i komponentach React.

| Nazwa | Opis |
|---|---|
| `ordersList` | Lista wszystkich zamówień. Zawiera ich status, powiązane zgłoszenie, daty, zamawiającego, odbiorcę oraz technika realizującego. |
| `orderItemsList` | Produkty przypisane do zamówień. Każdy rekord wskazuje zamówienie (`order_id`), produkt (`item_id`) i liczbę sztuk (`quantity`). |
| `orderHistoryList` | Historia zmian statusów zamówień. Przechowuje poprzedni i nowy status, datę, użytkownika wykonującego zmianę oraz opcjonalny komentarz. |
| `orderListItems` | Uproszczona lista zamówień przeznaczona do tabel i dashboardów. Zawiera dodatkowo `item_count`, `total_quantity`, `recipient_name` i `technician_name`. |
| `bareOrdersList` | Widok `ordersList` zadeklarowany jako `OrderType[]`. Nie usuwa pól z obiektów w trakcie działania – jest referencją do tej samej tablicy. |

### Przykład – filtrowanie zamówień i ich historii

```ts
import {
    ordersList,
    orderItemsList,
    orderHistoryList
} from "@/data/orders/mock";

// Wszystkie zamówienia oczekujące na decyzję
const pendingOrders = ordersList.filter(
    order => order.status === "pending"
);

// Produkty konkretnego zamówienia
const items = orderItemsList.filter(
    item => item.order_id === "ORD-001"
);

// Historia konkretnego zamówienia
const history = orderHistoryList.filter(
    event => event.order_id === "ORD-001"
);
```

## 2. Realizacja zamówień – Fulfillment

Te kolekcje opisują źródło sprzętu, postęp realizacji i powiązanie pozycji zamówienia z fizycznymi urządzeniami.

| Nazwa | Opis |
|---|---|
| `orderItemFulfillmentsList` | Realizacje poszczególnych pozycji zamówień. Określa źródło sprzętu (`local_stock`, `branch_transfer`, `supplier`), ilość, liczbę otrzymanych sztuk i status realizacji. |
| `fulfillmentEquipmentList` | Relacje między realizacjami a konkretnymi egzemplarzami sprzętu. Każdy rekord łączy `fulfillment_id` i `equipment_id`. |
| `orderFulfillmentTasksList` | Czynności technika wykonywane podczas realizacji zamówienia, np. odbiór, rejestracja, przygotowanie dokumentacji i przekazanie sprzętu. |
| `equipmentAssignmentsList` | Rezerwacje i przypisania sprzętu wygenerowane na potrzeby zamówień. Zawiera sprzęt, ticket, odbiorcę, technika, status i daty operacji. |

### Przykład – pobieranie realizacji danego zamówienia

```ts
import {
    orderItemsList,
    orderItemFulfillmentsList
} from "@/data/orders/mock";

const items = orderItemsList.filter(
    item => item.order_id === "ORD-001"
);

const itemIds = new Set(items.map(item => item.id));

const fulfillments = orderItemFulfillmentsList.filter(
    fulfillment => itemIds.has(fulfillment.order_item_id)
);
```

Dzięki tym rekordom strona szczegółów zamówienia może prezentować różne sytuacje jednocześnie: produkt pobrany z lokalnego magazynu, produkt w transporcie z innego oddziału i produkt zamówiony u dostawcy.

## 3. Inventory i dostawcy

| Nazwa | Opis |
|---|---|
| `equipmentList` (z `@/data/orders/mock`) | Końcowy, wygenerowany stan Inventory po uwzględnieniu realizacji zamówień. Obejmuje oryginalne urządzenia oraz egzemplarze dodane podczas symulacji pozyskania sprzętu. |
| `suppliersList` | Lista zewnętrznych dostawców IT, wykorzystywana przy realizacjach ze źródłem `supplier`. |
| `baseEquipmentList` | Bazowa lista urządzeń importowana wewnętrznie z `../equipments`, stanowiąca punkt wyjściowy generatora. Nie jest eksportowana z `orders/mock.ts` pod tą nazwą. |

> **Uwaga na importy:** `equipmentList` z `@/data/equipments` to bazowe urządzenia, natomiast `equipmentList` z `@/data/orders/mock` zawiera wynik symulacji. Jeżeli chcesz pokazywać stan magazynowy *po* realizacji przykładowych zamówień, korzystaj z tego drugiego źródła.

## 4. Eksportowana funkcja do pobierania szczegółów

| Funkcja | Opis |
|---|---|
| `getOrderDetails(orderId)` | Wyszukuje zamówienie po identyfikatorze i buduje szczegółowy obiekt z ticketem, użytkownikami, pozycjami, realizacjami, egzemplarzami sprzętu, historią statusów i checklistą technika. Zwraca `null`, jeśli zamówienie nie istnieje. |

### Przykład – szczegóły zamówienia

```ts
import { getOrderDetails } from "@/data/orders/mock";

const order = getOrderDetails("ORD-001");

if (order) {
    console.log(order.status);
    console.log(order.items);
    console.log(order.history);
    console.log(order.fulfillment_tasks);
    console.log(order.recipient);
    console.log(order.fulfillment_technician);
}
```

Właściwość `items` zawiera powiązane produkty i ich realizacje, a `history` – kolejne zmiany statusu zamówienia.

## 5. Prywatne funkcje pomocnicze generatora

Poniższe funkcje nie są eksportowane. Służą do wygenerowania mocków w chwili importowania modułu i nie powinny być wywoływane bezpośrednio z komponentów.

| Funkcja | Opis |
|---|---|
| `time(epoch)` | Zamienia czas Unix w milisekundach na zapis ISO 8601. Ogranicza datę do momentu uruchomienia generatora, żeby nie utworzyć dat w przyszłości. |
| `plusHours(iso, hours)` | Dodaje określoną liczbę godzin do daty ISO; jest używana m.in. do obliczania dat zatwierdzenia i realizacji zamówienia. |
| `plusYears(date, years)` | Dodaje lata do daty kalendarzowej; jest używana m.in. do generowania końca gwarancji nowo utworzonego sprzętu. |
| `warehouseForBranch(branchId)` | Wyszukuje magazyn powiązany z podanym oddziałem. Jeśli nie znajdzie pasującego magazynu, zwraca domyślny `LOC-001`. |
| `getRecipientBranch(userId)` | Ustala oddział odbiorcy na podstawie pola `location_id` użytkownika. |
| `supplierForProduct(productId)` | Wybiera przykładowego dostawcę na podstawie rodzaju produktu. |
| `isSharedEquipment(productId)` | Sprawdza, czy produkt należy do sprzętu współdzielonego, np. drukarek lub urządzeń sieciowych. |
| `sourceFromLocation(warehouseId, branchId)` | Określa, czy sprzęt pochodzi z magazynu lokalnego (`local_stock`), czy wymaga transferu z innego oddziału (`branch_transfer`). |
| `availableEquipment(productId, recipientBranch)` | Szuka dostępnego egzemplarza wybranego produktu. Preferuje sprzęt z lokalnego magazynu odbiorcy; pomija egzemplarze już wykorzystane w tej symulacji. |
| `equipmentSource(item, branch)` | Wybiera źródło realizacji produktu: istniejący magazyn albo dostawcę, jeśli brak dostępnego egzemplarza. |
| `addFulfillment(...)` | Tworzy rekord realizacji pozycji, określając ilość, status, źródło oraz daty, a następnie dodaje go do wewnętrznej listy. |
| `createNewEquipment(order, productId)` | Tworzy nowy egzemplarz `EQ-*` w mockowym Inventory, symulując pozyskanie sprzętu od dostawcy. |
| `linkEquipment(...)` | Łączy egzemplarz z realizacją zamówienia, aktualizuje jego stan oraz tworzy rekord rezerwacji albo wydania w `equipmentAssignmentsList`. |
| `summary(id)` | Buduje skrót danych użytkownika: `id`, `firstName`, `lastName`; zwraca `null`, gdy użytkownik nie istnieje lub identyfikator jest pusty. |
| `fullName(id)` | Zwraca imię i nazwisko użytkownika jako jeden tekst albo `null`. |

## 6. Wewnętrzne zmienne generatora

| Zmienna | Opis |
|---|---|
| `orderSeeds` | Dane wejściowe pierwotnych zamówień, importowane z pliku `seed`. |
| `additionalProducts` | Dodatkowe produkty pozwalające wygenerować zamówienia z wieloma pozycjami. |
| `REVIEWER_ID` | Identyfikator użytkownika pełniącego rolę zatwierdzającego w danych testowych. |
| `ticketMap` | Mapa zgłoszeń indeksowana po ID; przyspiesza wyszukiwanie powiązanego ticketa. |
| `userMap` | Mapa użytkowników indeksowana po ID. |
| `productMap` | Mapa produktów katalogowych indeksowana po ID. |
| `locationMap` | Mapa lokalizacji indeksowana po ID. |
| `now` | Moment inicjalizacji danych wykorzystywany przy ograniczaniu generowanych dat. |
| `technicians` | Lista ID pracowników IT używanych jako technicy przy tworzeniu mocków. |
| `rejectionReasons` | Przykładowe uzasadnienia decyzji `declined`. |
| `generated` | Tymczasowa lista wygenerowanych zamówień i ich pozycji; zasila `ordersList` oraz `orderItemsList`. |
| `historyCounter` | Licznik identyfikatorów rekordów historii statusów. |
| `inventory` | Robocza mapa egzemplarzy sprzętu, na której generator symuluje rezerwacje, wydania i zakupy. |
| `usedEquipment` | Zbiór ID egzemplarzy wykorzystanych w symulacji; zapobiega ponownemu przydzieleniu tego samego urządzenia. |
| `fulfillmentRows` | Wewnętrzna lista rekordów realizacji pozycji zamówień. |
| `fulfillmentLinks` | Wewnętrzna lista powiązań realizacji z egzemplarzami sprzętu. |
| `assignmentRows` | Wewnętrzna lista rezerwacji i przypisań sprzętu. |
| `fulfillmentCounter` | Licznik ID rekordów realizacji. |
| `newEquipmentNumber` | Numer kolejnego urządzenia `EQ-*` generowanego podczas symulacji. |
| `equipmentAssignmentCounter` | Licznik ID rekordów rezerwacji i przypisania. |
| `sortedOrders` | Lista zamówień posortowanych według daty utworzenia i ID, potrzebna do symulowania realizacji w stałej kolejności. |
| `taskKinds` | Zestaw rodzajów czynności realizacyjnych technika wykorzystywanych do budowy checklisty. |
| `equipmentById` | Mapa końcowego Inventory po ID, używana przy budowaniu szczegółów zamówienia. |

## 7. Gdzie korzystać z danych w aplikacji?

| Widok | Zalecane źródło |
|---|---|
| Orders Dashboard | `ordersList`, `orderListItems` |
| Orders Table | `getOrdersList()` z serwisu |
| Order Details | `getOrderDetails()` z mocka albo `getOrder()` z serwisu |
| Order Status Stepper | `orderHistoryList` lub pole `history` z widoku szczegółów |
| Order Fulfillment | `orderItemFulfillmentsList` lub realizacje w `items` |
| Fulfillment Checklist | `orderFulfillmentTasksList` |
| Inventory | `equipmentList` z `orders/mock.ts` |
| Equipment Assignments | `equipmentAssignmentsList` |
| Supplier Select | `suppliersList` |

## 8. Ograniczenia obecnej implementacji

### Dane są generowane przy imporcie modułu

Mocki są tworzone w chwili pierwszego załadowania modułu. Są oparte na aktualnym `ticketsList`, więc jeśli tickety mają dynamicznie generowane daty, wynik zależy od momentu inicjalizacji.

### Nie wszystkie eksporty są przeliczane po zmianach

`ordersList` i `orderItemsList` są mutowalnymi tablicami. Natomiast `orderListItems`, mapy pomocnicze oraz snapshot `equipmentList` są obliczane przy imporcie i nie odświeżają się automatycznie po wywołaniu `createOrder()`.

Jeżeli dodajesz zamówienia w trakcie działania aplikacji, potrzebujesz funkcji serwisowych pobierających aktualny stan albo centralnego mechanizmu aktualizacji mocków. Nie traktuj `orderListItems` jako zawsze aktualnej, żywej listy.

### Rekomendowana struktura aplikacji

- **Mock / seed** – wyłącznie początkowy stan i generator przykładowych rekordów.
- **Serwis Orders** – operacje tworzenia, zatwierdzania, zmiany statusu oraz pobierania zamówień.
- **TanStack Query** – pobieranie i odświeżanie danych na frontendzie, np. przez `invalidateQueries` po mutacji.
- **SQL w przyszłości** – zapis zamówienia, pozycji i historii w jednej transakcji.

> **Podsumowanie:** `orders/mock.ts` to źródło spójnych danych demonstracyjnych, nie pełnoprawna baza danych ani reaktywny store. Eksportowane kolekcje sprawdzają się w podglądzie i testowaniu UI, ale operacje modyfikujące powinny przechodzić przez serwis.
