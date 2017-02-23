Vue.component('select2',{
  props:['options','value'],
  template:`<select ref="select">
              <slot></slot>
            </select>`,
  mounted() {
   var vm = this;
   $(this.$el)
     .val(this.value)
     // init select2
     .select2({ data: this.options })
     // emit event on change.
     .on('change', function () {
       vm.$emit('input', this.value)
     });
 },
 watch: {
   value(value) {
     // update value
     $(this.$el).val(value);
   },
   options(options) {
     // update options
     $(this.$el).select2({ data: options })
   }
 },
 destroyed() {
   $(this.$el).off().select2('destroy')
 }
});
