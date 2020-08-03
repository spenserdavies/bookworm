<template>
  <div class="invoice container">
    <div class="row mt-5 mb-0">
      <div class="col-6 mx-auto bg-secondary text-primary">
        <h3 class="pt-1">Invoice</h3>
        <div class="row">
          <div class="col-8 mx-auto border-bottom border-dark">

          </div>
        </div>
      </div>
    </div>

    <div class="row mt-4" v-if="quantity == 0">
          <div class="col-6 mx-auto">
            You Can Add Books To Your Invoice From The Inventory Page
          </div>
        </div>

    <div class="row mt-2">
      <div class="col-12 shadow">
        <div class="row bg-gradient-light py-2" v-if="removeItemForm">
          <div class="col mx-auto">
            <form class="form-inline" @submit.prevent="editSaleQuantity">
              <div class="form-group">
                <h4 class="mr-5 mt-2">{{this.bookToDelete.title}}</h4>
                <input min="0" :max="this.bookToDelete.saleQuantity" type="number" class="form-control mx-2" placeholder="Remove How Many?" v-model.number="removeQuantity">
              </div>
              <div class="row">
                <div class="col-12 mx-auto">
                  
                  <button class="btn btn-primary text-white mx-2" type="submit">Remove</button>
                  <button class="btn btn-secondary mx-2" type="button" @click="removeItemForm = false">Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        
        <div class="row border-bottom border-dark bg-gradient-primary text-white" v-if="quantity > 0">
          <div class="col-2 pt-2 text-left">
            <h5>ISBN</h5>
          </div>
          <div class="col-4 pt-2 text-left">
            <h5>Book Title</h5>
          </div>
          <div class="col-1 pt-2 text-left">
            <h5>Qty</h5>
          </div>
          <div class="col-2 pt-2 text-center">
            <h5>Cost ($)</h5>
          </div>
          <div class="col-2 pt-2 text-center">
            <h5>Total ($)</h5>
          </div>
          <div class="col-1 pt-2 pl-0">
            <h5 class="text-center">Remove</h5>
          </div>
        </div>

        <div class="row invoiceContents">
          <div class="col-12">
            <div v-for="book in invoice" :key="book.id" :bookProp="book">
              <div class="row border-bottom border-dark bg-light" v-if="book.saleQuantity > 0"> <!--  -->
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
                    <p class="resultOverflow" v-if="book.saleQuantity" data-toggle="tooltip" data-placement="top" :title="book.saleQuantity">{{book.saleQuantity}}</p>
                    <p class="resultOverflow" v-else>N/A</p>
                     </router-link>
                  </div>
                  <div class="col-2 border-right border-dark pt-2 text-right">
                     <router-link :to="{name: 'bookDetails', params: {bookId: book.id}}">
                    <p class="resultOverflow" v-if="book.price" data-toggle="tooltip" data-placement="top" :title="'$ '+book.price.toFixed(2)">{{book.price.toFixed(2)}}</p>
                    <p class="resultOverflow" v-else>No Price Given</p>
                     </router-link>
                  </div>
                  <div class="col-2 pt-2 border-right border-dark text-right">
                     <router-link :to="{name: 'bookDetails', params: {bookId: book.id}}">
                    <p class="resultOverflow" v-if="book.price" data-toggle="tooltip" data-placement="top" :title="'$ '+(book.price * book.saleQuantity).toFixed(2)">{{(book.price * book.saleQuantity).toFixed(2)}}</p>
                    <p class="resultOverflow text-center" v-else >-------</p>
                     </router-link>
                  </div>
                  <div class="col-1 pt-2 text-center">
                    <i class="fas fa-trash-alt text-danger pointer" @click="removeItemForm= true; setForRemove(book)"></i>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-4" v-if="quantity > 0">
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
    <div class="row" v-if="quantity > 0">
      <div class="offset-3 col-9 ">
        <div class="row">

        <div class="col-4 pt-2 text-right">
          <h5>TOTAL</h5>
        </div>
        <div class="col-4 pt-2 bg-info text-right border-bottom border-right border-dark border-left">
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
      class="mt-3 mb-3 btn btn-primary text-white float-right mr-0"
      data-toggle="modal"
      data-target="#confirmModal"
          >CONFIRM SALE
    </button>

    <div class="modal" tabindex="-1" role="dialog" id="confirmModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirm Sale</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Would You Like To Confirm This Sale?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="confirmSale">Confirm Sale</button>
            <!-- Make the submimt button close the modal too -->
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  name: "invoice",
  data(){
    return {
      removeItemForm: false,
      bookToDelete: {},
      removeQuantity: 0
    };
  },
  computed: {
    invoice(){
      return this.$store.state.invoice.books
    },
    quantity(){
      return this.$store.state.invoice.quantity
    },
    cost(){
      return this.$store.state.invoice.cost;
    },
    inventory(){
      return this.$store.state.books
    }
  },
  mounted(){
    this.$store.dispatch("getSaleQuantity")
    this.$store.dispatch("getSaleCost")
    this.$store.dispatch("getBooks")
  },
  methods: {

    editSaleQuantity(){
      let editedBook = {
        quantity: this.removeQuantity,
        book: this.bookToDelete
      };
      if(this.bookToDelete.saleQuantity >= this.removeQuantity){
        editedBook.book.saleQuantity -= this.removeQuantity
        this.$store.dispatch("updateInventoryQty", editedBook.book)
      }
      this.$store.dispatch("getSaleQuantity")
      this.$store.dispatch("getSaleCost")
      this.bookToDelete={};
      this.removeItemForm = false;
    },
    setForRemove(book){
      this.bookToDelete = this.invoice.find(b => b.id == book.id);
    },
    confirmSale(){
      this.$store.dispatch("getBooks");
      this.invoice.forEach(book => {
        let found = this.inventory.find(b => b.ISBN == book.ISBN);
        if(found){
          found.quantity -= book.saleQuantity
          found.quantity.toFixed(0);
          found.saleQuantity = 0;
          book.saleQuantity = 0;
          this.$store.dispatch("updateInventoryQty", found)
        }
      });
      this.$store.dispatch("clearSale");
      $("#confirmModal").modal("hide");
      this.removeItemForm = false;
    }
  }

}
</script>
<style scoped>
*:not(.fas){
  font-family: 'Ubuntu', sans-serif;
}
.invoiceContents {
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