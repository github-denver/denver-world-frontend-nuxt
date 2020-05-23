<template>
  <div :class="['grp_opt', attribute.className ? attribute.className : '']">
    <label for="category" class="lab_opt">
      <span class="txt_opt">{{ information.select.option.text }}</span>
      <span class="ico_g ico_opt"></span>
    </label>

    <select v-model="information.select.option.value" name="category" class="opt_l" @change="onChangeOpt">
      <optgroup v-for="(optgrp, optgrpIndex) in navigation" :key="optgrpIndex" :label="`${optgrp.optgroup.text}`">
        <option v-for="(opt, optIndex) in navigation[optgrpIndex].optgroup.option" :key="optIndex" :value="opt.value">{{ opt.text }}</option>
      </optgroup>
    </select>
  </div>
  <!-- // grp_opt -->
</template>

<script>
export default {
  name: 'Select',
  props: {
    attribute: {
      type: Object,
      required: true
    },
    navigation: {
      type: Array,
      required: true
    },
    category: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      information: {
        category: null,
        select: {
          option: {
            text: null,
            value: null
          }
        },
        service: null,
        number: null,
        subject: null,
        thumbnail: null,
        picture: {
          files: null,
          result: null
        }
      }
    }
  },
  created() {
    console.log('[Select.vue] created() → this.$route: ', this.$route)

    console.log('[Select.vue] created() → this.category: ', this.category)

    this.information.select.option.value = this.category
    console.log('[Select.vue] created() → this.information.select.option.value: ', this.information.select.option.value)

    this.onChangeOpt()
  },
  methods: {
    onChangeOpt() {
      const navigation = this.navigation
      console.log('[Select.vue] navigation: ', navigation)

      console.log('[Select.vue] this.category: ', this.category)
      console.log('[Select.vue] this.information.select.option.value: ', this.information.select.option.value)

      for (const i in navigation) {
        for (const j in navigation[i].optgroup.option) {
          if (this.information.select.option.value === navigation[i].optgroup.option[j].value) {
            this.information.select.option.text = navigation[i].optgroup.option[j].text
            console.log('[Select.vue] this.information.select.option.text: ', this.information.select.option.text)

            this.information.select.option.value = navigation[i].optgroup.option[j].value
            console.log('[Select.vue] this.information.select.option.value: ', this.information.select.option.value)

            this.information.service = navigation[i].optgroup.option[j].service
            console.log('[Select.vue] this.information.service: ', this.information.service)

            // break

            return
          }
        }

        // break
      }

      console.log('[Select.vue] this.information.select.option.text: ', this.information.select.option.text)
      console.log('[Select.vue] this.information.select.option.value: ', this.information.select.option.value)

      this.$emit('parentChangeOpt', { text: this.information.select.option.text, value: this.information.select.option.value })
    }
  }
}
</script>
