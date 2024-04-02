import type { Meta, StoryObj } from '@storybook/react'
import ErrorMessage from '../components/ErrorMessage'

const meta: Meta<typeof ErrorMessage> = {
    component: ErrorMessage,
};

export default meta
type Story = StoryObj<typeof ErrorMessage>

export const Error: Story = {
    render: () => <ErrorMessage />
}