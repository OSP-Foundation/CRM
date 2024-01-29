import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import './style.scss'

interface props {
    children: React.ReactNode
}

export interface drawerRef {
    open(): void,
    close(): void
}

const Drawer = forwardRef(({ children }: props, ref) => {

    const modal = useRef<HTMLDivElement | null>(null)

    const interval = useRef<NodeJS.Timeout | null>(null)

    // for closing modal
    const close = () => {
        modal?.current?.classList?.add("hide")

        if (interval?.current) {
            clearInterval(interval?.current)
        }

        interval.current = setTimeout(() => {
            modal?.current?.classList?.remove("hide", "active")
        }, 500)
    }

    // for control from parent component
    useImperativeHandle<unknown, drawerRef>(ref, () => ({
        open: () => {
            if (interval?.current) {
                clearInterval(interval?.current)
            }

            modal?.current?.classList?.add("active")
        },
        close
    }), [])

    return (
        <div id='drawer' ref={modal}>
            <div id="blur-area" onClick={close} />
            <div id="content">
                <div className='border-b border-primary-border flex items-center px-[1.5rem] py-[1rem]'>
                    <button
                        onClick={close}
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