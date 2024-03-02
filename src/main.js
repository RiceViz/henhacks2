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
        this.selectedSubAttack = null;
        this.isDefending = false;
    }

    selectMove(move) {
        this.selectedMove = move;
    }

    selectSubAttack(subAttack) {
        this.selectedSubAttack = subAttack;
    }

    defend() {
        this.isDefending = true;
    }

    attack(opponent) {
        if (!this.isDefending) {
            let damage = 0;
            if (this.selectedMove === "punch") {
                damage = this.calculatePunchDamage(opponent);
            } else if (this.selectedMove === "kick") {
                damage = this.calculateKickDamage(opponent);
            }
            opponent.receiveDamage(damage);
        }
    }

    calculatePunchDamage(opponent) {
        let baseDamage = 0;
        if (this.selectedSubAttack === "straight") {
            baseDamage = 10;
            // Implement sub-attack logic and effectiveness calculation
        } else if (this.selectedSubAttack === "hook") {
            baseDamage = 15;
            // Implement sub-attack logic and effectiveness calculation
        } else if (this.selectedSubAttack === "uppercut") {
            baseDamage = 20;
            // Implement sub-attack logic and effectiveness calculation
        }
        return baseDamage;
    }

    calculateKickDamage(opponent) {
        let baseDamage = 0;
        if (this.selectedSubAttack === "axe") {
            // Implement sub-attack logic and effectiveness calculation
        } else if (this.selectedSubAttack === "side") {
            // Implement sub-attack logic and effectiveness calculation
        } else if (this.selectedSubAttack === "roundhouse") {
            // Implement sub-attack logic and effectiveness calculation
        }
        return baseDamage;
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

class Game {
    constructor() {
        this.player1 = new Player("Player 1");
        this.player2 = new Player("Player 2");
    }

    play() {
        while (this.player1.getHp() > 0 && this.player2.getHp() > 0) {
            console.log(this.player1.name + " HP: " + this.player1.getHp());
            console.log(this.player2.name + " HP: " + this.player2.getHp());

            // Player 1 attacks, Player 2 defends
            this.player1.selectMove(prompt(this.player1.name + "'s turn: Select move (punch/kick/block): "));
            this.player1.selectSubAttack(prompt(this.player1.name + "'s turn: Select sub-attack: "));
            this.player2.defend();
            this.player1.attack(this.player2);

            console.log(this.player1.name + " HP: " + this.player1.getHp());
            console.log(this.player2.name + " HP: " + this.player2.getHp());

            // Player 2 attacks, Player 1 defends
            this.player2.selectMove(prompt(this.player2.name + "'s turn: Select move (punch/kick/block): "));
            this.player2.selectSubAttack(prompt(this.player2.name + "'s turn: Select sub-attack: "));
            this.player1.defend();
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
