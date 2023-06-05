import s from './assets.module.scss'

const PrintStatements = () => {
  return <div className={s.printStatements}>Print Statements</div>
}

const Console = () => {
  return <div className={s.console}>Console</div>
}

const ReactDevtools = () => {
  return <div className={s.reactDevtools}>React Devtools</div>
}

export { Console, PrintStatements, ReactDevtools }
