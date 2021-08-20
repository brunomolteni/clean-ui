import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Clean UI 🧼',
    brandUrl: 'https://github.com/brunomolteni/clean-ui',
    brandImage: null,
  }),
});