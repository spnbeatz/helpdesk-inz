export type LocationType = {
    id: string;
    name: string;
    city: string;
    type: "branch" | "warehouse";
    parent_id: string | null;
};

export const locations: LocationType[] = [
    { id: "LOC-001", name: "Magazyn IT Warszawa", city: "Warszawa", type: "warehouse", parent_id: "LOC-002" },
    { id: "LOC-002", name: "Oddział Warszawa", city: "Warszawa", type: "branch", parent_id: null },
    { id: "LOC-003", name: "Oddział Kraków", city: "Kraków", type: "branch", parent_id: null },
    { id: "LOC-004", name: "Magazyn IT Kraków", city: "Kraków", type: "warehouse", parent_id: "LOC-003" },
    { id: "LOC-005", name: "Oddział Wrocław", city: "Wrocław", type: "branch", parent_id: null },
    { id: "LOC-006", name: "Magazyn IT Wrocław", city: "Wrocław", type: "warehouse", parent_id: "LOC-005" },
    { id: "LOC-007", name: "Oddział Poznań", city: "Poznań", type: "branch", parent_id: null },
    { id: "LOC-008", name: "Magazyn IT Poznań", city: "Poznań", type: "warehouse", parent_id: "LOC-007" },
    { id: "LOC-009", name: "Oddział Gdańsk", city: "Gdańsk", type: "branch", parent_id: null },
    { id: "LOC-010", name: "Magazyn IT Gdańsk", city: "Gdańsk", type: "warehouse", parent_id: "LOC-009" },
    { id: "LOC-011", name: "Oddział Łódź", city: "Łódź", type: "branch", parent_id: null },
    { id: "LOC-012", name: "Magazyn IT Łódź", city: "Łódź", type: "warehouse", parent_id: "LOC-011" },
    { id: "LOC-013", name: "Oddział Katowice", city: "Katowice", type: "branch", parent_id: null },
    { id: "LOC-014", name: "Magazyn IT Katowice", city: "Katowice", type: "warehouse", parent_id: "LOC-013" },
    { id: "LOC-015", name: "Oddział Szczecin", city: "Szczecin", type: "branch", parent_id: null },
    { id: "LOC-016", name: "Magazyn IT Szczecin", city: "Szczecin", type: "warehouse", parent_id: "LOC-015" },
    { id: "LOC-017", name: "Oddział Lublin", city: "Lublin", type: "branch", parent_id: null },
    { id: "LOC-018", name: "Magazyn IT Lublin", city: "Lublin", type: "warehouse", parent_id: "LOC-017" },
    { id: "LOC-019", name: "Oddział Rzeszów", city: "Rzeszów", type: "branch", parent_id: null },
    { id: "LOC-020", name: "Magazyn IT Rzeszów", city: "Rzeszów", type: "warehouse", parent_id: "LOC-019" },
    { id: "LOC-021", name: "Serwis IT Warszawa", city: "Warszawa", type: "warehouse", parent_id: "LOC-002" },
];
