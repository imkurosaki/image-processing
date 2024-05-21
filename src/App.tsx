import { BrowserRouter, Route, Routes } from "react-router-dom"
import { RecoilRoot } from "recoil"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Authentication from "./pages/Authentication"
import Register from "./pages/Register"
import Signin from "./pages/Signin"
import Navbar from "./components/Navbar"

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter basename="/editor">
        <Routes>
          <Route path="/" element={
            <>
              <Navbar/>
              <Home/>
            </>
          } />
          <Route path="/signin" element={<Signin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/authentication" element={<Authentication />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App
