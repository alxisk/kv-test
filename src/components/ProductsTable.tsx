import { Icon, Result } from 'antd'
import { observer } from 'mobx-react'
import React from 'react'
import { AutoSizer, Column, Table } from 'react-virtualized'
import { useStores } from '../utils/hooks'
import styles from './ProductsTable.module.css'

const { tableContainer, nothingFound } = styles
const ROW_HEIGHT = 50

const ProductsTable: React.FC = () => {
  const { productsStore } = useStores()
  const { sortedList } = productsStore

  return (
    <div className={tableContainer}>
      <AutoSizer>
        {({ width, height }) => (
          <Table
            headerHeight={ROW_HEIGHT}
            height={height}
            width={width}
            rowHeight={ROW_HEIGHT}
            rowCount={sortedList.length}
            rowGetter={({ index }) => sortedList[index]}
          >
            <Column label="id" dataKey="id" width={width * 0.05} />
            <Column label="Название" dataKey="name" width={width * 0.3} />
            <Column label="Тип" dataKey="type" width={width * 0.15} />
            <Column
              label="Цвет"
              dataKey="color"
              width={width * 0.1}
              cellRenderer={({ cellData }) => (
                <div
                  style={{
                    background: cellData,
                    height: `${ROW_HEIGHT - 36}px`,
                  }}
                />
              )}
            />
            <Column label="Размер" dataKey="size" width={width * 0.1} />
            <Column
              label="В наличии"
              dataKey="inStock"
              width={width * 0.1}
              cellRenderer={({ cellData }) => (cellData ? 'Да' : 'Нет')}
            />
            <Column
              label="Дата поступления"
              dataKey="dateReceipt"
              width={width * 0.2}
            />
          </Table>
        )}
      </AutoSizer>
      {!sortedList.length && (
        <Result
          className={nothingFound}
          icon={<Icon type="search" />}
          title="Ничего не найдено"
        />
      )}
    </div>
  )
}

export default observer(ProductsTable)
