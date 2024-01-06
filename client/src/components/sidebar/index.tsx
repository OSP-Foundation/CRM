import { Fragment, useRef } from 'react'
import {
    Doc, Expense, Graph, HeadPhone, Logout, Meter,
    Nav,
    Payment, Quote, Settings, Store, User
} from '../../assets/svg'
import './style.scss'

const SideBar = () => {
    const ref = useRef<HTMLDivElement | null>(null)

    // for open sidebar
    const OpenSideBar = () => {
        ref?.current?.classList?.add("active")
    }

    // for close sidebar
    const CloseSideBar = () => {
        ref?.current?.classList?.remove("active")
    }

    return (
        <Fragment>
            <div
                id='navbar'
                className='flex flex-row items-center gap-4 py-4 px-6 relative'
            >
                <button
                    id='open-sidebar'
                    onClick={OpenSideBar}
                >
                    <Nav
                        width='1.2rem'
                        height='1.2rem'
                        className='fill-primary-black pointer-events-none'
                    />
                </button>

                <button
                    className='border border-primary-border ml-auto aspect-square bg-white p-1 rounded-full ease-in-out duration-500 hover:border-primary-blue'
                >
                    <Logout
                        width='1.2rem'
                        height='1.2rem'
                        className='fill-red-500'
                    />
                </button>

                <button
                    id='open-dropdown'
                    className='w-10 h-10 bg-orange-200 rounded-full text-sm uppercase font-bold text-red-500 ease-in-out duration-500 hover:bg-orange-300'
                >
                    A
                </button>

                <div
                    id='dropdown'
                    className='rounded-md bg-white p-1 shadow-primary-box-shadow'
                >
                    <div className="flex flex-row items-center gap-3 p-3 border-b border-primary-border">
                        <button
                            className='ml-auto w-10 h-10 bg-orange-200 rounded-full text-sm uppercase font-bold text-red-500'
                        >
                            A
                        </button>
                        <div className="flex flex-col gap-1">
                            <h1 className='text-sm font-semibold text-primary-black'>Anson Benny</h1>
                            <p className='text-xs lowercase text-primary-black'>crm1444@gmail.com</p>
                        </div>
                    </div>

                    <div className="border-b border-primary-border py-1">
                        <button
                            className='w-full px-3 py-1 rounded capitalize flex flex-row gap-2 items-center text-sm font-medium text-primary-black bg-transparent ease-in-out duration-500 hover:bg-light-blue'
                        >
                            <Settings
                                width='1rem'
                                height='1rem'
                                className='fill-primary-black'
                            />
                            Profile settings
                        </button>
                    </div>

                    <div className="py-1">
                        <button
                            className='w-full py-1 px-3 rounded capitalize flex flex-row gap-2 items-center text-sm font-medium text-primary-black bg-transparent ease-in-out duration-500 hover:bg-light-blue'
                        >
                            <Logout
                                width='1rem'
                                height='1rem'
                                className='fill-primary-black'
                            />
                            logout
                        </button>
                    </div>
                </div>
            </div>

            <div
                id='sidebar'
                ref={ref}
            >
                <div className="items">
                    <div className="flex flex-row gap-2 items-center mb-3">
                        <div
                            className='border-[5px] border-primary-blue w-6 h-6 rounded-full'
                        >

                        </div>
                        <h1 className='text-2xl font-semibold text-primary-blue'>
                            CR<span className='text-primary-black'>M</span>
                        </h1>
                    </div>

                    <button
                        className='active text-sm'
                    >
                        <Meter
                            width='1rem'
                            height='1rem'
                            className='svg-fill'
                        />

                        dashboard
                    </button>

                    <button
                        className='text-sm'
                    >
                        <HeadPhone
                            width='1rem'
                            height='1rem'
                            classChild='svg-stroke'
                        />

                        customer
                    </button>

                    <button
                        className='text-sm'
                    >
                        <User
                            width='1rem'
                            height='1rem'
                            className='svg-fill'
                        />

                        people
                    </button>

                    <button
                        className='text-sm'
                    >
                        <Store
                            width='1rem'
                            height='1rem'
                            className='svg-fill'
                        />

                        company
                    </button>

                    <button
                        className='text-sm'
                    >
                        <Graph
                            width='1rem'
                            height='1rem'
                            className='svg-fill'
                        />

                        lead
                    </button>

                    <button
                        className='text-sm'
                    >
                        <Quote
                            width='1rem'
                            height='1rem'
                            className='svg-fill'
                        />

                        quote
                    </button>

                    <button
                        className='text-sm'
                    >
                        <Doc
                            width='1rem'
                            height='1rem'
                            className='svg-fill'
                        />

                        invoice
                    </button>

                    <button
                        className='text-sm'
                    >
                        <Expense
                            width='1rem'
                            height='1rem'
                            className='svg-stroke'
                        />

                        expense
                    </button>

                    <button
                        className='text-sm'
                    >
                        <Payment
                            width='1rem'
                            height='1rem'
                            classChild='svg-stroke'
                        />

                        payment
                    </button>

                    <button
                        className='text-sm'
                    >
                        <Settings
                            width='1rem'
                            height='1rem'
                            className='svg-fill'
                        />

                        settings
                    </button>
                </div>

                <div
                    className="blur-area"
                    onClick={CloseSideBar}
                />
            </div>
        </Fragment>
    )
}

export default SideBar