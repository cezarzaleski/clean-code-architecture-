

export class Cpf {
  private readonly cpf: number;

  private constructor(cpf: number) {
    this.cpf = cpf;
  }


  public static create(cpf: string) {
    return new Cpf(+cpf.replace(/[^0-9]/g, ''));
  }



}
