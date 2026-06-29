import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/layout/RootLayout";
import Main from '../pages/Main'
import NotFoundPage from "../pages/NotFoundPage";
import Profile from "../components/Profile";
export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
        {
            index: true,
            element: (
                <Main />
            )
        },
        {
            path:'login',
            element: (
                <Main />
            )
        },
        {
            path:'register',
            element: (
                <Main />
            )
        },
        {
            path:'profile',
            element: (
                <Profile />
            )
        },
        {
            path: 'artist',
            children:
            [{
                index:true,
                element: (
                <>
                </>
                )
            },
            {
                path:'artistId',
                element:(
                    <></>
                )
            }]
        },
        {
            path:'album',
            children : 
            [{
                index: true,
                element:(
                    <></>
                )
            },
            {
                path:':albumId',
                element: (
                    <></>
                )
            }
            ]
        },
        {
        path: '*',
        element: <NotFoundPage />
        },]
    },
])