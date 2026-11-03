"use client";

import { ActionButton, type ActionConfig } from "./ActionButton";

export const createActionButton = <
    TAction extends string,
    TPermissions,
    THandlers extends Record<TAction, () => void>
>(
    useContext: () => {
        permissions: TPermissions;
        handlers: THandlers;
    },
    getConfig: (
        permissions: TPermissions
    ) => Record<TAction, ActionConfig>
) => {
    return function GeneratedActionButton({
        action
    }: {
        action: TAction;
    }) {
        const { permissions, handlers } = useContext();

        const config = getConfig(permissions)[action];

        return (
            <ActionButton
                {...config}
                onClick={handlers[action]}
            />
        );
    };
};