export default class ProdutosSchema {
  static schema = {
    name: 'Produtos',
    primaryKey: 'id',
    properties: {
      id: { type: 'int', indexed: true },
      descricao: 'string',
      quantidade: 'float'
    }
  }
}
