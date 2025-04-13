const Home = ()=> import('../../views/home/Home')
const ServiceNotice = ()=> import('../../views/home/ServiceNotice')
const ServiceReviews = ()=> import('../../views/home/ServiceReviews')
const ServiceContact = ()=> import('../../views/home/ServiceContact')
const ServiceNoticeDetail = () => import('../../views/home/ServiceNoticeDetail')
//const CategoryTop = () => import('../../components/category/Top_View')
const CategoryDetail = () => import('../../components/category/Category_Detail')
//const CategoryBag = () => import('../../components/category/Bag_View')
//const CategoryShoes = () => import('../../components/category/Shoes_View')
//const CategoryWatch = () => import('../../components/category/Watch_View')
//const CategoryWallet = () => import('../../components/category/Wallet_View')
const CategoryView = () => import('../../components/category/CategoryView')
//const CategoryAcc = () => import('../../components/category/Acc_View')
const CartView = () => import('../../views/cart/Cart_View')
const DirectView = () => import('../../views/cart/direct/Direct_View')
const OrderList = () => import('../../views/cart/OrderList')
const Test = () => import('../../views/test')



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
//  {
//    path:'/product/top',name:'',component:CategoryTop,
//    meta: {},
//  },
//  {
//    path:'/product/bag',name:'',component:CategoryBag,
//    meta: {},
//  },
//  {
//    path:'/product/shoes',name:'',component:CategoryShoes,
//    meta: {},
//  },
//  {
//    path:'/product/watch',name:'',component:CategoryWatch,
//    meta: {},
//  },
//  {
//    path:'/product/wallet',name:'',component:CategoryWallet,
//    meta: {},
//  },
//  {
//    path:'/product/acc',name:'',component:CategoryAcc,
//    meta: {},
//  },

  {path:'/test',name:'',component:Test,
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