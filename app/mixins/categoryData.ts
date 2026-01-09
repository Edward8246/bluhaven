import {type CategoryType} from "~/types/categoryType";
import cate_img_1 from "~/assets/img/shop/banner/a2.jpg";
import cate_img_2 from "~/assets/img/shop/banner/a23.jpg";
import cate_img_3 from "~/assets/img/shop/banner/a29.jpg";
import cate_img_4 from "~/assets/img/shop/banner/02/banner-1.webp";
import cate_img_5 from "~/assets/img/shop/banner/02/banner-2.webp";
import cate_img_6 from "~/assets/img/shop/banner/02/banner-3.webp";

export default {
  data() {
    return {
      categoryData:[
        {
          id: 1,
          img: cate_img_1,
          parentTitle: "沙發 & 茶几",
          children:['沙發','茶几']
        },
        {
          id: 2,
          img: cate_img_2,
          parentTitle: "書桌 & 椅子",
          children:['書桌','椅子']
        },
        {
          id: 3,
          img: cate_img_3,
          parentTitle: "收納櫃 & 衣櫃",
          children:['收納櫃','衣櫃']
        },
        // {
        //   id: 4,
        //   img: cate_img_4, 
        //   parentTitle: "FASHION FOR MEN’S",
        //   children:['Shirt'],
        //   smDesc:"Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum."
        // },
        // {
        //   id: 5,
        //   img: cate_img_5, 
        //   parentTitle: "FASHION FOR WOMEN’S",
        //   children:['Shoes'],
        //   smDesc:"Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum."
        // },
        // {
        //   id: 6,
        //   img: cate_img_6, 
        //   parentTitle: "FASHION FOR MEN’S",
        //   children:['Shirt'],
        //   smDesc:"Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum."
        // },
      ] as CategoryType []
    }
  },
}