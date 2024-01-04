import { Card, Table, Td, TdMenu } from "../../components"
import { PieChart, LineChart, BarChart } from "../../components/chart";

const Home = () => {
    return (
        <div className="flex flex-col gap-[1rem]">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 ">
                <Card className="text-center px-2 py-4 flex flex-col gap-2">
                    <h3 className="border-b font-semibold text-lg pb-2 text-pure-black capitalize">invoice</h3>
                    <div className="flex flex-row px-2 items-center justify-between">
                        <p className="text-sm text-primary-black">This Month</p>
                        <button
                            className='text-xs text-blue-500 bg-blue-200 rounded-md py-1 px-3  pointer-events-none'
                        >
                            $56789.006
                        </button>
                    </div>
                </Card>
                <Card className="text-center px-2 py-4 flex flex-col gap-2">
                    <h3 className="border-b font-semibold text-lg pb-2 text-pure-black capitalize">quote</h3>
                    <div className="flex flex-row px-2 items-center justify-between">
                        <p className="text-sm text-primary-black">This Month</p>
                        <button
                            className='text-xs text-violet-500 bg-violet-200 rounded-md py-1 px-3  pointer-events-none'
                        >
                            $76759.016
                        </button>
                    </div>
                </Card>
                <Card className="text-center px-2 py-4 flex flex-col gap-2">
                    <h3 className="border-b font-semibold text-lg pb-2 text-pure-black capitalize">payment</h3>
                    <div className="flex flex-row px-2 items-center justify-between">
                        <p className="text-sm text-primary-black">This Month</p>
                        <button
                            className='text-xs text-green-500 bg-green-200 rounded-md py-1 px-3  pointer-events-none'
                        >
                            $89789.206
                        </button>
                    </div>
                </Card>
                <Card className="text-center px-2 py-4 flex flex-col gap-2">
                    <h3 className="border-b font-semibold text-lg pb-2 text-pure-black capitalize">due balance</h3>
                    <div className="flex flex-row px-2 items-center justify-between">
                        <p className="text-sm text-primary-black">This Month</p>
                        <button
                            className='text-xs text-red-500 bg-red-200 rounded-md py-1 px-3  pointer-events-none'
                        >
                            $376789.006
                        </button>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[calc(70%-1rem)_30%] gap-[1rem]">
                <div className="flex flex-col gap-[1rem]">
                    <Card className="p-4 min-h-[25rem]">
                        {/* <h2 className="bold text-xl font-semibold text-secondary-black">Oppourtunites by user</h2> */}
                        <LineChart />
                    </Card>

                    <Card className="p-4 min-h-[25rem]">
                        <BarChart />
                    </Card>
                </div>
                <div className="flex flex-col gap-[1rem]">
                    <Card className="p-4">
                        {/* <h2 className="bold text-xl font-semibold">Lead Source</h2> */}
                        <PieChart />
                    </Card>
                    <Card className="p-4">
                        <PieChart />
                    </Card>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[1rem]">
                <Card className="p-4">
                    <Table
                        titles={['type', 'name', 'country', '']}
                    >
                        <tr>
                            <Td>
                                <button
                                    className='text-xs text-primary-blue bg-light-blue rounded-md py-1 px-3 capitalize pointer-events-none'
                                >
                                    people
                                </button>
                            </Td>
                            <Td>anson benny</Td>
                            <Td>
                                <button className='border border-primary-bg bg-primary-bg capitalize text-xs text-primary-black rounded-md py-1 px-3 pointer-events-none'>
                                    india
                                </button>
                            </Td>
                            <TdMenu>
                                <button>
                                    show
                                </button>
                                <button>
                                    edit
                                </button>
                                <button>
                                    delete
                                </button>
                            </TdMenu>
                        </tr>
                        <tr>
                            <Td>
                                <button
                                    className='text-xs text-rose-500 bg-rose-200 rounded-md py-1 px-3 capitalize pointer-events-none'
                                >
                                    company
                                </button>
                            </Td>
                            <Td>shebin</Td>
                            <Td>
                                <button className='border border-primary-bg bg-primary-bg capitalize text-xs text-primary-black rounded-md py-1 px-3 pointer-events-none'>
                                    india
                                </button>
                            </Td>
                            <TdMenu>
                                <button>
                                    show
                                </button>
                                <button>
                                    edit
                                </button>
                                <button>
                                    delete
                                </button>
                            </TdMenu>
                        </tr>
                        <tr>
                            <Td>
                                <button
                                    className='text-xs text-primary-blue bg-light-blue rounded-md py-1 px-3 capitalize pointer-events-none'
                                >
                                    people
                                </button>
                            </Td>
                            <Td>anson benny</Td>
                            <Td>
                                <button className='border border-primary-bg bg-primary-bg capitalize text-xs text-primary-black rounded-md py-1 px-3 pointer-events-none'>
                                    india
                                </button>
                            </Td>
                            <TdMenu>
                                <button>
                                    show
                                </button>
                                <button>
                                    edit
                                </button>
                                <button>
                                    delete
                                </button>
                            </TdMenu>
                        </tr>
                        <tr>
                            <Td>
                                <button
                                    className='text-xs text-rose-500 bg-rose-200 rounded-md py-1 px-3 capitalize pointer-events-none'
                                >
                                    company
                                </button>
                            </Td>
                            <Td>shebin</Td>
                            <Td>
                                <button className='border border-primary-bg bg-primary-bg capitalize text-xs text-primary-black rounded-md py-1 px-3 pointer-events-none'>
                                    india
                                </button>
                            </Td>
                            <TdMenu>
                                <button>
                                    show
                                </button>
                                <button>
                                    edit
                                </button>
                                <button>
                                    delete
                                </button>
                            </TdMenu>
                        </tr>
                    </Table>
                </Card>
                <Card className="p-4">
                    <Table
                        titles={['type', 'name', 'country', '']}
                    >
                        <tr>
                            <Td>
                                <button
                                    className='text-xs text-primary-blue bg-light-blue rounded-md py-1 px-3 capitalize pointer-events-none'
                                >
                                    people
                                </button>
                            </Td>
                            <Td>anson benny</Td>
                            <Td>
                                <button className='border border-primary-bg bg-primary-bg capitalize text-xs text-primary-black rounded-md py-1 px-3 pointer-events-none'>
                                    india
                                </button>
                            </Td>
                            <TdMenu>
                                <button>
                                    show
                                </button>
                                <button>
                                    edit
                                </button>
                                <button>
                                    delete
                                </button>
                            </TdMenu>
                        </tr>
                        <tr>
                            <Td>
                                <button
                                    className='text-xs text-rose-500 bg-rose-200 rounded-md py-1 px-3 capitalize pointer-events-none'
                                >
                                    company
                                </button>
                            </Td>
                            <Td>shebin</Td>
                            <Td>
                                <button className='border border-primary-bg bg-primary-bg capitalize text-xs text-primary-black rounded-md py-1 px-3 pointer-events-none'>
                                    india
                                </button>
                            </Td>
                            <TdMenu>
                                <button>
                                    show
                                </button>
                                <button>
                                    edit
                                </button>
                                <button>
                                    delete
                                </button>
                            </TdMenu>
                        </tr>
                        <tr>
                            <Td>
                                <button
                                    className='text-xs text-primary-blue bg-light-blue rounded-md py-1 px-3 capitalize pointer-events-none'
                                >
                                    people
                                </button>
                            </Td>
                            <Td>anson benny</Td>
                            <Td>
                                <button className='border border-primary-bg bg-primary-bg capitalize text-xs text-primary-black rounded-md py-1 px-3 pointer-events-none'>
                                    india
                                </button>
                            </Td>
                            <TdMenu>
                                <button>
                                    show
                                </button>
                                <button>
                                    edit
                                </button>
                                <button>
                                    delete
                                </button>
                            </TdMenu>
                        </tr>
                        <tr>
                            <Td>
                                <button
                                    className='text-xs text-rose-500 bg-rose-200 rounded-md py-1 px-3 capitalize pointer-events-none'
                                >
                                    company
                                </button>
                            </Td>
                            <Td>shebin</Td>
                            <Td>
                                <button className='border border-primary-bg bg-primary-bg capitalize text-xs text-primary-black rounded-md py-1 px-3 pointer-events-none'>
                                    india
                                </button>
                            </Td>
                            <TdMenu>
                                <button>
                                    show
                                </button>
                                <button>
                                    edit
                                </button>
                                <button>
                                    delete
                                </button>
                            </TdMenu>
                        </tr>
                    </Table>
                </Card>
            </div>
        </div>
    )
}

export default Home