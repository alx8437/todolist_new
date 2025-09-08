import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { action } from 'storybook/actions';
import {App} from "./App";
import {Provider} from "react-redux";
import {store} from "./state/store";
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

