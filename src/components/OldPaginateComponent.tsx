import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react'
import String from "@/components/String"
import SelectGroup, { SelectItem } from '@/components/SelectGroup'
import InputGroup from '@/components/input-group/InputGroup'
import OldPaginator from '@/components/old-paginator/OldPaginator'

interface Prop {
    start: number
    end: number
    pages: number
    total: number
    paginate: number
    currentPage: number
    search?: string
    searchPlaceholder?: ""
    setCurrentPage: Dispatch<SetStateAction<number>>
    setPaginate: Dispatch<SetStateAction<number>>
    setSearch?: Dispatch<SetStateAction<string>>
    children: React.ReactNode
}

export default function OldPaginateComponent({
    paginate, setPaginate, pages,
    total, start, end, currentPage,
    search = '', searchPlaceholder = '',
    setCurrentPage, setSearch, children
}: Prop) {
    const [text, setText] = useState(search)
    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearch && setSearch(text)
    }
    return (
        <div className="flex flex-col items-start w-full gap-6">
            {/* Paginate Filter */}
            <div className="grid grid-cols-1 sm:flex items-center justify-between w-full">
                <div className="flex items-center gap-2 w-5/12 sm:w-fit">
                    <span>
                        <String txtKey='Show' />&nbsp;
                    </span>
                    <SelectGroup id='entries' value={paginate} onSelect={({ value }) => setPaginate(+value)}>
                        <SelectItem value={10} text={10} />
                        <SelectItem value={25} text={25} />
                        <SelectItem value={50} text={50} />
                        <SelectItem value={100} text={100} />
                    </SelectGroup>&nbsp;
                    <span>
                        <String txtKey='entries' />
                    </span>
                </div>
                <div className="w-full flex flex-col items-end">
                    <form onSubmit={handleSearch} className='flex items-center gap-2'>
                        <span>
                            <String txtKey='Search' />:
                        </span>
                        <InputGroup id='search' value={text} placeholder={searchPlaceholder} event={({ value }) => setText(`${value}`)} />
                        <button type='submit' className='hidden'></button>
                    </form>
                </div>
            </div>

            {/* Page */}
            {children}

            {/* Paginate Buttons */}
            {start && end && pages > 1 && <div className="items-center flex flex-wrap mx-auto text-center space-y-2 justify-between w-full">
                <span>
                    <String txtKey="Showing" />&nbsp;
                    {start}&nbsp;
                    <String txtKey="to" />&nbsp;
                    {end}&nbsp;
                    <String txtKey="of" />&nbsp;
                    {total}&nbsp;
                    <String txtKey="records" />
                </span>
                <div className='self-center mx-auto sm:mx-0'>
                    <OldPaginator pages={pages} currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)} />
                </div>
            </div>}
        </div>
    )
}
