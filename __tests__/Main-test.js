import React from 'react';
import Main from '../app/components/Main';

import renderer from 'react-test-renderer';

describe('main', () => {
    const main = renderer.create(<Main />);

    describe('toggle', () => {
        it('start meeting', () => { 
            main.getInstance().toggleMeeting();
            const rendered = main.toJSON();
            expect(rendered).toMatchSnapshot()
        });
    })
})

