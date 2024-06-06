import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { Navigate } from 'react-router-dom';
import Home from "./pages/home/Home"
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import {bookingColumns, userColumns} from "./datatablesource.js";
import SingleUser from "./pages/single/SingleUser.jsx";
import SingleBooking from "./pages/single/SingleBooking.jsx";


function App() {

  const ProtectedRoute = ({children}) => {
    const {user} = useContext(AuthContext)

    if(!user) {
      return <Navigate to="/login"/>
    }
    return children;
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            /> 
          </Route>
          <Route path="users">
              <Route index element={<ProtectedRoute><List columns={userColumns}/></ProtectedRoute>} />
              <Route path=":userId" element={<ProtectedRoute><SingleUser /></ProtectedRoute>} />
              <Route disabled
                path="new"
              />
          </Route>
            <Route path="bookings">
              <Route index element={<ProtectedRoute><List columns={bookingColumns}/></ProtectedRoute>} />
              <Route path=":bookingid" element={<ProtectedRoute><SingleBooking title="Бронирования" /></ProtectedRoute>} />
            </Route> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
