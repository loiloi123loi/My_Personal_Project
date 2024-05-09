import { Link } from 'react-router-dom'
import '@vidstack/react/player/styles/base.css'
import { MediaPlayer, MediaProvider } from '@vidstack/react'

const getGoogleAuthUrl = () => {
  const { VITE_GOOGLE_CLIENT_ID, VITE_GOOGLE_REDIRECT_URIS } = import.meta.env
  const url = 'https://accounts.google.com/o/oauth2/v2/auth'
  const query = {
    client_id: VITE_GOOGLE_CLIENT_ID,
    redirect_uri: VITE_GOOGLE_REDIRECT_URIS,
    response_type: 'code',
    scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'].join(
      ' '
    ),
    prompt: 'consent',
    access_type: 'offline'
  }
  const queryString = new URLSearchParams(query).toString()
  return `${url}?${queryString}`
}
const googleOAuthURL = getGoogleAuthUrl()

const Home = () => {
  // const handleGoogleLogin = () => {
  //   const width = 550
  //   const height = 700
  //   const left = (window.outerWidth - width) / 2
  //   const top = (window.outerHeight - height) / 2
  //   window.open(googleOAuthURL, 'GoogleOAuth', `width=${width},height=${height},left=${left},top=${top}`)
  // }

  const isAuthenticated = Boolean(localStorage.getItem('access_token'))

  const logout = async () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    window.location.reload()
  }

  return (
    <>
      {/* <video width='900' controls autoPlay>
        <source src='http://localhost:5000/api/v1/static/video-stream/f95357565eae63a17150eb401.mp4' type='video/mp4' />
      </video> */}
      <MediaPlayer
        title='TEST'
        src='http://localhost:5000/api/v1/static/video-hls/vEGeycuiEI1PTyRzTWG8l/master.m3u8'
        autoPlay
        controls
      >
        <MediaProvider />
      </MediaPlayer>
      <h1>Google OAuth 2.0</h1>
      {/* <button onClick={handleGoogleLogin} className='btn'>
          Click to login google
        </button> */}
      {isAuthenticated ? (
        <>
          <h3>Hello myfriend, you logged in</h3>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <Link to={googleOAuthURL}>Login OAuth 2.0</Link>
      )}
    </>
  )
}

export default Home
