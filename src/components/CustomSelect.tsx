import String from "@/components/String"
import '@/components/input-group/input-group.scss'
import Select from 'react-select'

interface Prop {
    id: string
    onSelect?: (e: { id: string, value: string }) => void
    error_msg?: string
    txtKey?: string
    selectOptions?: { value: string, label: string }[]
    value?: string
}

interface ItemProp {
    value: string | number
    text: string | number
    selected?: boolean
}

export default function CustomSelect({
    txtKey = '', id = '', onSelect,
    value = '', error_msg, selectOptions = []
}: Prop) {
    const defaultValue = value ? selectOptions.find(opt => opt.value === value) : undefined
    return (
        <div className="flex flex-col justify-center items-start p-0 gap-2 w-full input-group">
            <label htmlFor={id}>
                <String txtKey={txtKey || ''} />
            </label>
            <Select
                options={selectOptions}
                isSearchable
                value={defaultValue}
                onChange={(e) => onSelect && onSelect({ id: `${id}`, value: e?.value || '' })}
                classNames={{
                    container: () => 'controlled-bg-gray-dark-white controlled-text controlled-border',
                    control: () => 'controlled-bg-gray-dark-white controlled-text controlled-border py-1',
                    option: () => 'controlled-bg-gray-dark-white controlled-text hover:controlled-bg-2',
                    singleValue: () => 'controlled-text',
                }}
                classNamePrefix="react-select"
                className={`input w-full rounded-lg border react-select-container ${error_msg && error_msg.trim().length > 0 ? "error" : "success"}`}
            />
            <small className="text-sm text-red-500">{error_msg}</small>
        </div>
    )
}
