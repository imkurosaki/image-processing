import { BrowserRouter, Route, Routes } from "react-router-dom"
import { RecoilRoot } from "recoil"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter basename="/editor">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App
