    import { SelectOptionsType } from "@/components/ui/controls/inputs/Select";
    
    export const sortTypes: SelectOptionsType[] = [{
        textValue: "Title",
        id: "title"
    }, {
        textValue: "Created Date",
        id: "created_at"
    }]; // do rozszerzenia

    export const sortDirections: SelectOptionsType[] = [{
        textValue: "Ascending",
        id: "asc"
    }, {
        textValue: "Descending",
        id: "desc"
    }];