export default class CategoriaController {
    constructor(CategoriaModel) {
      this.categoria = CategoriaModel;
    }

    async getAll() {
      const categorias = await this.categoria.findAll();
      const mod_c = categorias.map(c => {
        const data = c.dataValues;
        return {
          id: data.id,
          nome: data.nome,
          descricao: data.descricao,
        };

      })
      return mod_c;
    }
    
    async adicionar(categoriaDTO) {
      try {
        console.log(categoriaDTO);
        await this.categoria.create(categoriaDTO);
      } catch (error) {
        console.log(error);
      }
    }
  }
  