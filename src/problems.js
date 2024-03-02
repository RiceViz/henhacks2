let globalNum1, globalNum2;
export default class problems{
    constructor(){
        
    }
    addAndSubtract() {
        const choose=Math.floor(Math.random() * 2);
        globalNum1=Math.floor(Math.random() * 51);
        globalNum2=Math.floor(Math.random() * 51);
        if(choose==1){
            const answer= prompt("What is "+globalNum1+"+"+globalNum2)
            const correct=globalNum1+globalNum2
            if(parseInt(answer)==correct){
                alert("Correct!");
            }
            else {
                alert("Incorrect! The correct answer is " + correct);
            }

        }
        else{
            const answer= prompt("What is "+globalNum1+"-"+globalNum2)
            const correct=globalNum1-globalNum2
            if(parseInt(answer)==correct){
                alert("Correct!");
            }
            else {
                alert("Incorrect! The correct answer is " + correct);
            }
        }
        return  globalNum1
      }
    
}

export { globalNum1, globalNum2 };