<template>
  <div class="icon-wrapper">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="19"
      height="19"
    >
      <g v-if="name == 'unite'">
        <path
          class="default-icon"
          d="M22,8.4V20.6A1.4,1.4,0,0,1,20.6,22H8.4A1.4,1.4,0,0,1,7,20.6V17H3.4A1.4,1.4,0,0,1,2,15.6V3.4A1.4,1.4,0,0,1,3.4,2H15.6A1.4,1.4,0,0,1,17,3.4V7h3.6A1.4,1.4,0,0,1,22,8.4Z"
        />
      </g>
      <g v-else-if="name == 'minus front'">
        <path
          class="default-icon"
          d="M20.6,7H17V3.4A1.4,1.4,0,0,0,15.6,2H3.4A1.4,1.4,0,0,0,2,3.4V15.6A1.4,1.4,0,0,0,3.4,17H7v3.6A1.4,1.4,0,0,0,8.4,22H20.6A1.4,1.4,0,0,0,22,20.6V8.4A1.4,1.4,0,0,0,20.6,7ZM21,21H8V8H21Z"
        />
      </g>
      <g v-else-if="name == 'intersect'">
        <path
          class="default-icon"
          d="M20.6,7H17V3.4A1.4,1.4,0,0,0,15.6,2H3.4A1.4,1.4,0,0,0,2,3.4V15.6A1.4,1.4,0,0,0,3.4,17H7v3.6A1.4,1.4,0,0,0,8.4,22H20.6A1.4,1.4,0,0,0,22,20.6V8.4A1.4,1.4,0,0,0,20.6,7ZM7,8.4V16H3V3H16V7H8.4A1.4,1.4,0,0,0,7,8.4ZM21,21H8V17h7.6A1.4,1.4,0,0,0,17,15.6V8h4Z"
        />
      </g>
      <g v-else-if="name == 'exclude'">
        <path
          class="default-icon"
          d="M15.6,2H3.4A1.4,1.4,0,0,0,2,3.4V15.6A1.4,1.4,0,0,0,3.4,17H15.6A1.4,1.4,0,0,0,17,15.6V3.4A1.4,1.4,0,0,0,15.6,2ZM16,16H8V8h8Z"
        />
        <path
          class="default-icon"
          d="M22,8.4V20.6A1.4,1.4,0,0,1,20.6,22H8.4A1.4,1.4,0,0,1,7,20.6V17h8.6A1.4,1.4,0,0,0,17,15.6V7h3.6A1.4,1.4,0,0,1,22,8.4Z"
        />
      </g>
      <g v-else-if="name == 'divide'">
        <path
          class="default-icon"
          d="M17,3.4V7H8.4A1.4,1.4,0,0,0,7,8.4V17H3.4A1.4,1.4,0,0,1,2,15.6V3.4A1.4,1.4,0,0,1,3.4,2H15.6A1.4,1.4,0,0,1,17,3.4Z"
        />
        <rect class="default-icon" x="8" y="8" width="8" height="8" />
        <path
          class="default-icon"
          d="M22,8.4V20.6A1.4,1.4,0,0,1,20.6,22H8.4A1.4,1.4,0,0,1,7,20.6V17h8.6A1.4,1.4,0,0,0,17,15.6V7h3.6A1.4,1.4,0,0,1,22,8.4Z"
        />
        <rect class="default-icon" x="8" y="8" width="8" height="8" />
      </g>
      <g v-else-if="name == 'trim'">
        <path
          class="default-icon"
          d="M17,3.4V7H8.4A1.4,1.4,0,0,0,7,8.4V17H3.4A1.4,1.4,0,0,1,2,15.6V3.4A1.4,1.4,0,0,1,3.4,2H15.6A1.4,1.4,0,0,1,17,3.4Z"
        />
        <path
          class="default-icon"
          d="M22,8.4V20.6A1.4,1.4,0,0,1,20.6,22H8.4A1.4,1.4,0,0,1,7,20.6V17H8V8h9V7h3.6A1.4,1.4,0,0,1,22,8.4Z"
        />
      </g>
      <g v-else-if="name == 'merge'">
        <path
          class="default-icon"
          d="M22,8.4V20.6A1.4,1.4,0,0,1,20.6,22H8.4A1.4,1.4,0,0,1,7,20.6V17H8V8H7.07A1.09,1.09,0,0,0,7,8.4V17H3.4A1.4,1.4,0,0,1,2,15.6V3.4A1.4,1.4,0,0,1,3.4,2H15.6A1.4,1.4,0,0,1,17,3.4V7h3.6A1.4,1.4,0,0,1,22,8.4Z"
        />
      </g>
      <g v-else-if="name == 'crop'">
        <path
          class="faded-icon"
          d="M15.6,2H3.4A1.4,1.4,0,0,0,2,3.4V15.6A1.4,1.4,0,0,0,3.4,17H7V16H3V3H16V7h1V3.4A1.4,1.4,0,0,0,15.6,2Z"
        />
        <rect x="8" y="8" width="8" height="8" />
        <path
          class="default-icon"
          d="M20.6,7H17V8h4V21H8V17H7v3.6A1.4,1.4,0,0,0,8.4,22H20.6A1.4,1.4,0,0,0,22,20.6V8.4A1.4,1.4,0,0,0,20.6,7Z"
        />
        <rect class="default-icon" x="8" y="8" width="8" height="8" />
      </g>
      <g v-else-if="name == 'outline'">
        <path
          class="default-icon"
          d="M16,16H8v1h7.6A1.4,1.4,0,0,0,17,15.6V8H16ZM15.6,2H3.4A1.4,1.4,0,0,0,2,3.4V15.6A1.4,1.4,0,0,0,3.4,17H7V16H3V3H16V7h1V3.4A1.4,1.4,0,0,0,15.6,2Z"
        />
        <path class="default-icon" d="M16,7V8H8v8H7V8.4A1.4,1.4,0,0,1,8.4,7Z" />
        <path
          class="default-icon"
          d="M20.6,7H17V8h4V21H8V17H7v3.6A1.4,1.4,0,0,0,8.4,22H20.6A1.4,1.4,0,0,0,22,20.6V8.4A1.4,1.4,0,0,0,20.6,7ZM8,8h8V7H8.4A1.4,1.4,0,0,0,7,8.4V16H8Z"
        />
        <path
          class="default-icon"
          d="M17,8v7.6A1.4,1.4,0,0,1,15.6,17H8V16h8V8Z"
        />
      </g>
      <g v-else-if="name == 'minus back'">
        <path
          class="default-icon"
          d="M20.6,7H17V3.4A1.4,1.4,0,0,0,15.6,2H3.4A1.4,1.4,0,0,0,2,3.4V15.6A1.4,1.4,0,0,0,3.4,17H7v3.6A1.4,1.4,0,0,0,8.4,22H20.6A1.4,1.4,0,0,0,22,20.6V8.4A1.4,1.4,0,0,0,20.6,7ZM16,16H3V3H16Z"
        />
      </g>
      <path
        v-else-if="name == 'clipping mask'"
        class="default-icon"
        d="M16,6.29V2H2V16H6.27c.06.21.12.42.19.63l1-.33c0-.1-.07-.2-.1-.3H16V7.32l.3.1.33-1Q16.34,6.37,16,6.29Zm-1-.2A8.26,8.26,0,0,0,14,6a8,8,0,0,0-8,8,8.14,8.14,0,0,0,.06,1H3V3H15ZM14.94,22l-.11-1a7,7,0,0,0,1.82-.46l.37.93A8.13,8.13,0,0,1,14.94,22Zm-2.14,0a7.65,7.65,0,0,1-2.06-.61l.41-.91a6.66,6.66,0,0,0,1.8.53Zm6.09-1.55-.61-.79a7,7,0,0,0,1.32-1.34l.8.61A7.77,7.77,0,0,1,18.89,20.38Zm-10-.19a8.09,8.09,0,0,1-1.46-1.58L8.28,18a7,7,0,0,0,1.28,1.39ZM21.46,17l-.93-.37A7.14,7.14,0,0,0,21,14.8l1,.1A8.31,8.31,0,0,1,21.46,17Zm-.52-4.07a7,7,0,0,0-.55-1.8l.91-.42a7.89,7.89,0,0,1,.62,2.06ZM19.39,9.53A6.93,6.93,0,0,0,18,8.27l.57-.83a8.06,8.06,0,0,1,1.58,1.45Z"
        transform="translate(-2 -2)"
      />
      <g v-else-if="name == 'compound path'">
        <path
          class="default-icon"
          d="M16,6.39V2.77A.76.76,0,0,0,15.23,2H2.77A.76.76,0,0,0,2,2.77V15.23a.76.76,0,0,0,.77.77H6.39A7.92,7.92,0,1,0,16,6.39ZM14.08,21a6.92,6.92,0,0,1-6.65-5,5.55,5.55,0,0,1-.21-1H3V3H15V7.22a5.55,5.55,0,0,1,1,.21A6.92,6.92,0,0,1,14.08,21Z"
          transform="translate(-2 -2)"
        />
      </g>
      <g v-else-if="name == 'hard mix'">
        <path
          class="red-icon"
          d="M17,3.4V7H8.4A1.4,1.4,0,0,0,7,8.4V17H3.4A1.4,1.4,0,0,1,2,15.6V3.4A1.4,1.4,0,0,1,3.4,2H15.6A1.4,1.4,0,0,1,17,3.4Z"
          transform="translate(-2 -2)"
        />
        <rect class="default-icon" x="6" y="6" width="8" height="8" />
        <path
          class="blue-icon"
          d="M22,8.4V20.6A1.4,1.4,0,0,1,20.6,22H8.4A1.4,1.4,0,0,1,7,20.6V17h8.6A1.4,1.4,0,0,0,17,15.6V7h3.6A1.4,1.4,0,0,1,22,8.4Z"
          transform="translate(-2 -2)"
        />
        <rect x="6" y="6" width="8" height="8" />
      </g>
      <g v-else-if="name == 'soft mix'">
        <path
          class="red-icon"
          d="M17,3.4V7H8.4A1.4,1.4,0,0,0,7,8.4V17H3.4A1.4,1.4,0,0,1,2,15.6V3.4A1.4,1.4,0,0,1,3.4,2H15.6A1.4,1.4,0,0,1,17,3.4Z"
          transform="translate(-2 -2)"
        />
        <rect class="default-icon" x="6" y="6" width="8" height="8" />
        <path
          class="blue-icon"
          d="M22,8.4V20.6A1.4,1.4,0,0,1,20.6,22H8.4A1.4,1.4,0,0,1,7,20.6V17h8.6A1.4,1.4,0,0,0,17,15.6V7h3.6A1.4,1.4,0,0,1,22,8.4Z"
          transform="translate(-2 -2)"
        />
        <rect class="purple-icon" x="6" y="6" width="8" height="8" />
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: "unite",
    },
  },
};
</script>

<style scoped>
.icon-wrapper {
  padding-top: 4px;
}
svg {
  width: 24px;
}

.red-icon {
  fill: #b60000;
}

.blue-icon {
  fill: #0000b6;
}

.purple-icon {
  fill: #5100af;
}

.default-icon {
  fill: var(--color-icon);
}
.faded-icon {
  fill: var(--color-icon);
  opacity: 0.6;
}
</style>
