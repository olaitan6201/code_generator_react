export default function AppFooter() {
	return (
		<div className="bottom-0 right-0 absolute text-center border-t-2 w-full footer p-6 bg-white z-30">
			Copyright &copy; {new Date().getFullYear()} BitAi. All rights reserved
		</div>
	)
}
