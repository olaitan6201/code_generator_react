import { ReactNode } from "react";

export default function AppLayout({ children, className = 'px-4 pt-4 pb-20', withFooter = true }: { children: ReactNode, className?: string, withFooter?: boolean }) {
	return (
		<div className="flex justify-center items-center w-full max-w-full top-0 absolute">
			<main className={`flex flex-col w-full top-0 -mt-3 md:-mt-0 min-h-[78vh] right-0 absolute ${className}`}>
				{children}
			</main>
		</div>
	)
}
