import { BsCheckCircleFill, BsExclamationTriangleFill } from 'react-icons/bs'
import './toast-component.scss'
import String from '../String'

interface Prop {
    state: 'success' | 'error'
    message: string
}

export default function ToastComponent({ state = 'error', message = '' }: Prop) {
    return (
        <div className={`toast ${state} ${message.trim().length > 0 ? 'visible' : 'hidden'}`}>
            <span className='text-xl'>{state === 'error' ? <BsExclamationTriangleFill /> : <BsCheckCircleFill />}</span>
            <span className='font-extrabold'><String txtKey={message} /></span>
        </div>
    )
}
