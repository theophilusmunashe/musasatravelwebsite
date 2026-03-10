import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
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
        name: "slug",
      title: "Slug",
      type: "slug",
      validation: (Rule) => Rule.required(),
      options: {
        source: "title",
        maxLength: 96
      }
      }),
    defineField({
        name: 'mainImage',
        title: 'Main image',
        type: 'image',
        options: {
          hotspot: true,
        },
        
      }),
      defineField({
        name: 'duration',
        title: 'Duration',
        type: 'string',
      }),  
      defineField({
        name: "image",
        title: "Image",
        type: "array",
        // @ts-ignore
        of: [{ type: 'image' }],
        // options: { hotspot: true }, 
      }),  
      defineField({
        name: "planImage",
        title: "Planning Image",
        type: 'image',
        options: {
          hotspot: true,
        }
        // options: { hotspot: true }, 
      }),  
      defineField({
        name: "designImage",
        title: "Design Image",
        type: 'image',
        options: {
          hotspot: true,
        }, 
      }),  
      defineField({
        name: "constructImage",
        title: "Construction Image",
        type: 'image',
        options: {
          hotspot: true,
        },
        // options: { hotspot: true }, 
      }),  

      
      defineField({
        name: 'location',
        title: 'Location',
        type: 'string',
      }),  
      defineField({
        name: 'size',
        title: 'Size',
        type: 'string',
      }),  
      defineField({
        name: 'planning',
        title: 'Planning', 
        type: 'text',
      }),  
      defineField({
          name: 'categories',
          title: 'Categories',
          type: 'array',
          //@ts-ignore
          of: [{ type: 'reference', to: { type: 'category' } }],
      }),
      defineField({
        name: 'design',
        title: 'Design',
        type: 'text',
      }),  
      defineField({
        name: 'construction',
        title: 'Construction',
        type: 'text',
      }),  
  ],
})
