import { OrderStatus, OrderItemType, OrderCreateType } from "./types";

export const REVIEWER_ID = "USR-004";

type OrderSeed = {
    ticket_id: string;
    product_id: string;
    quantity: number;
    status: OrderStatus;
    reason: string;
};

export type OrderItemCreateType = {
    item_id: string,
    quantity: number
}

export const orderSeeds: OrderSeed[] = [
    { ticket_id: "TCK-0002", product_id: "PRD-012", quantity: 1, status: "completed", reason: "Wymiana drukarki, która przestała być dostępna w sieci." },
    { ticket_id: "TCK-0003", product_id: "PRD-107", quantity: 1, status: "completed", reason: "Dysk diagnostyczny do odzyskania danych i analizy wolnej pracy komputera." },
    { ticket_id: "TCK-0007", product_id: "PRD-044", quantity: 2, status: "declined", reason: "Nośniki USB do przygotowania instalatorów aktualizacji Windows." },
    { ticket_id: "TCK-0008", product_id: "PRD-101", quantity: 1, status: "completed", reason: "Wymiana niesprawnych głośników stanowiska." },
    { ticket_id: "TCK-0009", product_id: "PRD-013", quantity: 1, status: "in_progress", reason: "Zastępcze urządzenie wielofunkcyjne na czas naprawy skanera." },
    { ticket_id: "TCK-0010", product_id: "PRD-071", quantity: 1, status: "accepted", reason: "Adapter sieciowy Ethernet jako obejście niestabilnego Wi-Fi." },
    { ticket_id: "TCK-0012", product_id: "PRD-109", quantity: 1, status: "completed", reason: "Zewnętrzny SSD do zabezpieczenia danych przed diagnostyką komputera." },
    { ticket_id: "TCK-0014", product_id: "PRD-006", quantity: 1, status: "completed", reason: "Wymiana monitora, który nie odbiera sygnału obrazu." },
    { ticket_id: "TCK-0015", product_id: "PRD-003", quantity: 1, status: "pending", reason: "Nowy laptop dla przygotowywanego stanowiska pracownika." },
    { ticket_id: "TCK-0017", product_id: "PRD-023", quantity: 1, status: "completed", reason: "Kamera internetowa do zastąpienia urządzenia niedziałającego w Teams." },
    { ticket_id: "TCK-0018", product_id: "PRD-107", quantity: 1, status: "accepted", reason: "Dysk zewnętrzny do archiwizacji danych przed zwolnieniem miejsca." },
    { ticket_id: "TCK-0019", product_id: "PRD-100", quantity: 1, status: "declined", reason: "Mikrofon USB do rozwiązania problemu z dźwiękiem." },
    { ticket_id: "TCK-0020", product_id: "PRD-045", quantity: 2, status: "in_progress", reason: "Toner zapasowy na potrzeby diagnostyki drukowania dokumentów PDF." },
    { ticket_id: "TCK-0021", product_id: "PRD-014", quantity: 1, status: "accepted", reason: "Switch zamienny do diagnostyki połączeń z serwerem." },
    { ticket_id: "TCK-0024", product_id: "PRD-036", quantity: 3, status: "completed", reason: "Przewody sieciowe do podłączenia i konfiguracji drukarki." },
    { ticket_id: "TCK-0028", product_id: "PRD-039", quantity: 2, status: "pending", reason: "Podstawki chłodzące do przegrzewających się laptopów." },
    { ticket_id: "TCK-0030", product_id: "PRD-007", quantity: 2, status: "completed", reason: "Dwa monitory do przygotowania nowego stanowiska." },
    { ticket_id: "TCK-0030", product_id: "PRD-019", quantity: 2, status: "completed", reason: "Klawiatury do przygotowania stanowiska." },
    { ticket_id: "TCK-0032", product_id: "PRD-036", quantity: 2, status: "in_progress", reason: "Przewody CAT6 do odtworzenia połączenia z dyskiem sieciowym." },
    { ticket_id: "TCK-0034", product_id: "PRD-034", quantity: 1, status: "completed", reason: "Kabel DisplayPort do uruchomienia drugiego monitora." },
    { ticket_id: "TCK-0037", product_id: "PRD-017", quantity: 2, status: "pending", reason: "Klawiatury bezprzewodowe w miejsce uszkodzonych." },
    { ticket_id: "TCK-0039", product_id: "PRD-004", quantity: 1, status: "in_progress", reason: "Komputer zastępczy na czas diagnozy jednostki, która nie uruchamia się." },
    { ticket_id: "TCK-0042", product_id: "PRD-070", quantity: 1, status: "accepted", reason: "Nowy czytnik kart Smart Card do stanowiska." },
    { ticket_id: "TCK-0043", product_id: "PRD-098", quantity: 1, status: "declined", reason: "Słuchawki USB w celu sprawdzenia jakości rozmów Teams." },
    { ticket_id: "TCK-0044", product_id: "PRD-092", quantity: 2, status: "completed", reason: "Kable do konfiguracji poczty na urządzeniach mobilnych." },
    { ticket_id: "TCK-0045", product_id: "PRD-012", quantity: 1, status: "pending", reason: "Drukarka zastępcza z powodu awarii urządzenia sieciowego." },
    { ticket_id: "TCK-0046", product_id: "PRD-019", quantity: 1, status: "accepted", reason: "Klawiatura przewodowa do wyeliminowania awarii skrótów." },
    { ticket_id: "TCK-0049", product_id: "PRD-002", quantity: 1, status: "in_progress", reason: "Laptop do konfiguracji nowego stanowiska." },
    { ticket_id: "TCK-0050", product_id: "PRD-072", quantity: 2, status: "accepted", reason: "Adaptery USB Bluetooth do diagnostyki zrywania połączeń." },
    { ticket_id: "TCK-0052", product_id: "PRD-014", quantity: 1, status: "pending", reason: "Switch zapasowy w związku z awarią internetu w biurze." },
    { ticket_id: "TCK-0053", product_id: "PRD-099", quantity: 1, status: "declined", reason: "Kamera USB do zastąpienia niedziałającej kamery laptopa." },
    { ticket_id: "TCK-0057", product_id: "PRD-108", quantity: 2, status: "accepted", reason: "Dyski zewnętrzne do tymczasowego przeniesienia danych z serwera." },
    { ticket_id: "TCK-0060", product_id: "PRD-026", quantity: 1, status: "pending", reason: "Stacja dokująca USB-C w miejsce uszkodzonej." },
    { ticket_id: "TCK-0060", product_id: "PRD-024", quantity: 1, status: "pending", reason: "Dodatkowa stacja dokująca dla drugiego stanowiska." },
    { ticket_id: "TCK-0002", product_id: "PRD-064", quantity: 5, status: "completed", reason: "Papier testowy do diagnostyki kolejki drukowania." },
    { ticket_id: "TCK-0014", product_id: "PRD-031", quantity: 2, status: "declined", reason: "Adapter HDMI do diagnostyki połączenia z monitorem." },
    { ticket_id: "TCK-0030", product_id: "PRD-021", quantity: 1, status: "in_progress", reason: "Zestaw klawiatura i mysz dla nowego pracownika." },
    { ticket_id: "TCK-0039", product_id: "PRD-076", quantity: 1, status: "accepted", reason: "UPS do zabezpieczenia stanowiska po awarii zasilania." },
    { ticket_id: "TCK-0017", product_id: "PRD-068", quantity: 1, status: "pending", reason: "Kamera konferencyjna jako alternatywa dla kamery internetowej." },
    { ticket_id: "TCK-0028", product_id: "PRD-027", quantity: 1, status: "declined", reason: "Zasilacz do diagnostyki wyłączania się laptopa." }, 
];

export const additionalProducts: Partial<Record<number, OrderItemCreateType[]>> = {
    0: [{ item_id: "PRD-064", quantity: 2 }],
    1: [{ item_id: "PRD-109", quantity: 1 }],
    4: [{ item_id: "PRD-045", quantity: 1 }],
    7: [{ item_id: "PRD-031", quantity: 1 }],
    8: [{ item_id: "PRD-019", quantity: 1 }, { item_id: "PRD-020", quantity: 1 }],
    12: [{ item_id: "PRD-064", quantity: 2 }],
    14: [{ item_id: "PRD-064", quantity: 1 }],
    16: [{ item_id: "PRD-019", quantity: 2 }, { item_id: "PRD-021", quantity: 1 }],
    19: [{ item_id: "PRD-036", quantity: 1 }],
    21: [{ item_id: "PRD-020", quantity: 1 }],
    22: [{ item_id: "PRD-027", quantity: 1 }],
    24: [{ item_id: "PRD-031", quantity: 1 }],
    25: [{ item_id: "PRD-076", quantity: 1 }],
    28: [{ item_id: "PRD-024", quantity: 1 }],
    34: [{ item_id: "PRD-026", quantity: 1 }]
};