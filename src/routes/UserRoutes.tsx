import { Route, Routes } from "react-router"
import CodeGeneratorPage from "@/pages/users/code-generator/CodeGeneratorPage"

export default function UserRoutes() {
    return (
        <Routes>
            {/* User Routes */}
            <Route path="/user" element={<CodeGeneratorPage />}>
                {/* Code Generator */}
                <Route path="code-generator">
                    <Route index element={<CodeGeneratorPage />} />
                </Route>
            </Route>
        </Routes>
    )
}
