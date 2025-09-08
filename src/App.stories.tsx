import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { action } from 'storybook/actions';
import {App} from "./App";
import {Provider} from "react-redux";
import {store} from "./state/store";

const meta = {
    title: 'Example/App',
    component: App,
} satisfies Meta<typeof App>;

export default meta;

// type Story = StoryObj<typeof meta>;

// export const Default: Story = {
//     args: {
//         addItem: (title: string) => {},
//     }
// };

const onChangeApp = action('Title was changed')

export const AppExample = () => {
    return <Provider store={store}>
        <App/>
    </Provider>
}

