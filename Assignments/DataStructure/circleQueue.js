class CircleQueue{
    constructor(arraySize){
        this.data = Array(arraySize);
        this.head = 0;
        this.rear = 0;
        }
  
    //add data to queue
    enqueue(data){
        if(!this.isFull()){
            this.data[this.rear] = data;
            if(this.rear === this.data.length-1){
                this.rear = 0;
            }else{
                this.rear ++;
            }
        }
    }
    
    //delete data from queue
    dequeue(){
        if(!this.isEmpty()){
            this.data.splice(this.head, 1, undefined);
                if(this.head === this.data.length-1){
                    this.head = 0;
                }else{
                    this.head ++;
                }
            }
    }
    
    //find out if queue is full
    isFull(){
        let isFull = true;
        for(let i=0; i<this.data.length; i++){
            if(typeof this.data[i] === "undefined"){
                isFull = false;
            }
        }
        return isFull;
    }

    //find out if queue is empty
    isEmpty(){
        let isEmpty = true;
        for(let i=0; i<this.data.length; i++){
                if(typeof this.data[i] !== "undefined"){
                    isEmpty = false;
                }
            }
        return isEmpty;
    }
}

let circle = new CircleQueue(3);
circle.enqueue(1);
console.log("enqueue: "+ circle.data);
circle.enqueue(1);
console.log("enqueue: "+ circle.data);
circle.enqueue(1);
console.log("enqueue: "+ circle.data);
circle.enqueue(1);
console.log("enqueue fail: "+ circle.data);
circle.dequeue();
console.log("dequeue: "+circle.data);
circle.dequeue();
console.log("dequeue: "+circle.data);
circle.enqueue(1);
console.log("enqueue again: "+ circle.data);
console.log(circle.isFull());
console.log(circle.isEmpty());