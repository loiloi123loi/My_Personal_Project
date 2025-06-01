import { Link } from 'react-router-dom'
import Logo from '@/assets/img/logo.svg'
import LandingImg from '@/assets/img/main.svg'
import { Button } from '@/components/ui/button'

function Landing() {
  return (
    <main>
      <header className="max-w-6xl mx-auto px-4 sm:px-8 py-6 ">
        <img src={Logo} alt="logo" />
      </header>
      <section className="max-w-6xl mx-auto px-4 sm:px-8 h-screen -mt-20 grid lg:grid-cols-[1fr,400px] items-center">
        <div>
          <h1 className="capitalize text-4xl md:text-7xl font-bold">
            job <span className="text-primary">tracking</span> app
          </h1>
          <p className="leading-loose max-w-md mt-4 ">
            I am baby wayfarers hoodie next level taiyaki brooklyn cliche blue bottle single-origin coffee chia.
            Aesthetic post-ironic venmo, quinoa lo-fi tote bag adaptogen everyday carry meggings +1 brunch narwhal.
          </p>
          <div className="flex gap-x-2">
            <Button asChild className="mt-4">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild className="mt-4">
              <Link to="/register">Register</Link>
            </Button>
          </div>
        </div>
        <img src={LandingImg} alt="landing" className="hidden lg:block " />
      </section>
    </main>
  )
}

export default Landing
