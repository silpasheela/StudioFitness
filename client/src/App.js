import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import LandingPage from "./pages/LandingPage";
import SignUp from "./components/SignUp/SignUp";
import LogIn from "./components/LogIn/LogIn";
import { Route, Routes } from "react-router-dom";
import PasswordResetEmail from "./components/PasswordResetEmail/PasswordResetEmail";
import PasswordResetPage from "./pages/PasswordResetPage";
import PasswordForgot from "./pages/PasswordForgot";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminTrainerDataPage from "./pages/AdminTrainerDataPage";
import AdminUserDataPage from "./pages/AdminUserDataPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import TrainerDashboardPage from "./pages/TrainerDashboardPage";
import UserProfileEditPage from "./pages/UserProfileEditPage";
import AdminServiceDataPage from "./pages/AdminServiceDataPage";
import ViewTrainersPage from "./pages/ViewTrainersPage";
import TrainerDetailsPage from "./pages/TrainerDetailsPage";
import PlanDetailsPage from "./pages/PlanDetailsPage";
import CheckoutPage from "./pages/CheckoutPage";
import UserSubscriptionPage from "./pages/UserSubscriptionPage";
import TrainerProfileEditPage from "./pages/TrainerProfileEditPage";
import TrainerAddSlotPage from "./pages/TrainerAddSlotPage";
import BookingSuccess from "./components/Shared/BookingSuccess";
import TrainerAppoinmentsPage from "./pages/TrainerAppoinmentsPage";
import UserAppointmentsPage from "./pages/UserAppointmentsPage";
import TrainerChat from "./pages/TrainerChat";
import UserChat from "./pages/UserChat";
import VideoCall from "./components/VideoCall/VideoCall";
import PageNotFound from "./components/Shared/PageNotFound";
import TrainerVideoPage from "./pages/TrainerVideoPage";
import UserClassesPage from "./pages/UserClassesPage";
import AdminAppointmentsPage from "./pages/AdminAppointmentsPage";
import PublicRoutes from "./utils/PublicRoutes";
import UserProtectedRoutes from "./utils/UserProtectedRoutes";
import TrainerProtectedRoutes from "./utils/TrainerProtectedRoutes";
import AdminProtectedRoutes from "./utils/AdminProtectedRoutes";
import TrainerViewUploadsPage from "./pages/TrainerViewUploadsPage";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>

        <Route element={<PublicRoutes />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/forgot-password" element={<PasswordForgot />} />
          <Route path="/reset-password-email" element={<PasswordResetEmail />} />
          <Route path="/:role/reset-password-token/:token" element={<PasswordResetPage />} />
        </Route>


        <Route element={<UserProtectedRoutes />}>
          <Route path="/user/dashboard" element={<UserDashboardPage />} />
          <Route path="/user/editprofile" element={<UserProfileEditPage />} />
          <Route path="/user/viewtrainers" element={<ViewTrainersPage />} />
          <Route path="/user/trainer/:id" element={<TrainerDetailsPage />} />
          <Route path="/user/checkout/:id" element={<CheckoutPage />} />
          <Route path="/user/subscription-details" element={<UserSubscriptionPage />} />
          <Route path="/user/booking-success" element={<BookingSuccess />} />
          <Route path="/user/view-appointments" element={<UserAppointmentsPage />} />
          <Route path="/user/view-classes" element={<UserClassesPage/>} />
          <Route path="/user/chat" element={<UserChat />} />
        </Route>


        <Route element={<TrainerProtectedRoutes />}>
          <Route path="/trainer/dashboard" element={<TrainerDashboardPage />} />
          <Route path="/trainer/editprofile" element={<TrainerProfileEditPage />} />
          <Route path="/trainer/addslot" element={<TrainerAddSlotPage />} />
          <Route path="/trainer/view-appointments" element={<TrainerAppoinmentsPage />} />
          <Route path="/trainer/videos" element={<TrainerVideoPage/>} />
          <Route path="/trainer/view-classes" element={<TrainerViewUploadsPage/>} />
          <Route path="/trainer/chat" element={<TrainerChat />} />
        </Route>


        <Route element={<AdminProtectedRoutes />}>
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/user/details" element={<AdminUserDataPage />} />
          <Route path="/admin/trainer/details" element={<AdminTrainerDataPage />} />
          <Route path="/admin/service/details" element={<AdminServiceDataPage />} />
          <Route path="/admin/appointment/details" element={<AdminAppointmentsPage/>} />
        </Route>


          <Route path="/viewplandetails" element={<PlanDetailsPage />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/trainer/appointments/join/:id" element={<VideoCall></VideoCall>} />

      </Routes>
    </div>
  );
}

export default App;
