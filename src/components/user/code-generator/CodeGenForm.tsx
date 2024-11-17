import InputGroup from "@/components/input-group/InputGroup";
import { FormEvent, useEffect, useState } from "react";
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
import axios from 'axios';

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
                programming_language: formResult?.programming_language || "javascript",
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

    const generateCode = async (documentTitle: string, programmingLanguage: string, description: string) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY ?? ''}` // Use your environment variable for the API key
        };

        let body: { model: string, prompt: string } | null = null;

        if (!documentTitle || documentTitle.trim().length === 0) {
            body = {
                model: 'gpt-4o-mini',
                prompt: `Generate a ${programmingLanguage} code snippet: ${description}`,
            }
        } else {
            body = {
                model: 'gpt-4o-mini',
                prompt: `Generate a ${programmingLanguage} code snippet for the following requirements:
                    Document Title: ${documentTitle}
                    Description: ${description}`,
            };
        }


        try {
            const response = await axios.post('https://api.openai.com/v1/completions', body, { headers });
            return response.data; // Return the parsed response data
        } catch (error: any) {
            console.error('Error in AI request:', error.response ? error.response.data : error.message);
            throw error; // Propagate error to handle it in calling function
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (formLoading || !fieldsValidated()) return;
        setFormLoading(true)
        try {

            const res = await generateCode(formData.document_title ?? '', formData.programming_language ?? '', formData.description ?? '')

            console.log({ res });


            const documentTitle = formData.document_title
            const programmingLanguage = formData.programming_language

            // Format response into the CodeGen interface structure
            const now = new Date();
            const codeGen: CodeGen = {
                id: Math.floor(Math.random() * 10000), // Generating a random ID
                date_created: now.toISOString(),
                created_at_date: now.toISOString().split('T')[0], // Extract date in YYYY-MM-DD format
                created_at_time: now.toTimeString().split(' ')[0], // Extract time in HH:MM:SS format
                document_title: documentTitle,
                document_title_truncated: documentTitle.length > 20 ? documentTitle.substring(0, 17) + '...' : documentTitle,
                description: description,
                result: res, // Extract the generated code snippet
                programming_language: programmingLanguage,
            };

            const cgs = localStorage.getItem('code_gens') ?? ''

            let code_gens: CodeGen[] = cgs.trim().length > 0 ? JSON.parse(cgs) : [];
            code_gens.push(codeGen)

            localStorage.setItem('code_gens', JSON.stringify(code_gens))

            setFormResult(codeGen)
            setFormSubmitted(true)

        } catch (error: any) {
            toast(error.response.data.error.message)
            // toast(error.error.message ?? error.message)
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
