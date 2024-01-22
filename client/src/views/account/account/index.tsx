import { ChangeEvent, FormEvent, Fragment, useRef, useState } from 'react'
import { ActionsArea, Card, Modal, modalRef } from '../../../components'
import { Input } from '../../../components';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { axios } from '../../../lib';
import { BlueBtn, WhiteBtn } from '../../../components/buttons';

const Account = () => {
    const ref = useRef<modalRef | null>(null);

    const [form, setForm] = useState<{
        password: string,
        newPassword: string
    }>({ password: '', newPassword: '' })

    const [submiting, setSubmiting] = useState<boolean>(false)

    const navigate = useNavigate();

    const user = useSelector((state: {
        user: {
            name: string,
            email: string
        }
    }) => state?.user)

    const InputHandle = (e: ChangeEvent<HTMLInputElement>) => {
        if (!submiting) {
            setForm((state: any) => ({
                ...state,
                [e?.target?.name]: e?.target?.value
            }))
        }
    }

    const FormHandle = async (e: FormEvent<HTMLFormElement>) => {
        e?.preventDefault?.()

        setSubmiting(true)

        try {
            await axios.put('/user/update-password', form)

            alert("Success")

            setForm({ password: '', newPassword: '' })

            ref?.current?.close?.()
        } catch (err: any) {
            alert(err?.response?.data?.message || "Something Went Wrong")
        } finally {
            setSubmiting(false)
        }
    }

    return (
        <Fragment>
            <Modal
                ref={ref}
                className='w-full'
            >
                <form
                    onSubmit={FormHandle}
                    className='flex flex-col gap-2 w-full'
                >
                    <Input
                        name='password'
                        placeholder='Current Password'
                        type='password'
                        required
                        value={form?.password}
                        onChange={InputHandle}
                    />

                    <Input
                        name='newPassword'
                        placeholder='New Password'
                        type='password'
                        required
                        onChange={InputHandle}
                        value={form?.newPassword}
                    />

                    <BlueBtn
                        className='mr-auto'
                        type={submiting ? 'button' : 'submit'}
                    >
                        {submiting ? "wait..." : "submit"}
                    </BlueBtn>
                </form>
            </Modal>

            <Card
                className='bg-white flex flex-col items-center gap-2 max-w-2xl w-full mx-auto container'
            >
                <ActionsArea
                    className='w-full'
                >
                    <BlueBtn
                        type='button'
                        onClick={() => navigate('/account/edit')}
                    >
                        edit
                    </BlueBtn>

                    <WhiteBtn
                        type='button'
                        onClick={() => ref?.current?.open?.()}
                    >
                        update password
                    </WhiteBtn>
                </ActionsArea>

                <div className="grid grid-cols-[5rem_calc(100%-(5rem+2rem))] items-center gap-[2rem] mr-auto w-full">
                    <div className='capitalize flex items-center text-center justify-center p-3 bg-red-200 w-[5rem] h-[5rem] rounded-full text-3xl text-red-500 font-bold'>
                        {user?.name?.[0]}
                    </div>
                    <div className='mr-auto flex flex-col gap-2 w-full'>
                        <p className='text-sm font-bold text-primary-grey'>
                            <span>Full Name:&nbsp;&nbsp;</span>
                            <span className='text-primary-black'>{user?.name}</span>
                        </p>
                        <p className='text-sm font-bold text-primary-grey'>
                            <span>Email:&nbsp;&nbsp;</span>
                            <span className='text-primary-black'>{user?.email}</span>
                        </p>
                    </div>
                </div>
            </Card>
        </Fragment>
    )
}

export default Account