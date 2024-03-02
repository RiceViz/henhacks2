import Phaser from 'phaser'

import HelloWorldScene from './HelloWorldScene'

const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
		},
	},
	scene: [HelloWorldScene],
}

class Player {
    constructor(name) {
        this.name = name;
        this.hp = 100;
        this.selectedMove = null;
    }

    selectMove(move) {
        this.selectedMove = move;
        this.selectedSubAttack = null; // Reset selected sub-attack when a new move is chosen
    }

    selectSubAttack(subAttack) {
        this.selectedSubAttack = subAttack;
    }

    attack(opponent) {
        let damage = 0;
        if (this.selectedMove === "punch") {
            damage = this.calculatePunchDamage();
        } else if (this.selectedMove === "kick") {
            damage = this.calculateKickDamage();
        }
        opponent.receiveDamage(damage);
    }

    calculatePunchDamage() {
		// if straight
			// base dmg = 10
			// give user easy problem(s)
			// if x block                 <--- refers to enemy's decision
				// -0.25x effectiveness   <--- hurts attacker
			// if side block
				// 0.0x effectiveness
			// if medial block
				// 0.25x effectiveness
			// else               <--- for when both players attack each other (neither player blocks)
				// 1.0x effectiveness

		// if hook
			// base dmg = 15
			// give user medium problem(s)
			// if x block                 
				// 0.25x effectiveness   
			// if side block
				// -0.25x effectiveness
			// if medial block
				// 0.0x effectiveness
			// else             
				// 1.0x effectiveness 

		// if uppercut 
			// base dmg = 20
			// give user hard problem(s)
			// if x block                 
				// 0.25x effectiveness   
			// if side block
				// -0.25x effectiveness
			// if medial block
				// 0.0x effectiveness
			// else             
				// 1.0x effectiveness 
        return 0;
    }

    calculateKickDamage() {
        // if axe
		// if side
		// if roundhouse
        return 0;
    }

    receiveDamage(damage) {
        this.hp -= damage;
        if (this.hp < 0) {
            this.hp = 0;
        }
    }

    getHp() {
        return this.hp;
    }
}


export default new Phaser.Game(config)

class Game {
    constructor() {
        this.player1 = new Player("Player 1");
        this.player2 = new Player("Player 2");
    }
	generateQuestion(difficulty){
		if (difficulty === 'easy'){
			//randomly decide either subtraction or addition.
			//if subtraction:
				//generate random number (1-100)
				//generate second number that is (<= first number) and (>= 0).
				//user must fill in the blank. ex: firstNum=100, secNum=50. user sees "100 - 50 = ___"
		}
	}

    play() {
        while (this.player1.getHp() > 0 && this.player2.getHp() > 0) {
            console.log(this.player1.name + " HP: " + this.player1.getHp());
            console.log(this.player2.name + " HP: " + this.player2.getHp());
            this.player1.selectMove(prompt(this.player1.name + "'s turn: Select move (punch/kick/block): "));
            // After selecting move, ask for sub-attack
            this.player1.selectSubAttack(prompt("Select sub-attack (uppercut/hook/straight): "));

            this.player2.selectMove(prompt(this.player2.name + "'s turn: Select move (punch/kick/block): "));
            // After selecting move, ask for sub-attack
            this.player2.selectSubAttack(prompt("Select sub-attack (uppercut/hook/straight): "));

            this.player1.attack(this.player2);
            this.player2.attack(this.player1);
        }

        if (this.player1.getHp() === 0) {
            console.log(this.player2.name + " wins!");
        } else {
            console.log(this.player1.name + " wins!");
        }
    }
}

// Main
const game = new Game();
game.play();
