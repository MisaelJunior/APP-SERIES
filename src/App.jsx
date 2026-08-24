import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import FilmeDetalhes from "./pages/Filme/FilmeDetalhes";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/register" element={<Register />} />
                <Route path="/filme/:id" element={<FilmeDetalhes />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;