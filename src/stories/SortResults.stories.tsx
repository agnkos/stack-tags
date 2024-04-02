import type { Meta, StoryObj } from '@storybook/react'
import SortResults from '../components/SortResults'

const meta: Meta<typeof SortResults> = {
    component: SortResults,
}

export default meta

type Story = StoryObj<typeof SortResults>

export const Sort: Story = {
    render: () => <SortResults sortBy="popular" setSort={() => { }} setOrder={() => { }} setPage={() => { }} order="desc" sort="popular" />
}