import Realm from 'realm'

import ItemSchema from '../schemas/ItemSchema'
import ApointmentSchema from '../schemas/ApointmentSchema'
import ApointmentProductFinishedSchema from '../schemas/ApointmentProductFinished'
import Produtos from '../schemas/ProdutosSchema'

export default function getRealm(): any {
  return Realm.open({
    schemaVersion: 4,
    schema: [
      ItemSchema,
      ApointmentSchema,
      Produtos,
      ApointmentProductFinishedSchema
    ]
  })
}
