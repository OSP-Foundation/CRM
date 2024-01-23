import { useSelector } from 'react-redux'
import { PrimaryLayout } from '../../../components'
import { Input } from '../../../components/auth'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axios } from '../../../lib'
import { SimpleForm } from '../../../components/forms'

const EditAccount = () => {
    const navigate = useNavigate();

    const user = useSelector((state: {
        user: {
            name: string,
            email: string
        }
    }) => state?.user)

    const [form, setForm] = useState<{
        name: string,
        email: string,
        password: string
    }>({ password: '', ...user })

    const [conditions, setConditions] = useState<{
        submiting?: boolean,
        error?: string
    }>({})

    const inputHandle = (e: ChangeEvent<HTMLInputElement>) => {
        if (!conditions?.submiting) {
            setForm((state: any) => ({
                ...state,
                [e?.target?.name]: e?.target?.value
            }))
        }
    }

    const formHandle = async (e: FormEvent<HTMLFormElement>) => {
        e?.preventDefault?.()

        setConditions({ submiting: true })

        try {
            await axios.put('/user/update-details', form)

            alert("Success")

            navigate('/account')
        } catch (err: any) {
            setConditions((state) => ({ ...state, error: err?.response?.data?.message || "Something Went Wrong" }))
        } finally {
            setConditions((state) => ({ ...state, submiting: false }))
        }
    }

    return (
        <PrimaryLayout
            cardClass='max-w-xl mx-auto'
            isFixedActions={false}
        >
            <SimpleForm
                onSubmit={formHandle}
                className='w-full'
                {...conditions}
            >
                <Input
                    required
                    name='name'
                    placeholder='Name'
                    type='text'
                    label='Name'
                    value={form?.name}
                    onChange={inputHandle}
                />

                <Input
                    required
                    name='email'
                    placeholder='Email'
                    type='email'
                    label='email'
                    value={form?.email}
                    onChange={inputHandle}
                />

                <Input
                    required
                    name='password'
                    placeholder='Password'
                    type='password'
                    label='password'
                    value={form?.password}
                    onChange={inputHandle}
                />
            </SimpleForm>
        </PrimaryLayout>
    )
}

export default EditAccount