export default class CategoriaController {
    constructor(CategoriaModel) {
      this.categoria = CategoriaModel;
    }

    async getAll() {
      const categoria = await this.categoria.findAll();
      return categoria;
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
  