import { values } from 'mobx'
import { applySnapshot, cast, Instance, types } from 'mobx-state-tree'
import list from '../products.json'

const uniq = (arr: string[]) => Array.from(new Set(arr))

const Product = types.model({
  id: types.number,
  name: types.string,
  type: types.string,
  color: types.string,
  size: types.string,
  inStock: types.boolean,
  dateReceipt: types.string,
})

type IProduct = Instance<typeof Product>

const ProductsStore = types
  .model({
    items: types.array(Product),
    selectedType: '',
    selectedColor: '',
    selectedSize: '',
    selectedInStock: types.maybe(types.boolean),
    dateReceiptRange: types.array(types.string),
    availableTypes: types.array(types.string),
    availableColors: types.array(types.string),
    availableSizes: types.array(types.string),
  })
  .views(self => ({
    get list() {
      return self.items
    },
    get sortedList() {
      let arr: any = self.items
      const filters: any = {
        type: self.selectedType,
        color: self.selectedColor,
        size: self.selectedSize,
        inStock: self.selectedInStock,
        dateReceipt: self.dateReceiptRange,
      }

      arr = arr.filter((item: any) => {
        for (const key of Object.keys(filters)) {
          if (key === 'dateReceipt') {
            const [minDate = 0, maxDate = Infinity] = values(filters[key])
            const min = Date.parse(minDate)
            const max = Date.parse(maxDate)
            const ms = Date.parse(item[key])

            if (min > ms || ms > max) {
              return false
            }
          } else if (filters[key] && filters[key] !== item[key]) {
            return false
          }
        }

        return true
      })

      return arr
    },
    get types() {
      return values(self.availableTypes)
    },
    get colors() {
      return values(self.availableColors)
    },
    get sizes() {
      return values(self.availableSizes)
    },
  }))
  .actions(self => ({
    load() {
      applySnapshot(self.items, list)
      self.selectedInStock = false
      self.dateReceiptRange = cast(['', ''])
      self.availableTypes = cast(uniq(list.map(i => i.type)))
      self.availableColors = cast(uniq(list.map(i => i.color)))
      self.availableSizes = cast(uniq(list.map(i => i.size)))
    },
    setAvailable(shouldSetColors?: boolean) {
      if (shouldSetColors) {
        self.availableColors = cast(
          uniq(self.sortedList.map((i: IProduct) => i.color)),
        )
      }
      self.availableSizes = cast(
        uniq(self.sortedList.map((i: IProduct) => i.size)),
      )
    },
  }))
  .actions(self => ({
    afterCreate() {
      self.load()
    },
    setSelectedType(val: string) {
      self.selectedType = val
      self.selectedColor = ''
      self.selectedSize = ''
      self.setAvailable(true)
    },
    setSelectedColor(val: string) {
      self.selectedColor = val
      self.selectedSize = ''
      self.setAvailable()
    },
    setSelectedSize(val: string) {
      self.selectedSize = val
    },
    setSelectedInStock(val: boolean) {
      self.selectedInStock = val
    },
    setDateReceiptRange(range: string[]) {
      self.dateReceiptRange = cast(range)
    },
  }))

export default ProductsStore
