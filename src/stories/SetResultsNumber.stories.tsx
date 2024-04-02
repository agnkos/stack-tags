import type { Meta, StoryObj } from '@storybook/react'
import SetResultsNumber from '../components/SetResultsNumber'

const meta: Meta<typeof SetResultsNumber> = {
    component: SetResultsNumber
}

export default meta

type Story = StoryObj<typeof SetResultsNumber>

export const SetResults: Story = {
    render: () => <SetResultsNumber setPage={() => { }} setPagesize={() => { }} />
}