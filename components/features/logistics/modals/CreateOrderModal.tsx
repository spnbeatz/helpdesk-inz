"use client"

import { Modal } from "@/components/composed/modals/Modal";
import { useEffect, useState } from "react";
import { OrderItemCreateType } from "@/data/orders/seed";
import { useAuth } from "@/providers/auth.provider";
import { useTicket, useTicketList } from "@/queries/tickets/tickets.query";
import { useEquipmentList, useInventoryProduct, useProduct } from "@/queries/logistics/logistics.query";
import { Section } from "@/components/ui/surfaces/Section";
import { Column, Row } from "@/components/ui/layout/flex";
import { Description, Input, Label, ScrollShadow, Autocomplete, Key, useFilter, SearchField, ListBox, EmptyState, Button, TextArea } from "@heroui/react";
import { LuCross, LuPlus, LuSearch, LuX } from "react-icons/lu";
import { useOrdersPageStore } from "@/store/pages/orders.store";
import { Title } from "@/components/ui/typography/Title";
import { Ticket } from "../../tickets/components/Ticket";
import { OrderCreateFormErrors, orderCreateFormValidation } from "@/validation/forms/OrderCreateFormValidation";
import { useCreateOrder } from "@/queries/logistics/logistics.mutation";
import { Indeterminate } from "@/components/ui/feedback/Indeterminate";
import { useModalStore } from "@/store/modals";
import { useProductsList } from "@/queries/logistics/logistics.query";


export type CreateOrderModalType = {
    ticketId?: string,
    itemId?: string
}

export const CreateOrderModal = ({ data = {} }: { data: CreateOrderModalType }) => {

    const { user } = useAuth();
    const { setCreateData, createData } = useOrdersPageStore();
    const [errors, setErrors] = useState<OrderCreateFormErrors | null>(null);
    const { openModal } = useModalStore();

    const {
        mutateAsync: createOrder,
        isPending,
        isSuccess,
        error
    } = useCreateOrder()

    useEffect(() => {
        setCreateData({
            ticket_id: data.ticketId,
            products: data.itemId
                ? [{ item_id: data.itemId, quantity: 1 }]
                : [],
            created_by_id: user?.id
        });
    }, [data.ticketId, data.itemId]);

    const handleCreateOrder = async () => {
        const validationErrors = orderCreateFormValidation(createData);

        console.log(validationErrors, "validation errors")
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        } else {
            setErrors(null);
            const result = await createOrder(createData);
            if (result) {
                openModal("confirmation", {
                    iconType: "info",
                    title: "Success",
                    description: `You have ordered items: 
                        ${createData.products.map((product) => product.item_id + " ")}`
                })
            }
        }


    }


    return (
        <Modal isOpen size="cover" className="w-[1000px]">
            <Column StartBetween className="w-full gap-4">
                <Title title="Create order" />
                <Row StartBetween className="w-full gap-6">
                    <Column Start className="w-full gap-2">
                        <ReasonContainer />
                        <TicketSelectContainer />
                    </Column>
                    <Column Start className="w-full gap-2">
                        <ProductsSelectContainer />
                    </Column>

                </Row>

                <Row CenterEnd className="w-full gap-2">
                    <ErrorText errors={errors} className="mr-auto gap-1" />
                    <Button variant="ghost">Cancel</Button>
                    <Button variant="outline" onClick={handleCreateOrder}>
                        Create
                        {isPending && <Indeterminate />}
                    </Button>
                </Row>
            </Column>

        </Modal>
    )
}

export const ErrorText = ({ errors, className }: { errors: Object | null, className?: string }) => {
    const text = (value: string) => (
        <Description className="text-red-500/70">{value}</Description>
    )

    return (
        <Column StartCenter className={className}>
            {errors && Object.values(errors).map((error) => text(error))}
        </Column>
    )
}

