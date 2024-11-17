import { MouseEvent } from 'react'
import './paginator.scss'
import { range } from '@/api/custom_functions'

interface Prop {
    pages: number
    currentPage: number
    onPageChange: (page: number) => void
}

export default function OldPaginator({ pages, currentPage, onPageChange }: Prop) {
    const handlePageChange = (e: MouseEvent<HTMLAnchorElement>, page: number) => {
        e.preventDefault()
        if (page === currentPage) return;
        onPageChange(page)
    }
    const onNavigatePage = (e: MouseEvent<HTMLAnchorElement>, ref: string) => {
        e.preventDefault()
        let page = currentPage;
        switch (ref) {
            case 'prev':
                if (currentPage === 1) return;
                page -= 1;
                break;

            case 'next':
                if (currentPage === pages) return;
                page += 1;
                break;

            default:
                return;
        }
        onPageChange(page)
    }
    return (
        <div>
            <nav aria-label="page navigation">
                <ul className="inline-flex items-center -space-x-px">
                    <li>
                        <a href="#" className={`prev paginate ${currentPage === 1 && "!cursor-not-allowed"}`} onClick={(e) => onNavigatePage(e, 'prev')}>
                            <span className="sr-only">Previous</span>
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                        </a>
                    </li>
                    {pages <= 7 && range(1, pages).map(page => (
                        <li key={`page-${page}`}>
                            <a href="#" className={`paginate ${page === currentPage && "active !cursor-not-allowed"}`} onClick={(e) => handlePageChange(e, +page)}>{page}</a>
                        </li>
                    ))}
                    {pages > 7 && <>
                        {range(1, 3).map(page => (
                            <li key={`page-${page}`}>
                                <a href="#" className={`paginate ${page === currentPage && "active !cursor-not-allowed"}`} onClick={(e) => handlePageChange(e, +page)}>{page}</a>
                            </li>
                        ))}
                        <li>
                            <a href="#" className={`paginate disabled !cursor-not-allowed`} onClick={(e) => e.preventDefault()}>...</a>
                        </li>
                        {range(pages - 2, pages).map(page => (
                            <li key={`page-${page}`}>
                                <a href="#" className={`paginate ${page === currentPage && "active !cursor-not-allowed"}`} onClick={(e) => handlePageChange(e, +page)}>{page}</a>
                            </li>
                        ))}
                    </>}
                    <li>
                        <a href="#" className={`next paginate ${currentPage === pages && "!cursor-not-allowed"}`} onClick={(e) => onNavigatePage(e, 'next')}>
                            <span className="sr-only">Next</span>
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
