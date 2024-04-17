import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PizzaModPage from './PizzaModPage';
import { act } from 'react-dom/test-utils';

describe('PizzaModPage', () => {

    let pizzaData;

    beforeAll(async () => {
        const res = await fetch('https://pizza.kando-dev.eu/Pizza/1');
        pizzaData = await res.json();
    });

    test('update data', async () => {

        render(
            <MemoryRouter initialEntries={['/1']}>
                <Routes>
                    <Route path="/:pizzaId" element={<PizzaModPage />} />
                    <Route path="/" element={<div>xd</div>} />
                </Routes>
            </MemoryRouter>
        );

        let fetchMock = null;
        
        await act(async () => {
            
            fireEvent.change(screen.getByRole('pizza-id'), { target: { value: '1' } });
            fireEvent.change(screen.getByRole('pizza-name'), { target: { value: 'Teszt pizza' } });
            fireEvent.change(screen.getByRole('glutenfree'), { target: { value: '0' } });
            fireEvent.change(screen.getByRole('img-url'), { target: { value: 'https://example.com/image.jpg' } });

            fetchMock = jest.fn().mockResolvedValueOnce();
            global.fetch = fetchMock;
            
            fireEvent.click(screen.getByRole('sendButton'));
        })

        expect(fetchMock).toHaveBeenCalledWith('https://pizza.kando-dev.eu/Pizza/1', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: '1',
                name: 'Teszt pizza',
                isGlutenFree: '0',
                kepURL: 'https://example.com/image.jpg',
            }),
        });
    });
});

