import ProductsStore from './ProductsStore'

const setup = () => ProductsStore.create()

describe('products store', () => {
  const allTypes = ['Белье', 'Штанишки', 'Верхняя одежда']
  const allColors = [
    '#3498db',
    '#9b59b6',
    '#e74c3c',
    '#34495e',
    '#95a5a6',
    '#2ecc71',
  ]
  const allSizes = ['M', 'L', 'XL', 'S']

  it('should load a list of products', () => {
    const store = setup()
    expect(store.list).toHaveLength(1000)
  })

  it('should return lists of available types, colors and sizes', () => {
    const store = setup()
    expect(store.types).toEqual(allTypes)
    expect(store.colors).toEqual(allColors)
    expect(store.sizes).toEqual(allSizes)
  })

  describe('setSelectedType', () => {
    const store = setup()
    store.setSelectedColor('#e74c3c')
    store.setSelectedSize('M')
    store.setSelectedType('Белье')

    it('should set selected type', () => {
      expect(store.selectedType).toBe('Белье')
    })

    it('should reset selectedColor', () => {
      expect(store.selectedColor).toBe('')
    })

    it('should reset selectedSize', () => {
      expect(store.selectedSize).toBe('')
    })

    it('should set lists of available colors and sizes', () => {
      expect(store.colors).toEqual(['#3498db', '#34495e'])
      expect(store.sizes).toEqual(['M', 'S', 'XL', 'L'])
    })
  })

  describe('setSelectedColor', () => {
    const store = setup()
    store.setSelectedSize('S')
    store.setSelectedColor('#3498db')

    it('should set selectedColor', () => {
      expect(store.selectedColor).toBe('#3498db')
    })

    it('should reset selectedSize', () => {
      expect(store.selectedSize).toBe('')
    })

    it('should set lists of available colors and sizes', () => {
      expect(store.colors).toEqual(allColors)
      expect(store.sizes).toEqual(['M', 'XL'])
    })
  })

  describe('setSelectedSize', () => {
    const store = setup()
    store.setSelectedSize('S')

    it('should set selectedSize', () => {
      expect(store.selectedSize).toBe('S')
    })
  })

  describe('setSelectedInStock', () => {
    const store = setup()
    store.setSelectedInStock(true)

    it('should set selectedInStock', () => {
      expect(store.selectedInStock).toBe(true)
    })
  })

  describe('setDateReceiptRange', () => {
    const store = setup()
    const range = ['2912-08-08', '2913-09-09']
    store.setDateReceiptRange(range)

    it('should set dateReceiptRange', () => {
      expect(store.dateReceiptRange).toEqual(range)
    })
  })

  it('should provide sortedList with applied filters', () => {
    const store = setup()
    store.setSelectedType('Белье')
    expect(store.sortedList).toHaveLength(334)
    store.setSelectedColor('#3498db')
    expect(store.sortedList).toHaveLength(167)
    store.setSelectedSize('M')
    expect(store.sortedList).toHaveLength(84)
    store.setSelectedInStock(true)
    expect(store.sortedList).toHaveLength(41)
    store.setDateReceiptRange(['2019-07-09', '2019-08-21'])
    expect(store.sortedList).toHaveLength(7)
  })
})
