let start;
      const hero = {
        left: 575,
        top: 700,
      };

      let enemies = [
        { left: 200, top: 100 },
        { left: 300, top: 100 },
        { left: 400, top: 100 },
        { left: 500, top: 100 },
        { left: 600, top: 100 },
        { left: 700, top: 100 },
        { left: 800, top: 100 },
        { left: 900, top: 100 },
        { left: 200, top: 175 },
        { left: 300, top: 175 },
        { left: 400, top: 175 },
        { left: 500, top: 175 },
        { left: 600, top: 175 },
        { left: 700, top: 175 },
        { left: 800, top: 175 },
        { left: 900, top: 175 },
      ];

      let missiles = [];

      function moveMissiles() {
        for (let missile = 0; missile < missiles.length; missile++) {
          missiles[missile].top -= 20;
        }
      }

      function drawMissiles() {
        document.querySelector("#missiles").innerHTML = "";
        for (let missile = 0; missile < missiles.length; missile++) {
          document.querySelector(
            "#missiles"
          ).innerHTML += `<div class="missile" style="left:${
            missiles[missile].left + 20
          }px ; top:${missiles[missile].top - 30}px;"></div>`;
        }
      }

      document.onkeydown = function moveHero(event) {
        const left = 37;
        const right = 39;
        const fire = 32;

        if (event.keyCode === left && hero.left >= 20) {
          hero.left -= 10;
          document.querySelector("#hero").style.left = hero.left;
        }
        if (event.keyCode === right && hero.left <= 1130) {
          hero.left += 10;
          document.querySelector("#hero").style.left = hero.left;
        }

        if (event.keyCode === fire) {
          missile = { left: hero.left, top: hero.top };
          missiles.push(missile);
          console.log(missiles);
          drawMissiles();
        }

        if (event.keyCode === 13) {
          reload();
        }
      };
      function moveEnemies() {
        for (let enemy = 0; enemy < enemies.length; enemy++) {
          enemies[enemy].top += 3;
        }
      }
      function drawEnemies() {
        document.querySelector("#enemies").innerHTML = "";
        enemies.forEach((pos) => {
          document.querySelector(
            "#enemies"
          ).innerHTML += `<div class="enemy" style="left:${pos.left}; top:${pos.top};"></div>`;
        });
      }
      drawEnemies();
      function loseCondition() {
        for (let enemy = 0; enemy < enemies.length; enemy++) {
          if (enemies[enemy].top >= 700) {
            clearTimeout(start);
            document.querySelector(
              "#background"
            ).innerHTML = `<div class="result"><h2>You Lose!</h2>
          <button onclick="reload()" id="#restart"><h1>Restart?</h1></button>
            </div>`;
            break;
          }
        }
      }

      function collisionDetection() {
        for (let enemy = 0; enemy < enemies.length; enemy++) {
          for (let missile = 0; missile < missiles.length; missile++) {
            if (
              missiles[missile].top <= enemies[enemy].top + 70 &&
              missiles[missile].top >= enemies[enemy].top &&
              missiles[missile].left >= enemies[enemy].left - 25 &&
              missiles[missile].left <= enemies[enemy].left + 25
            ) {
              missiles.splice(missile, 1);
              enemies.splice(enemy, 1);
            }
          }
        }
      }

      function reload() {
        location.reload();
      }
      function winCondition(event) {
        if (enemies.length === 0) {
          clearTimeout(start);
          document.querySelector(
            "#background"
          ).innerHTML = `<div class="result"><h1>You Win!</h1>
          <button onclick="reload()" id="#restart"><h1>Restart?</h1></button>
            </div>`;
        }
      }

      function startGame() {
        start = setTimeout(startGame, 100);
        moveMissiles();
        drawMissiles();
        moveEnemies();
        drawEnemies();
        collisionDetection();

        loseCondition();
        winCondition();
      }

      startGame();