import { Card } from "../../components"
import { PieChart, LineChart, BarChart } from "../../components/chart";

const Home = () => {
    return (
        <div>
            <div className="grid grid-cols-4 gap-4 p-4">
                <Card className="flex p-2">
                    <div>
                        <h3>Customer</h3>
                        <p>2564</p>
                    </div>
                    <div>

                    </div>
                </Card>
                <Card className="flex p-2">
                    <div>
                        <h3>Customer</h3>
                        <p>2564</p>
                    </div>
                    <div>

                    </div>
                </Card>
                <Card className="flex p-2">
                    <div>
                        <h3>Customer</h3>
                        <p>2564</p>
                    </div>
                    <div>

                    </div>
                </Card>
                <Card className="flex p-2">
                    <div>
                        <h3>Customer</h3>
                        <p>2564</p>
                    </div>
                    <div>

                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[calc(70%-1rem)_30%] gap-[1rem] p-4">
                <div className="flex flex-col gap-[1rem]">
                    <Card className="p-4">
                        <h2 className="bold text-xl font-semibold">Oppourtunites by user</h2>
                        <LineChart />
                    </Card>

                    <Card className="p-4">
                        <BarChart />
                    </Card>
                </div>
                <div className="flex flex-col gap-[1rem]">
                    <Card className="p-4">
                        <h2 className="bold text-xl font-semibold">Lead Source</h2>
                        <PieChart />
                    </Card>
                    <Card className="p-4">
                        <PieChart />
                    </Card>
                </div>
            </div>
        </div>

    )
}

export default Home