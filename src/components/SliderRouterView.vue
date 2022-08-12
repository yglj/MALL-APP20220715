<template>
    <div >
        <router-view v-slot="{ Component, route }">
            <transition :name="transitionName" @before-enter="beforeEnter" @after-leave="afterLeave">
                <keep-alive inclue="virtualTaskStack">
                    <component :is="Component" :key="route.meta.usePathKey ? route.path : undefined"
                        :class="{ ding: isAnimate}"  />
                </keep-alive>
            </transition>
        </router-view>

    </div>
</template>




<script>

// <!-- 邪门;因为路由守卫中未调用next,导致页面空白且不报错，为此花费了3个小时的无用功 -->
// <!-- router-view的v-slot
// router-view也提供给我们一个插槽，可以用于 <transition> 和 <keep-alive>
// 组件来包裹你的路由组件：Component：要渲染的组件；
// route：解析出的标准化路由对象； -->

//  常量，暴露出全局
    const ROUTER_TYPE_PUSH = 'push'
    const ROUTER_TYPE_BACK = 'back'
    const NONE = 'none'
    const ROUTER_TYPE_ENUM = [
    ROUTER_TYPE_PUSH, ROUTER_TYPE_BACK, NONE ]

</script>


<script setup>
// 页面切换动画失败，做不出来

/*
虚拟任务栈
标记新旧页面：新页面播放push动画，离开页面播放back动画

*/
import { ref } from 'vue'
import { useRouter } from 'vue-router'

let router = useRouter()
let transitionName = ref()

//  初始化虚拟任务栈
let virtualTaskStack = ref([props.mainComponentName])
const clearTask = () => { virtualTaskStack.value = [props.mainComponentName] }


//  设置守卫
router.beforeEach((to) => {
    transitionName.value = props.routerType
    if(props.routeType == ROUTER_TYPE_PUSH){
        // 进栈
        virtualTaskStack.value.push(to.name)
    }else if(props.routerType == ROUTER_TYPE_BACK){
        // 出栈
        virtualTaskStack.value.pop()
    }
    if(to.name === props.mainComponentName){
        clearTask()
    }
    //  不传递next,不用调用
    // next()
})

// isAimate控制动画执行
let isAnimate = ref(false)
const beforeEnter = () => { isAnimate.value = true }
const afterLeave = () => { isAnimate.value = false }



let props = defineProps(
    {
        // 组件类型，push/back
        routerType: {
            type: String,
            default: NONE,
            validator(val) {
                // 组件没有设置push/back时提示
                const res = ROUTER_TYPE_ENUM.includes(val)
                if (!res) {
                    throw new Error('router_type need push or back or none')
                }
                return res
            }
        },
        // 应用动画组件, 任务栈中第一个组件
        mainComponentName: {
            type: String,
            required: true
        }
    }
)

const name = 'home'
</script>



<style lang="scss" scoped>

.ding {
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
}

// push页面时：新页面的进入动画
.push-enter-active {
  animation-name: push-in;
  animation-duration: .4s;
}
// push页面时：老页面的退出动画
.push-leave-active {
  animation-name: push-out;
  animation-duration: .4s;
}
// push页面时：新页面的进入动画
@keyframes push-in {
  0% {
    transform: translate(100%, 0);
  }
  100% {
      transform: translate(0, 0);
  }
  }

  // push页面时：老页面的退出动画
  @keyframes push-out {
      0% {
          transform: translate(0, 0);
      }

      100% {
          transform: translate(-50%, 0);
      }
  }

  // 后退页面时：即将展示的页面动画
  .back-enter-active {
      animation-name: back-in;
      animation-duration: .4s;
  }

  // 后退页面时：后退的页面执行的动画
  .back-leave-active {
      animation-name: back-out;
      animation-duration: .4s;
  }

  // 后退页面时：即将展示的页面动画
  @keyframes back-in {
      0% {
          width: 100%;
          transform: translate(-100%, 0);
      }

      100% {
          width: 100%;
          transform: translate(0, 0);
      }
  }

  // 后退页面时：后退的页面执行的动画
  @keyframes back-out {
      0% {
          width: 100%;
          transform: translate(0, 0);
      }

      100% {
          width: 100%;
          transform: translate(50%, 0);
      }
  }
</style>