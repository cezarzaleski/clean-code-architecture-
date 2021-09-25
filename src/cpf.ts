import { InvalidCpfError } from './invalid-cpf-error';
import { EmptyParamError } from './empty-param';


export class Cpf {
  value: string;

  private constructor(value: string) {
    if (!value) throw new EmptyParamError('cpf')
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
    const calculateSecondDigit = this.calculateDigit(base);
    if (calculateSecondDigit != secondDigit) throw new InvalidCpfError(value);
  }

  private calculateDigit(base: string) {
    let sum = 0;
    let count = base.length + 1;
    base.split('').forEach((num) => {
      sum += +num * count
      count--;
    });
    const restDivision = sum % 11;
    return restDivision < 2 ? 0 : 11 - restDivision;
  }

  public static create(value: string) {
    return new Cpf(value.replace(/[^0-9]/g, ''));
  }
}
