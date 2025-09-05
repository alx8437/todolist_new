import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { AddItemForm } from './AddItemForm';

const meta = {
    title: 'Example/AddItemForm',
    component: AddItemForm,
} satisfies Meta<typeof AddItemForm>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
    args: {
        addItem: (title: string) => {},
    }
};


