import Main from './pages/Main'
import Header from './components/header'
import Footer from "./components/Footer"
import MusicBar from './ui/MusicBar'
function App() {


  return (
    <>
      <Header />
      <Main />
      <MusicBar isLiked={true} isPlaying={true}  coverUrl={''} title={'SO MUCH FUN'} artist={'Cochise'} />
      <Footer />
    </>
  )
}

export default App
