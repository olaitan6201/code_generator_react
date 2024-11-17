import String from "@/components/String";

export default function SearchNotFound() {
    return (
        <div className="flex flex-col items-center justify-center mx-auto w-full">
            <img src="/images/table-not-found.svg" />
            <span>
                <String txtKey='Search Not Found' />
            </span>
        </div>
    )
}
