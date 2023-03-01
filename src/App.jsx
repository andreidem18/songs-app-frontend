import { useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import './App.css'
import { Container } from 'react-bootstrap'
import Home from './pages/Home'
import Artists from './pages/Artists'
import Albums from './pages/Albums'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/Notification'
import { getSongsThunk } from './store/slices/songs.slice'
import { getAlbumsThunk } from './store/slices/albums.slice'
import { getArtistsThunk } from './store/slices/artists.slice'
import { getGenresThunk } from './store/slices/genres.slice'
import LoadingScreen from './components/LoadingScreen'
import Educational from './components/Educational'

function App() {

  const isLoading = useSelector(state => state.app.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSongsThunk());
    dispatch(getAlbumsThunk());
    dispatch(getArtistsThunk());
    dispatch(getGenresThunk());
  }, [])

  return (
    <HashRouter>
      <Educational />
      <NavBar />
      <Notification />
      { isLoading && <LoadingScreen /> }
      <Container className="my-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/albums" element={<Albums />} />
        </Routes>
      </Container>
    </HashRouter>
  )
}

export default App
