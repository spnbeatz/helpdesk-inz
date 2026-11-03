"use client";

import {
    createContext,
    useContext,
    type ReactNode
} from "react";

export const createActionsContext = <
    TItem,
    TPermissions,
    THandlers
>(
    usePermissions: (item: TItem) => TPermissions,
    useHandlers: (item: TItem) => THandlers
) => {
    type ContextType = {
        item: TItem;
        permissions: TPermissions;
        handlers: THandlers;
    };

    const Context = createContext<ContextType | null>(null);

    const Provider = ({
        item,
        children
    }: {
        item: TItem;
        children: ReactNode;
    }) => {
        const permissions = usePermissions(item);
        const handlers = useHandlers(item);

        return (
            <Context.Provider
                value={{ item, permissions, handlers }}
            >
                {children}
            </Context.Provider>
        );
    };

    const useActionsContext = () => {
        const context = useContext(Context);

        if (!context) {
            throw new Error(
                "Action component must be used inside its Provider"
            );
        }

        return context;
    };

    return {
        Provider,
        useActionsContext
    };
};