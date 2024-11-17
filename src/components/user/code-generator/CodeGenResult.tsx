import { useEffect, Dispatch, SetStateAction } from 'react'
import { BiCopy } from "react-icons/bi";
import { useState } from "react";
import { langTrans } from "@/api/lang";
import String from "@/components/String";
// import { callAuthApi } from '@/api/api';
import { toast } from 'react-toastify';
// import { userLogOut } from '@/api/user';
// import { userDefaultState } from '../../../recoil/user/user.selector';
import { useNavigate } from 'react-router';
import Clipboard from 'react-clipboard.js'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CodeGen } from '@/interfaces/generators.interface';

export default function CodeGenResult({ formResult }: { formResult: CodeGen | undefined }) {
    const navList = [
        'Result',
        'History'
    ]

    const [selectedNav, setSelectedNav] = useState(navList[0])
    const [result, setResult] = useState<CodeGen | undefined>(formResult)
    const [history, _] = useState<CodeGen[]>([])
    const [loadingHistory, setLoadingHistory] = useState(false)

    useEffect(() => {
        if (selectedNav === 'History') {
            getCodeGenHistory()
        }
    }, [selectedNav])

    useEffect(() => {
        setResult(formResult)
        setSelectedNav('Result')
    }, [formResult])

    const getCodeGenHistory = async () => {
        if (loadingHistory) return;
        setLoadingHistory(true)
        try {
            // const res = await callAuthApi({
            //     path: 'user/code-generator/history',
            //     method: 'GET'
            // })

            // if (res.status === 200) {
            //     const { data } = res.data
            //     setHistory(data)
            // }
        } catch (error: any) {
            if (error.response) {
                const { status, data } = error.response
                switch (status) {
                    case 400:
                        toast.error(data?.message || langTrans('error_msg'))
                        break;

                    case 401:
                        // const res = await userLogOut()
                        // if (res.success && res.log_out) {
                        //     setUserData(userDefaultState)
                        //     toast.error(langTrans('unauthorized'))
                        //     return navigate('/sign-in')
                        // }
                        break;

                    default:
                        break;
                }
            }
        }
        setLoadingHistory(false)
    }

    return (
        <div className="col-md-7 controlled-bg flex flex-col items-start rounded-2xl">
            <div className="box-border flex items-center justify-between pr-2 controlled-border-b w-full">
                <div className="flex items-center">
                    {navList.map(nav => (
                        <span
                            key={nav}
                            className={`py-3 px-4 cursor-pointer ${selectedNav === nav && "controlled-text-blue controlled-border-b-blue"}`}
                            onClick={() => setSelectedNav(nav)}
                        >
                            <String txtKey={nav || ''} />
                        </span>
                    ))}
                </div>
                <div className="flex items-center space-x-4 controlled-text-blue pr-2 text-xl">
                    <Clipboard data-clipboard-text={result?.result} onSuccess={() => toast.success('Copied to clipboard!')}>
                        <BiCopy className="cursor-pointer" />
                    </Clipboard>
                </div>
            </div>

            <div className="w-full controlled-bg h-full relative">
                {selectedNav === navList[0] && (result === undefined ?
                    <CodeGenResultEmpty /> :
                    <CodeGenResultDisplay result={result} />
                )}
                {selectedNav !== navList[0] &&
                    <CodeGenHistory
                        history={history}
                        setSelectedNav={setSelectedNav}
                        setResult={setResult}
                    />
                }
            </div>


        </div>
    )
}

interface CodeGenResultProp {
    result: CodeGen
}

const CodeGenResultDisplay = ({ result }: CodeGenResultProp) => {
    return (
        <SyntaxHighlighter customStyle={{ width: '100%' }} language={result.programming_language || 'javascript'} style={vscDarkPlus} showLineNumbers>
            {result?.result}
        </SyntaxHighlighter>
    )
}

const CodeGenResultEmpty = () => {
    return (
        <div className="w-full h-full relative">
            <div className="flex flex-col justify-center items-center p-6 text-center my-auto w-full">
                <img src="/images/not-found.svg" alt="Not found" />
                <span className="text-xl">
                    <String txtKey="Generated content will be shown here" />
                </span>
            </div>
        </div>
    )
}

interface CodeGenHistoryProp {
    history: CodeGen[]
    setSelectedNav: Dispatch<SetStateAction<string>>
    setResult: Dispatch<SetStateAction<CodeGen | undefined>>
}

const CodeGenHistory = ({ history, setSelectedNav, setResult }: CodeGenHistoryProp) => {
    const navigate = useNavigate()
    return (
        <div className='controlled-bg flex flex-col w-full gap-4'>
            <div className="flex justify-between items-center p-4">
                <span className='controlled-sub-text'><String txtKey='today.mediahistory' /></span>
                <span>{history.length} <String txtKey='Records' /></span>
            </div>
            <div className="flex flex-col items-start gap-1 w-full h-[450px] overflow-y-scroll controlled-scrollbar">
                {history.map((h: CodeGen, i: number) =>
                    <div
                        className="flex items-center p-4 gap-4 w-full item cursor-pointer"
                        key={`${h.created_at_date}${h.created_at_time}${i}`}
                        onClick={() => navigate(`/user/code-generator/${h.id}`)}
                    >
                        <div className="flex-1 max-w-full">
                            --&nbsp;{h.document_title_truncated}
                        </div>
                        <small className='controlled-sub-text'>{h.date_created}</small>
                    </div>
                )}
            </div>
        </div>
    )
}