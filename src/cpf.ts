import { InvalidCpfError } from './invalid-cpf-error';
import { EmptyParamError } from './empty-param';


export class Cpf {
  readonly value: string;

  private constructor(value: string) {
    const charactersCpf = value.split('');
    if (!value) throw new EmptyParamError('cpf')
    if (charactersCpf.every(c => c === charactersCpf[0])) throw new InvalidCpfError(value)
    this.validateFirstDigit(value);
    this.validateSecondDigit(value);
    this.value = value;
  }

  private validateFirstDigit(value: string) {
    const base = value.substr(0,9);
    const firstDigit = +value.substr(9,1);
    const calculateFirstDigit = this.calculateDigit(base);
    if (calculateFirstDigit != firstDigit) throw new InvalidCpfError(value);
  }

  private validateSecondDigit(value: string) {
    const base = value.substr(0,10);
    const secondDigit = +value.substr(10,1);
    const baseArray = base.split('');
    const calculateSecondDigit = this.calculateDigit(base);
    if (calculateSecondDigit != secondDigit) throw new InvalidCpfError(value);
  }

  private calculateDigit(base: string) {
    let sum = 0;
    let factor = base.length + 1;
    base.split('').forEach((num) => {
      sum += +num * factor --;
    });
    const restDivision = sum % 11;
    return restDivision < 2 ? 0 : 11 - restDivision;
  }

  public static create(cpf: string) {
    return new Cpf(cpf.replace(/[^0-9]/g, ''))
  }
}
