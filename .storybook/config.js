import { configure, addDecorator } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import { withKnobs } from '@storybook/addon-knobs';
import StoryRouter from 'storybook-react-router';


addDecorator(centered);
addDecorator(withKnobs);
addDecorator(StoryRouter());

// automatically import all files ending in *.stories.js
const req = require.context(
  '../src/components',
  true,
  /.stories.js$/
);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
