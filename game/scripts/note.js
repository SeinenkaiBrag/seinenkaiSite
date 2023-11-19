class Note{
    constructor(value){
      this.value = value
      this.speed = 5
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
          this.dia = 150
          break;
        case 4:
          this.color = "red"
          this.dia = 150        
          break;
      }
      this.posX = canvas.width
    }
  
    draw(){
      c.fillStyle = this.color;
      c.fillRect(this.posX, (canvas.height-this.dia)/2, this.dia, this.dia)  
      c.strokeRect(this.posX, (canvas.height-this.dia)/2, this.dia, this.dia)  
    }
  
    update(){
      this.posX -= this.speed
    }
  }