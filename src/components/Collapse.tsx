import React from 'react'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'

interface Prop {
    imgSrc: string
    title: string
    children: React.ReactNode
    disabled: boolean
}

export default function Collapse({ imgSrc, title, children, disabled = false }: Prop) {
    const [toggle, setToggle] = React.useState(false)

    return (
        <>
            {(!toggle || disabled) ?
                <div
                    className={`flex py-2 items-center gap-2 self-stretch w-full cursor-pointer ${disabled && "!cursor-not-allowed"}`}
                    onClick={() => !disabled && setToggle(true)}
                >
                    {imgSrc && <img src={imgSrc} alt={title} />}
                    <span className='flex-1'>{title}</span>
                    <BsChevronDown />
                </div>
                :
                <div className="flex flex-col items-start gap-2 self-stretch w-full controlled-border rounded-lg">
                    <div className='flex py-2 items-center gap-2 self-stretch w-full cursor-pointer controlled-border-b px-4' onClick={() => setToggle(false)}>
                        {imgSrc && <img src={imgSrc} alt={title} />}
                        <span className='flex-1'>{title}</span>
                        <BsChevronUp />
                    </div>
                    <div className="flex flex-col pt-2 pb-4 px-4 w-full items-start self-stretch gap-10">
                        {children}
                    </div>
                </div>
            }
        </>
    )
}
