import { BsChevronRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import String from "@/components/String";

export default function NavLinks({ links }: { links: { title: string, url?: string }[] }) {
    const totalLinks = links.length;
    return (
        <div className="flex items-center space-x-2">
            {links?.map((link, i: number) =>
                <div className="flex items-center space-x-2" key={`${link.url}${i}`}>
                    {link?.url ?
                        <Link to={link.url} className="controlled-link"><String txtKey={link.title} /></Link> :
                        <span><String txtKey={link.title} /></span>
                    }

                    {i < (totalLinks - 1) && <BsChevronRight />}
                </div>
            )}
        </div>
    )
}
