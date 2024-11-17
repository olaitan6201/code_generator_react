import { BiLayer } from "react-icons/bi";
import SidebarLink from "@/components/SidebarLink";

export default function UserSidebar() {

	return (
		<>
			<div className="w-full flex flex-col items-center border-b-2 sidebar-element-wrap py-4">
				<SidebarLink url="/user/content-generator" txtKey="Content Generator" Icon={BiLayer} />
			</div>
		</>
	)
}
