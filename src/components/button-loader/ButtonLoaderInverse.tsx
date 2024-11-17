import ButtonLoaderBlack from '@/assets/button-loader-black.svg'
import ButtonLoaderWhite from '@/assets/button-loader-white.svg'
import { ThemeContext, themes } from '@/contexts/ThemeContext'

export default function ButtonLoaderInverse() {
    return (
        <ThemeContext.Consumer>
            {({ theme }) => (
                theme === themes.dark ? (
                    <img
                        src={ButtonLoaderBlack} 
                        className='animate-spin-reverse'
                        alt='Loading . . .' width={24}
                    />
                ) : (
                    <img
                        src={ButtonLoaderWhite} 
                        className='animate-spin-reverse'
                        alt='Loading . . .' width={24}
                    />
                )
            )}
        </ThemeContext.Consumer>
    )
}
