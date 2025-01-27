import { Route, Routes } from 'react-router-dom';
import ResponsiveDrawer from './Components/Dashboard/Dashboard';
import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';
import Contact from './Components/Contact/Contact';
import Users from './Components/Users/Users';
import UserDetails from './Components/Users/UserDetails';
import ProductsCard from './Components/Products/ProductCard/ProductCards';

function App() {

  return (
    <Routes>
      <Route path="/dashboard/*" element={<ResponsiveDrawer />}>
        <Route path="home" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="contact" element={<Contact />} />
        <Route path="users" element={<Users />} />
        <Route path="users/:id" element={<UserDetails />} />

        {/* Routes for porducts */}

        <Route path='products' element={<ProductsCard />} />

      </Route>
    </Routes>

  );
}

export default App;
