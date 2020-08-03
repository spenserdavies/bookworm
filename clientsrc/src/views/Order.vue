<template>
  <div class="order container">
    <div class="row mt-5 mb-0">
      <div class="col-6 mx-auto bg-secondary text-primary">
        <h3 class="pt-1">Order</h3>
        <div class="row">
          <div class="col-8 mx-auto border-bottom border-dark"></div>
        </div>
      </div>
    </div>
    <div class="row mt-4" v-if="quantity == 0">
          <div class="col-6 mx-auto">
            Search For Books Or View Their Details Page To Add Them To Your Order
          </div>
        </div>

    <div class="row mt-2">
      <div class="col-12 shadow">
        <div class="row bg-gradient-light py-2" v-if="removeItemForm">
          <div class="col mx-auto">
            <form class="form-inline" @submit.prevent="editOrderQuantity">
              <div class="form-group">
                <h4 class="mr-5 mt-2">{{this.bookToDelete.title}}</h4>
                <input
                  min="0"
                  :max="this.bookToDelete.orderQuantity"
                  type="number"
                  name
                  id
                  class="form-control mx-2"
                  placeholder="Remove How Many?"
                  aria-describedby="helpId"
                  v-model.number="removeQuantity"
                />
              </div>
              <div class="row">
                <div class="col-12 mx-auto">
                  <button class="mx-2 btn btn-primary" type="submit">Remove</button>
                  <button
                    class="mx-2 btn btn-secondary"
                    @click="removeQuantity = 0; removeItemForm = false"
                  >Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        

        <div class="row border-bottom border-dark bg-gradient-primary text-white" v-if="quantity >0">
          <div class="col-2 pt-2 text-left">
            <h5 class="resultOverflow">ISBN</h5>
          </div>
          <div class="col-4 pt-2 text-left">
            <h5 class="resultOverflow">Book Title</h5>
          </div>
          <div class="col-1 pt-2 text-center">
            <h5 class="resultOverflow">Qty</h5>
          </div>
          <div class="col-2 pt-2 text-center">
            <h5 class="resultOverflow">Cost ($)</h5>
          </div>
          <div class="col-2 pt-2 text-center">
            <h5 class="resultOverflow">Total ($)</h5>
          </div>
          <div class="col-1 ml-0 pl-0 pt-2">
            <h5 class="ml-0 text-left">Remove</h5>
          </div>
        </div>

        <div class="row orderContents">
          <div class="col-12">
            <div v-for="book in cart" :key="book.id" :bookProp="book">
              <div v-if="book.orderQuantity > 0" class="row border-bottom border-dark bg-light">
                <div class="col-2 border-right border-dark pt-2 text-left">
                  <router-link :to="{name: 'bookDetails', params: {bookId: book.id}}">
                    <p class="resultOverflow" v-if="book.ISBN" data-toggle="tooltip" data-placement="top" :title="book.ISBN">{{book.ISBN}}</p>
                    <p class="resultOverflow" v-else>ISBN Not Given</p>
                  </router-link>
                </div>
                <div class="col-4 border-right border-dark pt-2 text-left">
                  <router-link :to="{name: 'bookDetails', params: {bookId: book.id}}">
                    <p class="resultOverflow" v-if="book.title" data-toggle="tooltip" data-placement="top" :title="book.title">{{book.title}}</p>
                    <p class="resultOverflow" v-else>No Title Given</p>
                  </router-link>
                </div>
                <div class="col-1 border-right border-dark pt-2 text-right">
                  <router-link :to="{name: 'bookDetails', params: {bookId: book.id}}">
                    <p class="resultOverflow" v-if="book.orderQuantity" data-toggle="tooltip" data-placement="top" :title="book.orderQuantity">{{book.orderQuantity}}</p>
                    <p class="resultOverflow" v-else>N/A</p>
                  </router-link>
                </div>
                <div class="col-2 border-right border-dark pt-2 text-right">
                  <router-link :to="{name: 'bookDetails', params: {bookId: book.id}}">
                    <p class="resultOverflow" v-if="book.price" data-toggle="tooltip" data-placement="top" :title="'$ '+ book.price.toFixed(2)">{{book.price.toFixed(2)}}</p>
                    <p class="resultOverflow" v-else>No Price Given</p>
                  </router-link>
                </div>
                <div class="col-2 pt-2 border-right border-dark text-right">
                  <router-link :to="{name: 'bookDetails', params: {bookId: book.id}}">
                    <p class="resultOverflow" v-if="book.price"  data-toggle="tooltip" data-placement="top" :title="'$ '+ (book.price * book.orderQuantity).toFixed(2)">{{(book.price * book.orderQuantity).toFixed(2)}}</p>
                    <p class="resultOverflow text-center" v-else>-------</p>
                  </router-link>
                </div>
                <div class="col-1 pt-2 text-center">
                  <i
                    class="fas fa-trash-alt text-danger pointer"
                    @click="removeItemForm = true; setForRemove(book)"
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-4"  v-if="quantity > 0">
      <div class="offset-6 col-6">
        <div class="row border-bottom border-dark bg-gradient-primary text-white">
          <div class="col-6 mt-2 text-center">
            <h5 class="pl-5">Quantity</h5>
          </div>
          <div class="col-6 mt-2 text-center">
            <h5 class="pl-5">Cost ($)</h5>
          </div>
        </div>
      </div>
    </div>
    <div class="row"  v-if="quantity > 0">
      <div class="offset-3 col-9">
        <div class="row">
          <div class="col-4 pt-2 text-right">
            <h5>TOTAL</h5>
          </div>
          <div
            class="col-4 pt-2 bg-info text-right border-bottom border-right border-dark border-left"
          >
            <h5>{{this.quantity}}</h5>
          </div>
          <div class="col-4 pt-2 bg-info text-right border-bottom border-right border-dark">
            <h5>{{this.cost.toFixed(2)}}</h5>
          </div>
        </div>
      </div>
    </div>

    <button
      type="button"
       v-if="quantity > 0"
      class="mt-3 mb-3 btn btn-primary float-right text-white"
      data-toggle="modal"
      data-target="#confirmModal"
    >CONFIRM ORDER</button>
    <div class="modal" tabindex="-1" role="dialog" id="confirmModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirm Order</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Would you like to add these books to your inventory?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="confirmOrder">Submit Order</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "order",
  data() {
    return {
      removeItemForm: false,
      bookToDelete: {},
      removeQuantity: 0
    };
  },
  computed: {
    cart() {
      return this.$store.state.orderCart.books;
    },
    quantity() {
      return this.$store.state.orderCart.quantity;
    },
    cost() {
      return this.$store.state.orderCart.cost;
    },
    inventory() {
      return this.$store.state.books;
    }
  },
  mounted() {
    // this.$store.dispatch("getCart")
    this.$store.dispatch("getOrderQuantity");
    this.$store.dispatch("getOrderCost");
    this.$store.dispatch("getBooks");
  },
  methods: {
    editOrderQuantity() {
      let editedBook = {
        qty: this.removeQuantity,
        book: this.bookToDelete
      };
      if (this.bookToDelete.orderQuantity >= this.removeQuantity) {
        this.$store.dispatch("editOrderQuantity", editedBook);
      }
      this.$store.dispatch("getOrderQuantity");
      this.$store.dispatch("getOrderCost");
    },
    setForRemove(book) {
      this.bookToDelete = this.cart.find(b => b.id == book.id);
    },

    confirmOrder() {
      this.$store.dispatch("getBooks");
      this.cart.forEach(book => {
        let found = this.inventory.find(b => b.ISBN == book.ISBN);
        if (found) {
          found.quantity += book.orderQuantity;
          found.quantity.toFixed(0);
          found.orderQuantity = 0;
          book.orderQuantity = 0;
          this.$store.dispatch("updateInventoryQty", found);
        } else {
          this.$store.dispatch("addToInventory", book);
        }
      });
      this.$store.dispatch("clearOrder");
      $("#confirmModal").modal("hide");
      this.removeItemForm = false;
    }
  }
};
</script>
<style scoped>
*:not(.fas){
  font-family: 'Ubuntu', sans-serif;
}
.orderContents {
  max-height: 45vh;
  overflow-y: scroll;
  overflow-x: hidden;
}
.pointer {
  cursor: pointer;
}
  .resultOverflow{
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>