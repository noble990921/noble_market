const AdminDashboard = ()=> import('../../admin/AdminDashboard')
const ProductManagement = ()=> import('../../admin/ProductManagement')
const ProductSave = ()=> import('../../admin/ProductSave')
const ProductContent = ()=> import('../../admin/ProductContent')
const NewOrder = ()=> import('../../admin/NewOrder')
const OrderDetail = ()=> import('../../admin/OrderDetail')
const UserManagement = ()=> import('../../admin/UserManagement')

export default [
  {
    path: '/admin/dashboard', name: 'AdminDashBoard', component: AdminDashboard,
    meta: { requiredRole: true, layout: 'Admin', title: '대시보드' }
  },
  {
    path: '/admin/product/management', name: 'ProductManagement', component: ProductManagement,
    meta: { requiredRole: true, layout: 'Admin', title: '상품관리' }
  },
  {
    path: '/admin/product/save/:params?', name: 'ProductSave', component: ProductSave,
    meta: { requiredRole: true, layout: 'Admin', title: '상품등록/수정' }
  },
  {
    path: '/admin/product/content/:params?', name: 'ProductContent', component: ProductContent,
    meta: { requiredRole: true, layout: 'Admin', title: '상품상세' }
  },
  {
    path: '/admin/new_order/management', name: 'NewOrder', component: NewOrder,
    meta: { requiredRole: true, layout: 'Admin', title: '신규주문' }
  },
  {
    path: '/admin/order_detail/management', name: 'OrderDetail', component: OrderDetail,
    meta: { requiredRole: true, layout: 'Admin', title: '주문내역' }
  },
  {
    path: '/admin/user/management', name: 'UserManagement', component: UserManagement,
    meta: { requiredRole: true, layout: 'Admin', title: '회원관리' }
  },
]