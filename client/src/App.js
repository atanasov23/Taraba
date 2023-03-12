import Footer from "./components/footer";
import Header from "./components/header";
import { Login } from "./components/pages/login";
import { Register } from "./components/pages/register";
import { Route, Router, Routes, Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Auth from './components/auth';
import Search from "./components/search";
import Adding from "./components/pages/adding";
import { Test } from "./components/testComponent";

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

function Test4() {
    return (
        <h1>Test4</h1>
    )
}

function App() {

    /*   const cookies = new Cookies();
      cookies.set('myCat', 'Pacmadddn', { path: '/' }); */

    return (
        <>
            <main>

                <Routes>

                    <Route path='/test' element={<Test />}></Route>

                    <Route path='/' element={
                        <>
                            <Header />
                            <Search />
                        </>
                    }
                    ></Route>

                    <Route path='/login' element={

                        <>
                            <Header />
                            <Login />
                        </>

                    }
                    ></Route>

                    <Route path='/register' element={

                        <>
                            <Header />
                            <Register />
                        </>

                    }
                    ></Route>

                    <Route element={< Auth />}>

                        <Route path='/user/messages' element={<Test1 />} />

                        <Route path='/user/fav' element={<Test2 />} />

                        <Route path='/user/profile' element={<Test3 />} />

                        <Route path='/adding' element={<><Header /> <Adding /></>} />

                    </Route>
                </Routes>

            </main>

            <Footer />
        </>

    )
}

export default App;
