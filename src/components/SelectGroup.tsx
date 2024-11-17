import React, { ChangeEvent } from 'react'
import String from "@/components/String"
import '@/components/input-group/input-group.scss'

interface Prop {
    id: string
    placeholder?: string
    value?: string | number
    onSelect?: (e: { id: string, value: string }) => void
    error_msg?: string
    txtKey?: string
    subText?: string
    width?: string
    children: React.ReactNode
}

interface ItemProp {
    value: string | number
    text: string | number
    selected?: boolean
    className?: string
}

export const SelectItem = ({ value, text, selected = false, className = '' }: ItemProp) => {
    return (
        <option className={`p-6 ${className}`} value={value}>{text}</option>
    )
}

export default function SelectGroup({
    txtKey = '', id = '', placeholder = '',
    value = '', onSelect, error_msg, children,
    width = 'w-full', subText = ''
}: Prop) {
    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const { id, value } = e.target
        onSelect && onSelect({ id, value })
    }

    return (
        <div className={`flex flex-col justify-center items-start p-0 gap-2 ${width} input-group`}>
            <label htmlFor={id}>
                <String txtKey={txtKey || ''} />
                {subText && <span className='controlled-sub-text text-sm'>
                    <String txtKey={subText} />
                </span>}
            </label>
            <div className={`input w-full rounded-lg px-4 py-3 border flex justify-between items-center space-x-1 ${error_msg && error_msg.trim().length > 0 ? "error" : "success"}`}>
                <select
                    id={id} placeholder={placeholder}
                    className={`flex-1 bg-transparent ring-0 border-0 outline-none controlled-bg controlled-text scrollbar-thin`}
                    onChange={handleSelect}
                    value={value}
                >
                    {children}
                </select>
            </div>
            <small className="text-sm text-red-500">{error_msg}</small>
        </div>
    )
}
