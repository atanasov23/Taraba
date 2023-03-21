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
import { useState } from 'react';
import { userAuth } from "./context/auth";
import { Edit } from "./components/adEdit";

function Test1() {
    return (
        <h1>Test1</h1>
    )
}

function Test2() {
    return (
        <h1>Test2</h1>
    )
}

function Test3() {
    return (
        <h1>Test3</h1>
    )
}

function App() {

    const [token, setToken] = useState("");

    const [user, setUser] = useState("");

    const data = {
        token,
        setToken,
        user,
        setUser
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

                        <Route path='ad/edit/:id' element={<Edit />}/>

                        <Route element={< Auth />}>

                            <Route path='/user/messages' element={<Test1 />} />

                            <Route path='/user/fav' element={<Test2 />} />

                            <Route path='/user/profile' element={<Test3 />} />

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
