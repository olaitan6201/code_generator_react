import { MouseEvent } from 'react'
import { range } from '@/api/custom_functions'

interface Prop {
    pages: number
    currentPage: number
    onPageChange: (page: number) => void
}

export default function Paginator({ pages, currentPage, onPageChange }: Prop) {
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
                <ul className="inline-flex items-center justify-center controlled-sub-text">
                    {pages <= 7 ?
                        <li className='py-1 px-2'>
                            <a href="#" className={`prev paginate ${currentPage === 1 && "!cursor-not-allowed"}`}>
                                <span>Page</span>
                            </a>
                        </li> :
                        <li className='py-1 px-2'>
                            <a href="#" className={`prev paginate ${currentPage === 1 && "!cursor-not-allowed"}`} onClick={(e) => onNavigatePage(e, 'prev')}>
                                <span>Previous</span>
                            </a>
                        </li>
                    }
                    {pages <= 7 && range(1, pages).map(page => (
                        <li className='py-1 px-2' key={`page-${page}`}>
                            <a href="#" className={`paginate ${page === currentPage && "!controlled-text !cursor-not-allowed"}`} onClick={(e) => handlePageChange(e, +page)}>{page}</a>
                        </li>
                    ))}
                    {pages > 7 && <>
                        {range(1, 5).map(page => (
                            <li className='py-1 px-2' key={`page-${page}`}>
                                <a href="#" className={`paginate ${page === currentPage && "!controlled-text !cursor-not-allowed"}`} onClick={(e) => handlePageChange(e, +page)}>{page}</a>
                            </li>
                        ))}
                        <li className='py-1 px-2'>
                            <a href="#" className={`paginate disabled !cursor-not-allowed`} onClick={(e) => e.preventDefault()}>...</a>
                        </li>
                        <li className='py-1 px-2' key={`page-${pages}`}>
                            <a href="#" className={`paginate ${pages === currentPage && "!controlled-text !cursor-not-allowed"}`} onClick={(e) => handlePageChange(e, +pages)}>{pages}</a>
                        </li>
                    </>}
                    {pages > 7 && <li className='py-1 px-2'>
                        <a href="#" className={`next paginate ${currentPage === pages && "!cursor-not-allowed"}`} onClick={(e) => onNavigatePage(e, 'next')}>
                            <span>Next</span>
                        </a>
                    </li>}
                </ul>
            </nav>
        </div>
    )
}
