import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { action } from 'storybook/actions';
import {EditableSpan} from "./EditableSpan";

const meta = {
    title: 'Example/EditableSpan',
    component: EditableSpan,
} satisfies Meta<typeof EditableSpan>;

export default meta;

// type Story = StoryObj<typeof meta>;

// export const Default: Story = {
//     args: {
//         addItem: (title: string) => {},
//     }
// };

const onChangeEditableSpan = action('Title was changed')

export const EditableSpanBaseExample = () => {
    return <EditableSpan title={'title'} onChange={onChangeEditableSpan} />
}

