import { useState } from "react";
import { BsChevronDown } from 'react-icons/bs'
import './drop-down.scss'

interface dropDownProp {
    Icon?: any,
    text?: string,
    value: string | boolean | number | null | undefined
}

interface Prop {
    data: dropDownProp[]
    defaultValue: string | boolean | number | null | undefined,
    width?: string
    display?: "icon" | "text" | "default" | "value",
    onSelect: (e: { value: string | boolean | number | null | undefined }) => void,
}

export default function DropDown({ data, defaultValue, display = 'default', width = '', onSelect }: Prop) {
    const selected = data.filter((d: dropDownProp) => d.value === defaultValue)[0]
    const [visible, setVisible] = useState(false)


    const handleSelect = (value: string | boolean | number | null | undefined) => {
        onSelect({ value })
    }

    return (
        <div className='relative flex flex-col items-center'>
            <div className="flex space-x-2 md:space-x-4 items-center cursor-pointer flex-wrap justify-center drop-down-item" onClick={() => setVisible((prevState) => !prevState)}>
                <div className='flex space-x-2 items-center drop-down-item'>
                    {(display === 'icon' || display === 'default') && selected?.Icon ? <selected.Icon className="text-xl  drop-down-item" /> : ''}
                    {(display === 'text' || display === 'default') && <span className="truncate w-20 lg:w-full drop-down-item">{selected?.text}</span>}
                    {(display === 'value') && <span className='drop-down-item'>{selected?.value?.toString().toUpperCase()}</span>}
                </div>
                <BsChevronDown className={`drop-down-item inline-flex ${display === 'icon' && "hidden"}`} />
            </div>
            <div className={`absolute drop-down ${width} ${visible ? 'visible' : 'hidden'} z-40 drop-down-item`}>
                {data.map((d: dropDownProp) => (
                    <div key={`${d.value}`} className="drop-down-item" onClick={() => handleSelect(d.value)}>
                        {d?.Icon ? <d.Icon className="text-md" /> : ''}
                        <span>{d?.text}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
