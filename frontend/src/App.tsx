import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import QuizPage from "./pages/QuizPage";
import AddQuestion from "./pages/AddQuestion";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/quiz/:category" element={<QuizPage />} />
      <Route path="/add" element={<AddQuestion />} />
      <Route path="/register" element={<Register />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path='/profile' element={<Profile/>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
