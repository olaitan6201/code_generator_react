import { useEffect, useState } from 'react'
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'
import String from "@/components/String"

export default function CheckBox({ text, onCheck, isChecked }: { text?: string, isChecked: boolean, onCheck?: (checked: boolean) => void }) {
    const handleCheck = () => {
        const nextStatus = !isChecked
        // setChecked(nextStatus)
        onCheck && onCheck(nextStatus)
    }

    return (
        <div className='flex items-center gap-2' onClick={handleCheck}>
            <span className='text-xl'>
                {!isChecked ? <ImCheckboxUnchecked />
                    : <ImCheckboxChecked />}
            </span>
            {text && <span className='flex-1'>
                <String txtKey={text} />
            </span>}
        </div>
    )
}
