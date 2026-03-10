import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'terms',
  title: 'terms',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
        name: 'body',
        title: 'Body',
        type: 'blockContent',
      }),
   
  ],
})
