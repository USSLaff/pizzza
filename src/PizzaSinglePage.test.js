import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PizzaSinglePage from './PizzaSinglePage';
import { act } from 'react-dom/test-utils';

describe('PizzaSinglePage', () => {
    let pizzaData;

    beforeAll(async () => {
        const res = await fetch('https://pizza.kando-dev.eu/Pizza/1');
        pizzaData = await res.json();
    });

    test('single selected pizza', async () => {
        render(
            <MemoryRouter initialEntries={['/1']}>
                <Routes>
                    <Route path="/:pizzaId" element={<PizzaSinglePage />} />
                    <Route path="/" element={<div>404 nope</div>} />
                </Routes>
            </MemoryRouter>
        );

        const fetchMock = jest.fn().mockResolvedValueOnce();

        global.fetch = fetchMock;

        expect(await screen.findByRole('progressbar')).toBeInTheDocument();
        expect(await screen.findByRole('pizza-img')).toBeInTheDocument();
        expect(await screen.findByRole('back-button')).toBeInTheDocument();
        expect(await screen.findByRole('mod-button')).toBeInTheDocument();

        await act(async () => {
            fireEvent.click(screen.getByRole('back-button'));
        })

    });
});
