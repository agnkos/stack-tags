import type { Meta, StoryObj } from '@storybook/react'
import ResultsPagination from '../components/ResultsPagination'

const meta: Meta<typeof ResultsPagination> = {
    component: ResultsPagination,
}

export default meta

type Story = StoryObj<typeof ResultsPagination>

export const Pagination: Story = {
    render: () => <ResultsPagination totalPages={10} setPage={() => { }} page={3} />
}
