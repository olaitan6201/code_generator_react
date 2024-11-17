import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from "@/firebase/config"

export const useAuthStatus = () => {
	const [loggedIn, setLoggedIn] = useState(false)
	const [checkingStatus, setCheckingStatus] = useState(true)

	useEffect(() => {
		onAuthStateChanged(auth, (user: any) => {
			if (user) setLoggedIn(true)
			setCheckingStatus(false)
		})
	}, [])

	return { loggedIn, checkingStatus }
}
