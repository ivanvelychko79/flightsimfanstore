<template>
<v-card>
    <v-footer dark color="#67A2AB">
        <v-col class="text-center posText" cols="12">
            {{ new Date().getFullYear() }} — <strong>By Velychko Design Studio</strong>
        </v-col>
    </v-footer>
</v-card>
</template>



<style scoped>
@import url('https://fonts.googleapis.com/css?family=Jura:300,400,500,600,700&display=swap&subset=cyrillic,cyrillic-ext');    
    footer{
        font-family: 'Jura', sans-serif;
        font-weight: 300;
        text-align: center;
        bottom: 0;
        width: 100%;
        height: 23px;
        position: fixed;
        font-size: 15px;
    }
    .posText{
        margin-top: -18px;
    }
</style>
