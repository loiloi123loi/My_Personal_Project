import Logo from '@/assets/img/logo.svg'
import { Button } from '@/components/ui/button'
import links from '@/utils/links'
import { Link, useLocation } from 'react-router-dom'

function Sidebar() {
  const { pathname } = useLocation()

  return (
    <aside className="py-4 px-8 bg-muted h-full">
      <img src={Logo} alt="logo" className="mx-auto" />
      <div className="flex flex-col mt-20 gap-y-4">
        {links.map((link) => {
          return (
            <Button asChild key={link.href} variant={pathname === link.href ? 'default' : 'link'}>
              <Link to={link.href} className="flex items-center gap-x-2 no-underline hover:no-underline">
                {link.icon} <span className="capitalize">{link.label}</span>
              </Link>
            </Button>
          )
        })}
      </div>
    </aside>
  )
}

export default Sidebar
