import { ListItem } from "@/interfaces/generic.interface"
import String from "./String"

interface ItemListProp {
    items: ListItem[]
    selectedItem: string | number | boolean
    event?: (value: string | number | boolean) => void
    children?: React.ReactNode
}

interface ItemProp {
    title: string
    value: string | number | boolean
    isSelected?: boolean
    onSelect?: (value: string | number | boolean) => void
}

export const SingleListItem = ({ title, value, isSelected, onSelect }: ItemProp) => {
    return (
        <div
            className={`item py-2 px-4 w-full ${isSelected && 'active'}`}
            onClick={() => onSelect && onSelect(value)}
        >
            <String txtKey={title} />
        </div>
    )
}

export function ItemsListContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col items-start gap-2 w-full">
            {children}
        </div>
    )
}

export function ItemsList({ items, selectedItem, event, children }: ItemListProp) {
    return (
        <ItemsListContainer>
            {items?.map((item, i: number) =>
                <SingleListItem
                    key={`${item.title}${i}`}
                    title={item.title}
                    value={item?.value}
                    onSelect={event}
                    isSelected={item.value === selectedItem}
                />
            )}
            {children}
        </ItemsListContainer>
    )
}
