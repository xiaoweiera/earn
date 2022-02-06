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
  width: var(--ui-box-right);
}
.box-content-wrap {
  margin-right: var(--ui-box-right);
}
</style>
