import React from 'react'
import './style.scss'

interface table {
    titles: Array<string>;
    children: React.ReactNode;
    className?: string;
}

const Table = ({ children, className, titles }: table) => {
    return (
        <div className='relative'>
            <div id='table-outer-container' >
                <table
                    id='table-primary'
                    className={`w-full table-auto text-left ${className}`}
                >
                    <thead>
                        <tr>
                            {
                                titles?.map?.((v: string, k: number) => {
                                    return <th
                                        className='p-4 capitalize text-sm text-pure-black font-semibold'
                                        key={k}
                                    >
                                        {v}
                                    </th>
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {children}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table