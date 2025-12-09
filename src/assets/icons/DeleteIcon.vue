<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
    <rect class="a" width="20" height="20" />
    <path class="b" d="M9,10V24.167H21.5V10Z" transform="translate(-5.25 -5.833)" />
    <path class="c" d="M20,20v5.417" transform="translate(-11.667 -11.667)" />
    <path class="c" d="M28,20v5.417" transform="translate(-16.333 -11.667)" />
    <path class="c" d="M4,10H20.667" transform="translate(-2.333 -5.833)" />
    <path class="b" d="M16,6.5,17.37,4h3.953l1.343,2.5Z" transform="translate(-9.333 -2.333)" />
  </svg>
</template>

<style scoped>
.a {
  fill: rgba(255, 255, 255, 0.01);
}
.b,
.c {
  fill: none;
  /* stroke: #bbb; */
  stroke: #c8323c;
  stroke-linejoin: round;
  stroke-width: 1.5px;
}
.c {
  stroke-linecap: round;
}
</style>
