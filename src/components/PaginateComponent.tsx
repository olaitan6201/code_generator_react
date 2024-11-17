import React, { ChangeEvent, Dispatch, SetStateAction } from 'react'
import String from "@/components/String"
import Paginator from '@/components/paginator/Paginator'

interface Prop {
    start: number
    end: number
    pages: number
    total: number
    paginate: number
    currentPage: number
    setCurrentPage: Dispatch<SetStateAction<number>>
    setPaginate: Dispatch<SetStateAction<number>>
    children: React.ReactNode
}

export default function PaginateComponent({
    setPaginate, pages, paginate,
    total, start, end, currentPage,
    setCurrentPage, children
}: Prop) {
    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target
        setPaginate(parseInt(value))
    }

    return (
        <div className="flex flex-col items-start w-full gap-6">
            {/* Paginate Filter */}
            {/* Paginate Buttons */}
            {start && end &&
                <div className="items-center flex flex-wrap mx-auto text-center space-y-2 justify-between w-full">
                    <div className='flex items-center gap-2'>
                        <span>
                            <String txtKey="Showing" />
                        </span>
                        <select
                            name="entries" id="entries"
                            onChange={handleSelect}
                            className='p-1 controlled-border controlled-bg-gray-dark-white rounded-lg'
                        >
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                        <span>
                            <String txtKey="out of" />
                        </span>
                        <span>
                            {total}&nbsp;
                            <String txtKey="records" />
                        </span>
                    </div>

                    {pages > 1 && <div className='self-center mx-auto sm:mx-0'>
                        <Paginator pages={pages} currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)} />
                    </div>}
                </div>
            }

            {/* Page */}
            {children}
        </div>
    )
}
