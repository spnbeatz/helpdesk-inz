export type TicketType = {
    id: string;
    title: string;
    description: string;
    priorityId: string;
    status: "new" | "closed";
    categoryId: string;
    created_at: string;
    updated_at: string;
    resolved_at: string | null;
    resolution_minutes: number | null;
    technician_id: string | null;
    customer_id: string;
};

const ticketsSeed: Omit<TicketType, "created_at" | "updated_at" | "resolved_at" | "resolution_minutes">[] = [
    {
        id: "TCK-0001",
        title: "Problem z logowaniem do systemu",
        description: "Użytkownik otrzymuje komunikat o nieprawidłowym haśle mimo używania poprawnych danych.",
        priorityId: "231e1dd11ds",
        status: "new",
        categoryId: "CAT-004",
        technician_id: null,
        customer_id: "USR-001",
    },
    {
        id: "TCK-0002",
        title: "Brak dostępu do drukarki",
        description: "Drukarka sieciowa przestała być widoczna na komputerze użytkownika.",
        priorityId: "231e1dd11d1",
        status: "new",
        categoryId: "CAT-006",
        technician_id: "USR-002",
        customer_id: "USR-004",
    },
    {
        id: "TCK-0003",
        title: "Komputer bardzo wolno działa",
        description: "Komputer uruchamia się przez kilka minut i aplikacje reagują z dużym opóźnieniem.",
        priorityId: "231e1dd11d1",
        status: "new",
        categoryId: "CAT-001",
        technician_id: "USR-001",
        customer_id: "USR-002",
    },
    {
        id: "TCK-0004",
        title: "Reset hasła użytkownika",
        description: "Użytkownik nie pamięta hasła do konta firmowego.",
        priorityId: "231e1dd11dz",
        status: "closed",
        categoryId: "CAT-004",
        technician_id: "USR-003",
        customer_id: "USR-007",
    },
    {
        id: "TCK-0005",
        title: "Brak połączenia z VPN",
        description: "Połączenie VPN kończy się błędem podczas próby uwierzytelnienia.",
        priorityId: "231e1dd11ds",
        status: "new",
        categoryId: "CAT-003",
        technician_id: null,
        customer_id: "USR-003",
    },
    {
        id: "TCK-0006",
        title: "Outlook nie synchronizuje poczty",
        description: "Nowe wiadomości nie pojawiają się w aplikacji Outlook.",
        priorityId: "231e1dd11d1",
        status: "closed",
        categoryId: "CAT-005",
        technician_id: "USR-002",
        customer_id: "USR-005",
    },
    {
        id: "TCK-0007",
        title: "Błąd podczas aktualizacji systemu",
        description: "Aktualizacja systemu Windows zatrzymuje się na 75 procentach.",
        priorityId: "231e1dd11ds",
        status: "new",
        categoryId: "CAT-008",
        technician_id: "USR-001",
        customer_id: "USR-008",
    },
    {
        id: "TCK-0008",
        title: "Brak dźwięku w komputerze",
        description: "Głośniki są wykrywane, ale system nie odtwarza żadnego dźwięku.",
        priorityId: "231e1dd11dz",
        status: "closed",
        categoryId: "CAT-001",
        technician_id: "USR-003",
        customer_id: "USR-006",
    },
    {
        id: "TCK-0009",
        title: "Nie działa skaner",
        description: "Skaner nie jest wykrywany przez aplikację do skanowania dokumentów.",
        priorityId: "231e1dd11d1",
        status: "new",
        categoryId: "CAT-006",
        technician_id: null,
        customer_id: "USR-009",
    },
    {
        id: "TCK-0010",
        title: "Problem z połączeniem Wi-Fi",
        description: "Laptop traci połączenie z siecią Wi-Fi co kilka minut.",
        priorityId: "231e1dd11ds",
        status: "closed",
        categoryId: "CAT-003",
        technician_id: "USR-002",
        customer_id: "USR-001",
    },
    {
        id: "TCK-0011",
        title: "Instalacja programu księgowego",
        description: "Potrzebna instalacja oraz konfiguracja programu na nowym stanowisku.",
        priorityId: "231e1dd11d1",
        status: "new",
        categoryId: "CAT-009",
        technician_id: null,
        customer_id: "USR-010",
    },
    {
        id: "TCK-0012",
        title: "Zawieszający się komputer",
        description: "Komputer zawiesza się podczas pracy z dużymi plikami Excel.",
        priorityId: "231e1dd11ds",
        status: "closed",
        categoryId: "CAT-001",
        technician_id: "USR-001",
        customer_id: "USR-004",
    },
    {
        id: "TCK-0013",
        title: "Brak uprawnień do folderu",
        description: "Użytkownik nie może otworzyć firmowego folderu znajdującego się na serwerze.",
        priorityId: "231e1dd11d1",
        status: "new",
        categoryId: "CAT-004",
        technician_id: "USR-003",
        customer_id: "USR-002",
    },
    {
        id: "TCK-0014",
        title: "Monitor nie wyświetla obrazu",
        description: "Monitor pokazuje komunikat No Signal po uruchomieniu komputera.",
        priorityId: "231e1dd11ds",
        status: "closed",
        categoryId: "CAT-001",
        technician_id: "USR-002",
        customer_id: "USR-011",
    },
    {
        id: "TCK-0015",
        title: "Konfiguracja nowego użytkownika",
        description: "Utworzenie konta, konfiguracja poczty oraz dostępów do systemów firmowych.",
        priorityId: "231e1dd11dz",
        status: "new",
        categoryId: "CAT-004",
        technician_id: null,
        customer_id: "USR-012",
    },
    {
        id: "TCK-0016",
        title: "Błąd aplikacji CRM",
        description: "Aplikacja CRM zamyka się podczas otwierania profilu klienta.",
        priorityId: "231e1dd11ds",
        status: "new",
        categoryId: "CAT-002",
        technician_id: "USR-001",
        customer_id: "USR-003",
    },
    {
        id: "TCK-0017",
        title: "Problemy z kamerą internetową",
        description: "Kamera nie jest dostępna w Microsoft Teams.",
        priorityId: "231e1dd11d1",
        status: "closed",
        categoryId: "CAT-001",
        technician_id: "USR-003",
        customer_id: "USR-005",
    },
    {
        id: "TCK-0018",
        title: "Brak miejsca na dysku",
        description: "Dysk systemowy jest prawie całkowicie zapełniony.",
        priorityId: "231e1dd11d1",
        status: "new",
        categoryId: "CAT-001",
        technician_id: null,
        customer_id: "USR-007",
    },
    {
        id: "TCK-0019",
        title: "Nie działa mikrofon",
        description: "Mikrofon jest wykrywany przez system, ale nie przekazuje dźwięku.",
        priorityId: "231e1dd11dz",
        status: "closed",
        categoryId: "CAT-001",
        technician_id: "USR-002",
        customer_id: "USR-009",
    },
    {
        id: "TCK-0020",
        title: "Błąd podczas drukowania PDF",
        description: "Dokumenty PDF nie są poprawnie wysyłane do drukarki.",
        priorityId: "231e1dd11d1",
        status: "new",
        categoryId: "CAT-006",
        technician_id: "USR-001",
        customer_id: "USR-006",
    },
    {
        id: "TCK-0021",
        title: "Nie można połączyć się z serwerem",
        description: "Aplikacja zgłasza błąd połączenia z serwerem plików.",
        priorityId: "231e1dd11ds",
        status: "new",
        categoryId: "CAT-003",
        technician_id: null,
        customer_id: "USR-008",
    },
    {
        id: "TCK-0022",
        title: "Aktualizacja sterowników",
        description: "Prośba o aktualizację sterowników karty graficznej.",
        priorityId: "231e1dd11dz",
        status: "closed",
        categoryId: "CAT-008",
        technician_id: "USR-003",
        customer_id: "USR-010",
    },
    {
        id: "TCK-0023",
        title: "Błąd autoryzacji użytkownika",
        description: "Użytkownik zostaje wylogowany po kilku sekundach od zalogowania.",
        priorityId: "231e1dd11ds",
        status: "new",
        categoryId: "CAT-004",
        technician_id: "USR-002",
        customer_id: "USR-001",
    },
    {
        id: "TCK-0024",
        title: "Konfiguracja drukarki sieciowej",
        description: "Dodanie nowej drukarki sieciowej na kilku stanowiskach.",
        priorityId: "231e1dd11d1",
        status: "closed",
        categoryId: "CAT-006",
        technician_id: "USR-001",
        customer_id: "USR-011",
    },
    {
        id: "TCK-0025",
        title: "Nie działa aplikacja Teams",
        description: "Microsoft Teams nie uruchamia się po ostatniej aktualizacji.",
        priorityId: "231e1dd11d1",
        status: "new",
        categoryId: "CAT-002",
        technician_id: null,
        customer_id: "USR-004",
    },
    {
        id: "TCK-0026",
        title: "Podejrzane wiadomości e-mail",
        description: "Użytkownik otrzymuje dużą liczbę wiadomości wyglądających na phishing.",
        priorityId: "231e1dd11ds",
        status: "closed",
        categoryId: "CAT-007",
        technician_id: "USR-003",
        customer_id: "USR-012",
    },
    {
        id: "TCK-0027",
        title: "Zmiana uprawnień użytkownika",
        description: "Zmiana dostępu użytkownika do wybranych zasobów firmowych.",
        priorityId: "231e1dd11dz",
        status: "new",
        categoryId: "CAT-004",
        technician_id: "USR-002",
        customer_id: "USR-002",
    },
    {
        id: "TCK-0028",
        title: "Laptop przegrzewa się",
        description: "Laptop bardzo mocno się nagrzewa i wyłącza podczas większego obciążenia.",
        priorityId: "231e1dd11ds",
        status: "new",
        categoryId: "CAT-001",
        technician_id: null,
        customer_id: "USR-005",
    },
    {
        id: "TCK-0029",
        title: "Problem z synchronizacją kalendarza",
        description: "Wydarzenia dodane w telefonie nie pojawiają się w kalendarzu Outlook.",
        priorityId: "231e1dd11d1",
        status: "closed",
        categoryId: "CAT-005",
        technician_id: "USR-001",
        customer_id: "USR-006",
    },
    {
        id: "TCK-0030",
        title: "Instalacja nowego stanowiska",
        description: "Przygotowanie komputera, monitora, drukarki oraz podstawowego oprogramowania.",
        priorityId: "231e1dd11dz",
        status: "closed",
        categoryId: "CAT-009",
        technician_id: "USR-002",
        customer_id: "USR-010",
    },
    {
        id: "TCK-0031",
        title: "Nie działa logowanie do VPN",
        description: "Po wpisaniu danych logowania klient VPN zwraca błąd uwierzytelniania.",
        priorityId: "231e1dd11ds",
        status: "new",
        categoryId: "CAT-003",
        technician_id: null,
        customer_id: "USR-003",
    },
    {
        id: "TCK-0032",
        title: "Brak dostępu do dysku sieciowego",
        description: "Użytkownik nie widzi zamapowanego dysku sieciowego po uruchomieniu komputera.",
        priorityId: "231e1dd11d1",
        status: "new",
        categoryId: "CAT-003",
        technician_id: "USR-001",
        customer_id: "USR-007",
    },
    {
        id: "TCK-0033",
        title: "Problem z aktualizacją antywirusa",
        description: "Oprogramowanie antywirusowe nie może pobrać najnowszych aktualizacji baz.",
        priorityId: "231e1dd11ds",
        status: "closed",
        categoryId: "CAT-007",
        technician_id: "USR-003",
        customer_id: "USR-009",
    },
    {
        id: "TCK-0034",
        title: "Konfiguracja drugiego monitora",
        description: "Użytkownik potrzebuje pomocy przy podłączeniu i konfiguracji dodatkowego monitora.",
        priorityId: "231e1dd11dz",
        status: "closed",
        categoryId: "CAT-001",
        technician_id: "USR-002",
        customer_id: "USR-004",
    },
    {
        id: "TCK-0035",
        title: "Poczta nie dochodzi do odbiorców",
        description: "Wiadomości wysyłane z firmowego konta pozostają w skrzynce nadawczej.",
        priorityId: "231e1dd11ds",
        status: "new",
        categoryId: "CAT-005",
        technician_id: null,
        customer_id: "USR-011",
    },
    {
        id: "TCK-0036",
        title: "Błąd aplikacji magazynowej",
        description: "Aplikacja magazynowa wyświetla błąd podczas próby zapisania dokumentu.",
        priorityId: "231e1dd11d1",
        status: "closed",
        categoryId: "CAT-002",
        technician_id: "USR-001",
        customer_id: "USR-010",
    },
    {
        id: "TCK-0037",
        title: "Klawiatura przestaje działać",
        description: "Klawiatura losowo przestaje reagować i wymaga ponownego podłączenia.",
        priorityId: "231e1dd11dz",
        status: "new",
        categoryId: "CAT-001",
        technician_id: null,
        customer_id: "USR-006",
    },
    {
        id: "TCK-0038",
        title: "Brak dostępu do systemu HR",
        description: "Użytkownik otrzymuje komunikat o braku wymaganych uprawnień.",
        priorityId: "231e1dd11d1",
        status: "new",
        categoryId: "CAT-004",
        technician_id: "USR-003",
        customer_id: "USR-001",
    },
    {
        id: "TCK-0039",
        title: "Komputer nie uruchamia się",
        description: "Po naciśnięciu przycisku zasilania komputer nie reaguje.",
        priorityId: "231e1dd11ds",
        status: "closed",
        categoryId: "CAT-001",
        technician_id: "USR-002",
        customer_id: "USR-008",
    },
    {
        id: "TCK-0040",
        title: "Problem z formatowaniem dokumentu",
        description: "Dokument Word wyświetla nieprawidłowe formatowanie po otwarciu.",
        priorityId: "231e1dd11dz",
        status: "closed",
        categoryId: "CAT-002",
        technician_id: "USR-001",
        customer_id: "USR-005",
    },
    {
        id: "TCK-0041",
        title: "Brak dostępu do serwera plików",
        description: "Kilku użytkowników nie może połączyć się z serwerem plików.",
        priorityId: "231e1dd11ds",
        status: "new",
        categoryId: "CAT-003",
        technician_id: null,
        customer_id: "USR-012",
    },
    {
        id: "TCK-0042",
        title: "Nie działa czytnik kart",
        description: "Czytnik kart nie jest wykrywany przez komputer.",
        priorityId: "231e1dd11d1",
        status: "closed",
        categoryId: "CAT-001",
        technician_id: "USR-003",
        customer_id: "USR-002",
    },
    {
        id: "TCK-0043",
        title: "Problem z aplikacją Teams",
        description: "Połączenia w Microsoft Teams są przerywane po kilku minutach.",
        priorityId: "231e1dd11d1",
        status: "new",
        categoryId: "CAT-002",
        technician_id: "USR-002",
        customer_id: "USR-003",
    },
    {
        id: "TCK-0044",
        title: "Konfiguracja poczty na telefonie",
        description: "Potrzebna konfiguracja firmowej skrzynki pocztowej na urządzeniu mobilnym.",
        priorityId: "231e1dd11dz",
        status: "closed",
        categoryId: "CAT-005",
        technician_id: "USR-001",
        customer_id: "USR-007",
    },
    {
        id: "TCK-0045",
        title: "Błąd drukarki sieciowej",
        description: "Drukarka jest widoczna w systemie, ale dokumenty pozostają w kolejce.",
        priorityId: "231e1dd11d1",
        status: "new",
        categoryId: "CAT-006",
        technician_id: null,
        customer_id: "USR-004",
    },
    {
        id: "TCK-0046",
        title: "Nie działa skrót klawiaturowy",
        description: "Wybrane skróty klawiaturowe przestały działać po aktualizacji systemu.",
        priorityId: "231e1dd11dz",
        status: "closed",
        categoryId: "CAT-008",
        technician_id: "USR-002",
        customer_id: "USR-006",
    },
    {
        id: "TCK-0047",
        title: "Błąd synchronizacji OneDrive",
        description: "Pliki nie synchronizują się pomiędzy komputerem a chmurą.",
        priorityId: "231e1dd11d1",
        status: "new",
        categoryId: "CAT-002",
        technician_id: "USR-003",
        customer_id: "USR-010",
    },
    {
        id: "TCK-0048",
        title: "Podejrzane logowanie do konta",
        description: "Użytkownik otrzymał powiadomienie o logowaniu z nieznanego urządzenia.",
        priorityId: "231e1dd11ds",
        status: "new",
        categoryId: "CAT-007",
        technician_id: null,
        customer_id: "USR-011",
    },
    {
        id: "TCK-0049",
        title: "Konfiguracja nowego laptopa",
        description: "Przygotowanie laptopa dla nowego pracownika wraz z wymaganym oprogramowaniem.",
        priorityId: "231e1dd11d1",
        status: "closed",
        categoryId: "CAT-009",
        technician_id: "USR-001",
        customer_id: "USR-005",
    },
    {
        id: "TCK-0050",
        title: "Problem z połączeniem Bluetooth",
        description: "Laptop nie wykrywa bezprzewodowych słuchawek Bluetooth.",
        priorityId: "231e1dd11dz",
        status: "closed",
        categoryId: "CAT-001",
        technician_id: "USR-002",
        customer_id: "USR-009",
    },
    {
        id: "TCK-0051",
        title: "Nie można otworzyć pliku Excel",
        description: "Program Excel wyświetla błąd podczas próby otwarcia konkretnego dokumentu.",
        priorityId: "231e1dd11d1",
        status: "new",
        categoryId: "CAT-002",
        technician_id: null,
        customer_id: "USR-002",
    },
    {
        id: "TCK-0052",
        title: "Brak internetu w biurze",
        description: "Stanowisko nie ma dostępu do internetu mimo poprawnego połączenia z routerem.",
        priorityId: "231e1dd11ds",
        status: "new",
        categoryId: "CAT-003",
        technician_id: "USR-003",
        customer_id: "USR-008",
    },
    {
        id: "TCK-0053",
        title: "Problem z kamerą w laptopie",
        description: "Wbudowana kamera przestała działać po aktualizacji sterowników.",
        priorityId: "231e1dd11dz",
        status: "closed",
        categoryId: "CAT-001",
        technician_id: "USR-001",
        customer_id: "USR-003",
    },
    {
        id: "TCK-0054",
        title: "Błąd certyfikatu bezpieczeństwa",
        description: "Przeglądarka wyświetla ostrzeżenie dotyczące certyfikatu podczas wejścia do aplikacji.",
        priorityId: "231e1dd11ds",
        status: "new",
        categoryId: "CAT-007",
        technician_id: null,
        customer_id: "USR-012",
    },
    {
        id: "TCK-0055",
        title: "Zmiana nazwy komputera",
        description: "Potrzebna zmiana nazwy komputera zgodnie ze standardem firmowym.",
        priorityId: "231e1dd11dz",
        status: "closed",
        categoryId: "CAT-009",
        technician_id: "USR-002",
        customer_id: "USR-001",
    },
    {
        id: "TCK-0056",
        title: "Błąd podczas logowania do CRM",
        description: "Użytkownik zostaje przekierowany na stronę logowania po każdej próbie otwarcia CRM.",
        priorityId: "231e1dd11d1",
        status: "new",
        categoryId: "CAT-002",
        technician_id: "USR-003",
        customer_id: "USR-006",
    },
    {
        id: "TCK-0057",
        title: "Brak miejsca na serwerze",
        description: "Na serwerze plików kończy się dostępne miejsce na dane.",
        priorityId: "231e1dd11ds",
        status: "new",
        categoryId: "CAT-003",
        technician_id: null,
        customer_id: "USR-007",
    },
    {
        id: "TCK-0058",
        title: "Instalacja aktualizacji Windows",
        description: "Komputer wymaga instalacji zaległych aktualizacji systemowych.",
        priorityId: "231e1dd11dz",
        status: "closed",
        categoryId: "CAT-008",
        technician_id: "USR-001",
        customer_id: "USR-004",
    },
    {
        id: "TCK-0059",
        title: "Problem z synchronizacją kontaktów",
        description: "Kontakty z firmowej książki adresowej nie synchronizują się z telefonem.",
        priorityId: "231e1dd11d1",
        status: "closed",
        categoryId: "CAT-005",
        technician_id: "USR-002",
        customer_id: "USR-010",
    },
    {
        id: "TCK-0060",
        title: "Awaria stacji dokującej",
        description: "Stacja dokująca przestała wykrywać monitor oraz urządzenia USB.",
        priorityId: "231e1dd11ds",
        status: "new",
        categoryId: "CAT-001",
        technician_id: null,
        customer_id: "USR-005",
    },
];
// Stały pseudolosowy rozkład na podstawie ID (bez Math.random()).
// Dzięki temu dane nie zmieniają się przy każdym renderowaniu.
const seedFromId = (id: string): number =>
    Number(id.replace(/\D/g, "")) || 1;

