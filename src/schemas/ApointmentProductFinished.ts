/* eslint-disable @typescript-eslint/camelcase */
export default class ApointmentProductFinished {
  static schema = {
    name: 'ApointmentProductFinished',
    primaryKey: 'id',
    properties: {
      id: { type: 'int', indexed: true },
      item: 'Item',
      matricula: 'string',
      lote: 'string',
      produtos: { type: 'list', objectType: 'Produtos' },
      created_at: 'date'
    }
  }
}
