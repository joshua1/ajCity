<template>
    <input type="text" :placeholder="placeholder" :value="value" @input="onInput">
</template>

<script>
    import Flatpickr from 'flatpickr';
    export default {
        props: {
            placeholder: {
                type: String,
                default: ''
            },
            options: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            value: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                fp: null
            }
        },
        computed: {
            fpOptions () {
                return JSON.stringify(this.options)
            }
        },
        watch: {
            fpOptions (newOpt) {
                const option = JSON.parse(newOpt)
                for (let o in option) {
                    this.fp.set(o, option[o])
                }
            }
        },
        mounted () {
            const self = this
            const origOnValUpdate = this.options.onValueUpdate
            this.fp = new Flatpickr(this.$el, Object.assign(this.options, {
                onValueUpdate () {
                    self.onInput(self.$el.value)
                    if (typeof origOnValUpdate === 'function') {
                        origOnValUpdate()
                    }
                }
            }))
            this.$emit('FlatpickrRef', this.fp)
        },
        destroyed () {
            this.fp.destroy();
            this.fp = null
        },
        methods: {
            onInput (e) {
                typeof e === 'string' ? this.$emit('input', e) : this.$emit('input', e.target.value)
            }
        }
    }
</script>
