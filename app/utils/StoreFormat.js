'use strict';
import { toastShort } from '../utils/ToastUtil'
export function formatInfo(storeData,table){
    let tableData = {table:table}
    return Object.assign(storeData,tableData);
}
//进行格式化商家的商品数据-满足section进行使用
export function formatFood(tagsData, foodsData) {
        let foodTagMap = []
        tagsData.forEach(food_tags => {
          foodsData.forEach(food => {
              if(food.type_id  === food_tags.type_id ) {
                  if (!foodTagMap[food_tags.type_name]) {
                      foodTagMap[food_tags.type_name] = []
                  }
                  foodTagMap[food_tags.type_name].push(food)
              }
          })
       })

       return foodTagMap;
}

export function calculateLength(tagsData){
    let length = tagsData.length ? tagsData.length: 0
    return length
}
