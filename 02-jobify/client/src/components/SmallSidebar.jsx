import Wrapper from '../assets/wrappers/SmallSidebar'
import { FaTimes } from 'react-icons/fa'
import Logo from './Logo'
import NavLinks from './NavLinks'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSidebar } from '../features/user/userSlice'

const SmallSidebar = () => {
    const { isSidebarOpen } = useSelector((store) => store.user)
    const dispatch = useDispatch()

    const toggle = () => {
        dispatch(toggleSidebar(!isSidebarOpen))
    }

    return (
        <Wrapper>
            <div
                className={
                    isSidebarOpen
                        ? 'sidebar-container show-sidebar'
                        : 'sidebar-container'
                }
            >
                <div className="content">
                    <button
                        type="button"
                        className="close-btn"
                        onClick={toggle}
                    >
                        <FaTimes />
                    </button>
                    <header>
                        <Logo />
                    </header>
                    <NavLinks toggleSidebar={toggle} currentPath="/dashboard" />
                </div>
            </div>
        </Wrapper>
    )
}

export default SmallSidebar
