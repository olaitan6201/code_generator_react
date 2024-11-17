import UserSidebar from "@/layout/UserSidebar";
import BitAiLogo from '@/assets/BitAi.svg'
import BitAiWhiteLogo from '@/assets/BitAi_white.svg'
import { ThemeContext, themes } from "@/contexts/ThemeContext";
import { FaTimes } from "react-icons/fa";

export default function AppSidebar({ visible, toggle }: { visible: boolean, toggle: () => void }) {
	return (
		<aside className={`${!visible ? "hidden" : ''} top-0 left-0 fixed h-full lg:flex flex-col items-start px-0 py-3 w-[70%] sm:w-[45%] md:w-[35%] lg:w-3/12 border-r-2 sidebar z-40 overflow-y-scroll scrollbar-none transition delay-200 ease-in-out`}>
			<div className="flex justify-between items-center">
				<ThemeContext.Consumer>
					{({ theme }) => (
						theme === themes.dark ? (
							<img
								src={BitAiWhiteLogo}
								alt="BitAi Logo"
								width={100} height={50}
								className="ml-8 mt-4"
							/>
						) : (
							<img
								src={BitAiLogo}
								alt="BitAi Logo"
								width={100} height={50}
								className="ml-8 mt-4"
							/>
						)
					)}
				</ThemeContext.Consumer>
				<div className="p-4 flex lg:hidden">
					<FaTimes className="text-2xl cursor-pointer" onClick={toggle} />
				</div>
			</div>
			<div className="w-full flex flex-col items-center mt-8 max-h-[85%] md:max-h-[86vh] overflow-y-scroll scrollbar-thin">
				<UserSidebar />
			</div>
		</aside>
	)
}