export const ReasonContainer = () => {
    const { createData, setCreateData } = useOrdersPageStore();
    return (
        <Section title="Reason">
            <TextArea
                className={"w-full"}
                rows={5}
                placeholder="Write a reason of order..."
                value={createData.reason}
                onChange={(e) => setCreateData({ reason: e.target.value })}
            />
        </Section>
    )

}

export const TicketSelectContainer = () => {

    const { user } = useAuth();

    const { createData, setCreateData } = useOrdersPageStore();
    const [searchValue, setSearchValue] = useState<string>();
    const { data: ticketList } = useTicketList({ searchValue, technicianId: user?.id, status: "new" })

    return (
        <Section title="Assign ticket" className="h-full">
            <Column Start className="w-full h-full gap-4">
                <Autocomplete
                    className={"w-full"}
                    selectionMode="single"
                    value={createData.ticket_id as Key}
                    onChange={(value: Key | null) => setCreateData({ ticket_id: value as string })}
                >
                    <Autocomplete.Trigger>
                        <Row Start className="gap-2">
                            <LuSearch />
                            <Description>{createData.ticket_id ? "Change ticket" : "Select ticket"}</Description>
                        </Row>
                        <Autocomplete.Indicator />
                    </Autocomplete.Trigger>
                    <Autocomplete.Popover>
                        <SearchField autoFocus aria-label="Search tickets" name="search" variant="secondary">
                            <SearchField.Group>
                                <SearchField.SearchIcon />
                                <SearchField.Input placeholder="Search ticket..." value={searchValue} onInput={(e) => setSearchValue(e.currentTarget.value)} />
                                <SearchField.ClearButton />
                            </SearchField.Group>
                        </SearchField>
                        <ListBox renderEmptyState={() => <EmptyState>No results found</EmptyState>}>
                            {ticketList?.map((item) => (
                                <ListBox.Item key={item.id} id={item.id} textValue={item.title}>
                                    <Row CenterBetween className="gap-2 w-full">
                                        <Label>{item.title}</Label>
                                        <Description>{item.id}</Description>
                                    </Row>
                                </ListBox.Item>
                            ))}
                        </ListBox>
                    </Autocomplete.Popover>
                </Autocomplete>
                <SelectedTicket />
            </Column>
        </Section>
    )
}

export const SelectedTicket = () => {
    const { createData } = useOrdersPageStore();
    const { data: ticketData } = useTicket(createData.ticket_id || undefined);

    if (!ticketData) return (
        <Column Center className="w-full h-full border p-4 border-gray-200/60 rounded-lg">
            <EmptyState className="py-6">No selected ticket</EmptyState>
        </Column>

    )

    return (
        <Ticket ticket={ticketData} />
    )
}

