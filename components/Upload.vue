<template>
  <div class="grp_upload">
    <label :for="attribute.id" class="lab_upload">
      <span :class="['ico_g', attribute.icon]">
        <slot name="text"></slot>
      </span>
    </label>

    <input :id="attribute.id" type="file" :name="attribute.id" class="field_upload" @change="onChangePicture" />
  </div>
</template>

<script>
export default {
  name: 'Upload',
  props: {
    attribute: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      files: null,
      result: null
    }
  },
  methods: {
    onChangePicture(event) {
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
