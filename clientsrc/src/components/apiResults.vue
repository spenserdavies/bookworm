<template>
  <div class="apiResults row border-bottom border-primary py-1 bg-info" id="dummydata">
     <router-link :to="{name: 'bookDetails', params: {bookId: book.id}}">
    <div class="col-2 pt-2 text-left">
      <h6>result.isbn</h6>
    </div>
    <div class="col-4 pt-2 text-left">
      <h6>result.title</h6>
    </div>
    <div class="col-4 pt-2 text-left">
      <h6>result.author</h6>
    </div>
    <div class="col-1 pt-2 text-right">
      <h6>result.price</h6>
    </div>
    <div class="col-1 text-center">
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
        <i class="fas fa-truck"></i>
      </button>
    </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "apiResults",
  props: ["apiResults"],
  methods: {
      orderBook(){

      }
  }
};
</script>

<style scoped>
</style>