"use client"

import { ModalManager } from "@/components/modals/ModalManager"
import { AuthGuard } from "@/guards/auth.guard"
import { AuthProvider } from "@/providers/auth.provider"
import { QueryProvider } from "@/providers/query.provider"

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <QueryProvider>
            <AuthProvider>
                <AuthGuard>
                    {children}
                    <ModalManager />
                </AuthGuard>
            </AuthProvider>
        </QueryProvider>
    )
}