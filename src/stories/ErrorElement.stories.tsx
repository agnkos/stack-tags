import type { Meta, StoryObj } from '@storybook/react';

import ErrorElement from '../components/ErrorElement';

const meta: Meta<typeof ErrorElement> = {
    component: ErrorElement,
};

export default meta
type Story = StoryObj<typeof ErrorElement>

export const Error: Story = {
    render: () => <ErrorElement />
}