<template>
  <section v-if="children" class="step" data-step-title="Child(ren)">
     <div class="row" v-for="child of children">
       <div class="col-lg-6">
         <div class="form-group clearfix">
           <label class="col-lg-2 control-label " for="userName2">title </label>
           <div class="col-lg-10">
             <input class="regTitle" :id="child.title" placeholder="Title" allow_clear="true">
           </div>
         </div>
         <div class="form-group clearfix">
           <label class="col-lg-2 control-label ">Last Name</label>
           <div class="col-lg-10">
             <input :id="child.lastName" type="text" class="form-control">
           </div>
         </div>
       </div>
       <div class="col-lg-6">
         <div class="form-group clearfix">
           <label class="col-lg-2 control-label">First Name</label>
           <div class="col-lg-10">
             <input :id="child.firstName" type="text" class="form-control">
           </div>
         </div>

         <div class="form-group clearfix">
           <label class="col-lg-2 control-label ">Gender</label>
           <div class="col-lg-10">
             <input :id="child.gender" type="text" class="form-control regSex">
           </div>
         </div>
       </div>
     </div>

</template>
<script>
export default{
  props:['children']
}
</script>
