import React from 'react'
import { Card, Input } from '..';
import { WhiteBtn } from '../buttons';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from '../../assets/svg';

interface props {
    children: React.ReactNode;
    cardClass?: string;
    isFixedActions?: boolean,
    Actions?: React.ReactNode
}

const PrimaryLayout = ({ children, Actions, isFixedActions = true, cardClass }: props) => {
    const navigate = useNavigate();

    return (
        <div className='flex flex-col gap-7'>
            {
                isFixedActions && <Card className='container md:py-[1rem] flex flex-wrap gap-3 items-center'>
                    <Input
                        name='search'
                        type="text"
                        placeholder='Search'
                        container='mr-auto'
                    />

                    <select
                        className='capitalize appearance-none text-sm text-primary-black bg-white border border-primary-border rounded-md px-3 py-1 ease-in-out duration-500 hover:bg-primary-border'
                    >
                        <option
                            className='capitalize text-sm text-primary-black'
                            value="recent">
                            recent
                        </option>
                    </select>

                    <WhiteBtn
                        type='button'
                    >
                        refresh
                    </WhiteBtn>
                </Card>
            }

            <Card className={`container flex flex-col gap-4 ${cardClass}`}>
                <div className={`flex flex-wrap items-center gap-3 pb-5 w-full`}>
                    <button
                        className='group mr-auto'
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft
                            width='1.5rem'
                            height='1.5rem'
                            className='pointer-events-none'
                            classChild='ease-in-out duration-500 fill-primary-black group-hover:fill-primary-blue'
                        />
                    </button>

                    {Actions}
                </div>

                {children}
            </Card>
        </div>
    )
}

export default PrimaryLayout;