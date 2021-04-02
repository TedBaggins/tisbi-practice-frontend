<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <router-link class="navbar-brand navbar-logo" :to="{name: 'home'}">Практика</router-link>
            <div class="collapse navbar-collapse navbar-list-box" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'home'}" active-class="active" exact>Студенты</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'faculties'}" active-class="active" exact>Факультеты</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: 'TpTopmenu'
    }
</script>

<style>
    .navbar-logo {
        padding-top: 0;
    }
    .navbar-list-box {
        padding-left: 20px;
    }
</style>