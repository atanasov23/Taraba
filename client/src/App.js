import Footer from "./components/footer";
import Header from "./components/header";
import { Login } from "./components/login";
import { Register } from "./components/register";
import { Route, Routes } from "react-router-dom";
import Auth from "./components/auth";
import Search from "./components/search";
import Adding from "./components/adding";
import { CategoryView } from "./components/categoryView";
import { ContentView } from "./components/contentView";
import { AdDetails } from "./components/adDetails";
import { useState, useEffect } from "react";
import { userData } from "./context/auth";
import { adsData } from "./context/adsData";
import { Edit } from "./components/adEdit";
import { MessageView } from "./components/messageView";
import { Favorites } from "./components/favorites";
import { FavoritesDetails } from "./components/favoritesDetails";
import { Logout } from "./components/logout";
import { MyAds } from "./components/myAds";

function App() {

    const [token, setToken] = useState("");

    const [user, setUser] = useState("");

    const [allAds, setAllAds] = useState([]);

    const [myFavorites, setMyFavorites] = useState([]);

    useEffect(() => {

        fetch("http://localhost:1000/all")
            .then(a => a.json())
            .then(a => {
                setAllAds(a);
            });

    }, []);

    const user_data = {
        token,
        setToken,
        user,
        setUser,
    }

    const ads = {
        allAds,
        setAllAds,
        myFavorites,
        setMyFavorites
    }

    return (
        <>
            <userData.Provider value={user_data}>

                <Header />

                <main>

                    <adsData.Provider value={ads}>

                        <Routes>

                            <Route path="/" element={<><Search /> <CategoryView /> <ContentView /> </>} />

                            <Route path="/details/:id" element={<><Search /><AdDetails /></>} />

                            <Route path="/login" element={<Login />} />

                            <Route path="/register" element={<Register />} />

                            <Route path="/logout" element={<Logout />} />

                            <Route element={< Auth />}>

                                <Route path="/user/messages" element={<><Search /> <CategoryView /> <MessageView /> </>} />

                                <Route path="/user/fav" element={<><Search /> <CategoryView /> <Favorites /> </>} />

                                <Route path="/favorite/details/:id" element={<FavoritesDetails />} />

                                <Route path="/user/ads" element={<><Search /> <CategoryView /> <MyAds /> </>} />

                                <Route path="ad/edit/:id" element={<Edit />} />

                                <Route path="/adding" element={<Adding />} />

                            </Route>

                        </Routes>

                    </adsData.Provider>

                </main>

                <Footer />

            </userData.Provider>
        </>
    )
}

export default App;
