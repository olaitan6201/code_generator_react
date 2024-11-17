import LoaderBlue from '@/assets/loader-blue.svg'
import LoaderLightBlue from '@/assets/loader-light-blue.svg'
import { ThemeContext, themes } from '@/contexts/ThemeContext'

export default function Loading() {
	return (
		<div className='flex flex-col mx-auto my-auto justify-center items-center top-0 bottom-0 absolute w-full gap-2'>
			<ThemeContext.Consumer>
				{({ theme }) => (
					theme === themes.dark ? (
						<img
							src={LoaderLightBlue}
							className='animate-spin-reverse'
							alt='Loading . . .' width={24}
						/>
					) : (
						<img
							src={LoaderBlue}
							className='animate-spin-reverse'
							alt='Loading . . .' width={24}
						/>
					)
				)}
			</ThemeContext.Consumer>
			<p className='animate-pulse controlled-text'>Loading. . .</p>
		</div>
	)
}
