"use client"

import { ModalManager } from "@/components/composed/modals/ModalManager"
import { AuthGuard } from "@/guards/auth.guard"
import { AccessProvider } from "@/providers/access.provider"
import { AuthProvider } from "@/providers/auth.provider"
import { QueryProvider } from "@/providers/query.provider"

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <QueryProvider>
            <AuthProvider>
                <AuthGuard>
                    <AccessProvider>
                        {children}
                        <ModalManager />
                    </AccessProvider>
                </AuthGuard>
            </AuthProvider>
        </QueryProvider>
    )
}