import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import './style.scss'

interface props {
    children: React.ReactNode,
    className?: string
}

export interface modalRef {
    open(): void,
    close(): void
}

const Modal = forwardRef(({ children, className }: props, ref) => {
    const modal = useRef<HTMLDivElement | null>(null)

    const inner = useRef<HTMLDivElement | null>(null)

    const interval = useRef<NodeJS.Timeout | null>(null)

    const close = () => {
        modal?.current?.classList?.add("hide")

        if (interval?.current) {
            clearInterval(interval?.current)
        }

        interval.current = setTimeout(() => {
            modal?.current?.classList?.remove("hide", "active")
        }, 500)
    }

    useImperativeHandle<unknown, modalRef>(ref, () => ({
        open: () => {
            if (interval?.current) {
                clearInterval(interval?.current)
            }

            modal?.current?.classList?.add("active")
        },
        close
    }), [])

    return (
        <div
            id='modal'
            ref={modal}
            onClick={(e) => {
                if (e?.target instanceof HTMLElement &&
                    !inner?.current?.contains?.(e?.target)) {
                    close?.()
                }
            }}
        >
            <div
                ref={inner}
                className="inner max-w-xl w-full rounded-md p-3 flex flex-col gap-3"
            >
                <div className='flex items-center pb-2'>
                    <button
                        onClick={close}
                        className='ml-auto text-md text-primary-black font-semibold duration-500 ease-in-out hover:text-red-500'
                    >
                        &#10005;
                    </button>
                </div>
                <div className={className}>
                    {children}
                </div>
            </div>
        </div>
    )
})

export default Modal