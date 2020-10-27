import Realm from 'realm'

import ItemSchema from '../schemas/ItemSchema'
import ApointmentSchema from '../schemas/ApointmentSchema'

export default function getRealm() {
  return Realm.open({
    schemaVersion: 4,
    schema: [ItemSchema, ApointmentSchema]
  })
}
