'use strict';
export function formatInfo(storeData){
   return storeData.data;
}
//进行格式化商家的商品数据-满足section进行使用
export function formatMenu(tagsData, foodsData) {
        let foodTagMap = []
        tagsData.forEach(food_tags => {
          foodsData.forEach(food => {
              if(food.types_id  == food_tags.typeid ) {
                  if (!foodTagMap[food_tags.typename]) {
                      foodTagMap[food_tags.typename] = []
                  }
                  foodTagMap[food_tags.typename].push(food)
              }
          })
       })
       return foodTagMap;
}

export function calculateLength(tagsData){
    let length = tagsData.length ? tagsData.length: 0
    return length
}
