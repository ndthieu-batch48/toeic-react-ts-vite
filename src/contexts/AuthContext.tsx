import { refreshTokenService } from '@/features/auth/services/authService';
import type { UserResponse } from '@/features/auth/types/authType';
import { clearUserSession, getUserSession, saveUserSession } from '@/features/auth/helper/authHelper';
import { isTokenExpired } from '@/utils/jwtUtil';
import * as React from 'react'

export interface User {
	id: number;
	username: string;
	email: string;
	role: string;
	date_joined: string;
	access_token: string;
	refresh_token: string;
	token_type: string;
	avatar?: string;
}

export interface AuthContext {
	isAuthenticated: boolean
	logout: () => void
	user: User | null
	refreshAuth: () => Promise<void>
}

const AuthContext = React.createContext<AuthContext | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = React.useState<User | null>(null)
	const isAuthenticated = !!user

	const getAuthenticatedUser = React.useCallback(async (): Promise<UserResponse | null> => {
		const session = getUserSession()

		if (!session) {
			return null
		}

		if (!isTokenExpired(session.access_token)) {
			return session
		}
		const { access_token, refresh_token } = await refreshTokenService(session.refresh_token)

		const updatedSession: UserResponse = { ...session, access_token, refresh_token }
		saveUserSession(updatedSession)
		return updatedSession
	}, [])

	const logout = () => {
		setUser(null)
		clearUserSession()
	}

	const refreshAuth = React.useCallback(async () => {
		try {
			const user = await getAuthenticatedUser()
			setUser(user)
		} catch (error) {
			console.error('Auth refresh failed:', error)
			setUser(null)
		}
	}, [getAuthenticatedUser])

	React.useEffect(() => {
		refreshAuth()
	}, [refreshAuth])

	return (
		<AuthContext.Provider value={{ isAuthenticated, user, logout, refreshAuth }}>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuth() {
	const context = React.useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider')
	}
	return context
}