import React, { useState, useEffect, useHistory } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';

export function PizzaDelPage(props) {
    const params = useParams();
    const id = params.pizzaId;
    const navigate = useNavigate();
    const [pizza, setPizza] = useState([{ id: 1, name: 'Margarita', isGlutenFree: false }]);
    const [isPending, setPending] = useState(false);
    useEffect(() => {
        setPending(true);
        (async () => {
            try {
                const url = `https://pizza.kando-dev.eu/Pizza/${id}`;

                const res = await fetch(`${url}`);
                
                const pizza = await res.json();
                setPizza(pizza);
            }
            catch (error) {
                console.log(error);
            }
            finally {
                setPending(false);
            }
        })
            ();
    }, [id]);
    return (
        <div className="p-5 m-auto text-center content bg-lavender">
            {isPending || !pizza.id ? (
                <div role='progressbar' className="spinner-border"></div>
            ) : (
                <div role="card" className="card p-3">
                    <div className="card-body">
                        <h5 className="card-title">Törlendő elem: {pizza.name}</h5>
                        <div className="lead">Gluténmentes: {pizza.isGlutenFree > 0 ? "igen" : "nem"}</div>
                        <img alt={pizza.name}
                            className="img-fluid rounded"
                            style={{ maxHeight: "500px" }}
                            src={pizza.kepURL ? pizza.kepURL :
                                "https://via.placeholder.com/400x800"}
                        />
                    </div>
                    <form onSubmit={(event) => {
                        //ez a két sor azért kell, mert szükséges megállítani a form-ot,
                        // hogy ne küldje újra az adatokat a böngészőnek, mert az nem jó,
                        //hanem itt nekünk az kívánatos, hogy elküldje az adatokat a backend-nek
                        event.persist();
                        event.preventDefault();
                        fetch(`https://pizza.kando-dev.eu/Pizza/${id}`, {
                            method: "DELETE",
                            //bekerült ez az "újítás", ami miatt nem ment:

                        })
                            // ha kész, visszadob a főoldalra! Return-öl a backend-ről minden infót!
                            .then(() => {
                                navigate("/");
                            })
                            .catch(console.log);
                    }}>
                        <div>
                            <NavLink to={"/"}><button className="bi bi-backspace">&nbsp;Mégsem</button></NavLink>
                            &nbsp;&nbsp;
                            <button role='deleteButton' className="bi bi-trash3">&nbsp;Törlés</button></div></form>
                </div>

            )}
        </div>
    );
}
export default PizzaDelPage;
