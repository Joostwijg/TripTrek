import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import { BrowserRouter } from "react-router-dom";


function App() {
    return (
        <>
            <BrowserRouter>
                <div>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                    </Routes>
                </div>
            </BrowserRouter>

        </>


    )
}

export default App
