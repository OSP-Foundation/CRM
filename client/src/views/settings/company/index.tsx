import { PrimaryLayout, Input } from '../../../components'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { axios } from '../../../lib'
import { SimpleForm } from '../../../components/forms'

const CompanySettings = () => {
    const [form, setForm] = useState<{
        name: string,
        address: string,
        state: string,
        country: string,
        email: string,
        website?: string
    }>({ name: '', address: '', state: '', country: '', email: '' })

    const [conditions, setConditions] = useState<{
        submiting?: boolean,
        error?: string
    }>({})

    const InputHandle = (e: ChangeEvent<HTMLInputElement>) => {
        if (!conditions?.submiting) {
            setForm((state: any) => ({
                ...state,
                [e?.target?.name]: e?.target?.value
            }))
        }
    }

    const FormHandle = async (e: FormEvent<HTMLFormElement>) => {
        e?.preventDefault?.()

        if (!conditions?.submiting) {
            setConditions({ submiting: true })

            try {
                await axios.put('/settings/company/', form)

                alert("Success")

                setConditions({})
            } catch (err: any) {
                setConditions((state) => ({
                    ...state,
                    error: err?.response?.data?.message || "Something Went Wrong",
                    submiting: false
                }))
            }
        }
    }

    useEffect(() => {
        const abortControll = new AbortController();

        (async () => {
            try {
                const res = await axios.get('/settings/company/', {
                    signal: abortControll?.signal
                })

                setForm(res?.['data']?.data ? res?.['data']?.data : {})
            } catch (err: any) {
                if (err?.code !== "ERR_CANCELED") {
                    alert(err?.response?.data?.message || "Something Went Wrong")
                }
            }
        })();

        return () => {
            abortControll?.abort()
        }
    }, [])

    return (
        <PrimaryLayout
            cardClass='max-w-xl mx-auto'
            Actions={
                <h1 className='text-lg text-primary-black font-bold capitalize'>company Settings</h1>
            }
        >
            <SimpleForm
                onSubmit={FormHandle}
                className='w-full'
                {...conditions}
            >
                <Input
                    container='w-full'
                    required
                    name='name'
                    placeholder='Name'
                    type='text'
                    label='Name'
                    value={form?.name}
                    onChange={InputHandle}
                />

                <Input
                    container='w-full'
                    required
                    name='address'
                    placeholder='Address'
                    type='text'
                    label='address'
                    value={form?.address}
                    onChange={InputHandle}
                />

                <Input
                    container='w-full'
                    required
                    name='state'
                    placeholder='State'
                    type='text'
                    label='state'
                    value={form?.state}
                    onChange={InputHandle}
                />

                <Input
                    container='w-full'
                    required
                    name='country'
                    placeholder='Country'
                    type='text'
                    label='country'
                    value={form?.country}
                    onChange={InputHandle}
                />

                <Input
                    container='w-full'
                    required
                    name='email'
                    placeholder='Email'
                    type='email'
                    label='email'
                    value={form?.email}
                    onChange={InputHandle}
                />

                <Input
                    container='w-full'
                    name='website'
                    placeholder='Website'
                    type='text'
                    label='website'
                    value={form?.website}
                    onChange={InputHandle}
                />
            </SimpleForm>
        </PrimaryLayout>
    )
}

export default CompanySettings