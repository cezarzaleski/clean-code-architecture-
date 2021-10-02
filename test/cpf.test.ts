import Cpf from '../src/cpf';
import InvalidCpfError from '../src/invalid-cpf-error';
import EmptyParamError from '../src/empty-param';


test('Should cpf is valid', () => {
  //given/when
  const cpf = Cpf.create('010.233.120-00')
  //then
  expect(cpf.value).toEqual('01023312000')

})

test('Should throw exception when the first digit the cpf invalid', () => {
  //given
  const cpf = '010.233.120-99';
  // then
  expect(() => Cpf.create('010.233.120-99')).toThrow(new InvalidCpfError(cpf.replace(/[^0-9]/g, '')));
})

test('Should throw exception when the second digit the cpf invalid', () => {
  // given/when
  const cpf = '010.233.120-09'
  // then
  expect(() => Cpf.create(cpf)).toThrow(new InvalidCpfError(cpf.replace(/[^0-9]/g, '')));
})

test('Should verify digit the cpf', () => {
  //given
  const cpfNumber = '111.444.777-35'
  //when
  const cpf = Cpf.create(cpfNumber)
  // then
  expect(cpf.value).toEqual(cpfNumber.replace(/[^0-9]/g, ''))
})

test('Should throw exception when cpf lenght < 10', () => {
  //given
  const cpf = ''
  // then
  expect(() => Cpf.create(cpf)).toThrow(new EmptyParamError('cpf'));
})

test('Should throw exception when number equal', () => {
  //given
  const cpf = '111.111.111-11'
  // then
  expect(() => Cpf.create(cpf)).toThrow(new InvalidCpfError(cpf.replace(/[^0-9]/g, '')));
})

