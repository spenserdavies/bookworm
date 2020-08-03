<template>
  <div class="inventory container mb-4">
    <div class="row mt-5 mb-0">
      <div class="col-6 mx-auto bg-secondary text-primary">
        <h3 class="pt-1">Inventory</h3>
        <div class="row">
          <div class="col-8 mx-auto border-bottom border-dark"></div>
        </div>
      </div>
    </div>

    <div class="row mt-2">
      <div class="col-12 shadow">
        <div class="row bg-gradient-light py-2" v-if="invoiceForm">
          <div class="col mx-auto">
            <form class="form-inline" @submit.prevent="addToInvoice">
              <div class="form-group">
                <h4 class="mr-5 mt-2">{{this.bookToSell.title}}</h4>
                <input
                  min="0"
                  :max="this.bookToSell.quantity"
                  type="number"
                  name
                  id
                  class="form-control mx-2"
                  placeholder="Sell How Many?"
                  aria-describedby="helpId"
                  v-model.number="saleQuantity"
                />
              </div>
              <div class="row">
                <div class="col-12 mx-auto">
                  <button class="mx-2 btn btn-primary text-white" type="submit">Sell</button>
                  <button
                    class=" mx-2 btn btn-secondary"
                    type="button"
                    @click="saleQuantity = 0; invoiceForm = false"
                  >Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div class="row border-bottom border-dark bg-gradient-primary text-white">
          <div class="col-2 pt-2 text-left">
            <h5>ISBN</h5>
          </div>
          <div class="col-5 pt-2 text-left">
            <h5>Book Title</h5>
          </div>
          <div class="col-2 pt-2 text-center">
            <h5>Quantity</h5>
          </div>
          <div class="col-2 pt-2 text-center">
            <h5>Cost ($)</h5>
          </div>
          <div class="col-1 pt-2 text-left">
            <h5>Sell</h5>
          </div>
        </div>

        <div class="row books bg-info">
          <div class="col-12">
<div
          class="row border-bottom border-dark bg-light"
          v-for="book in booksInStock"
          :key="book.id"
          :bookProp="book"
        >
          <div class="col-12" >
            <div class="row" v-if="book.quantity > 0">
              <div class="col-2 pt-2 text-left border-right border-dark">
                <router-link :to="{name: 'bookDetails', params: {bookId: book.id}}">
                  <p class="resultOverflow"  data-toggle="tooltip" data-placement="top" :title="book.ISBN">{{book.ISBN}}</p>
                </router-link>
              </div>
              <div class="col-5 pt-2 border-right border-dark text-left">
                <router-link :to="{name: 'bookDetails', params: {bookId: book.id}}">
                  <p class="resultOverflow" data-toggle="tooltip" data-placement="top" :title="book.title">{{book.title}}</p>
                </router-link>
              </div>
              <div class="col-2 pt-2 text-right border-right border-dark">
                <router-link :to="{name: 'bookDetails', params: {bookId: book.id}}">
                  <p class="resultOverflow" data-toggle="tooltip" data-placement="top" :title="book.quantity">{{book.quantity}}</p>
                </router-link>
              </div>
              <div class="col-2 pt-2 text-right border-right border-dark">
                <router-link :to="{name: 'bookDetails', params: {bookId: book.id}}">
                  <p class="resultOverflow" data-toggle="tooltip" data-placement="top" :title="book.price.toFixed(2)">{{book.price.toFixed(2)}}</p>
                </router-link>
              </div>
              <div class="col-1 pt-2 text-center">
                <i
                  class="fas fa-shopping-cart text-primary pointer"  data-toggle="tooltip" data-placement="top" title="sell this book"
                  @click="invoiceForm = true; setToSale(book)"
                ></i>
              </div>
            </div>
          </div>
        </div>

          </div>
        </div>

        
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "inventory",
  data() {
    return {
      invoiceForm: false,
      bookToSell: {},
      saleQuantity: 0
    };
  },
  computed: {
    books() {
      return this.$store.state.books;
    },
    booksInStock(){
      return this.books.filter(b => b.quantity > 0);
    }
  },

  methods: {
    setToSale(book) {
      this.bookToSell = this.books.find(b => b.id == book.id);
      this.bookToSell.saleQuantity = 0;
      this.saleQuantity = 0;
    },

    addToInvoice() {
      let editedBook = { quantity: this.saleQuantity, book: this.bookToSell };

      if (this.bookToSell.quantity >= this.saleQuantity) {
        this.$store.dispatch("addToInvoice", editedBook);
      }
      this.saleQuantity = 0;
      this.invoiceForm = false;
      this.bookToSell = {};
      // this.$store.dispatch("getInvoiceQuantity")
      // this.$store.dispatch("getInvoiceCost")
    }
  },
  components: {},
  mounted() {
    this.$store.dispatch("getBooks");
  }
};
</script>


<style scoped>
*:not(.fas) {
  font-family: "Ubuntu", sans-serif;
}
.resultOverflow{
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

.books {
  max-height: 60vh;
  overflow-y: scroll;
  overflow-x: hidden;
}

.text-left {
  text-align: left;
}
.text-right {
  text-align: right;
}
.pointer{
  cursor: pointer;
}
</style>