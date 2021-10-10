import Item from '../src/item';
import Dimension from '../src/dimension';

const dimensionDefault = new Dimension(0, 0, 0)

test("Should create a item", () => {
  const item = new Item(1, "Istrumentos Musicais", "Guitarra", 1000, dimensionDefault)
  expect(item.id).toBe(1)
})

test("Should create a item and calculate the volume", () => {
  const dimension = new Dimension(100, 30, 10)
  const item = new Item(1, "Istrumentos Musicais", "Guitarra", 1000, dimension)
  const cubage = item.dimension.cubage;
  expect(cubage).toBe(0.03)
})

test("Should create a item and calculate the density", () => {
  const dimension = new Dimension(100, 30, 10)
  const item = new Item(1, "Istrumentos Musicais", "Guitarra", 1000, dimension, 3)
  const density = item.density;
  expect(density).toBe(100)
})

test("Should create a item and calculate the freight", () => {
  const dimension = new Dimension(100, 30, 10)
  const item = new Item(1, "Istrumentos Musicais", "Guitarra", 1000, dimension, 3)
  const freight = item.freight;
  expect(freight).toBe(30)
})

test("Should create a item and calculate the minius freight", () => {
  const dimension = new Dimension(10, 10, 10)
  const item = new Item(1, "Istrumentos Musicais", "Guitarra", 1000, dimension, 0.9)
  const freight = item.freight;
  expect(freight).toBe(10)
})


