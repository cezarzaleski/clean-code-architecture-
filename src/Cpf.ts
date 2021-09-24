

export class Cpf {
  private readonly cpf: string;

  private constructor(cpf: string) {
    this.validateFirstDigit(cpf);
    this.cpf = cpf;
  }

  get value (): string {
    return this.cpf
  }

  // ruim pq não posso expor para testar =)
  private validateFirstDigit(value: string) {
    const base = value.substr(0,9);
    const firstDigit = +value.substr(9,1);
    let count = 10;
    let sum = 0;
    base.split('').forEach((num) => {
      sum += +num * count
      count--;
    });
    const restDivision = sum % 11;
    const calculateFirstDigit = restDivision < 2 ? 0 : 11 - restDivision;
    if (calculateFirstDigit != firstDigit) throw new Error("cpf invalid");
  }

  public static create(cpf: string) {
    return new Cpf(cpf.replace(/[^0-9]/g, ''));
  }
}
