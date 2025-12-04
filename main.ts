namespace SpriteKind {
    export const PlayerShot = SpriteKind.create()
    export const LifeBar = SpriteKind.create()
    export const sprite = SpriteKind.create()
    export const Enemy_NPC = SpriteKind.create()
    export const NPC = SpriteKind.create()
}
function moveSpriteInTime (sprite2: Sprite, x: number, y: number, t: number) {
    globalX = x
    globalY = y
    dx = x - sprite2.x
    dy = y - sprite2.y
    sprite2.setVelocity(dx / t, dy / t)
}
function spell_flower () {
    projectile_sprite.setImage(assets.image`boss_bullet_2`)
    shoot_bullet_from_sprite(boss, projectile_sprite.image, 270 / MAX, 0 + offset)
    shoot_bullet_from_sprite(boss, projectile_sprite.image, 270 / MAX, 0 - offset)
    shoot_bullet_from_sprite(boss, projectile_sprite.image, 270 / MAX, 90 + offset)
    shoot_bullet_from_sprite(boss, projectile_sprite.image, 270 / MAX, 90 - offset)
    shoot_bullet_from_sprite(boss, projectile_sprite.image, 270 / MAX, 180 + offset)
    shoot_bullet_from_sprite(boss, projectile_sprite.image, 270 / MAX, 180 - offset)
    shoot_bullet_from_sprite(boss, projectile_sprite.image, 270 / MAX, 270 + offset)
    shoot_bullet_from_sprite(boss, projectile_sprite.image, 270 / MAX, 270 - offset)
    offset += 9
    projectile_sprite.setImage(assets.image`boss_bullet`)
}
function spell_star () {
    star_sprites = [
    assets.image`star_bullet_1`,
    assets.image`star_bullet_2`,
    assets.image`star_bullet_3`,
    assets.image`star_bullet_4`
    ]
    bullet_spin = true
    for (let index = 0; index <= 4; index++) {
        projectile_sprite.setImage(star_sprites[index - 1])
        shoot_bullet_from_sprite(boss, projectile_sprite.image, 60, 90 * (index + 1) - offset)
    }
    angle_offset = 0.05
    offset += 16
    projectile_sprite.setImage(assets.image`boss_bullet`)
}
function spell_scarlet_gensokyo () {
    projectile_sprite.setImage(assets.image`boss_bullet_4`)
    while (index22 <= MAX) {
        shoot_bullet_from_sprite(boss, projectile_sprite.image, 60, 360 / MAX * index22 + offset)
        shoot_bullet_from_sprite(boss, projectile_sprite.image, 100, 360 / MAX * (index22 + 0.5) + offset)
        index22 += 1
    }
    projectile_sprite.setImage(assets.image`boss_bullet`)
}
function moveSpriteRandom (sprite32: Sprite, yLowerBound: number, outerBound: number, v: number) {
    moveSprite(sprite32, randint(outerBound, scene.screenWidth() - outerBound), randint(outerBound, yLowerBound), v)
}
function spell_star_corridor () {
    projectile_sprite.setImage(assets.image`star_bullet_2`)
    scatter = 10
    shoot_bullet_from_sprite(boss, projectile_sprite.image, 60, 80 + offset)
    shoot_bullet_from_sprite(boss, projectile_sprite.image, 60, 100 + offset)
    offset += randint(-5, 5)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite4, otherSprite2) {
    if (!(iframe) && !(debug_mode)) {
        info.changeLifeBy(-1)
        scene.cameraShake(3, 200)
        music.playTone(139, music.beat(BeatFraction.Eighth))
        otherSprite2.destroy()
        iframe = true
        for (let index = 0; index < 5; index++) {
            if (small_hitbox) {
                player_sprite.setImage(assets.image`Player_Iframe`)
                pause(50)
                player_sprite.setImage(assets.image`Player`)
                pause(50)
            } else {
                hitbox.setImage(assets.image`Player_Iframe`)
                pause(50)
                hitbox.setImage(assets.image`Player`)
                pause(50)
            }
        }
        iframe = false
    }
})
function shoot_bullet_from_sprite (source_sprite: Sprite, projectile_image: Image, speed: number, angle: number) {
    projectile = sprites.createProjectileFromSprite(assets.image`star_bullet_3`, source_sprite, speed * Math.cos(angle / 57.3), speed * Math.sin(angle / 57.3))
    projectile.setFlag(SpriteFlag.AutoDestroy, true)
    if (source_sprite.kind() == SpriteKind.Player) {
        projectile.setKind(SpriteKind.PlayerShot)
        projectile.setImage(assets.image`player_bullet`)
    } else {
        projectile.setImage(projectile_image)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.NPC, function (sprite3, otherSprite) {
    if (otherSprite == npc1 && !(talked)) {
        game.showLongText("Hola", DialogLayout.Bottom)
        game.showLongText("Como estas", DialogLayout.Bottom)
        game.showLongText("Adios", DialogLayout.Bottom)
        game.showLongText("...", DialogLayout.Bottom)
        talked = true
    }
    timer.after(2000, function () {
        talked = false
    })
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (started) {
        shoot_bullet_from_sprite(hitbox, hitbox.image, 200, -90)
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (started) {
        hitbox.setImage(assets.image`player_hitbox`)
        hitbox.z = 1
        small_hitbox = true
        player_sprite = sprites.create(assets.image`Player`, SpriteKind.sprite)
        controller.moveSprite(hitbox, 50, 50)
    }
})
function set_NPC_location (NPC2: Sprite, location: tiles.Location) {
    tiles.placeOnTile(NPC2, location)
    if (NPC2.kind() == SpriteKind.Enemy_NPC) {
        NPC2.sayText("!")
    } else if (NPC2.kind() == SpriteKind.NPC) {
        NPC2.sayText(":)")
    }
}
function spell_bullet_mirror () {
    warp_around = true
    projectile_sprite.setImage(assets.image`snowflake`)
    for (let index32 = 0; index32 <= 2; index32++) {
        shoot_bullet_from_sprite(boss, projectile_sprite.image, 60, offset + index32 * 30)
    }
    offset += 48
}
function start_game () {
    lifeBar.setFlag(SpriteFlag.Invisible, true)
    boss.setPosition(-16, -16)
    bossCanMove = false
    ready = false
    started = false
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
    tiles.placeOnTile(hitbox, player_location)
    hitbox.setImage(assets.image`Player`)
    scene.cameraFollowSprite(hitbox)
    controller.moveSprite(hitbox)
    tiles.setCurrentTilemap(tilemap`map1`)
    enemy1 = sprites.create(assets.image`enemy1`, SpriteKind.Enemy_NPC)
    enemy2 = sprites.create(assets.image`enemy2`, SpriteKind.Enemy_NPC)
    npc1 = sprites.create(assets.image`npc1`, SpriteKind.NPC)
    set_NPC_location(enemy1, tiles.getTileLocation(3, 3))
    set_NPC_location(enemy2, tiles.getTileLocation(12, 3))
    set_NPC_location(npc1, tiles.getTileLocation(3, 8))
}
function start_battle (enemy: Sprite) {
    lifeBar.setFlag(SpriteFlag.Invisible, false)
    boss_life = 48
    player_location = hitbox.tilemapLocation()
    life_bar_progress = 0
    boss_progress = 0
    if (enemy == enemy1) {
        boss_num = 1
        scene.setBackgroundImage(assets.image`forest`)
        boss.setImage(assets.image`enemy1`)
    } else if (enemy == enemy2) {
        boss_num = 2
        scene.setBackgroundImage(assets.image`moon`)
        boss.setImage(assets.image`enemy2`)
    }
    tiles.placeOnTile(boss, tiles.getTileLocation(0, 0))
    scene.centerCameraAt(0, 0)
    tiles.setCurrentTilemap(tilemap`level2`)
    hitbox.setPosition(75, 100)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy_NPC)
    sprites.destroyAllSpritesOfKind(SpriteKind.NPC)
    preSetBossPosition(80, 30)
}
// <-- CORRECCIÓN CLAVE
// La función set_projectile_speed y el timer ya no son necesarios
// ya que la velocidad se establece en el momento del disparo.
// timer.after(300, on_after)
function init () {
    iframe = false
    small_hitbox = false
    hitbox = sprites.create(assets.image`invisible`, SpriteKind.Player)
    boss_life = 48
    boss = sprites.create(assets.image`invisible`, SpriteKind.Enemy)
    lifebar_pic = image.create(96, 5)
    lifeBar = sprites.create(lifebar_pic, SpriteKind.LifeBar)
    offset = 0
    MAX = 10
    bossCanMove = true
    hitbox.setPosition(80, 105)
    hitbox.setFlag(SpriteFlag.StayInScreen, true)
    lifeBar.setPosition(80, 5)
    lifeBar.setFlag(SpriteFlag.Ghost, true)
    warp_around = false
    global_speed = 0
    angle2 = 0
    bullet_spin = false
    talked = false
    boss_num = 0
    player_location = tiles.getTileLocation(0, 0)
}
function framedMenu () {
    myMenu = miniMenu.createMenu(
    miniMenu.createMenuItem("Debug"),
    miniMenu.createMenuItem("Fácil"),
    miniMenu.createMenuItem("Normal"),
    miniMenu.createMenuItem("Difícil"),
    miniMenu.createMenuItem("Imposible")
    )
    myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Width, 65)
    myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Height, 100)
    myMenu.setStyleProperty(miniMenu.StyleKind.DefaultAndSelected, miniMenu.StyleProperty.Border, miniMenu.createBorderBox(
    4,
    0,
    0,
    0
    ))
    myMenu.setStyleProperty(miniMenu.StyleKind.DefaultAndSelected, miniMenu.StyleProperty.Margin, miniMenu.createBorderBox(
    0,
    0,
    0,
    2
    ))
    myMenu.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.BorderColor, 11)
    myMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.BorderColor, 4)
    myMenu.setStyleProperty(miniMenu.StyleKind.DefaultAndSelected, miniMenu.StyleProperty.Background, 12)
    myMenu.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Foreground, 11)
    myMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Foreground, 4)
    myMenu.top = 28
    myMenu.right = 160
    myMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
        myMenu.close()
        info.setScore(0)
        set_difficulty(selectedIndex)
        start_game()
    })
}
function preSetBossPosition (x2: number, y2: number) {
    started = false
    ready = false
    offset = 0
    moveSpriteInTime(boss, x2, y2, 1)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy_NPC, function (sprite6, otherSprite4) {
    start_battle(otherSprite4)
})
function enemy_shoot_aiming_player (sprite5: Sprite, projectile_image2: Image, speed22: number, spread: number) {
    shoot_bullet_from_sprite(sprite5, projectile_image2, speed22, Math.atan2(hitbox.y - sprite5.y, hitbox.x - sprite5.x) * 57.3 + randint(0 - spread, spread))
}
function spell_aim_trail () {
    for (let index = 0; index < 11; index++) {
        enemy_shoot_aiming_player(boss, projectile_sprite.image, randint(20, 75), 10)
    }
    projectile_sprite.setImage(assets.image`boss_bullet_3`)
    enemy_shoot_aiming_player(boss, projectile_sprite.image, 90, 5)
    projectile_sprite.setImage(assets.image`boss_bullet`)
}
function moveSpriteRandomFixedTime (sprite52: Sprite, yLowerBound2: number, outerBound2: number, u: number) {
    moveSpriteInTime(sprite52, randint(outerBound2, scene.screenWidth() - outerBound2), randint(outerBound2, yLowerBound2), u)
}
function moveSprite (sprite62: Sprite, x3: number, y3: number, w: number) {
    globalX = x3
    globalY = y3
    dx = x3 - sprite62.x
    dy = y3 - sprite62.y
    speed32 = Math.sqrt(dx * dx + dy * dy)
    if (speed32 != 0) {
        sprite62.setVelocity(dx / speed32 * w, dy / speed32 * w)
    }
}
controller.B.onEvent(ControllerButtonEvent.Released, function () {
    if (started) {
        controller.moveSprite(hitbox)
        small_hitbox = false
        hitbox.setImage(assets.image`Player`)
        sprites.destroy(player_sprite)
    }
})
function set_difficulty (difficulty: number) {
    if (difficulty == 0) {
        debug_mode = true
        info.setLife(20)
    } else {
        info.setLife(20 / difficulty)
    }
    projectile_sprite = sprites.create(assets.image`boss_bullet`, SpriteKind.Projectile)
    projectile_sprite.x = -10
}
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.PlayerShot, function (sprite22, otherSprite3) {
    if (started) {
        info.changeScoreBy(20)
        boss_life += -2
        music.playTone(208, music.beat(BeatFraction.Eighth))
        lifebar_pic.fillRect(boss_life * 2, 0, 96 - boss_life * 2, 5, 15)
        lifeBar.setImage(lifebar_pic)
        if (boss_life <= 0) {
            start_game()
        } else if (boss_life % 12 == 0) {
            preSetBossPosition(80, 30)
        }
    }
    otherSprite3.destroy()
})
let speed3 = 0
let speed32 = 0
let myMenu: miniMenu.MenuSprite = null
let angle2 = 0
let global_speed = 0
let lifebar_pic: Image = null
let boss_num = 0
let boss_progress = 0
let life_bar_progress = 0
let boss_life = 0
let enemy2: Sprite = null
let enemy1: Sprite = null
let player_location: tiles.Location = null
let ready = false
let bossCanMove = false
let lifeBar: Sprite = null
let warp_around = false
let started = false
let talked = false
let npc1: Sprite = null
let projectile: Sprite = null
let hitbox: Sprite = null
let player_sprite: Sprite = null
let small_hitbox = false
let debug_mode = false
let iframe = false
let scatter = 0
let index22 = 0
let angle_offset = 0
let bullet_spin = false
let star_sprites: Image[] = []
let offset = 0
let MAX = 0
let boss: Sprite = null
let projectile_sprite: Sprite = null
let dy = 0
let dx = 0
let globalY = 0
let globalX = 0
scene.setBackgroundImage(assets.image`menu_screen`)
framedMenu()
music.setVolume(20)
init()
game.onUpdate(function () {
    if (Math.abs(boss.x - globalX) + Math.abs(boss.y - globalY) <= 2) {
        boss.setVelocity(0, 0)
        if (!(ready)) {
            sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
            boss_progress += 1
            warp_around = false
            bullet_spin = false
            if (boss_progress == 1) {
                bossCanMove = false
            } else if (boss_progress == 2) {
                bossCanMove = true
                MAX = 8
            } else {
                bossCanMove = false
            }
        }
        ready = true
    }
    if (small_hitbox) {
        player_sprite.setPosition(hitbox.x, hitbox.y)
    }
    for (let q of sprites.allOfKind(SpriteKind.Projectile)) {
        if (warp_around) {
            if (q.x < 5) {
                q.x = 155
            } else if (q.x > 155) {
                q.x = 5
            }
        }
        if (bullet_spin) {
            angle2 = Math.atan2(q.vy, q.vx)
            angle2 += angle_offset
            speed3 = Math.sqrt(q.vx * q.vx + q.vy * q.vy)
            speed3 += 2
            q.vx = speed3 * Math.cos(angle2)
            q.vy = speed3 * Math.sin(angle2)
        }
    }
})
game.onUpdateInterval(2500, function () {
    if (started && bossCanMove) {
        moveSpriteRandom(boss, 40, 8, 60)
    }
})
game.onUpdateInterval(1000, function () {
    if (boss_num == 2) {
        if (boss_progress == 2) {
            spell_aim_trail()
        }
    }
})
game.onUpdateInterval(1000, function () {
    if (started) {
        if (boss_num == 1) {
            if (boss_progress == 2) {
                spell_scarlet_gensokyo()
            }
        }
    }
})
game.onUpdateInterval(400, function () {
    if (started) {
        if (boss_num == 1) {
            if (boss_progress == 1) {
                spell_flower()
            } else if (false) {
            	
            } else {
            	
            }
        }
    }
})
game.onUpdateInterval(150, function () {
    if (started) {
        if (boss_num == 2) {
            if (boss_progress == 1) {
                spell_star()
            } else if (boss_progress == 3) {
                spell_star_corridor()
            } else {
            	
            }
        } else {
        	
        }
    }
})
game.onUpdateInterval(100, function () {
    if (ready && !(started)) {
        if (life_bar_progress < 4) {
            lifebar_pic.fillRect(24 * life_bar_progress, 0, 24, 5, 14 - life_bar_progress % 2 * 6)
            lifebar_pic.fillRect(24 * life_bar_progress, 1, 24, 3, life_bar_progress % 2 * 5 + 4)
            lifeBar.setImage(lifebar_pic)
            life_bar_progress += 1
        } else {
            started = true
        }
    }
})
game.onUpdateInterval(300, function () {
    if (started) {
        if (boss_num == 1) {
            if (boss_progress == 4) {
                spell_bullet_mirror()
            }
        }
    }
})
