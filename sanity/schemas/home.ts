import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'home',
  title: 'home',
  type: 'document',
  fields: [
    defineField({
      name: 'herotext',
      title: 'Hero Title',
      type: 'string',
    }),
    defineField({
        name: 'aboutherotext',
        title: 'About Title',
        type: 'string',
      }),
    defineField({
      name: 'aboutdescription',
      title: 'About Description',
      type: 'text',
    }),
    defineField({
        name: 'aboutcompany',
        title: 'About Company Title',
        type: 'string',
      }),
      defineField({
        name: 'trusttitle',
        title: 'Trust Company Title',
        type: 'string',
      }),
      defineField({
        name: 'trustdesc',
        title: 'Trust Company Description',
        type: 'text',
      }),
      defineField({
        name: 'aboutcompanydesc',
        title: 'About Company Description',
        type: 'text',
      }),
      defineField({
        name: 'aboutcompanydesc2',
        title: 'About Company Description 2',
        type: 'text',
      }),
      defineField({
        name: 'logo',
        title: 'logo image',
        type: 'image',
        options: {
          hotspot: true,
        },
      }),
    defineField({
        name: 'body',
        title: 'Body',
        type: 'blockContent',
      }),
   
  ],
})
