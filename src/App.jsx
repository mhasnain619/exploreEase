import { Route, Routes } from 'react-router-dom';
import ResponsiveDrawer from './Components/Dashboard/Dashboard';
import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';
import Contact from './Components/Contact/Contact';
import Users from './Components/Users/Users';
import UserDetails from './Components/Users/UserDetails';
import ProductsCard from './Components/Products/ProductCard/ProductCards';
import ProductDetails from './Components/Products/ProductDetails/ProductDetails';
import "@fontsource/montserrat"; // Defaults to weight 400
import "@fontsource/montserrat/700.css"; // Specify weight
import GitHubProfileSearch from './Components/GithubUserFinder/UserFinder';

function App() {

  return (
    <Routes>
      <Route path="/*" element={<ResponsiveDrawer />}>
        <Route path="home" element={<Home />} />
        {/* <Route path="profile" element={<Profile />} />
        <Route path="contact" element={<Contact />} /> */}
        <Route path="users" element={<Users />} />
        <Route path="users/:id" element={<UserDetails />} />

        {/* Routes for porducts */}

        <Route path='products' element={<ProductsCard />} />
        <Route path='products/:id' element={<ProductDetails />} />

        {/* Routes for Github user finder */}

        <Route path='githubuserfinder' element={<GitHubProfileSearch />} />

      </Route>
    </Routes>

  );
}

export default App;
