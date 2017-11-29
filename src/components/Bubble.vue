<template>
    <div id="bubble">
        <canvas></canvas>
    </div>
</template>

<script>
export default {
    name: 'bubble',
    data: () => ({}),
    mounted() {
        this.bubble()
    },
    methods: {
        bubble() {
            // -----------
            // Definitions
            // -----------
            var canvas = document.querySelector('canvas')
            canvas.width = 840
            canvas.height = 840
            var context = canvas.getContext('2d')
            var currentFrame = 0
            var circles = []
            var circleCount = 10
            // ---------
            // LIFECYCLE
            // ---------
            function update() {
                // ------------
                // Update state
                // ------------
                currentFrame++

                _projection.refZ = 400
                _projection.fLength = 102

                for (var i = 0; i < circles.length; i++) {
                    _projection.doProjection(circles[i].shape)
                    _projection.rotateY(circles[i].shape, circles[i].rotationX)
                    _projection.rotateX(circles[i].shape, circles[i].rotationY)
                }
                // ------
                // Render
                // ------
                render()
            }
            // ------
            // Render
            // ------
            function render() {
                // -----
                // Clear
                // -----
                context.clearRect(0, 0, canvas.width, canvas.height)
                // -----------------
                // Background circle
                // -----------------
                context.beginPath();
                context.fillStyle = 'rgba(0,0,0, 1)'
                context.lineWidth = 5
                context.fill()
                // ----------------
                // Particle circles
                // ----------------
                for (var i = 0; i < circles.length; i++) {
                    circles[i].render()
                }
                // ----
                // Loop
                // ----
                requestAnimationFrame(update)
            }
            // ---------------
            // Start Animation
            // ---------------
            requestAnimationFrame(update)
            // -------------
            // 3D Projection
            // -------------
            var Basic3DProjection = function() {

                this.projCenterX = 0
                this.projCenterY = 0
                this.fLength = 400
                this.refZ = 400

                this.getScaleFromZ = function(z) {
                    if (this.fLength + z == 0) {
                        return 0.001
                    } else {
                        return this.refZ / (this.fLength + z)
                    }
                }
                this.doProjection = function(_object) {

                    var x = _object.posX * this.getScaleFromZ(_object.posZ) + this.projCenterX
                    var y = _object.posY * this.getScaleFromZ(_object.posZ) + this.projCenterY
                    var y0z0 = this.getScaleFromZ(0)

                    _object.screenX = x
                    _object.screenY = y - y0z0;
                    _object.scale = this.getScaleFromZ(_object.posZ)
                    _object.pastViewPoint = _object.posZ > this.refZ

                }

                this.rotateY = function(object, ang) {
                    var _cos = Math.cos(ang)
                    var _sin = Math.sin(ang)

                    var tz = object.posZ * _cos - object.posX * _sin
                    var tx = object.posZ * _sin + object.posX * _cos
                    object.posX = tx
                    object.posZ = tz
                    this.doProjection(object)
                }

                this.rotateX = function(object, ang) {
                    var _cos = Math.cos(ang)
                    var _sin = Math.sin(ang)

                    var ty = object.posY * _cos - object.posZ * _sin;
                    var tz = object.posY * _sin + object.posZ * _cos;
                    object.posY = ty
                    object.posZ = tz
                    this.doProjection(object)
                }

                this.rotateZ = function(object, ang) {
                    var _cos = Math.cos(ang)
                    var _sin = Math.sin(ang)

                    var object = objects[i];
                    var tx = object.posX * _cos - object.posY * _sin
                    var ty = object.posX * _sin + object.posY * _cos
                    object.posX = tx
                    object.posY = ty
                    this.doProjection(object)
                }

            }

            var _projection = new Basic3DProjection()
            _projection.projCenterX = canvas.width / 2
            _projection.projCenterY = canvas.height / 2
            // --------
            // 3D Shape
            // --------
            var Basic3DObject = function(x, y, z, size) {

                this.posX = x
                this.posY = y
                this.posZ = z
                this.dispSize = size

                this.screenX = 0
                this.screenY = 0

                this.scale = 1
                this.pastViewPoint = false

            }

            function createCircle() {
                this.shape = new Basic3DObject(0, 0, 68, 0)
                this.rotationX
                this.rotationY
                this.size

                this.render = function() {
                    context.beginPath()
                    context.strokeStyle = 'rgba(182,182,182, ' + (this.shape.posZ * -1) / 60 + ')'
                    context.fillStyle = 'rgba(182,182,182, ' + (this.shape.posZ * -1) / 60 + ')'
                    context.lineWidth = 2 * this.size
                    context.arc(
                        this.shape.screenX,
                        this.shape.screenY,
                        this.size * this.shape.scale,
                        0,
                        Math.PI * 2,
                        false
                    );
                    if (this.fillOrStroke === 'fill') {
                        context.fill()
                    } else {
                        context.stroke()
                    }
                }
            }

            for (var i = 0; i < circleCount; i++) {
                var tempCircle = new createCircle()

                if (Math.random() < 0.5) {
                    tempCircle.rotationX = Math.random() / 100
                } else {
                    tempCircle.rotationX = (Math.random() / 100) * -1
                }

                if (Math.random() < 0.5) {
                    tempCircle.fillOrStroke = 'fill'
                } else {
                    tempCircle.fillOrStroke = 'stroke'
                }

                if (Math.random() < 0.5) {
                    tempCircle.rotationY = Math.random() / 100
                } else {
                    tempCircle.rotationY = Math.random() / 100 * -1
                }

                tempCircle.size = Math.random() * 2

                circles.push(tempCircle)
            }
        }
    }
}
</script>

<style scoped>
canvas {
    width: 420px;
    height: 420px;
    background: transparent;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 1000;
}
</style>
