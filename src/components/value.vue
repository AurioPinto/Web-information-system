<template>
  <div class="detail">
    <!-- <p class="detail-title">Aurio Pinto</p> -->
    <!-- First screen -->
    <template>
      <transition name="first-title">
        <div
          class="first-title"
          v-show="screenIndex === 0 || screenIndex === 1"
          :class="{ 'first-title-moved': screenIndex === 1 }"
        >
          Home
        </div>
      </transition>
      <transition name="first-img" @after-enter="pageEnter(0)">
        <div class="first-img" v-show="screenIndex === 0">
          <!-- <img src="../assets/value/value_1.png"> -->
        </div>
      </transition>
    </template>
    <!-- Second screen -->
    <transition name="life-way" @after-enter="pageEnter(1)">
      <!-- <div class="life-way" v-show="screenIndex === 2" :class="{'life-way-first-second':screenIndex === 2 && prevIndex === 1,'life-way-second-third': screenIndex === 2 && prevIndex === 3}"> -->
      <div class="life-way" v-show="screenIndex === 1">
        Shaping a World with New Technologies
      </div>
    </transition>
    <!--Third screen -->
    <template>
      <transition name="wish-power-img" @after-enter="pageEnter(2, 'back')">
        <div class="wish-power-img" v-show="screenIndex === 2">
          <!-- <img src="" alt=""> -->
        </div>
      </transition>
      <transition name="wish-power-title" @after-enter="pageEnter(2)">
        <div
          class="wish-power-title"
          v-show="screenIndex === 2 || screenIndex === 3"
          :class="{ 'first-title-moved': screenIndex === 3 }"
        >
          <span>Project</span>
        </div>
      </transition>
    </template>
    <!-- Fourth screen-->
    <transition name="box-fourth" @after-enter="pageEnter(3)">
      <div
        class="box-fourth"
        v-show="screenIndex === 3"
        :class="{ boxEn: language !== 'CHS' }"
      >
        <img src="../assets/value/value_4.png" v-if="language === 'CHS'" />
        <img src="../assets/value/value_4_en.png" v-else />
      </div>
    </transition>
    <!--Fifth screen -->
    <template>
      <transition name="vi-title">
        <div
          class="vi-title"
          v-show="screenIndex === 4 || screenIndex === 5"
          :class="{ 'first-title-moved': screenIndex === 5 }"
        >
          <span>Research</span>
        </div>
      </transition>
      <transition name="vi-img" @after-enter="pageEnter(4)">
        <div class="vi-img" v-show="screenIndex === 4">
          <!-- <div class="vi-img" v-show="screenIndex === 5 || screenIndex === 6" :class="{'vi-img-moved':screenIndex === 6}"> -->
          <!-- <img src="../assets/value/value_5.png" alt=""> -->
        </div>
      </transition>
    </template>
    <!-- Sixth screen-->
    <transition name="box-sixth" @after-enter="pageEnter(5)">
      <div
        class="box-sixth"
        v-show="screenIndex === 5"
        :class="{ boxEn: language !== 'CHS' }"
      >
        <img src="../assets/value/value_6.png" v-if="language === 'CHS'" />
        <img src="../assets/value/value_6_en.png" v-else />
      </div>
    </transition>
    <!-- <button @click="next">next</button>
    <button @click="prev" style="left: 60%;">prev</button>-->
    <span
      class="arrow-down"
      :class="{ 'arrow-white': screenIndex === 2 }"
      v-if="screenIndex !== 5"
    ></span>
    <span
      class="arrow-up"
      :class="{ 'arrow-white': screenIndex === 4 }"
      v-if="screenIndex !== 0 && screenIndex !== 5"
    ></span>
    <p class="arrow-right" @click="goBackToVI" v-if="screenIndex === 5">
      <span></span>
    </p>
  </div>
</template>

<script>
// import Velocity from "velocity-animate";
import { throttle } from "../utils/utils.js";

