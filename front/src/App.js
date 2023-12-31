import { Routes, Route } from "react-router-dom";
import UserProvider from "./context/userContextProvider";
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import ProtectedRoute from "./components/protectedRoute";
import Profile from "./pages/profilePage";
import { AlertProvider } from "./context/alertContext";
import Home from "./pages/homePage";

function App() {


  return (
    <UserProvider>
      <AlertProvider>
        <Routes>
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/register' element={<RegisterPage/>} />
          <Route path='/home' element={<Home/>} />
          <Route path='/main' element={
            <ProtectedRoute
            errorPage={<LoginPage/>}
            targetPage={<Profile/>}
            />
          }/>
        </Routes>
      </AlertProvider>
    </UserProvider>
  );
}

export default App;
