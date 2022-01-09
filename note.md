# 项目介绍

# 项目的搭建

功能一、目录结构的划分:

- 按照功能模块划分：

- 按照业务模块划分:

```js
npm install koa
npm install nodemon -D
```

```js
//优化代码结构
//从.env加载环境变量
npm install dotenv
// app/config.js 导出env.中的变量
const dotenv = require('dotenv')
dotenv.config()
module.exports = {
  APP_PROT
} = process.env
```

```js
// 用户注册接口
// app/index.js
const Router=require('koa-router')
const app=new Koa()
const userRouter=new Router({prefix:'/users'})
userRouter.post('/',(ctx,next)=>{
    ctx.body='创建用户成功'
})
app.use(useRouter.route())
app.use(userRouter.allowedMethods()) //啥意思啊

//优化代码结构
// src/router 负责注册接口
// src/controller 负责返回执行逻辑的返回值 
// src/service 负责真正的执行逻辑 需要操作数据库
```

```js
// 对数据库的封装
// app/config.js
```

```js
//验证注册提交
1.在 middleware/user.middleware.js 验证 发送错误  
		verifyUser(ctx,next) 验证用户信息 
2.在 app/error-handle.js  错误的处理
3.在 app/index.js on('error')
4.错误常量 src/constant/err-types.js 方便在2处处理
```



