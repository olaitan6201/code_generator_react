import { monthOfYear } from '@/api/custom_functions'
import sprintf from 'locutus/php/strings/sprintf'
import { useState, useEffect } from 'react'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import Button from './Button'
import { BiFilterAlt } from 'react-icons/bi'
import String from './String'

interface Prop {
    filterYear?: number
    filterMonth?: number
    onFilter?: (value: string) => void
}
export default function DateFilter({ filterYear = 2023, filterMonth = 7, onFilter }: Prop) {
    const [monthRef, setMonthRef] = useState(filterMonth)
    const [yearRef, setYearRef] = useState(filterYear)

    const handleIncrement = () => {
        if (monthRef === 12) {
            setMonthRef(1)
            setYearRef((prevState) => prevState + 1)
        } else {
            setMonthRef((prevState) => prevState + 1)
        }
    }

    const handleDecrement = () => {
        if (monthRef === 1) {
            setMonthRef(12)
            setYearRef((prevState) => prevState - 1)
        } else {
            setMonthRef((prevState) => prevState - 1)
        }
    }

    return (
        <div className="flex items-start justify-between self-stretch">
            <div className="flex items-center gap-2 text-2xl">
                <BsChevronLeft className='cursor-pointer' onClick={handleDecrement} />
                <span>{sprintf('%s, %s', monthOfYear[monthRef - 1], yearRef)}</span>
                <BsChevronRight className='cursor-pointer' onClick={handleIncrement} />
            </div>
            <Button
                extraClass='flex items-start gap-2 controlled-border-gray'
                event={() => onFilter && onFilter(`${monthRef}/${yearRef}`)}
            >
                <BiFilterAlt />
                <span>
                    <String txtKey='Filter' />
                </span>
            </Button>
        </div>
    )
}
