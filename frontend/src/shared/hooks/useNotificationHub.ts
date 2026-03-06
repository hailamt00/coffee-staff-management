import { useEffect, useRef } from 'react'
import * as signalR from '@microsoft/signalr'
import { useDispatch } from 'react-redux'
import { addNotification } from '@/features/ui/slices/uiSlice'

// Uses Vite proxy → backend at localhost:5136 (see vite.config.ts)
const HUB_URL = '/hubs/notifications'

interface StaffNotificationDto {
    type: 'success' | 'error' | 'warning' | 'info'
    title: string
    message: string
    timestamp: string
}

export function useNotificationHub() {
    const dispatch = useDispatch()
    const connectionRef = useRef<signalR.HubConnection | null>(null)

    useEffect(() => {
        // Don't start a second connection if already connected
        if (connectionRef.current) return

        const connection = new signalR.HubConnectionBuilder()
            .withUrl(HUB_URL)                          // let SignalR negotiate transport automatically
            .withAutomaticReconnect([0, 2000, 5000, 10000])
            .configureLogging(signalR.LogLevel.Information) // visible in browser console
            .build()

        connection.on('ReceiveNotification', (data: StaffNotificationDto) => {
            console.log('[SignalR] Notification received:', data)
            dispatch(addNotification({
                type: data.type ?? 'info',
                title: data.title,
                message: data.message,
            }))
        })

        connection.onreconnecting(err => {
            console.warn('[SignalR] Reconnecting...', err)
        })

        connection.onreconnected(id => {
            console.info('[SignalR] Reconnected. Connection ID:', id)
            // Re-join admin group after reconnect
            connection.invoke('JoinAdminGroup').catch(console.error)
        })

        connection.onclose(err => {
            console.warn('[SignalR] Connection closed.', err)
        })

        const start = async () => {
            try {
                await connection.start()
                console.info('[SignalR] Connected. State:', connection.state)
                await connection.invoke('JoinAdminGroup')
                console.info('[SignalR] Joined admin group')
            } catch (err) {
                console.error('[SignalR] Failed to connect:', err)
            }
        }

        connectionRef.current = connection
        start()

        return () => {
            connection.stop()
            connectionRef.current = null
        }
    }, [dispatch])

    return connectionRef
}
