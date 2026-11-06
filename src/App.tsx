import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Perfil";
import Register from "./pages/Register";
import FilmeDetalhes from "./pages/Filme/FilmeDetalhes";
import EditProfile from "./pages/EditProfile/EditProfile";
import Conections from "./pages/Conections/Conections";
import NotFound from "./pages/NotFound/NotFound";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/edit" element={<EditProfile />} />
                <Route path="/register" element={<Register />} />
                <Route path="/filme/:id" element={<FilmeDetalhes />} />
                <Route path="/profile/conections" element={<Conections />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;