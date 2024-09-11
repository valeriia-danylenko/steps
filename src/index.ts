import Koa from 'koa'
import Router from '@koa/router'
import bodyParser from 'koa-bodyparser'
import { Step, StepBody } from './steps.interface'
import axios from 'axios'
import { evalWithResult } from './customEval'

const app = new Koa()
const router = new Router()

app.use(bodyParser())

router.post('/steps', async ctx => {
  const { first, steps } = ctx.request.body as StepBody

  let nextStepId = first
  let res

  do {
    let step = steps[nextStepId] as Step
    if (step.type === 'request') {
      const { method, url } = step.params
      try {
        const { data } = await axios({
          method,
          url
        })
        nextStepId = step.next
        res = data
      } catch (err) {
        ctx.body = { details: err.message, error: true }
        break
      }
    } else if (step.type === 'condition') {
      res = evalWithResult(step.conditionStr, res)
      nextStepId = res ? step.next : step.nextFalse
    }
  } while (nextStepId)
  ctx.body = { result: res }
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
