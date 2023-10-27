import { defineComponent } from "vue";
import styles from "./index.module.scss";

export default defineComponent({
  props: {
    label: {
      type: String,
    },
  },
  setup(props, { slots }) {
    console.log(props);
    return () => {
      return (
        <div class={styles.group}>
          <div>{props.label}</div>
          {slots.default?.()}
        </div>
      );
    };
  },
});
