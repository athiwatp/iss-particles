new Vue({
    el: '#vue-app',
    data: {
        position: '',
        peopleCount: '',
        animations: ['bounce', 'flash', 'pulse', 'rubberBand', 'shake', 'swing', 'tada', 'wobble', 'jello'],
        animationClass: ''
    },
    created() {
        var _this = this
        this.initializeParticles();
        _this.getPeopleCount();
        _this.getLocation();
        setInterval(function () {
            _this.getLocation();
        }, 2000)
    },
    methods: {
        initializeParticles() {
            Particles.init({
                selector: '.background',
                connectParticles: true,
                color: '#0d98ba',
                maxParticles: 150
            });
        },
        getLocation() {
            const _this = this;
            axios.get('http://api.open-notify.org/iss-now.json').then(response => {
                const position = response.data.iss_position;
                const randAnimation = _this.animations[Math.floor(Math.random() * _this.animations.length)];
                _this.position = `${position.latitude}, ${position.longitude}`;
                _this.animationClass = randAnimation;
                console.log(randAnimation)
                console.log(position)
            }).catch(error => {
                console.log(error);
            })
        },
        getPeopleCount() {
            const _this = this;
            axios.get('http://api.open-notify.org/astros.json').then(response => {
                _this.peopleCount = response.data.number;
            }).catch(error => {
                console.log(error);
            })
        }
    }
})