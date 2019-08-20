<template>
    <div id="display">
        <v-container fluid>
            <v-row dense>
                <v-col :cols="4" v-for="product in products" :key="product.id">
                <v-card flat class="product" @click="showProduct(product.id)">
                    <v-img  aspect-ratio="1"
                    :src="product.images[0].url"
                    ></v-img>
                    <v-card-title class="pa-0 title font-weight-regular">{{ product.name }}</v-card-title>
                    <div class="d-flex justify-space-between">
                    <div class="pa-0 font-weight-light subtitle-1">¥ {{ product.price }}</div>
                    <div>
                        <v-icon :size="16" color="red" v-if="product.likes_count">favorite</v-icon>
                        <span class="ml-1">{{ product.likes_count }}</span>
                    </div>
                    </div>
                </v-card>
                </v-col>
            </v-row>
        </v-container>
        
    </div>
</template>

<script>
export default {
    name: 'display',
    props: ['products'],
    methods:{
        showProduct(id){
            this.$router.push({ path: `/product/${id}`})
        },
    }
}
</script>
