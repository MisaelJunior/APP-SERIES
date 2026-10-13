import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Profile from "./pages/Profile/Perfil";
import Register from "./pages/Register";
import FilmeDetalhes from "./pages/Filme/FilmeDetalhes";
import EditProfile from "./pages/EditProfile/EditProfile";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/edit" element={<EditProfile />} />
                <Route path="/register" element={<Register />} />
                <Route path="/filme/:id" element={<FilmeDetalhes />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;