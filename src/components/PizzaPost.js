import React from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'

export const PizzaPost = ({ setFetchPending }) => {
    const navigate = useNavigate();
    return (
        <div className='container w-25 mt-5 border border-2 p-2 rounded-3'>
            <form onSubmit={async (e) => {
                e.preventDefault();
                e.persist();

                const pizzaName = e.target.pizzaNev.value
                const pizzaURL = e.target.pizzaKepURL.value
                const gluten = e.target.glutenCheck.checked

                const postData = {
                    id: 0,
                    name: pizzaName,
                    kepURL: pizzaURL,
                    isGlutenFree: gluten ? 1 : 0
                }
                await axios.post('https://pizza.kando-dev.eu/Pizza', postData).then(async () => {
                    await setFetchPending(true);
                    navigate('/');
                });

            }}>
                <div className="mb-3">
                    <label htmlFor="pizzaNev" className="form-label">Pizza neve</label>
                    <input type="text" className="form-control" id="pizzaNev" />
                </div>
                <div className="mb-3">
                    <label htmlFor="pizzaKepURL" className="form-label">Kép URL</label>
                    <input type="text" onChange={()=>{document.getElementById("previmg").src=document.getElementById('pizzaKepURL').value /*ew wtf*/}} className="form-control" id="pizzaKepURL" />
                </div>

                <div className="mb-3">
                    <label htmlFor="previmg" className="form-label">Kép Preview</label>
                    <img id="previmg" className='rounded-3 mt-2 w-100'></img>
                </div>

                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="glutenCheck" />
                    <label className="form-check-label" htmlFor="glutenCheck">Glutén mentes</label>
                </div>

                <button type="submit" className="btn btn-success me-2">Mentés</button>
                <Link type="button" className="btn btn-warning" to="/">Vissza</Link>

            </form>
        </div>
    )
}
