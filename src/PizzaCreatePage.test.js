import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import PizzaCreatePage from './PizzaCreatePage';

describe('PizzaCreatePage', () => {
    test('sends data to correct endpoint on form submission', async () => {
        const fetchMock = jest.fn().mockResolvedValueOnce();
        global.fetch = fetchMock;

        render(
            <MemoryRouter>
                <PizzaCreatePage />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByRole('pizza-name'), { target: { value: 'Margarita' } });
        fireEvent.change(screen.getByRole('glutenfree'), { target: { value: '1' } });
        fireEvent.change(screen.getByRole('img-url'), { target: { value: 'https://example.com/image.jpg' } });
        fireEvent.click(screen.getByRole('sendButton'));

        expect(fetchMock).toHaveBeenCalledWith('https://pizza.kando-dev.eu/Pizza', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'Margarita',
                isGlutenFree: '1',
                kepURL: 'https://example.com/image.jpg'
            })
        });
    });
});

