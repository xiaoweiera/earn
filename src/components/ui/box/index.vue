<script lang="ts">
import Box from "./box";
import { defineComponent } from "vue";
export default defineComponent({
  name: "UiBox",
  extends: Box
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
