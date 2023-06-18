// import { cursoCategoriaController } from "./index.js";
import { categoria } from "../models/index.js";

export default class CursoController {
  constructor(CursoModel) {
    this.curso = CursoModel;
  }

  async update(cursoDTO) {
    const {id, nome, ch, categoria_ids} = cursoDTO;

    const unique_categoria_ids = [...new Set(categoria_ids)]

    try {
      const c = await this.curso.findOne({
        where: {
          id: id
        }, include: categoria
      });
      c.set({
        nome: nome,
        ch: ch,
      });
      c.save();

      c.Categoria.forEach(categoria_c => {
        c.removeCategoria(categoria_c);
      })

      await unique_categoria_ids.forEach(async categoria_id => {
        const category = await categoria.findOne({where: {id:categoria_id}})
        await c.addCategoria(category);
      })

    } catch(error){
      console.log(error);
    }
  }

  async getByID(id) {
    const c = this.curso.findOne({
      where: {
        id: id,
      },
      include: categoria,
    });
    return c;
  }

  async getAll() {
    const cursos = await this.curso.findAll({include: categoria});
    return cursos;
  }

  async adicionar(cursoDTO) {
    const categoria_ids = cursoDTO['categoria_ids'];
    try {
      console.log(cursoDTO);
      const c = await this.curso.create(cursoDTO);
      console.log(c);
      await categoria_ids.forEach(async categoria_id => {
        const category = await categoria.findOne({where: {id:categoria_id}})
        await c.addCategoria(category);
      })
    } catch (error) {
      console.log(error);
    }
  }

  async delete(cursoDTO) {
    const [id] = cursoDTO;
    try {
      console.log(cursoDTO);
      await this.curso.destroy({
        where: {
          id:id
        }
      })
    } catch (error) {
      console.log(error);
    }
  }
}
