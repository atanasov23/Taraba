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

    return (
        <>
            <Header />

            <main>

                <Routes>

                    <Route path='/ad/details/:id' element={<><Search/><AdDetails/></>} />

                    <Route path='/' element={<><Search/> <CategoryView/> <ContentView/> </>} />

                    <Route path='/login' element={<Login />} />

                    <Route path='/register' element={<Register />} />

                    <Route element={< Auth />}>

                        <Route path='/user/messages' element={<Test1 />} />

                        <Route path='/user/fav' element={<Test2 />} />

                        <Route path='/user/profile' element={<Test3 />} />

                        <Route path='/adding' element={<Adding />} />

                    </Route>

                </Routes>

            </main>

            <Footer />
        </>
    )
}

export default App;
