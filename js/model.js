class MontaPerguntas{
    constructor(question,guesses,arrays,foward,back,box,scoreView){
        this.counter = 0;
        this.buttons;
        this.answer;
        this.score =0;
        
        this.path = guesses;
        this.$question = document.querySelector(question);
        this.$back = document.querySelector(back);
        this.$foward = document.querySelector(foward);
        this.box = document.querySelector(box);
        this.$score = document.querySelector(scoreView);
        this.$body = document.querySelector("body");

        this._questions = arrays;
        this.createHTML(this._questions[0].pergunta,this._questions[0].escolhas);
        this.foward();
        this.back();

    }

    set newQuestion(question){
        this.$question.innerHTML = question;
    } 

    get lastIndexOfArray(){
        return this._questions.length-1;
    }

    limpaQuestoes(){
        this.box.innerHTML = "";
    }

    back(){
        
        this.$back.addEventListener("click", () =>{
            if(this.counter <=0) return
            this.counter -= 1;
            this.limpaQuestoes();
            this.createHTML(this._questions[this.counter].pergunta,this._questions[this.counter].escolhas);
        });
    }

    foward(){
           
            this.$foward.addEventListener("click", () =>{
                this.counter++;
                
                if(this.areThoseMatches(this.answer,this.getAnswerOfArray())) {
                    this.score += 20
                    this.scoreDisplay();
                }
                
                
                if(!this.areThoseMatches(this.answer,this.getAnswerOfArray())){
                    const botoes = this.pegaBotoes();
                    const resposta = [...botoes].filter(resposta => resposta.innerHTML === this._questions                                 

                    [this.counter].escolhas[this._questions[this.counter].respostaCorreta]);

                    this.filterElement([...botoes])[0].className = "btn btn-danger";
                    resposta[0].className = "btn btn-success";

                    
    
                    
                }
                
                
                setTimeout(()=>{
                   
                    this.limpaQuestoes();
                    this.createHTML(this._questions[this.counter].pergunta,this._questions[this.counter].escolhas);
                },1200)

                

               
            
                
            });
        
        
        
    }

    scoreDisplay(){
        this.$score.innerHTML = this.score;
    }

    getAnswerOfArray(){
        return this._questions[this.counter].escolhas[this._questions[this.counter].respostaCorreta];
    }

    areThoseMatches(guess,answers){
        return guess === answers
    }

    pegaBotoes(){
        return document.querySelectorAll(this.path);
    }

    set setAnswer(value){
        this.answer = value;
    }

    addEvents(){  // this functions makes the buttons work like a input type radio //
       
        this.buttons = this.pegaBotoes();

        [...this.buttons].forEach((element,index,array) =>{
            element.addEventListener("click",(e) =>{

                const elemento = this.filterElement(array);

                e.target.className = "btn btn-success";
                this.setAnswer = e.target.innerHTML;

                if(elemento[0] !== undefined )  elemento[0].className = "btn btn-primary"
            });
        });
    }

    filterElement(arr){
        return arr.filter(element => element.className === "btn btn-success")
    }

    getAnswerOfUser(){
        return  this.answer;
        
    }
    get question(){
        return this.$question.innerHTML;
    }

    get questions(){
        return this._questions;
    }

    



    createHTML(titulo,botoes){
        this.newQuestion = `<h2>${titulo}</h2>`;
        botoes.forEach(e => {this.box.innerHTML += ` <a href="#" class="btn btn-primary">${e}</a>`});
        this.addEvents();
      
    }

}