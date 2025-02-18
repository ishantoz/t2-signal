
import { signal, effect } from './dist/esm/index.js'

const count = signal(0)

effect(() => {
  console.log(count.value)
})
