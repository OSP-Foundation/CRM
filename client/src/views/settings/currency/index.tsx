import { PrimaryLayout, Input, Select } from '../../../components'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { axios } from '../../../lib'
import { SimpleForm } from '../../../components/forms'

const CurrencySettings = () => {
    const [form, setForm] = useState<{
        name: string,
        symbol: string,
        position: "after" | "before"
    }>({ name: '', symbol: '', position: 'before' })

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
                await axios.put('/settings/currency/', form)

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
                const res = await axios.get('/settings/currency/', {
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
                <h1 className='text-lg text-primary-black font-bold capitalize'>currency Settings</h1>
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
                    name='symbol'
                    placeholder='Symbol'
                    type='text'
                    label='symbol'
                    value={form?.symbol}
                    onChange={InputHandle}
                />

                <Select
                    container='w-full'
                    className="capitalize"
                    required
                    placeholder='Position'
                    type='text'
                    label='Position'
                    value={form?.position}
                    onSelect={(e: any) => {
                        e.target.name = "position"

                        InputHandle(e)
                    }}
                >
                    <option value="before">Before</option>
                    <option value="after">After</option>
                </Select>
            </SimpleForm>
        </PrimaryLayout>
    )
}

export default CurrencySettings