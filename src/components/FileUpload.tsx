import { AiOutlineInfoCircle } from "react-icons/ai";
import String from "@/components/String";
import { CiExport } from 'react-icons/ci'
import ToastComponent from "@/components/toast-component/ToastComponent";
import { ChangeEvent, Dispatch, MutableRefObject, SetStateAction, useState } from "react";
import { langTrans } from "@/api/lang";

interface Prop {
    txtKey?: string
    error_msg?: string
    success_msg?: string
    uploadFile: Dispatch<SetStateAction<File | undefined>>
    fileError: MutableRefObject<string>
    fileSuccess: MutableRefObject<string>
    fileTypes: string
    maxFileSize: number //mb
}

export default function FileUpload({
    txtKey = 'Upload Media',
    uploadFile,
    fileError,
    fileSuccess,
    fileTypes="",
    maxFileSize=0
}: Prop) {
    const [file, setFile] = useState<File>();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const fileRef = e.target.files[0]

            if (!fileRef) return;

            setFile(fileRef)

            if (fileRef.size > (maxFileSize * 1024 * 1024)) {
                return fileError.current = langTrans('Error uploading file')
            }
            
            uploadFile(fileRef)
            fileSuccess.current = langTrans('File uploaded successfully')
        }
    };

    const handleOpenFile = () => {
        fileError.current = ''
        fileSuccess.current = ''
        const file_upload = document.getElementById('file_upload');
        file_upload?.click();
    }

    return (
        <div className="flex flex-col justify-center items-start p-0 gap-2 w-full input-group controlled-text">
            <label className="flex items-center gap-2">
                <String txtKey={txtKey || ''} />
                <AiOutlineInfoCircle className="rotate-180 text-xl" />
            </label>
            <div className={`input border-dashed w-full rounded-lg px-4 py-3 border-2 flex justify-between items-center space-x-1 ${fileError.current.trim().length > 0 ? "error" : "success"} h-56 relative`} onClick={handleOpenFile}>
                <div className="flex flex-col flex-wrap text-center w-full items-center justify-center mx-auto my-auto absolute top-0 right-0 left-0 bottom-0 gap-2">
                    <CiExport className="text-xl" />
                    {file?.name || <String txtKey="Upload File" />}
                    <p>
                        {!file?.name ? (
                            <>
                                <span className="controlled-sub-text">
                                    <String txtKey="Max file size is" />
                                </span>
                                <span>&nbsp;{maxFileSize}MB</span>
                            </>
                        ) : (
                            <>
                                <span className="controlled-sub-text">
                                    <String txtKey="File size is" />
                                </span>
                                <span>&nbsp;{file && (file.size / (1024 * 1024)).toFixed(2)}MB</span>
                            </>
                        )}
                    </p>
                </div>
            </div>
            <input type="file" id="file_upload" onChange={handleFileChange} accept={fileTypes} className="hidden" />
            <ToastComponent state="error" message={fileError.current} />
            <ToastComponent state="success" message={fileSuccess.current} />
        </div>
    )
}
