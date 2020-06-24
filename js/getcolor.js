var eventHub = new Vue();

var app = new Vue({
    el: '#main',
    data: {
        colorEname: 'DarkColor',
        colorName: '墨色',
        colorHex: '#50616d',
        colorRgb: '80, 97, 109'
    },
    mounted() {
        eventHub.$on('change1', (val) => {
            this.colorRgb = val.rgb;
            this.colorName = val.name;
            this.colorHex = val.hex;
            this.colorEname = val.eName;
            document.body.style.backgroundColor = val.hex;
        })
    }
})

var vm = new Vue({
    el: '.menu',
    data: {
        colors: [],
    },
    methods: {
        change: function (hex, name, eName, rgb) {
            var color = {
                hex: hex,
                name: name,
                eName: eName,
                rgb: rgb
            }
            eventHub.$emit('change1', color);
        },
        getColor: async function () {
            var colors = await axios.get('http://www.warrior.cool:2902/color');
            this.colors = colors.data;
        }
    },
    mounted() {
        this.getColor();
    },
    // mouseleave: function (e) {
    //     e.target.style.animationName = 'a_small';
    // },
    // mouseenter: function (e) {
    //     e.target.style.animationName = 'a_big';
    // },
})
