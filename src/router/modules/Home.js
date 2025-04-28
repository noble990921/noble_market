const Home = ()=> import('../../views/home/Home')
const ServiceNotice = ()=> import('../../views/home/ServiceNotice')
const ServiceReviews = ()=> import('../../views/home/ServiceReviews')
const ServiceContact = ()=> import('../../views/home/ServiceContact')
const ServiceNoticeDetail = () => import('../../views/home/ServiceNoticeDetail')
const CategoryDetail = () => import('../../components/category/Category_Detail')
const CategoryView = () => import('../../components/category/CategoryView')
const BrandListView = () => import('../../components/brand/brandListView')
const BrandView = () => import('../../components/brand/brandView')
const CartView = () => import('../../views/cart/Cart_View')
const DirectView = () => import('../../views/cart/direct/Direct_View')
const OrderList = () => import('../../views/cart/OrderList')
const Introduction = () => import('../../views/home/Introduction')



export default [
  {
    path:'/',name:'Home',component:Home,
  },
  {
    path:'/service/notice',name:'',component:ServiceNotice,
    meta: {layout: 'Home'},
  },
  {
    path:'/service/notice/:id(\\d+)',name:'',component:ServiceNoticeDetail,
    meta: {layout: 'Home'},
  },
  {
    path:'/service/reviews',name:'',component:ServiceReviews,
    meta: {layout: 'Home'},
  },
  {
    path:'/service/contact',name:'',component:ServiceContact,
    meta: {requiresAuth: true,layout: 'Home'},
  },
  {path:'/introduction',name:'',component:Introduction,
    meta: {},
  },
  {
    path: '/:category/detail/:id',
    name: 'CategoryDetail',
    component: CategoryDetail,
    meta: {},
  },
  {
    path: "/product/:category",
    name: "CategoryView",
    component: CategoryView,
    props: true,
  },
  {
    path: "/brand",
    name: "BrandListView",
    component: BrandListView,
  },
//  {
//    path: '/:brand/detail/:id',
//    name: 'CategoryDetail',
//    component: CategoryDetail,
//    meta: {},
//  },
  {
    path: "/brand/:brand",
    name: "BrandView",
    component: BrandView,
    props: true,
  },
  {
    path:'/cart_view',name:'',component:CartView,
    meta: {},
  },
  {
    path:'/direct_view',name:'',component:DirectView,
    meta: {},
  },
  {
    path:'/order_list',name:'',component:OrderList,
    meta: {},
  },
]