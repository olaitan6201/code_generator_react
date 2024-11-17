import { langTrans } from "@/api/lang";
import InputGroup from "@/components/input-group/InputGroup";
import { FormEvent, useEffect, useRef, useState } from "react";
import Button from "@/components/Button";
import String from "@/components/String";
import Card from "@/components/Card";
import { toast } from "react-toastify";
import {
    Dispatch,
    SetStateAction
} from "react";
import { ProgrammingLanguages } from "@/api/programming_languages";
import SelectGroup, { SelectItem } from "@/components/SelectGroup";
import { CodeGen } from "@/interfaces/generators.interface";
import { BsEraser } from "react-icons/bs";

interface Prop {
    isEdit?: boolean
    formResult?: CodeGen | undefined
    setFormResult: Dispatch<SetStateAction<CodeGen | undefined>>
}

export default function CodeGenForm({ formResult, setFormResult, isEdit = false }: Prop) {
    const dataDomain = {
        document_title: "",
        description: "",
        programming_language: "javascript"
    }

    const [formData, setFormData] = useState(dataDomain)
    const [formErrors, setFormErrors] = useState({
        document_title: "",
        description: "",
        programming_language: ""
    })
    const [formLoading, setFormLoading] = useState(false)
    const [formValidated, setFormValidated] = useState(false)
    const file_success = useRef('')
    const file_error = useRef('')
    const [formSubmitted, setFormSubmitted] = useState(false)

    const { document_title, description, programming_language } = formData
    const {
        document_title: document_title_err,
        description: description_err,
        programming_language: programming_language_err
    } = formErrors

    useEffect(() => {
        const formDataCopy: any = formData

        let validated = true;
        for (const field in formDataCopy) {
            if (field === 'document_title') continue;
            if (formDataCopy[field]?.trim().length === 0) {
                validated = false;
            }
        }
        setFormValidated(validated)
    }, [formData])

    useEffect(() => {
        if (isEdit) {
            const formDataRef = {
                document_title: formResult?.document_title || '',
                description: formResult?.description || '',
                programming_language: formResult?.programming_language || "en",
            }
            setFormData(formDataRef)
        }
    }, [formResult])

    const handleFormErrors = (field: string, value: string | null) => {
        setFormErrors((prevState) => ({
            ...prevState,
            [field]: value
        }))
    }

    const handleInput = (e: { id: string, value: string | number }) => {
        setFormData({
            ...formData,
            [e?.id]: e?.value
        })
        handleFormErrors(e.id, '')
    }

    const fieldsValidated = (): boolean => {
        const formDataCopy: any = formData
        for (const field in formData) {
            if (field === 'document_title') continue;
            if (formDataCopy[field]?.trim().length === 0) {
                handleFormErrors(field, 'field.required')
                return false
            }
        }
        return true
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (formLoading || !fieldsValidated()) return;
        setFormLoading(true)
        try {
            // const reqData = !isEdit ? {
            //     path: 'user/code-generator',
            //     method: 'POST',
            //     data: { ...formData }
            // } : {
            //     path: `user/code-generator/${formResult?.id}/regenerate`,
            //     method: 'POST',
            //     data: { ...formData }
            // }

            // const res = await callAuthApi(reqData)

            // if (res.status === 200) {
            //     const { data }: { data: CodeGen } = res.data
            //     setFormResult(data)
            //     // setFormData(dataDomain)
            //     setFormSubmitted(true)
            // }

        } catch (error: any) {
            if (error.response) {
                const { status, data } = error.response
                switch (status) {
                    case 400:
                        toast.error(data?.message || langTrans('error_msg'))
                        break;

                    case 422:
                        const { errors: err } = data
                        for (const key in err) {
                            if (key === 'media') {
                                file_success.current = ''
                                file_error.current = err[key][0]
                            }
                            else {
                                handleFormErrors(key, err[key][0])
                            }
                        }
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
        setFormLoading(false)
    }

    return (
        <Card
            className="col-md-5"
            titleKey="Code Generator"
            descriptionKey="Code Generator-sub"
        >
            <form className="flex flex-col items-start gap-6 w-full" onSubmit={handleSubmit}>
                <InputGroup
                    txtKey="Document Title"
                    subLabel="(Optional)"
                    type="text"
                    id="document_title"
                    placeholder='Swipe left animation'
                    value={document_title} event={handleInput}
                    error_msg={document_title_err}
                />
                <InputGroup
                    txtKey="Description"
                    type="text"
                    id="description"
                    placeholder='Swipe left animation'
                    value={description} event={handleInput}
                    error_msg={description_err}
                    isTextArea
                />
                <SelectGroup
                    txtKey="Programming Language"
                    id="programming_language"
                    value={programming_language}
                    error_msg={programming_language_err}
                    onSelect={handleInput}
                >
                    {ProgrammingLanguages?.map(({ label, value }) => (
                        <SelectItem key={value} value={value} text={label} />
                    ))}
                </SelectGroup>
                <div className="flex items-center gap-4 w-full">
                    {formValidated && formSubmitted && <Button
                        extraClass="controlled-border controlled-text py-4 px-8 border-2"
                        type="button"
                        event={() => {
                            setFormData(dataDomain)
                            setFormSubmitted(false)
                        }}
                    >
                        <BsEraser className="text-2xl" />
                    </Button>}
                    <Button
                        extraClass="auth-button flex-1 w-full py-4 px-8"
                        disabled={!formValidated}
                        loading={formLoading}
                        loaderInverse
                        type="submit"
                    >
                        {isEdit ? <String txtKey="Regenerate Code" /> : <String txtKey="Generate Code" />}
                    </Button>
                </div>
            </form>
        </Card>
    )
}
