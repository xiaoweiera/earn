<script lang="ts">
import { defineComponent, PropType } from "vue";
import track from "./index.vue";
import { Origin } from "src/types/track/";
export default defineComponent({
  name: "TrackGio",
  extends: track,
  props: {
    origin: {
      type: String as PropType<Origin>,
      default: () => Origin.gio,
    },
  },
});
</script>
