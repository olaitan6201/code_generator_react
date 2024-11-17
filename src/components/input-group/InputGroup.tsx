import { BsEye, BsEyeSlash } from "react-icons/bs"
import { useState, ChangeEvent, HTMLAttributes } from "react";
import './input-group.scss'
import String from "@/components/String";
import { LanguageContext } from "@/contexts/LanguageContext";
import { langTrans } from "@/api/lang";

interface Props extends HTMLAttributes<HTMLElement> {
    label?: string,
    subLabel?: string,
    type?: string,
    id?: string,
    placeholder?: string,
    value: string | number,
    isPassword?: boolean,
    isTextArea?: boolean,
    event?: (e: { id: string, value: string | number }) => void,
    error_msg?: string,
    txtKey?: string
    Icon?: React.ReactNode
    isPaymentCard?: boolean
    paymentCardProps?: any
    [x: string]: any
}

export default function InputGroup({
    label, subLabel = '', txtKey,
    type = 'text', id, placeholder, value,
    isPassword, event, error_msg = '',
    isTextArea = false, isPaymentCard = false,
    paymentCardProps, Icon,
    ...props
}: Props) {
    const [showPassword, setShowPassword] = useState(false)

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target
        event && event({ id, value })
    }

    return (
        <div className={`flex flex-col justify-center items-start p-0 gap-2 w-full input-group`}>
            <label htmlFor={id} className={`${!txtKey && !label && "hidden"}`}>
                {label ? label : <String txtKey={txtKey || ''} />}
                &nbsp; <small className="controlled-sub-text">{<String txtKey={subLabel || ''} />}</small>
            </label>

            <LanguageContext.Consumer>
                {() => (
                    <div className={`input w-full rounded-lg px-4 py-3 border flex justify-between items-center space-x-1 ${props?.readOnly && "controlled-bg-2 border-0"} ${error_msg.trim().length > 0 ? "error" : "success"}`}>
                        {!isTextArea ? (
                            <>
                                {!isPaymentCard ? <input
                                    type={`${isPassword ? (showPassword ? 'text' : 'password') : type}`}
                                    value={value}
                                    id={id} placeholder={`${isPassword ? "••••••" : langTrans(placeholder)}`}
                                    className={`flex-1 bg-transparent ring-0 border-0 outline-none ${props?.readOnly && "disabled"}`}
                                    onChange={handleChange}
                                    {...props}
                                /> : <input
                                    {...paymentCardProps}
                                    value={value}
                                    className={`flex-1 bg-transparent ring-0 border-0 outline-none ${props?.readOnly && "disabled"}`}
                                    placeholder={langTrans(placeholder)}
                                />}
                            </>
                        ) :
                            <textarea
                                value={value}
                                id={id} placeholder={langTrans(placeholder)}
                                className={`flex-1 bg-transparent placeholder-gray-300 ring-0 border-0 min-w-full outline-none ${props?.readOnly && "disabled"}`}
                                onChange={handleChange}
                                cols={4}
                                {...props}
                            ></textarea>
                        }
                        <span className="cursor-pointer text-xl" onClick={() => setShowPassword((prevState) => !prevState)}>
                            {isPassword && (!showPassword ? <BsEye /> : <BsEyeSlash />)}
                            {Icon}
                        </span>
                    </div>
                )}
            </LanguageContext.Consumer>
            {error_msg.trim().length === 0 && <small className="text-sm text-red-500">
                <String txtKey={error_msg} />
            </small>}
        </div>
    )
}
