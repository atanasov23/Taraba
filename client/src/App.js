import Footer from "./components/footer";
import Header from "./components/header";
import { Login } from "./components/login";
import { Register } from "./components/register";
import { Route, Routes } from "react-router-dom";
import Auth from "./components/auth";
import Adding from "./components/adding";
import { CategoryView } from "./components/categoryView";
import { ContentView } from "./components/contentView";
import { AdDetails } from "./components/adDetails";
import { useState } from "react";
import { userData } from "./context/auth";
import { adsData } from "./context/adsData";
import { Edit } from "./components/adEdit";
import { MessageView } from "./components/messageView";
import { Favorites } from "./components/favorites";
import { FavoritesDetails } from "./components/favoritesDetails";
import { Logout } from "./components/logout";
import { MyAds } from "./components/myAds";
import { DisplayAds } from "./components/displayCategoryAds";
import { useFetchAll } from "./hooks/fetchAll";
import { useLastAds } from "./hooks/fetchLastAds";
import { useFetchMyads } from "./hooks/fetchMyads";

function App() {

    const [token, setToken] = useState("");

    const [user, setUser] = useState("");

    const [allAds, setAllAds] = useState([]);

    const [lastAds, setLastAds] = useState([]);

    const [myAds, setMyAds] = useState([]);

    const [myFavorites, setMyFavorites] = useState([]);

    useFetchAll(setAllAds);

    useLastAds(setLastAds, allAds);

    useFetchMyads(setMyFavorites, setMyAds, user, myAds);

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
        setMyFavorites,
        myAds,
        setMyAds,
        lastAds,
        setLastAds
    }

    return (
        <>
            <userData.Provider value={user_data}>

                <Header />

                <CategoryView />

                <main>

                    <adsData.Provider value={ads}>

                        <Routes>

                            <Route path="/" element={<ContentView />} />

                            <Route path="/details/:id" element={<AdDetails />} />

                            <Route path="/login" element={<Login />} />

                            <Route path="/register" element={<Register />} />

                            <Route path="/logout" element={<Logout />} />

                            <Route path="/:electronic" element={<DisplayAds />} />

                            <Route path="/:tools" element={<DisplayAds />} />

                            <Route path="/:animals" element={<DisplayAds />} />

                            <Route path="/:service" element={<DisplayAds />} />

                            <Route path="/:cars" element={<DisplayAds />} />

                            <Route path="/:all" element={<DisplayAds />} />

                            <Route element={< Auth />}>

                                <Route path="/user/messages" element={<MessageView />} />

                                <Route path="/user/fav" element={<Favorites />} />

                                <Route path="/favorite/details/:id" element={<FavoritesDetails />} />

                                <Route path="/user/ads" element={<MyAds />} />

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
