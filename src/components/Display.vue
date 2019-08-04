<template>
    <div id="display">
        <p>Display</p>
        <el-row :gutter="20">
            <el-col :span="6" v-for="item in items" :key="item.id">
                <el-card :body-style="{ padding: '0px' }" @click.native="showProduct(item.id)">
                <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
                <div style="padding: 14px;">
                    <span>{{ item.name }}</span>
                    <div class="bottom clearfix">
                    <p>{{ item.description }}</p>
                    <p>{{ item.price }}</p>
                    </div>
                </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'display',
    props: ['items'],
    methods:{
        showProduct(id){
            this.$router.push({ path: `/product/${id}`})
        },
    }
}
</script>