export const ProductsSelectContainer = () => {
    const { createData, setCreateData } = useOrdersPageStore();

    const [searchValue, setSearchValue] = useState("");

    const { data: productList = [] } = useProductsList({
        searchValue
    });

    // IDs aktualnie wybranych produktów
    const selectedItems = createData.products.map(
        (product) => product.item_id
    );

    // Obsługa zaznaczania i odznaczania produktów
    const handleSelectionChange = (keys: Key[]) => {
        const selectedIds = keys.map(String);

        // Zachowaj istniejące produkty oraz ich ilości
        const existingProducts = createData.products.filter(
            (product) => selectedIds.includes(product.item_id)
        );

        // Dodaj nowe produkty z quantity: 1
        const newProducts = selectedIds
            .filter(
                (id) => !createData.products.some(
                    (product) => product.item_id === id
                )
            )
            .map((id) => ({
                item_id: id,
                quantity: 1
            }));

        setCreateData({
            products: [...existingProducts, ...newProducts]
        });
    };

    // Usuwanie produktu
    const handleDeleteSelectedItem = (deleteKey: Key) => {
        setCreateData({
            products: createData.products.filter(
                (product) => product.item_id !== String(deleteKey)
            )
        });
    };

    // Zmiana ilości produktu
    const changeProductQuantity = (
        productId: string,
        value: number
    ) => {
        if (!Number.isInteger(value) || value < 1) return;

        setCreateData({
            products: createData.products.map((product) =>
                product.item_id === productId
                    ? { ...product, quantity: value }
                    : product
            )
        });
    };

    return (
        <Section title="Select products">
            <Column Start className="w-full gap-4">
                <Autocomplete
                    className="w-full"
                    selectionMode="multiple"
                    value={selectedItems}
                    placeholder="Select products"
                    onChange={(keys) =>
                        handleSelectionChange(keys as Key[])
                    }
                >
                    <Autocomplete.Trigger>
                        <Row Start className="gap-2">
                            <LuSearch />
                            <Description>Search products</Description>
                        </Row>
                        <Autocomplete.Indicator />
                    </Autocomplete.Trigger>

                    <Autocomplete.Popover>
                        <SearchField
                            autoFocus
                            aria-label="Search products"
                            name="search"
                            variant="secondary"
                        >
                            <SearchField.Group>
                                <SearchField.SearchIcon />
                                <SearchField.Input
                                    placeholder="Search products..."
                                    value={searchValue}
                                    onInput={(e) =>
                                        setSearchValue(e.currentTarget.value)
                                    }
                                />
                                <SearchField.ClearButton />
                            </SearchField.Group>
                        </SearchField>

                        <ListBox
                            renderEmptyState={() =>
                                <EmptyState>
                                    No results found
                                </EmptyState>
                            }
                        >
                            {productList.map(product => (
                                <ListBox.Item
                                    key={product.id}
                                    id={product.id}
                                    textValue={`${product.name} ${product.model}`}
                                >
                                    <Row CenterStart className="gap-2">
                                        <Label>{product.name}</Label>
                                        <Description>
                                            {product.manufacturer} {product.model}
                                        </Description>
                                    </Row>

                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                            ))}
                        </ListBox>
                    </Autocomplete.Popover>
                </Autocomplete>

                <Column
                    Center
                    className="w-full h-[350px] border border-gray-200/60 p-4 rounded-lg gap-2"
                >
                    <Description className="w-full">
                        Selected products
                    </Description>

                    {createData.products.length < 1 ? (
                        <Row Center className="h-full">
                            <EmptyState>
                                No selected products
                            </EmptyState>
                        </Row>
                    ) : (
                        <ScrollShadow className="h-full w-full">
                            {createData.products.map((product) => (
                                <Row
                                    key={product.item_id}
                                    CenterStart
                                    className="w-full relative group"
                                >
                                    <SelectedProduct
                                        product={product}
                                        changeQuantity={
                                            changeProductQuantity
                                        }
                                    />

                                    <LuX
                                        className="absolute cursor-pointer hidden group-hover:block right-5"
                                        onClick={() =>
                                            handleDeleteSelectedItem(
                                                product.item_id
                                            )
                                        }
                                    />
                                </Row>
                            ))}
                        </ScrollShadow>
                    )}
                </Column>
            </Column>
        </Section>
    );
};

export const SelectedProduct = ({
    product,
    changeQuantity
}: {
    product: OrderItemCreateType;
    changeQuantity?: (productId: string, value: number) => void;
}) => {
    const { data: productData } = useProduct(product.item_id);

    return (
        <Row CenterBetween className="w-full p-2 shadow-sm rounded-lg pr-10">
            <Column StartCenter className="w-full">
                <Description>{productData?.id}</Description>

                <Label>
                    {productData?.name} - {productData?.model}
                </Label>

                <Description>
                    {productData?.manufacturer}
                </Description>
            </Column>

            {changeQuantity && (
                <Input
                    type="number"
                    min={1}
                    className="w-[70px]"
                    value={product.quantity}
                    onChange={(e) => {
                        const quantity = Number(e.target.value);

                        if (Number.isInteger(quantity) && quantity > 0) {
                            changeQuantity(product.item_id, quantity);
                        }
                    }}
                />
            )}
        </Row>
    );
};
