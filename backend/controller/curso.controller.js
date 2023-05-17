export class CursoController {
  constructor(CursoModel) {
    this.curso = CursoModel;
  }

  async getAll() {
    const cursos = await this.curso.findAll();
    return cursos;
  }

  async adicionar(cursoDTO) {
    try {
      console.log(cursoDTO);
      await this.curso.create(cursoDTO);
    } catch (error) {
      console.log(error);
    }
  }
}
