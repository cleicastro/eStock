export default class ItemSchema {
  static schema = {
    name: 'Item',
    primaryKey: 'id',
    properties: {
      id: { type: 'int', indexed: true },
      codigo: { type: 'int' },
      descricao: 'string',
      unidade: 'string'
    }
  }
}
