<template>
    <div id="app">
        <TpTopmenu/>
        <router-view />
    </div>
</template>

<script>
    import TpTopmenu from '@/components/Topmenu';
    export default {
        name: 'App',
        components: {
            TpTopmenu
        }
    }
</script>

<style>
    html, body {
        height: 100%;
        background: #181a1d;
        color: #dbdbdb;
    }
    .content-box {
        padding-top: 20px;
    }
    .form-group {
        padding: 0 10px;
    }
    .form-box {
        border: 1px solid #4b5258;
    }
    .form-title-box {
        font-size: 18px;
        font-weight: bold;
        padding: 10px 0;
    }
    .form-btn-box {
        background: #3e444a;
        padding: 10px 10px;
    }
    .btn-delete {
        background: #b7524b;
        color: #dbdbdb;
    }
</style>


