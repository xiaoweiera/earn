<script setup lang="ts">
import { computed } from "vue";
import SwiperCore, { Mousewheel, Autoplay, Navigation as swiperNavigation } from "swiper";
// 引入 swiper vue 组件
// @ts-ignore
import { Swiper, SwiperSlide } from "swiper/vue";
// 引入 swiper 样式
import "swiper/swiper-bundle.css";

const props = defineProps({
  list: {
    type: Array,
    default() {
      return [];
    },
  },
  /**
   * 为 false slide 滑动时只滑动一格
   * 为 true 时会根据惯性滑动可能不止一格且不会贴合
   **/
  freeMode: {
    type: Boolean,
    default() {
      return false;
    },
  },
  /**
   * 为 false slide 左右切换按钮
   * 为 true 时开启左右切换
   **/
  navigation: {
    type: Boolean,
    default() {
      return false;
    },
  },
  /**
   * Swiper的滑动方向，可设置为水平方向切换(horizontal)或垂直方向切换(vertical)
   *
   **/
  direction: {
    type: String,
    default() {
      return "vertical";
    },
  },
  /**
   * swiper-slide 之间的间隔
   **/
  spaceBetween: {
    type: Number,
    default() {
      return 0;
    },
  },
  /**
   * swiper-slide 单个高度
   **/
  slideHeight: {
    type: String,
    default() {
      return "100vh";
    },
  },
  /**
   * 自动播放
   */
  autoplay: {
    type: Boolean,
    default() {
      return false;
    },
  },
  delay: {
    type: Number,
    default() {
      return 3000;
    },
  },
  loop: {
    type: Boolean,
    default() {
      return false;
    },
  },
  bottomType: {
    type: String,
    default() {
      return "round";
    },
  },
});

// 装载 swiper 组件
SwiperCore.use([Mousewheel, Autoplay, swiperNavigation]);

const swiperSlideStyle = computed<string>(function (): string {
  const style: any = {};
  style["height"] = props.slideHeight;
  return style;
});

const swiperSlideAutoPlay = computed<any>(function () {
  if (props.autoplay) {
    return {
      delay: props.delay,
      disableOnInteraction: false,
    };
  }
  return false;
});
</script>

<template>
  <Swiper
    v-if="list.length"
    class="download-swiper view-full"
    :class="bottomType"
    :initial-slide="0"
    :slides-per-view="1"
    :pagination="{ clickable: true }"
    :loop="loop"
    :autoplay="swiperSlideAutoPlay"
    :direction="direction"
    :mousewheel="true"
    :space-between="30"
    :navigation="navigation"
    :free-mode="freeMode"
    :resize-observer="true"
  >
    <template v-for="(item, index) in list" :key="index">
      <SwiperSlide :style="swiperSlideStyle">
        <slot name="item" :data="item"></slot>
      </SwiperSlide>
    </template>
  </Swiper>
</template>
<style lang="scss" scoped>
.download-swiper {
  ::v-deep(.swiper-button-prev) {
    @apply hidden;
  }
  @keyframes carousel {
    from {
      transform: translate(0, 0);
    }
    to {
      transform: translate(0, 10px);
    }
  }
  ::v-deep(.swiper-button-next) {
    right: initial;
    top: initial;
    width: initial;
    height: initial;

    @apply left-1/2 bottom-12 m-0 transform -translate-x-1/2;

    &::after {
      content: "";
      @apply block w-16 h-16;
      animation: carousel 0.5s ease-in-out 1s infinite alternate;
      $bg: "/assets/download/chevrons-down.svg";
      background-image: url($bg);
      background-repeat: no-repeat;
      background-position: 100% 100%;
    }
  }
}
</style>
