import Wrapper from '../../assets/wrappers/SharedLayout'
import { Outlet } from 'react-router-dom'
import { SmallSidebar, BigSidebar, Navbar } from '../../components'

const SharedLayout = ({ handleChange }) => {
    return (
        <Wrapper>
            <main className="dashboard">
                <SmallSidebar />
                <BigSidebar />
                <div>
                    <Navbar handleChange={handleChange} />
                    <div className="dashboard-page">
                        <Outlet />
                    </div>
                </div>
            </main>
        </Wrapper>
    )
}

export default SharedLayout
