
// 引入 uuid版本4的
import { v4 as uuidv4} from 'uuid';

// 暴露一个封装的get_uuid的函数, 游客的临时身份
export const get_uuid = () => {
    // 生成一个随机字符串，且每次执行不能发生变化，持久化存储数据
    
    //先查看本地是否有uuid
    let uuid_token = localStorage.getItem("uuidtoken");
    //如果没有
    if(uuid_token === null){
        // 生成游客临时身份
        uuid_token = uuidv4()
        //进行本地持久化存储
        localStorage.setItem("uuidtoken",uuidv4())
    }

    return uuid_token;
}
