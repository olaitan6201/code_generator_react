import CodeGenForm from "@/components/user/code-generator/CodeGenForm";
import CodeGenResult from "@/components/user/code-generator/CodeGenResult";
import AppLayout from "@/layout/AppLayout";
import { useState } from "react";
import { CodeGen } from "@/interfaces/generators.interface";


export default function CodeGeneratorPage() {

	const [formResult, setFormResult] = useState<CodeGen | undefined>()

	return (
		<AppLayout>
			<div className="row gap-6 mt-8 pb-8">
				<CodeGenForm setFormResult={setFormResult} />
				<CodeGenResult formResult={formResult} />
			</div>
		</AppLayout>
	)
}