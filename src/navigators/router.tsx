
import HomePage from '../views/Home/index';
import CineamPage from '../views/Cineam/index';
import MinePage from '../views/Mine/index';
const routes=[
  {
    component: HomePage, 
    name: "HomePage", 
    options: {
      tabBarBadge:1,
      title:'电影'
    } 
  },
  { 
    component: CineamPage, 
    name:"CineamPage",
    options:{
      tabBarBadge:2,
      title:'影院'
    }},
  { 
    component: MinePage, 
    name: "MinePage", 
    options: {
      tabBarBadge:3,
      title:'我的'
    } 
  }
]
export default routes;