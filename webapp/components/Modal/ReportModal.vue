<template>
  <ds-modal :title="title" :is-open="isOpen" @cancel="cancel">
    <transition name="ds-transition-fade">
      <ds-flex v-if="success" class="hc-modal-success" centered>
        <sweetalert-icon icon="success" />
      </ds-flex>
    </transition>

    <!-- eslint-disable-next-line vue/no-v-html -->
    <p v-html="message" />

    <template slot="footer">
      <ds-button class="cancel" icon="close" @click="cancel">{{ $t('report.cancel') }}</ds-button>

      <ds-button
        danger
        class="confirm"
        icon="exclamation-circle"
        :loading="loading"
        @click="confirm"
      >
        {{ $t('report.submit') }}
      </ds-button>
    </template>
  </ds-modal>
</template>

<script>
import gql from 'graphql-tag'
import { SweetalertIcon } from 'vue-sweetalert-icons'

export default {
  name: 'ReportModal',
  components: {
    SweetalertIcon,
  },
  props: {
    name: { type: String, default: '' },
    type: { type: String, required: true },
    id: { type: String, required: true },
  },
  data() {
    return {
      isOpen: true,
      success: false,
      loading: false,
    }
  },
  computed: {
    title() {
      return this.$t(`report.${this.type}.title`)
    },
    message() {
      const name = this.$filters.truncate(this.name, 30)
      return this.$t(`report.${this.type}.message`, { name })
    },
  },
  methods: {
    async cancel() {
      // TODO: Use the "modalData" structure introduced in "ConfirmModal" and refactor this here. Be aware that all the Jest tests have to be refactored as well !!!
      // await this.modalData.buttons.cancel.callback()
      this.isOpen = false
      setTimeout(() => {
        this.$emit('close')
      }, 1000)
    },
    async confirm() {
      this.loading = true
      try {
        // TODO: Use the "modalData" structure introduced in "ConfirmModal" and refactor this here. Be aware that all the Jest tests have to be refactored as well !!!
        // await this.modalData.buttons.confirm.callback()
        await this.$apollo.mutate({
          mutation: gql`
            mutation($id: ID!) {
              report(id: $id) {
                id
              }
            }
          `,
          variables: { id: this.id },
        })
        this.success = true
        this.$toast.success(this.$t('report.success'))
        setTimeout(() => {
          this.isOpen = false
          setTimeout(() => {
            this.success = false
            this.$emit('close')
          }, 500)
        }, 1500)
      } catch (err) {
        this.$emit('close')
        this.success = false
        switch (err.message) {
          case 'GraphQL error: User':
            this.$toast.error(this.$t('report.user.error'))
            break
          case 'GraphQL error: Post':
            this.$toast.error(this.$t('report.contribution.error'))
            break
          case 'GraphQL error: Comment':
            this.$toast.error(this.$t('report.comment.error'))
            break
        }
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style lang="scss">
.hc-modal-success {
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #fff;
  opacity: 1;
  z-index: $z-index-modal;
  border-radius: $border-radius-x-large;
}
</style>
