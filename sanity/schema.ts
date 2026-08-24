import { type SchemaTypeDefinition } from 'sanity'

import blockContent from './schemas/blockContent'
import terms from './schemas/terms'
import travelPackage from './schemas/travelPackage'
import { activity, stay, itinerary, tourGuide, transfer } from './schemas/services'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [travelPackage, activity, stay, itinerary, tourGuide, transfer, terms, blockContent],
}
