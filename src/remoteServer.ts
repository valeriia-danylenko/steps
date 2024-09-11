import Koa from 'koa'
import Router from '@koa/router'
import bodyParser from 'koa-bodyparser'

const app = new Koa()
const router = new Router()

app.use(bodyParser())

router.post('/accept', ctx => {
  const accepted = Math.random() > 0.5
  ctx.body = { accepted }
})

router.get('/result/:result', ctx => {
  ctx.body = { result: ctx.params.result }
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3001, () => {
  console.log('Remote server running on port 3001')
})
