<template>
    <div id="sell">
        <h1>商品編集</h1>
        <el-form label-position="right" label-width="100px" :model="product">
            <el-form-item label="商品名">
                <el-input v-model="product.name"></el-input>
            </el-form-item>
            <el-form-item label="商品説明">
                <el-input v-model="product.description"></el-input>
            </el-form-item>
            <el-form-item label="カテゴリー">
                <el-select v-model="product.category" placeholder="please select category">
                    <el-option v-for="category in categoris"
                                :key="category" :label="category" :value="category">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="カテゴリー">
                <el-select v-model="product.state" placeholder="please select state">
                    <el-option v-for="state in states"
                                :key="state.value" :label="state.label" :value="state.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="価格">
                <el-input v-model="product.price"></el-input>
            </el-form-item>
        </el-form>
        <el-button type="primary" plain @click="sell">出品</el-button>
    </div>
</template>

<script>
export default {
    name: 'sell',
    data(){
        return{
            product: {
                name: '',
                description: '',
                price: '',
                state: '',
                category: '',
            },
            categoris: ['general', 'humanity', 'science'],
            states: [
                {value: 'new', label: '新品、未使用'},
                {value: 'almost_new', label: '目立った傷や汚れなし'},
                {value: 'almost_old', label: 'やや傷れや汚れあり'},
                {value: 'old', label: '全体的に状態が悪い'}
            ]
        }
    },
    methods: {
        sell(){
            console.log('sell')
        }
    }
}
</script>