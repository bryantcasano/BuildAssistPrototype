<template>
  <section>
    <div class="col-lg-auto col-md-3 col-sm-3 col-xs-6 q-py-xs">
      <q-btn
          v-model="field"
          color="white"
          text-color="black"
          @click.prevent="close = !close"
          square
          style="font: 14px Myriad Pro Regular; text-transform: initial;"
      >
          {{ label }}: {{ value }}
          <q-icon name="keyboard_arrow_down" style="color: #41474E; font-size: 20px; font-weight: bold;"/>
      </q-btn>
      <q-menu class="q-pa-sm filter-box" v-if="close" v-click-outside="hide">
          <q-input
              v-model="inputFilter"
              debounce="500"
              outlined
              dense
              square
              @input="update()"
              class="q-mb-sm"
              autofocus
              v-if="label == 'Claim Number'"
              maxlength="20"
          >
            <template v-slot:append>
              <q-icon name="close" @click="update(2)" class="cursor-pointer" />
            </template>
          </q-input>
          <q-input
              v-model="inputFilter"
              debounce="500"
              outlined
              dense
              square
              @input="update()"
              class="q-mb-sm"
              autofocus
              v-if="label == 'Client Ref'"
              maxlength="20"
          >
            <template v-slot:append>
              <q-icon name="close" @click="update(2)" class="cursor-pointer" />
            </template>
          </q-input>
          <q-input
              v-model="inputFilter"
              debounce="500"
              outlined
              dense
              square
              @input="update()"
              class="q-mb-sm"
              autofocus
              v-if="label == 'Claimant'"
              maxlength="50"
          >
            <template v-slot:append>
              <q-icon name="close" @click="update(2)" class="cursor-pointer" />
            </template>
          </q-input>
          <q-input
              v-model="inputFilter"
              debounce="500"
              outlined
              dense
              square
              @input="update()"
              class="q-mb-sm"
              autofocus
              v-if="label == 'Address'"
              maxlength="140"
          >
            <template v-slot:append>
              <q-icon name="close" @click="update(2)" class="cursor-pointer" />
            </template>
          </q-input>
          <q-input
              v-model="inputFilter"
              debounce="500"
              outlined
              dense
              square
              @input="update()"
              class="q-mb-sm"
              autofocus
              v-if="label == 'Suburb'"
              maxlength="50"
          >
            <template v-slot:append>
              <q-icon name="close" @click="update(2)" class="cursor-pointer" />
            </template>
          </q-input>
          <q-input
              v-model="inputFilter"
              debounce="500"
              outlined
              dense
              square
              @input="update()"
              class="q-mb-sm"
              autofocus
              v-if="label == 'Contact Name'"
              maxlength="50"
          >
            <template v-slot:append>
              <q-icon name="close" @click="update(2)" class="cursor-pointer" />
            </template>
          </q-input>
          <q-input
              v-model="inputFilter"
              debounce="500"
              outlined
              dense
              square
              @input="update()"
              class="q-mb-sm"
              autofocus
              v-if="label == 'Contact Address'"
              maxlength="140"
          >
            <template v-slot:append>
              <q-icon name="close" @click="update(2)" class="cursor-pointer" />
            </template>
          </q-input>
          <q-input
              v-model="inputFilter"
              debounce="500"
              outlined
              dense
              square
              @input="update()"
              class="q-mb-sm"
              autofocus
              v-if="label == 'Contact Suburb'"
              maxlength="50"
          >
            <template v-slot:append>
              <q-icon name="close" @click="update(2)" class="cursor-pointer" />
            </template>
          </q-input>
          
          <q-input
              v-model="inputFilter"
              debounce="500"
              outlined
              dense
              square
              @input="update()"
              class="q-mb-sm"
              autofocus
              v-if="label == 'User'"
              maxlength="50"
          >
            <template v-slot:append>
              <q-icon name="close" @click="update(2)" class="cursor-pointer" />
            </template>
          </q-input>          
          <q-input 
              v-model="inputDate" 
              outlined 
              square 
              dense 
              @input="update()"
              class="q-mb-sm"
              readonly
              v-if="label == 'Start Date'"
              mask="date"
          >
              <template v-slot:append>
                  <q-icon name="close" @click="update(2)" class="cursor-pointer" />
                  <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                          <q-date v-model="inputDate" @input="() => $refs.qDateProxy.hide()" />
                      </q-popup-proxy>
                  </q-icon>
              </template>
          </q-input>
          <q-input 
              v-model="inputDate" 
              outlined 
              square 
              dense 
              @input="update()"
              class="q-mb-sm"
              readonly
              v-if="label == 'End Date'"
              mask="date"
          >
              <template v-slot:append>
                  <q-icon name="close" @click="update(2)" class="cursor-pointer" />
                  <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                          <q-date v-model="inputDate" @input="() => $refs.qDateProxy.hide()" />
                      </q-popup-proxy>
                  </q-icon>
              </template>
          </q-input>

          <q-btn label="Update" @click="update(1)" dense class="q-mr-sm update-filter" style="width: 40%;" />
          <q-btn color="white" text-color="black" label="Close" @click="close = !close" dense style="width: 40%;" />
      </q-menu>
    </div>
  </section>
</template>
<script>
import clickOutside from 'vue-click-outside'
export default {
  props: {
    label: {
      type: String,
      default: "Select"
    },
    options: {
      type: Array,
      required: true
    },
    value: {
      type: String,
      default: ""
    },
    valueKey: {
      type: String
    },
    labelKey: {
      type: String,
      default: "name"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    selectedSorting: {
      type: Boolean,
      default: true
    }
  },
  components: {
    clickOutside
  },
  data () {
    return {
      inputFilter: '',
      inputDate: '',
      field: true,
      close: false
    }
  },
  methods: {
    update(val) {
      if(val == 1) { 
        this.close = false 
        if(this.inputFilter !== ''){
          this.$emit('update:value', '"'+this.inputFilter+'"')
        }else{
          this.$emit('update:value', this.inputDate)
        }
      }else if(val == 2){
        this.inputFilter = ''
        this.inputDate = ''
        if(this.label === 'User'){
          this.$emit('update:value', 'All')
        }else{
          this.$emit('update:value', 'YYYY/MM/DD')
        }
      }else {
        if(this.inputFilter === '') {
            this.$emit('update:value', 'All')
        }else {
          if(this.inputFilter.length > 10){
            this.$emit('update:value', '"'+this.inputFilter.substring(0, 10)+'..."')
          }else{
            this.$emit('update:value', '"'+this.inputFilter+'"')
          }
        }
      }
    },
    hide() {
      this.close = false
    }
  },
  directives: {
    clickOutside
  }
}
</script>
<style>
.filter-box {
    position: fixed !important; 
    border-radius: 4px; 
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 
            0 2px 2px rgba(0, 0, 0, 0.14), 
            0 3px 1px -2px rgba(0, 0, 0, 0.12); 
    z-index: 6000;
    background-color: #fff; 
    width: 200px;
}
.q-menu {
  padding: 10px;
}
.q-btn__wrapper::before {
  box-shadow: none;
}
</style>