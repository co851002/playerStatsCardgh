var apiURL = "data/player-stats.json";

var playerCard = new Vue({

    el: '#app',
    data: {
        character: null,
        characters: [],
        statistic: null,
        statistics: [],
        show: true,
        badges: 'assets/badges_sprite.png',
        profileImg: 'assets/p{{character.player.id}}.png'
    },
    computed: {
        getProfileImg: function() {
            // `this` points to the vm instance
            return 'assets/p' + this.character.player.id + '.png'
        },
        getGoals: function() {
            // `this` points to the vm instance
            return this.character.stats[0].value
        },
        getAppearances: function() {
            return this.character.stats[6].value
        },
        getAssists: function() {
            return this.character.stats[5].value
        },
        getGPM: function() {
            return ((this.character.stats[0].value) / (this.character.stats[6].value)).toFixed(2)
        },
        getPPM: function() {
            return (
                (
                    (this.character.stats[4].value) + (this.character.stats[8].value)
                ) / (this.character.stats[8].value)
            ).toFixed(2);
        }
    },
    ready: function() {
        // When the application loads, we want to call the method that initializes some data
        this.fetchData();
    },
    methods: {
        fetchData: function() {
            this.$http({
                url: apiURL,
                method: 'GET'
            }).then(function(response, i) {
                this.$set('characters', response.data.players);
                this.$set('statistics', response.data.stats);
                console.log("Sucess");
                //console.log("Characters: " + response.data.players);
                //console.log("Statistics: " + response.data.players);
            }, function(response) {
                console.log("Error fetchData");
            });
        },

    }
});
