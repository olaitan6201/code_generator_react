import String from "@/components/String"

interface Prop {
    className?: string
    titleKey?: string
    title?: string
    descriptionKey?: string
    children?: React.ReactNode
}

export default function Card({ className = '', titleKey = '', title = "", descriptionKey = '', children }: Prop) {
    return (
        <div
            className={`flex flex-col items-start p-6 gap-10 controlled-bg rounded-2xl ${className}`}
        >
            <div className="flex flex-col items-start gap-2 w-full">
                <h1 className="controlled-text controlled-header">
                    {title || <String txtKey={titleKey} />}
                </h1>
                <p className="controlled-sub-text w-11/12"><String txtKey={descriptionKey} /></p>
            </div>
            <div className="flex flex-col items-start gap-6 w-full">
                {children}
            </div>
        </div>
    )
}
