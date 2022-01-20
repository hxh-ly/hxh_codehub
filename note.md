# 项目介绍

# 项目的搭建

功能一、目录结构的划分:

- 按照功能模块划分：

- 按照业务模块划分:

```js
npm install koa
npm install nodemon -D
```

## 加载环境变量

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

## 用户注册接口

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

Q1: 注册密码数据库是明文
S: 1 user.middleware.js  
   handlepasssword(ctx,next) 
   2 utils/password-handle.js
   3 在1中调用
   4 1在router中调用
```

## 用户登录接口

 ```js
 //用户登录接口
 //1 文件架构
 router/auth.router.js
 controller/auth.controller.js
 app/index.js 引入router
 //2 中间件校验在router.js
 //3 添加USER_DOES_NOT_EXIST错误码
 //4 添加密码错误验证 调用md5password
 
 //优化代码结构 （动态加载所有路由)
 app.use(useRouter.routes())
 app.use(useRouter.allowedMethods())
 app.use(authRouter.routes())
 app.use(authRouter.allowedMethods())
 //router/index.js 统一use
 读取文件 app.use()
 ```

## cookie+session

### cookie

- 小型文本文件

- 内存|会话cookie (默认)

- 硬盘cookie 设置过期时间

- 生命周期常见属性

  - expired
  - max-age

- 作用域（允许cookie发送给哪些URL）

  - Domain
    - 不指定，默认origin，不包括子域名
    - 指定，则包含子域名 如Domain=mozila.org  Cookie也在（develop.mozila.org）
  - Path
    - 例如设置 Path=/docs 
      - /docs
      - /docs/Web
      - /docs/Web/HTTP

- 客户端设置cookie

- 服务端设置cookie

  ```js
  //访问 设置cookie
  cookieRouter.get('/test',function(ctx,next){
      ctx.cookies.set('name','lilei',{maxAge:50*1000})
  	ctx.body='test'
  })
  //携带cookie过来 
  cookieRouter.get('/demo'，function(ctx,next){
      const name= ctx.cookies.get('name')
  	ctx.body=`${name}`
  })
  ```

```js
登录成功返回凭证:
cookie + session
Token令牌
```

子域名

```js
www.taobao.com
子域名 二级 顶级
ju.taobao.com
子域名
```

### session

```js
 koa-session
const session = Session({
  key: 'sessionId',
  signed: true
}, app)
app.keys = ['aab']
app.use(session)
//往
cookieRouter.get('/test', function (ctx, next) {
  const id = 10
  const name = 'xxh'
  ctx.session.user = { id, name }
  ctx.body = 'test'
})
```

### 缺点

cookie

- 附在http中，流量
- 明文
- 大小4kb
- 浏览器外（客户端） 必须手动设置cookie和session
- 分布式系统和服务器集群如何可以保证其他系统可以正确解析session
  - ![image-20220112003055997](C:\Users\可爱的小栩\AppData\Roaming\Typora\typora-user-images\image-20220112003055997.png)

## JWT实现Token机制

- header
  - alg:加密算法 默认 HS256,采用同一个密钥进行加密和解密
  - typ: JWT
  - 会通过base64算法进行编码
- playload
  - 携带数据,
  - 默认携带 iat ( issued at ) 令牌的签发时间
  - 设置过期时间 exp (expiration time)
  - 会通过base64进行编码
- signature
  - secretKey 通过将前两个合并后进行 hs256
  - HMACSHA256 ( base64Url(header) + base64Url (payload) , secretKey  )
  - 暴露 secretKey很危险 

```js
// npm install jsonwebtoken
 const jwt=require('')
 const user={id:1}
 const SECRET_KEY ='abccba123'
 const token= jwt(user,SECRET_KEY, {
     ex:10
 } )
 //post token 放在 Authorization Bearer Token
```

### 生成 privateKey

```js
 test-token/keys/
 命令 openssl
 	     genrsa -out private.key 1024
 生成公钥 rsa -in private.key -pubout  

