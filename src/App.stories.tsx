import type {Meta} from '@storybook/react-webpack5';
import {App} from "./App";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";

const meta = {
    title: 'Example/App',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} satisfies Meta<typeof App>;

export default meta;

export const AppExample = () => {
    return  <App/>

}

