import { Checkbox, DatePicker, Layout, Select } from 'antd'
import { observer } from 'mobx-react'
import React from 'react'
import { useStores } from '../utils/hooks'
import styles from './Sidebar.module.css'

const { Sider } = Layout
const { Option } = Select
const { RangePicker } = DatePicker
const { sidebar, field } = styles
const selectStyles = {
  width: '150px',
}
const ALL = 'Все'

const Sidebar: React.FC = () => {
  const { productsStore } = useStores()
  const {
    types,
    colors,
    sizes,
    selectedType,
    selectedColor,
    selectedSize,
    selectedInStock,
  } = productsStore

  return (
    <Sider className={sidebar} width={330}>
      <div className={field}>
        <p>Тип</p>
        <Select
          style={selectStyles}
          value={selectedType}
          onChange={(val: string) => productsStore.setSelectedType(val)}
        >
          {types.concat('').map((type: string, idx: number) => (
            <Option key={idx} value={type}>
              {type ? type : ALL}
            </Option>
          ))}
        </Select>
      </div>
      <div className={field}>
        <p>Цвет</p>
        <Select
          style={selectStyles}
          value={selectedColor}
          onChange={(val: string) => productsStore.setSelectedColor(val)}
        >
          {colors.concat('').map((color: string, idx: number) => (
            <Option key={idx} value={color}>
              {color ? (
                <div
                  style={{
                    display: 'block',
                    padding: '7px 0',
                    height: '16px',
                    marginTop: '7px',
                    width: '105px',
                    background: color,
                  }}
                />
              ) : (
                ALL
              )}
            </Option>
          ))}
        </Select>
      </div>
      <div className={field}>
        <p>Размер</p>
        <Select
          style={selectStyles}
          value={selectedSize}
          onChange={(val: string) => productsStore.setSelectedSize(val)}
        >
          {sizes.concat('').map((size: string, idx: number) => (
            <Option key={idx} value={size}>
              {size ? size : ALL}
            </Option>
          ))}
        </Select>
      </div>
      <div className={field}>
        <p>В наличии</p>
        <Checkbox
          checked={selectedInStock}
          onChange={e => productsStore.setSelectedInStock(e.target.checked)}
        />
      </div>
      <div className={field}>
        <RangePicker
          onChange={(_: any, dates: string[]) =>
            productsStore.setDateReceiptRange(dates)
          }
        />
      </div>
    </Sider>
  )
}

export default observer(Sidebar)
