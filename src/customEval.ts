export function evalWithResult (condStr: string, result: any) {
  const func = `
      function run(result) {
        ${condStr}
      }
    `
  // Use eval to create and execute the function
  return eval(func + `run(result);`)
}
