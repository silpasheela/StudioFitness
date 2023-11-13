import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
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
import AdminServiceDataPage from './pages/AdminServiceDataPage';
import ViewTrainersPage from './pages/ViewTrainersPage';
import TrainerDetailsPage from './pages/TrainerDetailsPage';
import PlanDetailsPage from './pages/PlanDetailsPage';
import CheckoutPage from './pages/CheckoutPage';
import UserSubscriptionPage from './pages/UserSubscriptionPage';
import TrainerProfileEditPage from './pages/TrainerProfileEditPage';
import TrainerAddSlotPage from './pages/TrainerAddSlotPage';
import BookingSuccess from './components/Shared/BookingSuccess';
import TrainerAppoinmentsPage from './pages/TrainerAppoinmentsPage';
import UserAppointmentsPage from './pages/UserAppointmentsPage';


function App() {
  return (
    <div className="App">
        <ToastContainer />
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
          <Route path='/trainer/editprofile' element={<TrainerProfileEditPage/>}></Route>
          <Route path='/admin/service/details' element={<AdminServiceDataPage/>}></Route>
          <Route path='/user/viewtrainers' element={<ViewTrainersPage/>}></Route>
          <Route path='/user/trainer/:id' element={<TrainerDetailsPage/>}></Route>
          <Route path='/viewplandetails' element={<PlanDetailsPage/>}></Route>
          <Route path='/user/checkout/:id' element={<CheckoutPage/>}></Route>
          <Route path='/user/subscription-details' element={<UserSubscriptionPage/>}></Route>
          <Route path='/trainer/addslot' element={<TrainerAddSlotPage/>}></Route>
          <Route path='/user/booking-success' element={<BookingSuccess/>}></Route>
          <Route path='/trainer/view-appointments' element={<TrainerAppoinmentsPage/>}></Route>
          <Route path='/user/view-appointments' element={<UserAppointmentsPage/>}></Route>


          {/* <Route path="*" element={<LandingPage />} /> */}

          {/* <Route path="/demo" element={<DemoModel />} /> */}




        </Routes>
    </div>
  );
}

export default App;




