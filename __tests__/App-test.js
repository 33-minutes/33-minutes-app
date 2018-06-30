import React from 'react';
import App from '../App';

import renderer from 'react-test-renderer';

describe('app', () => {
    const app = renderer.create(<App />);

    it('renders app', () => {
        const rendered = app.toJSON();
        expect(rendered).toMatchSnapshot()
    });

    describe('toggle', () => {
        it('start meeting', () => { 
            app.getInstance().toggleMeeting();
            const rendered = app.toJSON();
            expect(rendered).toMatchSnapshot()
        });
    
        it('stop meeting', () => { 
            app.getInstance().toggleMeeting();
            const rendered = app.toJSON();
            expect(rendered).toMatchSnapshot()
        });    
    })
})