let eventHandle = {
  getEvent: function(event) {
    return event || window.event;
  },
  addEvent: function(element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + type, handler);
    } else {
      element["on" + type] = handler;
    }
  },
  getWheelDelta: function(event) {
    return event.wheelDelta ? event.wheelDelta : -event.detail * 40;
  }
};
export default {
  name: "value",
  data() {
    return {
      user: {
        name: "value"
      },
      direction: Number,
      forwardFlag: [true, false, false, false, false, false],
      // backFlag: [false, false, false, false, false, true],
      screenIndex: 0,
      prevIndex: 0,
      animtPosi: false,
      animtNega: true,
      language: localStorage.Language || "CHS"
    };
  },
  mounted() {
    // eslint-disable-next-line no-console
    console.log("111");
    eventHandle.addEvent(document, "mousewheel", this.mouseHandle);
    eventHandle.addEvent(document, "DOMMouseScroll", this.mouseHandle);
    document.body.style.overflow = document.documentElement.style.overflow =
      "hidden";
  },
  // mounted() {
  //   this.$nextTick(function() {
  //     //Firefox
  //     if (document.addEventListener) {
  //       document.addEventListener("DOMMouseScroll", this.scrollFunc, false);
  //     }
  //     //IE及其他浏览器
  //     window.onmousewheel = document.onmousewheel = this.scrollFunc;
  //   });
  // },
  methods: {
    pageEnter(page, dir) {
      // console.log(`${page + 1}页动画进入完成`);
      setTimeout(() => {
        if (this.direction < 0) {
          if (dir) return;
          this.forwardFlag[page] = true;
          this.forwardFlag[page - 1] = false;
        } else {
          if (this.screenIndex == 3) {
            page = 3;
          }
          this.forwardFlag[page] = true;
          this.forwardFlag[page + 1] = false;
        }
      }, 1000);
    },
    mouseHandle(event) {
      event = eventHandle.getEvent(event);
      this.direction = eventHandle.getWheelDelta(event);
      // console.log(this.direction);
      if (this.direction < 0) {
        if (this.forwardFlag[this.screenIndex]) {
          throttle(this.next, null, 10);
        }
      } else {
        if (this.forwardFlag[this.screenIndex]) {
          throttle(this.prev, null, 10);
        }
      }
    },
    next() {
      // if(!this.animtPosi) return;
      if (this.screenIndex === 5) {
        return;
      }
      this.screenIndex++;
      this.animtPosi = false;
      this.prevIndex = this.screenIndex;
    },
    prev() {
      // if(!this.animtNega) return;
      if (this.screenIndex === 0) {
        return;
      }
      this.screenIndex--;
      this.animtNega = false;
      this.prevIndex = this.screenIndex;
    },
    goBackToVI() {
      // this.$router.push("/vi");
    },
    // eslint-disable-next-line no-unused-vars
    afterMove(way) {},
    // eslint-disable-next-line no-unused-vars
    afterPosi(way) {
      this.animtPosi = true;
    },
    // eslint-disable-next-line no-dupe-keys
    // eslint-disable-next-line no-unused-vars
    afterMove(way) {
      this.animtNega = true;
    }
  },
  beforeRouteLeave(to, from, next) {
    document.body.style.overflow = document.documentElement.style.overflow =
      "auto";
    next();
  }
};
</script>
/*
<style>
html,
body {
  font-size: 192px;
}
</style>
*/
<style lang="scss" scoped>
// @import url("../../src/base.scss");

@function j($px, $base-font-size: 192px) {
  @if (unitless($px)) {
    @return j($px + 0px);
  } @else if (unit($px) ==rem) {
    @return $px;
  }
  @return ($px / $base-font-size) * 1rem;
}

.detail .detail-title {
  position: fixed;
  height: j(88);
  font-size: j(28);
  top: j(10);
  left: 50%;
  transform: translateX(-50%);
}
.detail-title:hover {
  color: green;
}
.arrow-down,
.arrow-up {
  height: j(32);
  width: j(32);
  position: fixed;
  bottom: j(60);
  background: url("../assets/value/logo.png") no-repeat;
  background-size: cover;
  z-index: 40;
}

.arrow-down {
  left: j(170);
  animation: upAndDown 1.8s ease infinite;
}
@keyframes upAndDown {
  50% {
    transform: translateY(j(-20));
  }
  100% {
    transform: translateY(0);
  }
}

.arrow-up {
  right: j(170);
  transform: rotateZ(180deg);
}
.arrow-right {
  // width:128px;
  // @include FlexFontSize(16);
  font-size: 16px;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  position: fixed;
  bottom: j(60);
  z-index: 40;
  cursor: pointer;
  right: j(170);
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    height: j(32);
    width: j(32);
    transform: rotateZ(-90deg);
    background: url("../assets/value/logo.png") no-repeat;
    background-size: cover;
  }
}
.arrow-white {
  background-image: url("../assets/value/arrow_white.png");
}

