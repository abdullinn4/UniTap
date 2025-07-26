import './App.scss'
import {Header} from "../widgets/header/Header.tsx";
import {CreateCardPage} from "../pages/CreateCardPage";
import {ToastContainer} from "react-toastify";

function App() {

  return (
    <>
        <ToastContainer position="top-center" autoClose={4000} closeButton={false} hideProgressBar={true} />
        <Header/>
        <CreateCardPage/>
    </>
  )
}

export default App
