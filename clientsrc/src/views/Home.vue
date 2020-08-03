<template>
    <div class="home container-fluid px-0 mx-0">
        <main>
            <div class="row pt-5">
            </div>
            <div class="row mt-4">
                <div class="col-3  offset-8 pt-3 "> <!-- card bg-gradient-primary welcome-card-->
                    <p class="welcome-text text-white mb-0"><b>Welcome To Bookworm!</b></p>
                    <p class="text-white mb-2 mt-0 sub-title pointer" @click="login" v-if="!$auth.isAuthenticated">Please Login To Continue</p>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
export default {
    name: "Home",
    methods: {
        async login() {
        await this.$auth.loginWithPopup();
        this.$store.dispatch("setBearer", this.$auth.bearer);
        this.$store.dispatch("getProfile");
        console.log("this.$auth.user: ");
        console.log(this.$auth.user);
      },
    },
}
</script>
<style>
main{
    min-height: 92vh;
    
    overflow-x: hidden;
    background-image: linear-gradient(
        to bottom,
        rgba(212, 0, 255, 0.15),
        rgba(96, 0, 151, 0.15)
    );
}
.home{
    width: 100vw;
    overflow-y: hidden;
    background-image: url("../assets/book.jpeg");
    background-size: cover;
    background-position: center;
}
.pointer{
    cursor: pointer;
}
.sub-title{
    font-family: "Ubuntu", sans-serif;
}
.welcome-text{
    font-size: 5em;
    font-family: "Indie Flower", cursive;
}
</style>