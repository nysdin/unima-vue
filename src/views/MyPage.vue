<template>
    <div id="mypage">
        <p>{{ this.name }}</p>
        <p>{{ this.email }}</p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'mypage',
    computed: {
        ...mapGetters('user', ['name', 'email'])
    }
}
</script>
