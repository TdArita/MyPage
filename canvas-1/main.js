
var eraserEnabled=false
eraser.onclick=function(){
    eraserEnabled=true
    actions.className='actions x'
}
painter.onclick=function () {
    eraserEnabled=false
    actions.className='actions'
}
var myCanvas=document.getElementById('canvasArea')
var context=myCanvas.getContext('2d')

autoSetCanvasSize(myCanvas)
listenToUser(myCanvas)
function autoSetCanvasSize(canvas){
    setCanvasSize()
    window.onresize=function(){
        setCanvasSize()
    }
    function setCanvasSize(){
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight
        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}

function drawLine(x1, y1, x2, y2){
    context.beginPath()
    context.strokeStyle='black'
    context.moveTo(x1,y1)
    context.lineWidth=5
    context.lineTo(x2,y2)
    context.stroke()
    context.closePath()
}

function listenToUser(canvas){
    var using=false
    var lastPoint={
        x:undefined,
        y:undefined
    }
    if(document.body.ontouchstart !== undefined){
        // 手机端
        canvas.ontouchstart=function(mouseM){
            console.log("touch")
            var x=mouseM.touches[0].clientX
            var y=mouseM.touches[0].clientY
            console.log(x,y)
            using=true
            if (eraserEnabled){
                context.clearRect(x-5, y-5, 10, 10)
            }else{
                lastPoint={
                    "x":x,
                    "y":y
                }
            }
        }
        canvas.ontouchmove=function(mouseM){
            console.log("move")
            var x=mouseM.touches[0].clientX
            var y=mouseM.touches[0].clientY
            if(!using){return}
            if(eraserEnabled){
                context.clearRect(x-5, y-5, 10, 10)
            }else{
                var newPoint={
                    "x":x,
                    "y":y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint=newPoint
            }
        }
        canvas.ontouchend=function(mouseM){
            console.log("end")
            using=false
        }
    }else{
        // 电脑端
        canvas.onmousedown=function(mouseM){
            var x=mouseM.clientX
            var y=mouseM.clientY
            using=true
            if (eraserEnabled){
                context.clearRect(x-5, y-5, 10, 10)
            }else{
                lastPoint={
                    "x":x,
                    "y":y
                }
            }
        }
        canvas.onmousemove=function(mouseM){
            var x=mouseM.clientX
            var y=mouseM.clientY
            if(!using){return}
            if(eraserEnabled){
                context.clearRect(x-5, y-5, 10, 10)
            }else{
                var newPoint={
                    "x":x,
                    "y":y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint=newPoint
            }
        }
        canvas.onmouseup=function(mouseM){
            using=false
        }
    }
}