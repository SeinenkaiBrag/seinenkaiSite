class Note{
    constructor(value){
      this.value = value
      this.speed = 5  

      switch(value){
        case 1:
          this.color = "#7ee0f9"
          this.radius = 50
          break;
        case 2:
          this.color = "#ff3300"
          this.radius = 50        
          break;
        case 3:
          this.color = "#7ee0f9"
          this.radius = 70
          break;
        case 4:
          this.color = "#ff3300"
          this.radius = 70        
          break;
      }

      this.posX = canvas.width + 70

      this.image = new Image()
      this.image.src = "./assets/taikocomb.png"
      this.imageInd = Math.floor(Math.random()*4)
    }
  
    draw(){
      c.beginPath();
      c.arc(this.posX, canvas.height/2, this.radius-5, 0, 2 * Math.PI);
      c.fillStyle = this.color;
      c.fill();
      c.drawImage(this.image, this.imageInd*this.image.height, 0, this.image.height, this.image.height, this.posX-this.radius, canvas.height/2-this.radius, this.radius*2, this.radius*2)

    }
  
    update(){
      this.posX -= this.speed
    }
  }