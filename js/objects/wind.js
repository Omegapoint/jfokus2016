define(
  function () {

    function Wind ( context ) {
      this.context = context;
      this.canvas = document.getElementById('canvas');
      this.windSpeed = Math.floor( Math.random() * 10 - 5 );
      if ( Math.floor( Math.random() * 3 ) === 1 ) {
        if ( this.windSpeed > 0 ) {
          this.windSpeed += Math.floor( Math.random() * 10 );
        } else {
          this.windSpeed -= Math.floor( Math.random() * 10 );
        }
      }
    }

    /**
     * create: Build out the Wind display
     */
    Wind.prototype.create = function () {
      this.scaleLength = 5;
      this.scaleHight = 5;
      this.scaleEdge = 2;
      if ( this.windSpeed !== 0 ) {
        this.windLine = this.windSpeed * this.scaleLength * ( this.canvas.width / 320 );
        this.context.strokeStyle = 'rgb( 173, 0, 0 )';
        this.context.beginPath();
        this.context.moveTo( this.canvas.width / this.scaleEdge, this.canvas.height - this.scaleHight );
        this.context.lineTo( this.canvas.width / this.scaleEdge + this.windLine, this.canvas.height - this.scaleHight );
        if ( this.windSpeed > 0 ) {
          this.arrowDir = -this.scaleEdge;
        } else {
          this.arrowDir = this.scaleEdge;
        }
        this.context.moveTo( this.canvas.width / this.scaleEdge + this.windLine, this.canvas.height - this.scaleHight );
        this.context.lineTo( this.canvas.width / this.scaleEdge + this.windLine + this.arrowDir, this.canvas.height - this.scaleHight - 2 );
        this.context.moveTo( this.canvas.width / this.scaleEdge + this.windLine, this.canvas.height - this.scaleHight );
        this.context.lineTo( this.canvas.width / this.scaleEdge + this.windLine + this.arrowDir, this.canvas.height - this.scaleHight + 2 );
        this.context.stroke();
      }
    };

    return Wind;
});
