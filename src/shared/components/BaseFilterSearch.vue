<template>
  <section>
    <q-btn-dropdown :label="label" class="dropdown-label"  icon-right="keyboard_arrow_down" menu-anchor="bottom left" menu-self="top left">
      <q-item class="base-filter search-only">
        <q-item-section>
          <div class="row">
            <div class="col-md-12 col-xs-12">
              <q-input class="filter-search" placeholder="Type here" borderless v-model="search">
                <template v-slot:prepend>
                  <q-icon v-if="search === ''" color="primary" name="search" />
                  <q-icon
                    v-else
                    name="search"
                    color="primary q-pl-md"
                    class="cursor-pointer text-primary"
                  />
                </template>
              </q-input>
            </div>
          </div>
        </q-item-section>
      </q-item>
    </q-btn-dropdown>
    <div class="badge-container">
      <q-badge
        color="blue"
        class="filter-badge for-search"
        label="1"
        v-if="withVal"
        transparent
      />
    </div>
  </section>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: "Select"
    },
    value: {
      type: String,
    }
  },
  data: () => ({
    search: "",
    withVal: false,
  }),
  watch: {
    search: function(val){
      this.withVal = val !== '' ? true : false;
      this.$emit("update:value", val);
    },
    value: function(val){
      if(val === ''){
        this.search = '';
        this.withVal = false;
        this.$emit("update:value", val);
      }
    }
  }
};
</script>