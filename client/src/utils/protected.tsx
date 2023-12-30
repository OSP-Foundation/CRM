import { Outlet } from 'react-router-dom'
import { SideBar } from '../components'

interface props {
    isAuth?: boolean
}

const ProtectedRoute = ({ isAuth }: props) => {
    return isAuth ? (
        <>
            <SideBar />
            <div id='include-sidebar'>
                <Outlet />
            </div>
        </>
    ) : "LOGIN"
}

export default ProtectedRoute