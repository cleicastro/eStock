export default class Apointment {
  static schema = {
    name: 'Apointment',
    primaryKey: 'id',
    properties: {
      id: { type: 'int', indexed: true },
      item: 'Item',
      matricula: 'string',
      lote: 'string',
      corredor: 'string',
      prateleira: 'string',
      vencimento: 'date',
      volume: 'float',
      quantidade: 'float',
      obs: 'string',
      created_at: 'date'
    }
  }
}
