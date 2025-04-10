const Login = ()=> import('../../views/sign/Login')
const Signup = ()=> import('../../views/sign/Signup')

export default [
  {
    path:'/login',name:'Login',component:Login
  },
  {
    path:'/signup',name:'Signup',component:Signup
  }
]