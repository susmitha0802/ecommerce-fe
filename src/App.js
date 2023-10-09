import { Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { RecoilRoot } from "recoil";
import { NavBar } from "./components/navbar/NavBar";
import { Home } from "./components/home/Home";
import { Product } from "./components/product/Product";
import "./App.css";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={ queryClient }>
      <RecoilRoot>
        <NavBar/>
        <Routes>
          <Route path="/" element={ <Home/> }/>
          <Route path="/product/:id" element={ <Product/> }/>
        </Routes>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
