import { Link } from 'react-router-dom'
import './table.scss'
import String from '../String'

interface TableProp {
    headerStyle?: string
    bodyStyle?: string
    headerData?: string[]
    title?: string
    linkText?: string
    linkUrl?: string
    children?: React.ReactNode
}

interface TableItemProp {
    Icon?: any
    text?: string
    isLink?: boolean
    linkUrl?: string
    width?: string | number
}

export const Table = ({ headerStyle = "", bodyStyle = "", headerData = [], title = '', linkText = '', linkUrl = '', children }: TableProp) => {
    return (
        <div className='flex flex-col gap-2 w-full'>
            <div className="flex justify-between items-start px-2">
                <h2 className='controlled-text text-xl font-extrabold'>
                    <String txtKey={title} />
                </h2>
                <Link to={linkUrl} className='controlled-link'>
                    <String txtKey={linkText} /></Link>
            </div>
            <div className={`${bodyStyle} table-responsive justify-center rounded-xl`}>
                <table className='w-full'>
                    <thead className={`${headerStyle} text-left`}>
                        <tr>
                            {headerData.map((h: string) => (
                                <th key={h}>
                                    <String txtKey={h} />
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {children}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export const TableRow = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
    return (
        <tr className={className}>
            {children}
        </tr>
    )
}

export const TableItem = ({ Icon = null, text = '', isLink = false, linkUrl = '#', width = '' }: TableItemProp) => {
    return (
        <td className={`controlled-text`} width={width}>
            {isLink && <a href={linkUrl} className='controlled-link'>{Icon && <Icon />} {text}</a>}
            {!isLink && <p className={`truncate ${width && "overflow-hidden w-10/12"}`}>{Icon && <Icon />} {text}</p>}
        </td>
    )
}

export const TableItemContainer = ({ colSpan = 1, className = 'controlled-text', children }: { colSpan?: number, className?: string, children: React.ReactNode }) => {
    return (
        <td className={className} colSpan={colSpan}>
            {children}
        </td>
    )
}