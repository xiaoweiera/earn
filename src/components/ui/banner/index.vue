<script setup lang="ts">
import { computed } from "vue";
// 引入 swiper vue 组件
// @ts-ignore
import SwiperCore, { Pagination, Autoplay } from "swiper";
// @ts-ignore
import { Swiper, SwiperSlide } from "swiper/vue";
// 引入 swiper 样式
import "swiper/swiper-bundle.css";

const props = defineProps({
  list: {
    type: Array,
    default() {
      return []
    }
  },
  /**
   * 为 false slide 滑动时只滑动一格
   * 为 true 时会根据惯性滑动可能不止一格且不会贴合
   **/
  freeMode: {
    type: Boolean,
    default () {
      return false
    }
  },
  /**
   * swiper-slide 之间的间隔
   **/
  spaceBetween: {
    type: Number,
    default () {
      return 0
    }
  },
  /**
   * swiper-slide 单个宽度
   **/
  slideWidth: {
    type: String,
    default () {
      return '100%'
    }
  },
  /**
   * 自动播放
   */
  autoplay: {
    type: Boolean,
    default () {
      return false
    }
  },
  delay: {
    type: Number,
    default () {
      return 3000
    }
  },
  loop: {
    type: Boolean,
    default () {
      return true
    }
  },
  bottomType: {
    type: String,
    default () {
      return 'round'
    }
  }
})

// 装载 swiper 组件
SwiperCore.use([Pagination, Autoplay])

/*
:pagination="{ clickable: true }"
slides-per-view="auto"
:space-between="12"
:free-mode="true"
:resize-observer="true"
 */

const swiperSlideStyle = computed<string>(function(): string {
  const style: any = {};
  style['width'] = props.slideWidth
  return style
})

const swiperSlideAutoPlay = computed<any>(function() {
  if (props.autoplay) {
    return {
      delay: props.delay,
      disableOnInteraction: false,
    }
  }
  return false
});

</script>

<template>
  <client-only class="ui-banner">
    <div class="w-full h-full">
      <Swiper class="h-full" :class="bottomType" v-if="list.length"
              :initialSlide="0"
              slides-per-view="auto"
              :pagination="{ clickable: true }"
              :autoplay="swiperSlideAutoPlay"
              :loop="loop"
              :space-between="spaceBetween"
              :free-mode="freeMode"
              :resize-observer="true"
      >
        <template v-for="(item, index) in list" :key="index">
          <SwiperSlide :style="swiperSlideStyle">
            <slot name="item" :data="item"></slot>
          </SwiperSlide>
        </template>
      </Swiper>
    </div>
  </client-only>
</template>
<style lang="scss">
.line{
  .swiper-pagination-bullet{
    height:3px;
    width:12px;
    border-radius: 2px;
    background: white;
  }
  .swiper-pagination-bullet-active{
    width:24px;
    border-radius: 2px;
    background: white;
  }
}
.swiper {
  ::v-deep(.swiper-pagination-bullet) {
    width: 12px;
    height: 3px;
    background: rgba(37, 62, 111, 0.1);
    border-radius: 2px;
    opacity: 1;
  }
  ::v-deep(.swiper-pagination-bullet.swiper-pagination-bullet-active) {
    /*background-color: #2b8dfe;*/
    @apply bg-global-primary;
  }
}
</style>
