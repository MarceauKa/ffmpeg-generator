<template>
    <div class="relative" @blur="close">
        <input type="search"
               @focus="open"
               v-model="filter"
               class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

        <span class="absolute block bg-indigo-200 text-sm rounded px-2 py-0 truncate leading-relaxed"
              style="top: 7px; left: 7px; max-width: calc(100% - 20px);"
              @click="open"
              v-if="choice"
        >
            {{ choice }}
        </span>

        <div class="absolute w-full z-10 bg-white rounded shadow overflow-y-scroll"
             :class="{'visible': opened, 'hidden': !opened}"
             style="max-height: 300px; height: auto">
            <span class="inline-block w-full p-2 hover:bg-indigo-500 hover:text-white"
                  v-if="filter && !filtered">
                No results
            </span>

            <span v-for="(name, key) in filtered"
                  @click.stop="select(key)"
                  class="inline-block w-full p-2 hover:bg-indigo-500 hover:text-white"
                  :class="{'font-bold': isSelected(key)}"
            >
                {{ name }} ({{ key }})
            </span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            options: Object,
            selected: null,
            choice: null,
            filter: null,
            opened: false,
        }
    },

    updated() {
        if (this.$attrs.value) {
            this.selected = this.$attrs.value;
        }
    },

    methods: {
        select(key) {
            this.selected = key;
            this.$emit('input', this.selected);
            this.close();
        },

        open() {
            this.filter = null;
            this.opened = true;
        },

        close() {
            this.filter = null;
            this.opened = false;
        },

        isSelected(key) {
            return key === this.selected;
        }
    },

    watch: {
        selected: function (value) {
            if (value) {
                this.choice = this.options[value];
            }
        }
    },

    computed: {
        filtered() {
            if (this.filter) {
                let options = {};
                let regex = new RegExp(`${this.filter}+`, 'i');

                for (let index in this.options) {
                    let option = this.options[index];

                    if (regex.test(option) || regex.test(index)) {
                        options[index] = option;
                    }
                }

                return Object.entries(options).length > 0 ? options : false;
            }

            return this.options;
        }
    }
}
</script>