const toLocalISOString = (date: Date): string => {
    const pad = (value: number) => String(value).padStart(2, "0");

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:00`;
};

const MINUTE = 60_000;


export const generateTickets = (now = new Date()): TicketType[] => {
    const today = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    );

    // Generator pseudolosowy - stabilne dane w ciągu jednego dnia
    let seed = today.getTime() % 2147483647;

    const random = () => {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
    };

    // Losowanie liczby całkowitej
    const randomInt = (min: number, max: number) =>
        Math.floor(random() * (max - min + 1)) + min;

    // Wagi dni - niektóre dni mają więcej zgłoszeń
    const dayWeights = Array.from({ length: 30 }, (_, index) => {
        const date = new Date(today);
        date.setDate(date.getDate() - index);

        const isWeekend = [0, 6].includes(date.getDay());

        return isWeekend
            ? random() * 0.4
            : 0.3 + random() * 2.5;
    });

    const totalWeight = dayWeights.reduce(
        (sum, weight) => sum + weight,
        0
    );

    const pickDay = () => {
        let value = random() * totalWeight;

        for (let i = 0; i < dayWeights.length; i++) {
            value -= dayWeights[i];

            if (value <= 0) return i;
        }

        return dayWeights.length - 1;
    };

    return ticketsSeed.map(ticket => {
        const daysAgo = pickDay();
        const hour = randomInt(8, 17);
        const minute = randomInt(0, 59);

        const created = new Date(today);
        created.setDate(created.getDate() - daysAgo);
        created.setHours(hour, minute, 0, 0);

        // Nie generuj przyszłych dat
        if (created > now) {
            created.setDate(created.getDate() - 1);
        }

        const isClosed = ticket.status === "closed";

        // Rozwiązanie od 30 minut do 3 dni po utworzeniu
        const durationMinutes = isClosed
            ? randomInt(30, 3 * 24 * 60)
            : null;

        const resolved = durationMinutes !== null
            ? new Date(
                Math.min(
                    created.getTime() + durationMinutes * MINUTE,
                    now.getTime()
                )
            )
            : null;

        const updated = resolved ?? new Date(
            Math.min(
                created.getTime() + randomInt(5, 360) * MINUTE,
                now.getTime()
            )
        );

        return {
            ...ticket,
            created_at: toLocalISOString(created),
            updated_at: toLocalISOString(updated),
            resolved_at: resolved
                ? toLocalISOString(resolved)
                : null,
            resolution_minutes: resolved
                ? Math.round(
                    (resolved.getTime() - created.getTime()) / MINUTE
                )
                : null,
        };
    });
};


export const ticketsList: TicketType[] = generateTickets();
