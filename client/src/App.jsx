import { Route, Routes } from "react-router-dom";
import './App.css'
import Home from "./pages/Home.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Layout from "./Layout.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import axios from "axios";
import { UserContextProvider } from "./UserContext.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import PlacesPage from "./pages/PlacesPage.jsx";
import PlacesPageForm from "./pages/PlacesPageForm.jsx";
import PlaceInfoPage from "./pages/PlaceInfoPage.jsx";
import BookingPage from "./pages/BookingPage.jsx";
import BookingInfo from "./pages/BookingInfo.jsx";

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesPageForm />} />
          <Route path="/account/places/:id" element={<PlacesPageForm />} />
          <Route path="/account/bookings" element={<BookingPage />} />
          <Route path="/account/bookings/:id" element={<BookingInfo />} />
          <Route path="/place/:id" element={<PlaceInfoPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