```

### 读取私钥匙文件

```js
const PRIVATE_KEY = fs.readFileSync('keys/private.key')
const PUBLIC_KEY=fs.readFileSync('keys/public.key')
 
//签发
testRouter.get('/demo',(ctx,next)=>{
const user={}
 jwt(user,PRIVATE_KEY,{
 expiresIn:500，
 algorithm:"RS256"   
     }
 )      
})

//验证 
jwt.verify(token, PUBLIC_KEY，{S
algorithms:["RS256"]          
}          
)
```

### 问题

相对文件夹

process.cwd()

```js
问题：
//原本是在test-token 执行nodemon
//现在是在test-code    导致 引入'./keys/private.key' 找不到
原因：
// ./keys 是 相对于当前执行文件夹的 
   也就是相对于process.cwd
```

### 在项目中使用jwt

```js
//Q、在哪颁发签名
// 1 middleware(验证、、转换数据之类的) -->  controller(返回之前颁发签名)
// 2 app/config 引入密钥 导出
// 3 controller 使用jwt  return {id,name,token}
```

### 验证授权的中间件和control 

```js
authRouter.post('/test', verifyAuth , success )
1 中间件 verifyAuth  
获取token
公钥验证
result （try catch 发送错误 UNAUTHORIZATION ）

2 control success

3 post 技巧【执行脚本】 拿到最新的token
const res=pm.response.json()
pm.globals.set('token',res.token)   {{token}} 填入
```

## 发表动态接口

```js
router 验证 创建

controller
1 获取参数 id,content
2 调用service的数据库操作

service
数据库操作

//验证token 判断是否又authorization
if(!authorization) {
    const error=new Error(errorType.UNAUTHORIZATION)
    return ctx.app.emit('error', error, ctx)
  }
```

获取某条动态接口

```js
router.get('/:momentId',detail)

controll
 detail(momentId)
```

### 获取多条

### 修改动态

```js
//1 登录
//2 自己的
//router
momentRouter.patch('/:momentId',update)
//midlleware
verifyAuth

verifyPermission (auth.middleware)
{
1.获取参数 userId 动态id
2.查询是否具备权限 checkMoment
3.UNPERMISSION 错误码
}

//controller
async update(ctx,next){
   const { momentId } = ctx.params
   const { content } = ctx.request.body
   const res= await momentService.update(content,momentId)
    ctx.body=res
}

//moment.service.js 
class momentService {
 update(content,id) {
  const statement='update moment set content = ? where id = ? '
  const res = await connect.execute(statement,[ content ,id ])
 return res;
  }   
}    

//auth.service.js 通用查询权限
class authService {
    checkMoment(momentId,userId) {
       try {
         const statement=''
       const [result] = await connect.execute(statement,    [momentId,userId])
       return result.length===0 ? false:true;    
       }catch(err){
           
       }
    }
}
```



### 删除动态

```js
//1 登录
//2 删除的权限
momentRouter.delete('/:momentId',verifyAuth,verfiyPermission,remove)

```

## 评论

### 创建评论

```js
commentRouter.post('/:momentId',verifyAuth,create)
//comment.controller.js
class CommentController {
 async create(ctx,next){
     //参数（id,comment）
     const {commentId,comment} = ctx.request.body
     const {id }=ctx.user;
     //service请求 不是数组了
    const result =await service.create(commentId,comment,id)
     //返回
    ctx.body=result
 }
}
//comment.service.js
class CommentService {
    async create(commentId,comment,id) {
        const statement=`INSERT INTO comment (content,moment_id,user_id) VALUES (?,?,?)` 
     const [result]= await connections.execute(statement,[comment,commentId,id])
     return result
    }
}
```

### 回复评论

```js
commentRouter.post('/:momentId/reply',verifyAuth,reply)
//comment.controller.js       
参数  url的id是本次评论的内容 (commonId,content,id,momentId)
//comment.service.js
```

