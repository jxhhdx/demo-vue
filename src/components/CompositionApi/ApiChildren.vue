<script lang="ts">
import { h, ref, watch } from 'vue';

export default {
  setup() {
    const bbq = ref(0);

    return () => h(
      'button',
      { 
        onClick: () => {
          // console.log(bbq.value.bbq.ccc);
          throw new Error('BBQ996')
        }
      },
      'ApiChildren-bbq'
    );
  }
}
</script>