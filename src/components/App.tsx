import { ConfigProvider, Layout } from 'antd'
import ruRu from 'antd/es/locale/ru_RU'
import { Provider } from 'mobx-react'
import moment from 'moment'
import 'moment/locale/ru'
import React from 'react'
import ProductsStore from '../models/ProductsStore'
import styles from './App.module.css'
import ProductsTable from './ProductsTable'
import Sidebar from './Sidebar'

moment.lang('ru')

const { Content } = Layout
const { layout, content } = styles

const productsStore = ProductsStore.create()

const App = () => (
  <Provider productsStore={productsStore}>
    <ConfigProvider locale={ruRu}>
      <Layout className={layout}>
        <Content className={content}>
          <ProductsTable />
        </Content>
        <Sidebar />
      </Layout>
    </ConfigProvider>
  </Provider>
)

export default App
