export interface ConditionStep {
  type: StepType.condition
  next: string
  nextFalse: string
  conditionStr: string
}

export interface HttpStep {
  type: StepType.request
  next: string
  params: {
    url: string
    method: string
  }
}

export type Step = ConditionStep | HttpStep

enum StepType {
  request = 'request',
  condition = 'condition'
}

export interface StepObj {
  [id: string]: Step
}
export interface StepBody {
  first: string
  steps: StepObj
}
