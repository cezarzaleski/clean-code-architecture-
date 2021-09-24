import { Cpf } from './Cpf';


test('Should cpf is valid', () => {
  //given/when
  const cpf = Cpf.create('010.233.120-00')
  //then
  expect(cpf.value).toEqual('01023312000')

})

test('Should throw exception cpf invalid', () => {
  // then
  expect(() => Cpf.create('010.233.120-99')).toThrow(new Error("cpf invalid"));
})

test('Should verify digit the cpf', () => {
  //given/when
  const cpf = Cpf.create('111.444.777-35')
  // then
  expect(cpf.value).toEqual('11144477735')
})

