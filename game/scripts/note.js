class Note{
    constructor(value){
      this.value = value
      this.speed = 7
      switch(value){
        case 1:
          this.color = "blue"
          this.dia = 100
          break;
        case 2:
          this.color = "red"
          this.dia = 100        
          break;
        case 3:
          this.color = "blue"
          this.dia = 140
          break;
        case 4:
          this.color = "red"
          this.dia = 140        
          break;
      }
      this.posX = canvas.width + this.dia/2
    }
  
    draw(){
      c.fillStyle = this.color;
      c.fillRect(this.posX-this.dia/2, (canvas.height-this.dia)/2, this.dia, this.dia)  
      c.strokeRect(this.posX-this.dia/2, (canvas.height-this.dia)/2, this.dia, this.dia)  
    }
  
    update(){
      this.posX -= this.speed
    }
  }