<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-gradient-primary" style="opacity: 1">
      <i class="pb-2 fas fa-book fa-2x text-white mr-3"></i>
      <router-link class="navbar-brand text-white" :to="{ name: 'home' }">
        <span class="thefont">
          <h1 class="mt-2">Bookworm</h1>
        </span>
      </router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
          <li class=" nav-item otherFont text-white" :class="{ active: $route.name == 'inventory' }" v-if="$auth.isAuthenticated">
            <router-link :to="{ name: 'inventory' }" class="text-white nav-link">Inventory</router-link>
          </li>
          <li class="pl-3 nav-item otherFont text-white" :class="{ active: $route.name == 'order' }" v-if="$auth.isAuthenticated">
            <router-link :to="{ name: 'order' }" class="text-white nav-link">
              My Order
            </router-link>
          </li>
                    <li class="pl-3 nav-item otherFont text-white" :class="{ active: $route.name == 'invoice' }" v-if="$auth.isAuthenticated">
            <router-link :to="{ name: 'invoice' }" class="text-white nav-link">
              Invoice
            </router-link>
          </li>
        </ul>
        <span class="navbar-text">
          <button class="btn btn-info otherFont" @click="searchForm = true" v-if="$auth.isAuthenticated">Search</button>
          <button class="btn btn-info otherFont" @click="login" v-if="!$auth.isAuthenticated">Login</button>
          <button class="btn btn-danger otherFont border border-white" @click="logout" v-else>logout</button>
        </span>
      </div>
    </nav>
    <div class="row bg-light otherFont" v-if="searchForm">
      <!-- v-if="searchForm" -->
      <div class="col-10 d-flex flex-column align-items-center mx-auto text-left py-2">
        <small class="pl-3">Search Database For Books To Order</small>
        <form class="form-inline d-flex" @submit.prevent="searchBooks">
          <div class="form-group align-items-center">
            <!-- TODO v-model -->

            <input v-model="searchApi" style="width: 50vw" type="text" name="search" id="search"
              class="ml-2 form-control" placeholder="search for book" aria-describedby="helpId" />
          </div>

          <button type="submit" class="mx-2 btn btn-outline-primary" @click="searchResults = true">
            <i class="fas fa-search"></i>
          </button>
          <button @click="searchForm = false; searchResults = false" type="button" class="btn btn-danger">
            <i class="fas fa-times"></i>
          </button>
        </form>
      </div>
    </div>

    <div id="results">
      <div v-if="searchResults" class="row results bg-light otherFont">
        <div class="col-10 mx-auto mb-2">
          <div class="row bg-gradient-primary border-bottom border-primary" id>
            <div class="col-3 pt-2 text-left text-white">
              <h5>ISBN</h5>
            </div>
            <div class="col-6 pt-2 text-left text-white">
              <h5>Title</h5>
            </div>
            <div class="col-3 pt-2 text-left text-white">
              <h5>Author(s)</h5>
            </div>

          </div>

          <!-- <router-link :to="{name: 'bookDetails', params: {bookId: book.id}}">
            {{ book.title }}
          </router-link>-->
          <div v-for="book in books" :key="book.id" :bookProp="book">
            <router-link v-if="book.price>0" :to="{name: 'bookDetails', params: {bookId: book.id}}">
              <div class="apiResults row border-bottom border-primary py-1 bg-info">
                <div class="col-3 pt-2 text-left ">
                  <h6 class="resultOverflow" data-toggle="tooltip" data-placement="top" :title="book.ISBN">{{book.ISBN}}</h6>
                </div>
                <div class="col-6 pt-2 text-left ">
                  <h6 class="resultOverflow" data-toggle="tooltip" data-placement="top" :title="book.title">{{book.title}}</h6>
                </div>
                <div class="col-3 pt-2 text-left " v-if="book.authors">
                  <h6 class="resultOverflow" data-toggle="tooltip" data-placement="top" :title="book.authors.toString()">{{book.authors.toString()}}</h6>
                </div>
                <div v-else class="col-3 pt-2 text-left ">
                  <h6 class="resultOverflow" data-toggle="tooltip" data-placement="top" title="No Author Listed">No Author Listed</h6>
                </div>

              </div>
            </router-link>
            <router-link v-else :to="{name: 'bookDetails', params: {bookId: book.id}}">
              <div class="apiResults row border-bottom border-primary py-1 bg-info text-warning">
                <div class="col-3 pt-2 text-left ">
                  <h6 class="resultOverflow" data-toggle="tooltip" data-placement="top" :title="book.ISBN">{{book.ISBN}}</h6>
                </div>
                <div class="col-6 pt-2 text-left ">
                  <h6 class="resultOverflow" data-toggle="tooltip" data-placement="top" :title="book.title">{{book.title}}</h6>
                </div>
                <div class="col-3 pt-2 text-left " v-if="book.authors">
                  <h6 class="resultOverflow" data-toggle="tooltip" data-placement="top" :title="book.authors.toString()">{{book.authors.toString()}}</h6>
                </div>
                <div v-else class="col-3 pt-2 text-left ">
                  <h6 class="resultOverflow" data-toggle="tooltip" data-placement="top" title="No Author Listed">No Author Listed</h6>
                </div>

              </div>
            </router-link>
          </div>

          <!-- <apiResults /> -->
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import apiResults from "../components/apiResults";
  const googleApi = axios.create({
    baseURL: "https://www.googleapis.com/books/v1/volumes?q=",
    timeout: 3000
  });
  import axios from "axios";

  let _api = axios.create({
    baseURL: "https://localhost:3000",
    withCredentials: true
  });
  export default {
    name: "Navbar",
    components: {
      apiResults
    },
    data() {
      return {
        searchForm: false,
        searchResults: false,
        searchApi: ""
      };
    },
    computed: {
      books() {
        return this.$store.state.searchResults;
      }
    },
    methods: {
      async login() {
        await this.$auth.loginWithPopup();
        this.$store.dispatch("setBearer", this.$auth.bearer);
        this.$store.dispatch("getProfile");
        console.log("this.$auth.user: ");
        console.log(this.$auth.user);
      },
      async logout() {
        await this.$auth.logout({ returnTo: window.location.origin });
      },
      async searchBooks() {
        this.results = [];
        this.$store.dispatch("searchBooks", this.searchApi);
        this.results = this.$store.state.searchResults;
        this.searchApi = "";
      }
    }
  };
</script>

<style scoped>
  .thefont {
    font-family: "Indie Flower", cursive;
  }
  .otherFont{
    font-family: "Ubuntu", sans-serif;
  }

  #results {
    max-height: 19vh;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .bookTitle{
    overflow-wrap: break-word;
    text-overflow: ellipsis;
  }

  .resultOverflow{
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>