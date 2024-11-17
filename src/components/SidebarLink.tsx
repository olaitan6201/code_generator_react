import { Link, useLocation } from "react-router-dom";
import String from "@/components/String";

interface Props {
    url: string,
    title?: string,
    Icon: any,
    txtKey?: string
    isDashboard?: boolean
}

export default function SidebarLink({ url, title = '', Icon, txtKey = '', isDashboard = false }: Props) {
    const location = useLocation()
    const pathMatch = url === location.pathname || location.pathname.includes(url.split('/').length > 2 ? url.split('/')[2] : url);
    const pathMatchRoute = () => {
        if (isDashboard) {
            return (location.pathname === '/' || pathMatch);
        }
        return pathMatch;
    }

    return (
        <Link to={url} className={`link ${pathMatchRoute() && 'active'}`}>
            <Icon className="text-xl " />
            <span>{title.trim().length > 0 ? title : <String txtKey={txtKey} />}</span>
        </Link>
    )
}
