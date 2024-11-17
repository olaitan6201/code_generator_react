import React from 'react'
import String from '@/components/String'
import './badge.scss'

interface Prop {
    type: 'secondary' | 'primary' | 'warning' | 'danger' | 'success'
    title: string
    extraClass?: string
}
export default function Badge({ type = 'secondary', title, extraClass }: Prop) {
    return (
        <div className={`badge ${type} ${extraClass || ''}`}>
            <String txtKey={title} />
        </div>
    )
}
