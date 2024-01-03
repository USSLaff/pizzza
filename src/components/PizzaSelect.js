import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

export const PizzaSelect = ({ selectedPizza, setSelectedPizza }) => {

    const navigate = useNavigate();
    const param = useParams();

    const [isFetchPending, setFetchPending] = React.useState(true)

    const fetchData = async () => {
        await axios.get(`https://pizza.kando-dev.eu/Pizza/${param.id}`).then(async (response) => {
            await setSelectedPizza(response.data);
        }).finally(() => setFetchPending(false));
    }

    useEffect(() => {
        fetchData();
    }, [isFetchPending]);

    return (
        <div className='row container-fluid justify-content-center'>
            {
                isFetchPending ? <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
                    <div className='spinner-border text-danger' />
                </div> :
                    <div key={selectedPizza.id} className="card m-3" style={{ width: '18rem' }}>
                        <Link to={`/`}> <img src={selectedPizza.kepURL ? selectedPizza.kepURL : 'https://via.placeholder.com/200'} className="card-img-top p-3" alt="A píza képe xd" /></Link>
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title">{selectedPizza.name}</h5>
                            <hr/>
                            <p className="card-text">{selectedPizza.isGlutenFree ? "Glutén mentes" : "Nem Glutén mentes"}</p>
                            <div className="mt-auto">
                                <Link to={`/updPizza/${selectedPizza.id}`} className="btn btn-primary m-1">Módosítás</Link>
                                <button type="button" data-bs-target="#deleteConfirm" data-bs-toggle="modal" className="btn btn-danger m-1">Törlés</button>
                            </div>
                        </div>
                    </div>
            }
        </div>


    )
}
