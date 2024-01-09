import React, { FormEvent, forwardRef, useImperativeHandle, useRef } from 'react'
import './style.scss'

interface props {
    children: React.ReactNode,
    onSubmit(e: FormEvent): void
}

export interface drawerRef {
    open(): void
}

const DrawerForm = forwardRef(({ children, onSubmit }: props, ref) => {

    const modal = useRef<HTMLDivElement | null>(null)

    // for closing modal
    const CloseModal = () => {
        modal?.current?.classList?.add("hide")
    }

    // for control from parent component
    useImperativeHandle<unknown, drawerRef>(ref, () => ({
        open: () => {
            modal?.current?.classList?.remove("hide")
            modal?.current?.classList?.add("active")
        }
    }), [])

    return (
        <div id='drawer-form' ref={modal}>
            <div id="blur-area" onClick={CloseModal} />
            <div id="content">
                <div className='border-b border-primary-border flex items-center px-[1.5rem] py-[1rem]'>
                    <button
                        onClick={CloseModal}
                        className='mr-auto text-secondary-black text-lg font-black ease-in-out duration-500 hover:text-red-500'
                    >
                        &#10005;
                    </button>
                </div>
                <div className="px-[1.5rem] py-[1rem]">
                    <form
                        onSubmit={onSubmit}
                        className='flex flex-col gap-2'
                    >
                        {children}
                        <button
                            className='mr-auto px-3 py-1 rounded-md text-sm capitalize text-white font-semibold bg-primary-blue ease-in-out duration-500 hover:bg-secondary-blue'
                            type='submit'
                        >
                            submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
})

export default DrawerForm