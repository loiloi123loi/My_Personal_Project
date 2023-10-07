import { useSelector } from 'react-redux'
import links from '../utils/links'
import linksAdmin from '../utils/linksAdmin'
import { NavLink } from 'react-router-dom'

const NavLinks = ({ currentPath, toggleSidebar }) => {
    const { user } = useSelector((store) => store.user)

    return (
        <div className="nav-links">
            {links.map((link) => {
                const { text, path, id, icon } = link
                return (
                    <NavLink
                        to={`${currentPath}${path}`}
                        className={({ isActive }) => {
                            return isActive ? 'nav-link active' : 'nav-link'
                        }}
                        key={id}
                        onClick={toggleSidebar}
                    >
                        <span className="icon">{icon}</span>
                        {text}
                    </NavLink>
                )
            })}
            {user &&
                user.role === 'admin' &&
                linksAdmin.map((link) => {
                    const { text, path, id, icon } = link
                    return (
                        <NavLink
                            to={`${currentPath}${path}`}
                            className={({ isActive }) => {
                                return isActive ? 'nav-link active' : 'nav-link'
                            }}
                            key={id}
                            onClick={toggleSidebar}
                        >
                            <span className="icon">{icon}</span>
                            {text}
                        </NavLink>
                    )
                })}
        </div>
    )
}

export default NavLinks
