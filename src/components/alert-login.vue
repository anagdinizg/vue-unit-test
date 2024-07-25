<script>
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        type: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        isVisible: {
            type: Boolean,
            default: true,
        },
    },
    computed: {
        alertClass() {
            return `alert-${this.type}`;
        },
    },
});
</script>

<template>
    <div v-if="isVisible" class="alert" :class="alertClass">
        {{ message }}
    </div>
</template>

<style scoped>
.alert {
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
}

.alert-error {
    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
    color: #721c24;
}

.alert-success {
    background-color: #d4edda;
    border: 1px solid #c3e6cb;
    color: #155724;
}
</style>