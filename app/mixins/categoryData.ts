import {type CategoryType} from "~/types/categoryType";
import cate_img_1 from "~/assets/img/shop/banner/a2.jpg";
import cate_img_2 from "~/assets/img/shop/banner/a23.jpg";
import cate_img_3 from "~/assets/img/shop/banner/a29.jpg";


export default {
  data() {
    return {
      categoryData:[
        {
          id: 1,
          img: cate_img_1,
          parentTitle: "沙發 & 茶几",
          children:['沙發','茶几'],
          smDesc:"打造美好客廳"
          
        },
        {
          id: 2,
          img: cate_img_2,
          parentTitle: "書桌 & 椅子",
          children:['書桌','椅子'],
          smDesc:"打造溫馨書房"
        },
        {
          id: 3,
          img: cate_img_3,
          parentTitle: "收納櫃 & 衣櫃",
          children:['收納櫃','衣櫃'],
          smDesc:"打造智慧收納"
        },
 
      ] as CategoryType []
    }
  },
}