import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import './style.scss'

interface props {
    children: React.ReactNode
}

export interface drawerRef {
    open(): void
}

const Drawer = forwardRef(({ children }: props, ref) => {

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
        <div id='drawer' ref={modal}>
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
                    {children}
                </div>
            </div>
        </div>
    )
})

export default Drawer