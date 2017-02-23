<template>
    <div>
        <div class="md-modal md-effect-2" :class="localStorage.loadingModal.isOpen" id="modal-2">
            <div class="md-content" v-if="!localStorage.loadingModal.message">
                <h3>Please wait while we get you the best results</h3>
                <div class="progress">
                    <div class="progress-bar progress-bar-primary progress-bar-striped active" role="progressbar"
                         aria-valuenow="95"
                         aria-valuemin="0" aria-valuemax="100" style="width: 95%;">
                        <span class="sr-only">95% Complete</span>
                    </div>
                </div>
            </div>
            <div class="md-content" v-else-if="localStorage.loadingModal.message">
                <h3>{{localStorage.loadingModal.message}}</h3>
                <div class="progress">
                    <div class="progress-bar progress-bar-primary progress-bar-striped active" role="progressbar"
                         aria-valuenow="95"
                         aria-valuemin="0" aria-valuemax="100" style="width: 95%;">
                        <span class="sr-only">95% Complete</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="md-overlay"></div>
    </div>
</template>
<script>
    export default{
        created(){
            console.log(this.localStorage.loadingModal);
        }
    }
</script>
