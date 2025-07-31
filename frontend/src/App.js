import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import LandingPage from './components/LandingPage';
import ExplorePage from './pages/ExplorePage';
import Navbar from './components/Navbar';
import CourseDetailPage from './pages/CourseDetailPage';
import SignUpPage from './pages/SignUpPage';


function App() {
  return (
    <div>
      <Navbar />
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
      
      {/* <ExplorePage /> */}
      {/* <CourseDetailPage /> */}
      <Route path = "signup/" element = {<SignUpPage />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
