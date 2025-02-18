import { signal, effect } from './src/index'


const count = signal(0)

effect(() => {
  console.log(count.value)
})

setInterval(() => {
  count.value++
}, 1000)

