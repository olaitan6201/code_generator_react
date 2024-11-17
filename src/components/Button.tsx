// import ButtonSpinner from '@/assets/button-spinner.svg'

import ButtonLoader from "@/components/button-loader/ButtonLoader"
import ButtonLoaderInverse from "@/components/button-loader/ButtonLoaderInverse"

interface Props {
    children: React.ReactNode,
    type?: 'submit' | 'reset' | 'button',
    extraClass?: string,
    loading?: boolean,
    disabled?: boolean,
    event?: any,
    loaderInverse?: boolean
}

export default function Button({ children, type = "button", extraClass = '', loading = false, disabled = false, loaderInverse = false, event, ...props }: Props) {
    return (
        <button type={type} className={`flex justify-center space-x-4 items-center px-7 py-3 font-bold my-1 rounded-lg focus:brightness-110 active:brightness-125 min-h-24 hover:brightness-105 hover:shadow-lg active:shadow-lg ${extraClass} ${disabled && "cursor-not-allowed"}`} onClick={event} disabled={disabled || loading} {...props}>
            {loading ? (loaderInverse ? <ButtonLoaderInverse /> : <ButtonLoader />) : children}
        </button>
    )
}
