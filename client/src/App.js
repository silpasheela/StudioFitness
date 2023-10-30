import './App.css';
import LandingPage from './pages/LandingPage';
import SignUp from './components/SignUp/SignUp';
import LogIn from './components/LogIn/LogIn';
import { Route, Routes } from 'react-router-dom';
import PasswordResetEmail from './components/PasswordResetEmail/PasswordResetEmail';
import PasswordResetPage from './pages/PasswordResetPage';
import PasswordForgot from './pages/PasswordForgot';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminTrainerDataPage from './pages/AdminTrainerDataPage';
import AdminUserDataPage from './pages/AdminUserDataPage';
import UserDashboardPage from './pages/UserDashboardPage';
import TrainerDashboardPage from './pages/TrainerDashboardPage';
import Demos from './components/demo/Demos'
import DemoModel from './pages/DemoModel';
import UserProfileEditPage from './pages/UserProfileEditPage';
import TrainerProfileEdit from './components/TrainerProfileEdit/TrainerProfileEdit';
import AdminServiceDataPage from './pages/AdminServiceDataPage';
import ViewTrainersPage from './pages/ViewTrainersPage';
import TrainerDetailsPage from './pages/TrainerDetailsPage';
import PlanDetailsPage from './pages/PlanDetailsPage';
import CheckoutPage from './pages/CheckoutPage';
import UserSideBar from './components/UserSideBar/UserSideBar';
import UserSubscriptionPage from './pages/UserSubscriptionPage';


function App() {
  return (
    <div className="App">
        {/* <LandingPage/> */}
        {/* <Form/> */}
        <Routes>
          <Route path='/' element={<LandingPage/>}></Route>
          <Route path='/signup' element={<SignUp/>}></Route>
          <Route path='/login' element={<LogIn/>}></Route>
          <Route path='/forgot-password' element = {<PasswordForgot/>}></Route>
          <Route path='/reset-password-email' element={<PasswordResetEmail/>}></Route>
          <Route path='/:role/reset-password-token/:token' element={<PasswordResetPage/>}></Route>
          <Route path='/admin/login' element={<AdminLoginPage/>}></Route>
          <Route path='/admin/dashboard' element={<AdminDashboardPage/>}></Route>
          <Route path='/admin/user/details' element={<AdminUserDataPage/>}></Route>
          <Route path='/admin/trainer/details' element={<AdminTrainerDataPage/>}></Route>
          <Route path='/user/dashboard' element={<UserDashboardPage/>}></Route>
          <Route path='/trainer/dashboard' element={<TrainerDashboardPage/>}></Route>
          <Route path='/user/editprofile' element={<UserProfileEditPage/>}></Route>
          {/* <Route path='/user/login' element={<DemoModel/>}></Route> */}
          <Route path='/trainer/editprofile' element={<TrainerProfileEdit/>}></Route>
          <Route path='/admin/service/details' element={<AdminServiceDataPage/>}></Route>
          <Route path='/user/viewtrainers' element={<ViewTrainersPage/>}></Route>
          <Route path='/user/trainer/:id' element={<TrainerDetailsPage/>}></Route>
          <Route path='/viewplandetails' element={<PlanDetailsPage/>}></Route>
          <Route path='/user/checkout/:id' element={<CheckoutPage/>}></Route>
          <Route path='/user/subscription-details' element={<UserSubscriptionPage/>}></Route>
          {/* <Route path="*" element={<LandingPage />} /> */}

          {/* <Route path="/demo" element={<DemoModel />} /> */}




        </Routes>
    </div>
  );
}

export default App;




