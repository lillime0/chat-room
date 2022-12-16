import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context";
import Join from "./components/Join";
import Room from "./components/Room";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Join />} />
          <Route path="/chat" element={<Room />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
