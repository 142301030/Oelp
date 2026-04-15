import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Intent from "./pages/Intent";
import Domain from "./pages/Domain";
import Instructions from "./pages/Instructions";
import Annotation from "./pages/Annotation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login page */}
        <Route path="/" element={<Login />} />

        {/* Flow pages */}
        <Route path="/intent" element={<Intent />} />
        <Route path="/domain" element={<Domain />} />
        <Route path="/instructions" element={<Instructions />} />

        {/* Main annotation UI */}
        <Route path="/annotate" element={<Annotation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;