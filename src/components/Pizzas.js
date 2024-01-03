import axios from 'axios';
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Pizzak = ({ pizzak, setPizzak, setSelectedPizza, setFetchPending, isFetchPending }) => {
    const navigate = useNavigate();
    const fetchPizzak = async () => {
        try {
            const response = await fetch('https://pizza.kando-dev.eu/Pizza')
            const data = await response.json()
            setPizzak(data)
        } catch (error) {
            console.error(error)
        } finally {
            setFetchPending(false)
        }
    }
    useEffect(() => {
        fetchPizzak()
    }, [isFetchPending])

    return (
        <div className='row container-fluid justify-content-center'>
            {
                isFetchPending ? <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
                    <div className='spinner-border text-danger' />
                </div> :
                    pizzak.map(pizza => (
                        <div key={pizza.id} className="card m-3" style={{ width: '18rem' }}>
                            <Link onClick={() => {
                                navigate(`/pizza/${pizza.id}`);
                            }} to={`/pizza/${pizza.id}`}> <img src={pizza.kepURL ? pizza.kepURL : 'https://via.placeholder.com/200'} className="card-img-top p-3" alt="A píza képe xd" /></Link>
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{pizza.name}</h5>
                                <hr/>
                                <p className="card-text">{pizza.isGlutenFree ? "Glutén mentes" : "Nem Glutén mentes"}</p>
                                <div className="mt-auto">
                                
                                    <Link to={`/updPizza/${pizza.id}`} className="btn btn-primary m-1"
                                        onClick={async () => {
                                            await setSelectedPizza(pizza);
                                        }}>Módosítás</Link>
                                    <button type="button" data-bs-target="#deleteConfirm" data-bs-toggle="modal" onClick={async () => {
                                        await setSelectedPizza(pizza);
                                    }} className="btn btn-danger m-1">Törlés</button>
                                </div>
                            </div>
                        </div>
                    ))

            }
        </div>

    )
}

export default Pizzak