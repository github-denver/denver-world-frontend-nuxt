<template>
  <span :class="['grp_field', attribute.className]">
    <label v-if="attribute.title" :for="attribute.id" class="lab_l">{{ attribute.title }}</label>
    <span v-if="attribute.type !== 'file'" class="box_field">
      <input v-if="attribute.value" :id="attribute.id" :type="attribute.type" :name="attribute.id" :value="value" class="field_l" @change="onChangeInput" />
      <input v-else :id="attribute.id" :type="attribute.type" :name="attribute.id" class="field_l" :value="value" @input="$emit('input', $event.target.value)" />
    </span>
    <span v-else class="box_field">
      <input :id="attribute.id" :type="attribute.type" :name="attribute.id" class="field_l" @change="onUpload" />
    </span>
  </span>
</template>

<script>
export default {
  name: 'Input',
  props: {
    value: {
      type: String,
      default: '',
      required: false
    },
    attribute: {
      type: Object,
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
        },
        member: {
          create: {
            id: '',
            password: '',
            confirm: '',
            name: '',
            email: '',
            picture: {
              files: null,
              result: null
            }
          }
        },
        editor: {
          category: null,
          subject: null,
          content: null,
          thumbnail: null,
          picture: {
            files: null,
            result: null
          }
        },
        storage: null
      },
      value1: '',
      files: null,
      result: null
    }
  },
  created() {
    this.information.storage = this.attribute.value
    console.log('[Input.vue] → created() → this.information.storage: ', this.information.storage)
  },
  methods: {
    onChangeInput() {
      this.information.storage = event.target.value
      console.log('[Input.vue] → methods → onChangeInput → this.information.storage: ', this.information.storage)

      this.$emit('input', event.target.value)
    },
    onUpload(event) {
      if (window.FileReader) {
        // 이미지 파일만 통과합니다.
        if (!event.target.files[0].type.match(/image\//)) return

        // 읽기
        const reader = new FileReader()
        reader.readAsDataURL(event.target.files[0])

        this.files = event.target.files[0]
        // console.log('this.files: ', this.files)

        // 읽은 후
        reader.onload = (event) => {
          this.result = event.target.result
          // console.log('this.result: ', this.result)

          const formData = new FormData()
          formData.append('files', this.files)
          formData.append('result', this.result)

          this.$emit('parentChangePicture', formData)
        }
      } else {
      }
    }
  }
}
</script>