.detail {
  // margin-top: j(70);
  top: j(70);
  bottom: 0;
  width: j(1920);
  // height: j(1010);
  position: fixed;
  box-sizing: border-box;
  background-color: #fff;
  overflow: hidden !important;
  & > div {
    position: absolute;
  }
  .first-title {
    font-size: j(60);
    font-weight: 400;
    color: rgba(0, 38, 60, 1);
    top: j(426);
    left: j(170);
    transition: all 0.4s ease;
  }
  .first-img {
    // height: j(1010);
    // width: j(1000);
    width: 4rem;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 40px;
    background: url("../assets/ap.jpg") no-repeat;
    background-size: contain;
    background-size: 106% 96%;
    transition: all 0.4s ease;
    z-index: 20;
    // img {
    //   // width: 100%;
    // }
  }
  .life-way {
    top: j(417);
    width: 100%;
    text-align: center;
    font-size: j(72);
    font-weight: 300;
    color: rgba(0, 75, 100, 1);
  }
  .wish-power-img {
    width: j(1100);
    background: url("../assets/value/value_3.jpg") no-repeat;
    background-size: cover;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 20;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .wish-power-title {
    font-size: j(60);
    font-weight: 400;
    color: rgba(0, 38, 60, 1);
    top: j(426);
    right: j(170);
    transition: all 0.4s ease;
  }
  .box-fourth {
    height: j(427);
    width: j(1513);
    top: j(245);
    left: j(202);
    z-index: 25;
    img {
      height: 100%;
      width: 100%;
    }
    &.boxEn {
      width: j(1553);
      height: j(490);
      top: j(221);
      left: j(180);
    }
  }
  .vi-title {
    font-size: j(60);
    font-weight: 400;
    color: rgba(0, 38, 60, 1);
    top: j(426);
    left: j(170);
    transition: all 0.4s ease;
  }
  .vi-img {
    width: j(1100);
    // height: j(1010);
    background: url("../assets/value/value_5.jpg") no-repeat;
    background-size: cover;
    background-position: center center;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    transition: all 0.4s ease;
    z-index: 20;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .box-sixth {
    height: j(565);
    width: j(1475);
    top: j(195);
    left: j(223);
    z-index: 20;
    img {
      height: 100%;
      width: 100%;
    }
    &.boxEn {
      height: j(594);
      width: j(1494);
      top: j(163);
      left: j(204);
    }
  }
}

//Animated style
.detail {
  //1 => 2 my vision changes
  .first-title-moved {
    top: j(60);
    font-size: j(30);
  }
  // 2 => 3  my vision changes
  .first-title-enter,
  .first-title-leave-to {
    opacity: 0;
  }
  //1 => 2   First picture change
  .first-img-enter,
  .first-img-leave-to {
    transform: translateX(100%);
  }
  // 1 => 2  Lifestyle change

  .life-way-enter-active {
    transition: all 0.4s ease 0.4s;
  }
  .life-way-leave-active {
    transition: all 0.4s ease;
  }
  .life-way-enter {
    opacity: 0;
    transform: translateY(-100%);
  }
  .life-way-leave-to {
    opacity: 0;
  }

  // 2=>3   3=>4 The third picture changes

  .wish-power-img-enter-active {
    transition: all 0.4s ease 0.1s;
  }

  .wish-power-img-leave-active {
    transition: opacity 0.4s ease;
  }

  .wish-power-img-enter {
    transform: translateX(-100%);
  }
  .wish-power-img-leave-to {
    opacity: 0;
  }

  // 2=>3   3=>4 Third title change

  .wish-power-title-enter-active {
    transition: all 0.4s ease 0.4s;
  }
  .wish-power-title-leave-active {
    transition: all 0.4s ease;
  }
  .wish-power-title-enter {
    opacity: 0;
    transform: translateX(-50%);
  }
  .wish-power-title-leave-to {
    transform: translateX(-50%);
    opacity: 0;
    top: j(60);
    font-size: j(30);
  }
  // 3=>4  4=>5 The fourth picture changes

  .box-fourth-enter-active {
    transition: all 0.4s ease 0.3s;
  }
  .box-fourth-enter {
    opacity: 0;
    transform: translateX(100%);
  }
  .box-fourth-leave-to {
    opacity: 0;
  }
  //  4=>5  5=>6 Fifth title change

  .vi-title-enter-active {
    transition: all 0.4s ease 0.1s;
  }
  .vi-title-enter {
    opacity: 0;
    transform: translateX(100%);
  }
  .vi-title-leave-to {
    opacity: 0;
  }

  //  4=>5  5=>6 The fifth picture change

  .vi-img-moved {
    transform: translateX(100%);
  }
  .vi-img-enter-active,
  .vi-img-leave-active {
    transition: all 0.4s ease 0.4s;
  }

  .vi-img-enter {
    transform: translateX(100%);
  }
  .vi-img-leave-to {
    // opacity: 0;
    transform: translateX(100%);
  }
  //  5=>6 6=>5 The sixth picture changes

  .box-sixth-enter-active {
    transition: all 0.4s ease 0.4s;
  }
  .box-sixth-leave-active {
    transition: all 0.4s ease;
  }
  .box-sixth-enter,
  .box-sixth-leave-to {
    opacity: 0;
    transform: translateX(-50%);
  }
}
</style>
