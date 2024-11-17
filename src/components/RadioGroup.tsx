import { TitleCase } from '@/api/custom_functions'
import { Dispatch, SetStateAction } from 'react'
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md'
import String from './String'

interface Prop {
    items: string[][]
    selected: string
    onSelect: Dispatch<SetStateAction<string>>
}

export default function RadioGroup({ items, selected, onSelect }: Prop) {
    return (
        <div className='flex items-start gap-6'>
            {items?.map((item: string[]) => (
                <div className="flex items-center py-2 gap-2 cursor-pointer" key={item[0]} onClick={() => onSelect(item[0])}>
                    <span className="text-xl">
                        {selected === item[0] ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />}
                    </span>
                    <span><String txtKey={item[1]} /></span>
                </div>
            ))}
        </div>
    )
}
