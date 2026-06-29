import Header from '../header';
import Footer from '../Footer';
import MusicBar from '../../ui/MusicBar';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import LoginModal from '../../components/modals/LoginModal';
import RegisterModal from '../../components/modals/RegisterModal';
import { useCallback } from 'react';
import Portal from '../Portal';
export default function RootLayout() {
    const location = useLocation()
    const navigate = useNavigate()

    const isLoginModal = location.pathname === '/login'
    const isRegisterModal = location.pathname === '/register'

    const handleClose = useCallback(() => {
        navigate('/')
    },[navigate])

    return (
        <>
            <Header />
            <Outlet />
            {isLoginModal && (
                <Portal onClose={handleClose}>
                    <LoginModal onClose={handleClose} />
                </Portal>
            )}
            {isRegisterModal && (
                <Portal onClose={handleClose}>
                    <RegisterModal onClose={handleClose} />
                </Portal>
            )}
            <MusicBar isLiked={true} isPlaying={true}  coverUrl={''} title={'SO MUCH FUN'} artist={'Cochise'} />
            <Footer />
        </>
    )
}