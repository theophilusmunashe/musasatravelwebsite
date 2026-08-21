import { type SchemaTypeDefinition } from 'sanity'

import blockContent from './schemas/blockContent'
import category from './schemas/category'
import post from './schemas/post'
import author from './schemas/author'
import project from './schemas/project'
import terms from './schemas/terms'
import home from './schemas/home'
import travelPackage from './schemas/travelPackage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [travelPackage, home, project, post, terms, author, category, blockContent],
}
