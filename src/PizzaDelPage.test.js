import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PizzaDelPage from './PizzaDelPage';
import { act } from 'react-dom/test-utils';

describe('PizzaDelPage', () => {
    let pizzaData;

    beforeAll(async () => {
        const res = await fetch('https://pizza.kando-dev.eu/Pizza/1');
        pizzaData = await res.json();
    });

    test('delete selected pizza', async () => {
        render(
            <MemoryRouter initialEntries={['/1']}>
                <Routes>
                    <Route path="/:pizzaId" element={<PizzaDelPage />} />
                    <Route path="/" element={<div>404 nope</div>} />
                </Routes>
            </MemoryRouter>
        );

        const fetchMock = jest.fn().mockResolvedValueOnce();
        global.fetch = fetchMock;

        expect(await screen.findByText(`Törlendő elem: ${pizzaData.name}`)).toBeInTheDocument();

        await act(async () => {
            fireEvent.click(screen.getByRole('deleteButton'));
        })

        expect(fetchMock).toHaveBeenCalledWith('https://pizza.kando-dev.eu/Pizza/1', {
            method: 'DELETE'
        });
    });
});
