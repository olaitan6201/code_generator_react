import Button from "@/components/Button";
import String from "@/components/String";

interface Prop {
    title: string
    cancelText?: string
    confirmText?: string
    display?: boolean
    onConfirm: (confirmed: boolean) => void
}

export default function ConfirmationPopUp({ title, cancelText = '', confirmText = '', display = false, onConfirm }: Prop) {
    return (
        <div className={`${display ? 'flex' : 'hidden'} flex-col justify-center items-center top-0 left-0 fixed w-full h-screen z-50 controlled-text`}>
            <div className="flex flex-col justify-center items-center py-4 px-0 gap-6 w-80 min-h-44 max-h-56 controlled-bg-primary mx-auto my-auto controlled-border rounded-lg text-center">
                <div className="flex flex-row justify-between items-center mb-2 px-4">
                    <p className="text-xl">
                        <String txtKey={title} />
                    </p>
                </div>
                <div className="flex justify-around w-full gap-4 px-4 text-sm">
                    <Button extraClass="controlled-bg-gray w-full" event={() => onConfirm(false)}>
                        {cancelText ? <String txtKey={cancelText} /> : <String txtKey="No" />}
                    </Button>
                    <Button extraClass="controlled-bg-blue w-full" event={() => onConfirm(true)}>
                        {confirmText ? <String txtKey={confirmText} /> : <String txtKey="Yes" />}
                    </Button>
                </div>
            </div>
        </div>
    )
}
