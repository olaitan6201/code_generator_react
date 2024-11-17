import { Route, Routes } from "react-router"
import { useEffect } from "react"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import Loading from "@/components/Loading"
import { ThemeContext, themes } from "./contexts/ThemeContext"
import UserRoutes from "./routes/UserRoutes";
import CodeGeneratorPage from "./pages/users/code-generator/CodeGeneratorPage";

function App() {
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setLoading(true)

		setTimeout(() => setLoading(false), 3000)

		window.onclick = function (event) {
			const target = event.target as Element
			if (!target.classList.contains('drop-down-item')) {

				var dropdowns = document.getElementsByClassName("drop-down");
				var i;
				for (i = 0; i < dropdowns.length; i++) {
					var dropDownToggle = dropdowns[i];
					if (dropDownToggle.classList.contains('visible')) {
						dropDownToggle.classList.remove('visible');
						dropDownToggle.classList.add('hidden');
					}
				}
			}
		}

	}, [])
	
	if (loading) return (<Loading />)

	return (
		<>
			<ThemeContext.Consumer>
				{({ theme }) => (
					<ToastContainer
						position='top-center'
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						pauseOnHover
						draggable
						theme={theme === themes.dark ? 'dark' : 'light'}
					/>
				)}
			</ThemeContext.Consumer>
			<Routes>
				{/* Home Page */}
				<Route path="/" element={<CodeGeneratorPage />} />
			</Routes>

			<UserRoutes />
		</>
	)
}

export default App
