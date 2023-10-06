import Wrapper from '../assets/wrappers/Navbar'
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'
import { BsFillMoonFill, BsSunFill } from 'react-icons/bs'
import Logo from './Logo'
import { useDispatch, useSelector } from 'react-redux'
import { clearStore, toggleSidebar } from '../features/user/userSlice'
import { useState } from 'react'
import { getThemeFromLocalStorage } from '../utils/localStorage'

const Navbar = ({ handleChange }) => {
    const { user } = useSelector((store) => store.user)
    const [showLogout, setShowLogout] = useState(false)
    const dispatch = useDispatch()

    const toggle = () => {
        dispatch(toggleSidebar())
    }

    const [dark, setDark] = useState(getThemeFromLocalStorage())

    const handleClick = () => {
        handleChange(!dark)
        setDark(!dark)
    }

    return (
        <Wrapper>
            <div className="nav-center">
                <button type="button" className="toggle-btn" onClick={toggle}>
                    <FaAlignLeft />
                </button>
                <div>
                    <Logo />
                    <h4 className="logo-text">dashboard</h4>
                </div>
                <div className="btn-container">
                    <button className="dark-btn" onClick={handleClick}>
                        {!dark ? (
                            <BsFillMoonFill className="toggle-icon" />
                        ) : (
                            <BsSunFill className="toggle-icon" />
                        )}
                    </button>
                    <div className="container-logout">
                        <button
                            type="button"
                            className="btn"
                            onClick={() => setShowLogout(!showLogout)}
                        >
                            {user?.avatar ? (
                                <img
                                    className="img"
                                    src={user?.avatar}
                                    alt="avatar"
                                />
                            ) : (
                                <FaUserCircle />
                            )}
                            {user?.name}
                            <FaCaretDown />
                        </button>
                        <div
                            className={
                                showLogout
                                    ? 'dropdown show-dropdown'
                                    : 'dropdown'
                            }
                        >
                            <button
                                type="button"
                                className="dropdown-btn"
                                onClick={() => dispatch(clearStore())}
                            >
                                logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default Navbar
