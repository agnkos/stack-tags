import type { Meta, StoryObj } from '@storybook/react'
import TagsTable from '../components/TagsTable'

const exampleTags = [
    { name: "JavaScript", count: 2528870, has_synonyms: true, is_moderator_only: false, is_required: false },
    { name: "Python", count: 2192350, has_synonyms: true, is_moderator_only: false, is_required: false },
    { name: "Java", count: 1917309, has_synonyms: true, is_moderator_only: false, is_required: false },
    { name: "C#", count: 1615066, has_synonyms: true, is_moderator_only: false, is_required: false },
    { name: "PHP", count: 1464460, has_synonyms: true, is_moderator_only: false, is_required: false },
]

const meta: Meta<typeof TagsTable> = {
    component: TagsTable,
}

export default meta

type Story = StoryObj<typeof TagsTable>

export const Table: Story = {
    render: () => <TagsTable tags={exampleTags} setOrder={() => { }} setSort={() => { }} setPage={() => { }} order="desc" sort="popular" />
}