import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Pizzak from './components/Pizzas';
import Navbar from './components/Navbar';
import { PizzaPost } from './components/PizzaPost';
import { PizzaPut } from './components/PizzaPut';
import { PizzaSelect } from './components/PizzaSelect';
import { DeleteConfirmModal } from './components/DelModal';


function App() {
  const [pizzas, setPizzas] = React.useState([]);
  const [isFetchPending, setFetchPending] = React.useState(true)
  const [selectedPizza, setSelectedPizza] = React.useState({});


  return (
      <BrowserRouter>
        <Navbar pizzak={pizzas} setPizzak={setPizzas} setFetchPending={setFetchPending} isFetchPending={isFetchPending} />
        <Routes>
          <Route path={"/"} element={<Pizzak pizzak={pizzas} setPizzak={setPizzas} setSelectedPizza={setSelectedPizza} setFetchPending={setFetchPending} isFetchPending={isFetchPending}/>} />
          <Route path={"/addPizza"} element={<PizzaPost pizzak={pizzas} setPizzak={setPizzas} setFetchPending={setFetchPending}/>} />
          <Route path={"/updPizza/:id"} element={<PizzaPut selectedPizza={selectedPizza} setSelectedPizza={setSelectedPizza} setFetchPending={setFetchPending} isFetchPending={isFetchPending}/>} />
          <Route path={"/pizza/:id"} element={<PizzaSelect selectedPizza={selectedPizza} setSelectedPizza={setSelectedPizza} />} />
        </Routes>
        <DeleteConfirmModal selectedPizza={selectedPizza} setFetchPending={setFetchPending} />
      </BrowserRouter>
  );
}

export default App;