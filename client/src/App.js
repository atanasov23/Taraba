import Footer from "./components/footer";
import Header from "./components/header";
import { Login } from "./components/login";
import { Register } from "./components/register";
import { Route, Routes } from 'react-router-dom';
import Auth from './components/auth';
import Search from "./components/search";
import Adding from "./components/adding";
import { CategoryView } from "./components/categoryView";
import { ContentView } from './components/contentView';
import { AdDetails } from "./components/adDetails";
import { useState, useEffect } from 'react';
import { userAuth } from "./context/auth";
import { Edit } from "./components/adEdit";
import { MessageView } from "./components/messageView";
import { Favorites } from './components/favorites';
import { FavoritesDetails } from "./components/favoritesDetails";
import { Logout } from "./components/logout";
import { MyAds } from "./components/myAds";

function Test1() {
    return (
        <h1>Test1</h1>
    )
}


function App() {

    const [token, setToken] = useState("");

    const [user, setUser] = useState("");

    const [fetchData, setFetchData] = useState("");

    useEffect(() => {

        fetch('http://localhost:1000/all')
            .then(a => a.json())
            .then(a => {
                setFetchData((fetchData) => fetchData = a);
            });

    }, []);

    const data = {
        token,
        setToken,
        user,
        setUser,
        fetchData,
        setData: setFetchData,
    }

    return (
        <>
            <userAuth.Provider value={data}>

                <Header />

                <main>

                    <Routes>

                        <Route path='/' element={<><Search /> <CategoryView /> <ContentView /> </>} />

                        <Route path='/details/:id' element={<><Search /><AdDetails /></>} />

                        <Route path='/login' element={<Login />} />

                        <Route path='/register' element={<Register />} />

                        <Route path='/logout' element={<Logout />} />

                        <Route element={< Auth />}>

                            <Route path='/user/messages' element={<MessageView />} />

                            <Route path='/user/fav' element={<Favorites />} />

                            <Route path='/favorite/details/:id' element={<FavoritesDetails />} />

                            <Route path='/user/ads' element={<MyAds />} />

                            <Route path='ad/edit/:id' element={<Edit />} />

                            <Route path='/adding' element={<Adding />} />

                        </Route>

                    </Routes>

                </main>

                <Footer />
            </userAuth.Provider>
        </>
    )
}

export default App;
