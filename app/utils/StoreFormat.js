'use strict';

//进行格式化商家的商品数据-满足section进行使用
export function formatStore(storeData){
        let goodTagMap = []
        storeData.food_tags.forEach(food_tags => {
          food_tags.food.forEach(food => {
              if (!goodTagMap[food_tags.name]) {
                  goodTagMap[food_tags.name] = []
              }
              goodTagMap[food_tags.name].push(food)
          })
       })
       return goodTagMap;
}

export function calculateLength(storeData){
        let length = 0;
        storeData.food_tags.forEach(food_tags => {
            length += food_tags.length;
       })
       return length;
}

export function calculateGood(storeData){
        let value = 0;
        storeData.food_tags.forEach(food_tags => {
          food_tags.food.forEach(food => {
              value ++ ;
          })
       })
       return value;
}
