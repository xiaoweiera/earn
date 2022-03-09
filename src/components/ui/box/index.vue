<script lang="ts">
import { defineComponent } from "vue";
import Box from "./box";
export default defineComponent({
  name: "UiBox",
  extends: Box,
});
</script>

<style scoped lang="scss">
.float-right {
  @screen md {
    width: var(--ui-box-right);
  }
}
.box-content-wrap {
  @screen lg {
    margin-right: var(--ui-box-right);
  }
}
</style>
