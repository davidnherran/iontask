import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "../../context/auth.context";
import { PrivateRoute } from './private'
import SignUp from "../signup";
import SignIn from "../signin";
import Home from "../home";
import Users from '../users'

const App = () => {
  return (
      <AuthProvider>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        </Routes>
      </AuthProvider>
  );
};

export default App;
