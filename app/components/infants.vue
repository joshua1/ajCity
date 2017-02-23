<template>
  <section v-if="infants" class="step" data-step-title="Infant(s)">
   <div class="row" v-for="infant of infants">
     <div class="col-lg-6">
       <div class="form-group clearfix">
         <label class="col-lg-2 control-label " for="userName2">title </label>
         <div class="col-lg-10">
           <input class="regTitle" :id="infant.title" placeholder="Title" allow_clear="true">
         </div>
       </div>
       <div class="form-group clearfix">
         <label class="col-lg-2 control-label ">Last Name</label>
         <div class="col-lg-10">
           <input :id="infant.lastName" type="text" class="form-control">
         </div>
       </div>
     </div>
     <div class="col-lg-6">
       <div class="form-group clearfix">
         <label class="col-lg-2 control-label">First Name</label>
         <div class="col-lg-10">
           <input :id="infant.firstName" type="text" class="form-control">
         </div>
       </div>

       <div class="form-group clearfix">
         <label class="col-lg-2 control-label ">Gender</label>
         <div class="col-lg-10">
           <input :id="infant.gender" type="text" class="form-control regSex">
         </div>
       </div>
     </div>
   </div>

 </section>
</template>
<script>
export default{
  props:['infants']
}
</script>
