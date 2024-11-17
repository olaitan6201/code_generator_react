import { TiTimes } from 'react-icons/ti'
import './modal.scss'
import { Dispatch, SetStateAction } from "react";
import String from '@/components/String';

interface Prop {
    titleKey: string;
    subTitle?: string;
    subTitleKey?: string;
    modalClass?: string;
    children: React.ReactNode;
    modalToggle?: Dispatch<SetStateAction<boolean>>;
    isOpen: boolean;
}

export default function Modal({
    titleKey = '', subTitle = '',
    subTitleKey = '',
    modalClass = '', children,
    modalToggle, isOpen
}: Prop) {

    return (
        <div className={`modal bg-[#1D345A]/60 ${isOpen ? 'flex' : 'hidden'}`}>
            <div className={`modal-content controlled-bg-primary card ${modalClass}`}>
                <div className="flex flex-col w-full justify-center gap-2">
                    <div className="modal-header">
                        <h1><String txtKey={titleKey} /></h1>
                        <span
                            className='cursor-pointer'
                            onClick={() => modalToggle && modalToggle((prevState) => !prevState)}
                        >
                            <TiTimes className='text-xl' />
                        </span>
                    </div>
                    <p className='controlled-sub-text w-11/12'>{subTitle || <String txtKey={subTitleKey} /> || ''}</p>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    )
}
