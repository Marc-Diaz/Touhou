namespace SpriteKind {
    export const PlayerShot = SpriteKind.create()
    export const LifeBar = SpriteKind.create()
    export const sprite = SpriteKind.create()
    export const Enemy_NPC = SpriteKind.create()
    export const NPC = SpriteKind.create()
    export const Projectile_spawner = SpriteKind.create()
    export const sprite_map = SpriteKind.create()
}

function moveSpriteInTime(sprite2: Sprite, x: number, y: number, t: number) {
    
    globalX = x
    globalY = y
    dx = x - sprite2.x
    dy = y - sprite2.y
    sprite2.setVelocity(dx / t, dy / t)
}

function spell_flower() {
    
    projectile_sprite.setImage(assets.image`
        boss_bullet_2
        `)
    shoot_bullet_from_sprite(boss, projectile_sprite.image, 270 / MAX, 0 + offset)
    shoot_bullet_from_sprite(boss, projectile_sprite.image, 270 / MAX, 0 - offset)
    shoot_bullet_from_sprite(boss, projectile_sprite.image, 270 / MAX, 90 + offset)
    shoot_bullet_from_sprite(boss, projectile_sprite.image, 270 / MAX, 90 - offset)
    shoot_bullet_from_sprite(boss, projectile_sprite.image, 270 / MAX, 180 + offset)
    shoot_bullet_from_sprite(boss, projectile_sprite.image, 270 / MAX, 180 - offset)
    shoot_bullet_from_sprite(boss, projectile_sprite.image, 270 / MAX, 270 + offset)
    shoot_bullet_from_sprite(boss, projectile_sprite.image, 270 / MAX, 270 - offset)
    offset += 9
    projectile_sprite.setImage(assets.image`
        boss_bullet
        `)
}

controller.up.onEvent(ControllerButtonEvent.Pressed, function on_up_pressed() {
    if (!in_battle && !in_menu) {
        hitbox.setImage(assets.image`
            Player_up
            `)
    }
    
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function on_b_pressed() {
    
    if (started) {
        hitbox.setImage(assets.image`
            player_hitbox
            `)
        hitbox.z = 1
        small_hitbox = true
        player_sprite = sprites.create(assets.image`
            Player_up
            `, SpriteKind.sprite)
        controller.moveSprite(hitbox, 50, 50)
    }
    
})
function moveSpriteRandom(sprite32: Sprite, yLowerBound: number, outerBound: number, v: number) {
    moveSprite(sprite32, randint(outerBound, scene.screenWidth() - outerBound), randint(outerBound, yLowerBound), v)
}

function spell_spore_infestation() {
    
    projectile_spawner.setPosition(0 + offset * 3, 5)
    projectile_sprite.setImage(assets.image`
        cross_bullet_2
        `)
    for (let index32 = 0; index32 < 9; index32++) {
        shoot_bullet_from_sprite(projectile_spawner, projectile_sprite.image, 30, index32 * 15 + offset)
    }
    if (offset >= 55) {
        change_offset = false
    } else if (offset < 0) {
        change_offset = true
    }
    
    if (change_offset) {
        offset += 5
    } else {
        offset += -5
    }
    
}

function bullet_fragmentation() {
    for (let p of sprites.allOfKind(SpriteKind.Projectile)) {
        projectile_spawner.setVelocity(p.vx, p.vy)
    }
}

function spell_fragmentation() {
    
    fragmentation = true
    projectile_sprite.setImage(assets.image`
        cross_bullet_2
        `)
    timer.throttle("action", 2000, function on_throttle() {
        enemy_shoot_aiming_player(boss, projectile_sprite.image, 30, 1)
        projectile_spawner.setPosition(boss.x, boss.y)
        bullet_fragmentation()
        timer.after(500, function on_after() {
            for (let index = 0; index < 5; index++) {
                for (let index322 = 0; index322 < 9; index322++) {
                    shoot_bullet_from_sprite(projectile_spawner, projectile_sprite.image, 45, index322 * 45)
                }
                pause(500)
            }
        })
    })
}

controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    if (started) {
        shoot_bullet_from_sprite(hitbox, hitbox.image, 200, -90)
    }
    
})
function spell_star_corridor() {
    
    projectile_sprite.setImage(assets.image`
        star_bullet_2
        `)
    scatter = 10
    shoot_bullet_from_sprite(boss, projectile_sprite.image, 60, 80 + offset)
    shoot_bullet_from_sprite(boss, projectile_sprite.image, 60, 100 + offset)
    offset += randint(-5, 5)
}

sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function on_on_overlap(sprite4: Sprite, otherSprite2: Sprite) {
    
    if (!iframe && !debug_mode) {
        info.changeLifeBy(-1)
        scene.cameraShake(3, 200)
        music.playTone(139, music.beat(BeatFraction.Eighth))
        otherSprite2.destroy()
        iframe = true
        for (let index2 = 0; index2 < 5; index2++) {
            if (small_hitbox) {
                player_sprite.setImage(assets.image`
                    Player_Iframe
                    `)
                pause(50)
                player_sprite.setImage(assets.image`
                    Player_up
                    `)
                pause(50)
            } else {
                hitbox.setImage(assets.image`
                    Player_Iframe
                    `)
                pause(50)
                hitbox.setImage(assets.image`
                    Player_up
                    `)
                pause(50)
            }
            
        }
        iframe = false
    }
    
})
function spell_undergrowht() {
    
    sin_wave = true
    amplitude = 3
    projectile_sprite.setImage(assets.image`
        cross_bullet_2
        `)
    projectile_spawner.setPosition(80, 120)
    timer.background(function on_background() {
        
        for (let index3 = 0; index3 < 10; index3++) {
            frecuency += 0.32
            shoot_bullet_from_sprite(projectile_spawner, projectile_sprite.image, 45, 270)
            pause(150)
        }
    })
}

function shoot_bullet_from_sprite(source_sprite: Sprite, projectile_image: Image, speed: number, angle: number) {
    
    projectile = sprites.createProjectileFromSprite(assets.image`
            star_bullet_3
            `, source_sprite, speed * Math.cos(angle / 57.3), speed * Math.sin(angle / 57.3))
    projectile.setFlag(SpriteFlag.AutoDestroy, true)
    if (source_sprite.kind() == SpriteKind.Player) {
        projectile.setKind(SpriteKind.PlayerShot)
        projectile.setImage(assets.image`
            player_bullet
            `)
    } else {
        projectile.setImage(projectile_image)
    }
    
}

sprites.onOverlap(SpriteKind.Player, SpriteKind.NPC, function on_on_overlap2(sprite3: Sprite, otherSprite: Sprite) {
    
    if (otherSprite == npc1 && !talked) {
        game.showLongText("¡Sacerdotisa, gracias a los cielos que has llegado!", DialogLayout.Bottom)
        game.showLongText("La noche eterna está haciendo que los hongos enfermen", DialogLayout.Bottom)
        game.showLongText("Una mujer de mirada helada tomó nuestra reliquia sagrada y huyó hacia el bosque.", DialogLayout.Bottom)
        game.showLongText("Por favor... si no la refucpera, nuestra aldea no sobrevivirá.", DialogLayout.Bottom)
        talked = true
    }
    
    timer.after(2000, function on_after2() {
        
        talked = false
    })
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function on_left_pressed() {
    if (!in_battle && !in_menu) {
        hitbox.setImage(assets.image`
            player_left
            `)
    }
    
})
function spell_blue_sun() {
    projectile_sprite.setImage(assets.image`
        boss_bullet_4
        `)
    for (let index4 = 0; index4 < 9; index4++) {
        shoot_bullet_from_sprite(boss, projectile_sprite.image, 60, 45 * index4 + 22.5)
        shoot_bullet_from_sprite(boss, projectile_sprite.image, 100, 45 * index4)
    }
    projectile_sprite.setImage(assets.image`
        boss_bullet
        `)
}

function spell_star_vortex() {
    
    star_sprites = [assets.image`
            star_bullet_1
            `, assets.image`
            star_bullet_2
            `, assets.image`
            star_bullet_3
            `, assets.image`
            star_bullet_4
            `]
    set_bullet_spin(0.05, 2)
    for (let index22 = 0; index22 < 5; index22++) {
        projectile_sprite.setImage(star_sprites[index22 - 1])
        shoot_bullet_from_sprite(boss, projectile_sprite.image, 60, 90 * (index22 + 1) - offset)
    }
    offset += 16
    projectile_sprite.setImage(assets.image`
        boss_bullet
        `)
}

function spell_starry_night() {
    
    star_sprites = [assets.image`
            star_bullet_1
            `, assets.image`
            star_bullet_2
            `, assets.image`
            star_bullet_3
            `, assets.image`
            star_bullet_4
            `]
    for (let index33 = 0; index33 < 5; index33++) {
        if (index33 == 0) {
            projectile_spawner.setPosition(randint(0, scene.screenWidth()), 0)
        } else if (index33 == 1) {
            projectile_spawner.setPosition(randint(0, scene.screenWidth()), 120)
        } else if (index33 == 2) {
            projectile_spawner.setPosition(0, randint(0, scene.screenHeight()))
        } else if (index33 == 3) {
            projectile_spawner.setPosition(160, randint(0, scene.screenHeight()))
        }
        
        projectile_sprite.setImage(assets.image`
            star_bullet_2
            `)
        enemy_shoot_aiming_player(projectile_spawner, star_sprites._pickRandom(), 30, 1)
    }
}

function spell_bullet_mirror() {
    
    warp_around = true
    projectile_sprite.setImage(assets.image`
        ice
        `)
    for (let index323 = 0; index323 < 3; index323++) {
        shoot_bullet_from_sprite(boss, projectile_sprite.image, 60, offset + index323 * 30)
    }
    offset += 48
}

function spell_spores() {
    
    for (let index324 = 0; index324 < 9; index324++) {
        projectile_sprite.setImage(assets.image`
            cross_bullet_1
            `)
        shoot_bullet_from_sprite(boss, projectile_sprite.image, 45, index324 * 45 + 22.5 + offset)
        projectile_sprite.setImage(assets.image`
            cross_bullet_2
            `)
        shoot_bullet_from_sprite(boss, projectile_sprite.image, 30, index324 * 45 + offset)
    }
    offset += 22.5
}

function spell_wind() {
    
    projectile_sprite.setImage(assets.image`
        boss_bullet
        `)
    for (let index5 = 0; index5 < 4; index5++) {
        shoot_bullet_from_sprite(projectile_spawner, projectile_sprite.image, randint(45, 60), 75 + offset)
        projectile_spawner.setPosition(randint(0, scene.screenWidth()), 5)
    }
    offset += randint(-5, 5)
}

function start_game() {
    
    tiles.setCurrentTilemap(tilemap`
        map1
        `)
    casa_1 = sprites.create(assets.image`
            miImagen
            `, SpriteKind.sprite_map)
    casa_2 = sprites.create(assets.image`
            miImagen
            `, SpriteKind.sprite_map)
    puerta = sprites.create(assets.image`
            miImagen0
            `, SpriteKind.sprite_map)
    santuario = sprites.create(assets.image`
            miImagen2
            `, SpriteKind.sprite_map)
    set_Sprite_location(casa_2, tiles.getTileLocation(39, 89))
    set_Sprite_location(casa_1, tiles.getTileLocation(19, 81))
    set_Sprite_location(santuario, tiles.getTileLocation(7, 93))
    set_Sprite_location(puerta, tiles.getTileLocation(26, 90))
    in_menu = false
    in_battle = false
    lifeBar.setFlag(SpriteFlag.Invisible, true)
    boss.setPosition(-16, -16)
    boss_can_move = false
    ready = false
    started = false
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
    set_Sprite_location(hitbox, tiles.getTileLocation(player_location[0], player_location[1]))
    hitbox.setImage(assets.image`
        Player_up
        `)
    scene.cameraFollowSprite(hitbox)
    controller.moveSprite(hitbox)
    enemy1 = sprites.create(assets.image`
        sakuya
        `, SpriteKind.Enemy_NPC)
    enemy2 = sprites.create(assets.image`
        cirno
        `, SpriteKind.Enemy_NPC)
    enemy3 = sprites.create(assets.image`
        remilia
        `, SpriteKind.Enemy_NPC)
    npc1 = sprites.create(assets.image`
        npc1
        `, SpriteKind.NPC)
    set_Sprite_location(enemy1, tiles.getTileLocation(25, 73))
    set_Sprite_location(enemy2, tiles.getTileLocation(25, 40))
    set_Sprite_location(enemy3, tiles.getTileLocation(25, 5))
    set_Sprite_location(npc1, tiles.getTileLocation(19, 83))
}

controller.right.onEvent(ControllerButtonEvent.Pressed, function on_right_pressed() {
    if (!in_battle && !in_menu) {
        hitbox.setImage(assets.image`
            Player_right
            `)
    }
    
})
function start_battle(enemy: Sprite) {
    
    in_battle = true
    lifeBar.setFlag(SpriteFlag.Invisible, false)
    boss_life = 48
    player_location = [Math.round(hitbox.x / 16 - 2), Math.round(hitbox.y / 16)]
    life_bar_progress = 0
    boss_progress = 0
    if (enemy == enemy1) {
        boss_num = 1
        scene.setBackgroundImage(assets.image`
            forest_1
            `)
        boss.setImage(assets.image`
            sakuya
            `)
    } else if (enemy == enemy2) {
        boss_num = 2
        scene.setBackgroundImage(assets.image`
            forest_2
            `)
        boss.setImage(assets.image`
            cirno
            `)
    } else if (enemy == enemy3) {
        boss_num = 3
        scene.setBackgroundImage(assets.image`
            moon
            `)
        boss.setImage(assets.image`
            remilia
            `)
    }
    
    tiles.placeOnTile(boss, tiles.getTileLocation(0, 0))
    scene.centerCameraAt(0, 0)
    tiles.setCurrentTilemap(tilemap`
        level2
        `)
    hitbox.setImage(assets.image`
        Player_up
        `)
    hitbox.setPosition(75, 100)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy_NPC)
    sprites.destroyAllSpritesOfKind(SpriteKind.NPC)
    preSetBossPosition(80, 30)
}

//  <-- CORRECCIÓN CLAVE
//  La función set_projectile_speed y el timer ya no son necesarios
//  ya que la velocidad se establece en el momento del disparo.
//  timer.after(300, on_after)
function init() {
    
    iframe = false
    small_hitbox = false
    hitbox = sprites.create(assets.image`
        invisible
        `, SpriteKind.Player)
    boss_life = 48
    boss = sprites.create(assets.image`
        invisible
        `, SpriteKind.Enemy)
    lifebar_pic = image.create(96, 5)
    lifeBar = sprites.create(lifebar_pic, SpriteKind.LifeBar)
    offset = 0
    MAX = 10
    boss_can_move = true
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
    player_location = [7, 97]
    projectile_spawner = sprites.create(assets.image`
            invisible
            `, SpriteKind.Projectile_spawner)
    change_offset = true
    fragmentation = false
    sin_wave = false
    amplitude = 0
    frecuency = 0
    in_menu = true
    in_battle = false
}

function boss_movement() {
    
    boss_movement2 = [[false, false, false, false], [false, true, false, false], [true, false, false, false]]
    boss_can_move = boss_movement2[boss_num - 1][boss_progress - 1]
}

function framedMenu() {
    
    myMenu = miniMenu.createMenu(miniMenu.createMenuItem("Debug"), miniMenu.createMenuItem("Fácil"), miniMenu.createMenuItem("Normal"), miniMenu.createMenuItem("Difícil"), miniMenu.createMenuItem("Imposible"))
    myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Width, 65)
    myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Height, 100)
    myMenu.setStyleProperty(miniMenu.StyleKind.DefaultAndSelected, miniMenu.StyleProperty.Border, miniMenu.createBorderBox(4, 0, 0, 0))
    myMenu.setStyleProperty(miniMenu.StyleKind.DefaultAndSelected, miniMenu.StyleProperty.Margin, miniMenu.createBorderBox(0, 0, 0, 2))
    myMenu.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.BorderColor, 11)
    myMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.BorderColor, 4)
    myMenu.setStyleProperty(miniMenu.StyleKind.DefaultAndSelected, miniMenu.StyleProperty.Background, 12)
    myMenu.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Foreground, 11)
    myMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Foreground, 4)
    myMenu.top = 28
    myMenu.right = 160
    myMenu.onButtonPressed(controller.A, function on_button_pressed(selection: any, selectedIndex: number) {
        myMenu.close()
        info.setScore(0)
        set_difficulty(selectedIndex)
        start_game()
    })
}

controller.down.onEvent(ControllerButtonEvent.Pressed, function on_down_pressed() {
    if (!in_battle && !in_menu) {
        hitbox.setImage(assets.image`
            Player_down
            `)
    }
    
})
function set_bullet_spin(a_offset: number, speed2: number) {
    
    bullet_spin = true
    angle_offset = a_offset
    speed3 = speed2
}

function preSetBossPosition(x22: number, y2: number) {
    
    started = false
    ready = false
    offset = 0
    moveSpriteInTime(boss, x22, y2, 1)
}

sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy_NPC, function on_on_overlap3(sprite6: Sprite, otherSprite4: Sprite) {
    start_battle(otherSprite4)
})
controller.B.onEvent(ControllerButtonEvent.Released, function on_b_released() {
    
    if (started) {
        hitbox.setImage(assets.image`
            Player_up
            `)
        small_hitbox = false
        controller.moveSprite(hitbox)
        sprites.destroy(player_sprite)
    }
    
})
function enemy_shoot_aiming_player(sprite5: Sprite, projectile_image2: Image, speed22: number, spread: number) {
    shoot_bullet_from_sprite(sprite5, projectile_image2, speed22, Math.atan2(hitbox.y - sprite5.y, hitbox.x - sprite5.x) * 57.3 + randint(0 - spread, spread))
}

function spell_aim_trail() {
    projectile_sprite.setImage(assets.image`
        boss_bullet
        `)
    for (let index6 = 0; index6 < 11; index6++) {
        enemy_shoot_aiming_player(boss, projectile_sprite.image, randint(20, 75), 10)
    }
    projectile_sprite.setImage(assets.image`
        boss_bullet_3
        `)
    enemy_shoot_aiming_player(boss, projectile_sprite.image, 90, 5)
}

function moveSpriteRandomFixedTime(sprite52: Sprite, yLowerBound2: number, outerBound2: number, u: number) {
    moveSpriteInTime(sprite52, randint(outerBound2, scene.screenWidth() - outerBound2), randint(outerBound2, yLowerBound2), u)
}

function moveSprite(sprite62: Sprite, x3: number, y3: number, w: number) {
    
    globalX = x3
    globalY = y3
    dx = x3 - sprite62.x
    dy = y3 - sprite62.y
    speed32 = Math.sqrt(dx * dx + dy * dy)
    if (speed32 != 0) {
        sprite62.setVelocity(dx / speed32 * w, dy / speed32 * w)
    }
    
}

function set_Sprite_location(NPC2: Sprite, location: tiles.Location) {
    tiles.placeOnTile(NPC2, location)
    if (NPC2.kind() == SpriteKind.Enemy_NPC) {
        NPC2.sayText("!")
    } else if (NPC2.kind() == SpriteKind.NPC) {
        NPC2.sayText(":)")
    }
    
}

function phase_change() {
    
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
    boss_progress += 1
    warp_around = false
    bullet_spin = false
    sin_wave = false
}

function spell_star_barrage() {
    set_bullet_spin(0.05, 2)
    projectile_sprite.setImage(assets.image`
        star_bullet_2
        `)
    timer.throttle("action", 1000, function on_throttle2() {
        projectile_spawner.setImage(assets.image`
            danger_sprite
            `)
        projectile_spawner.setPosition(randint(0, scene.screenWidth()), randint(0, scene.screenHeight()))
        timer.after(500, function on_after3() {
            for (let index62 = 0; index62 < 9; index62++) {
                shoot_bullet_from_sprite(projectile_spawner, projectile_sprite.image, 60, 45 * (index62 + 0.5))
                shoot_bullet_from_sprite(projectile_spawner, projectile_sprite.image, 100, 45 * index62)
            }
            projectile_spawner.setImage(assets.image`
                invisible
                `)
        })
    })
}

function set_difficulty(difficulty: number) {
    
    if (difficulty == 0) {
        debug_mode = true
        info.setLife(20)
    } else {
        info.setLife(20 / difficulty)
    }
    
    projectile_sprite = sprites.create(assets.image`
            boss_bullet
            `, SpriteKind.Projectile)
    projectile_sprite.x = -10
}

sprites.onOverlap(SpriteKind.Enemy, SpriteKind.PlayerShot, function on_on_overlap4(sprite22: Sprite, otherSprite3: Sprite) {
    
    if (started) {
        info.changeScoreBy(20)
        boss_life += -1
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
let speed32 = 0
let speed3 = 0
let angle_offset = 0
let myMenu : miniMenu.MenuSprite = null
let boss_movement2 : boolean[][] = []
let bullet_spin = false
let angle2 = 0
let global_speed = 0
let lifebar_pic : Image = null
let boss_num = 0
let boss_progress = 0
let life_bar_progress = 0
let boss_life = 0
let enemy3 : Sprite = null
let enemy2 : Sprite = null
let enemy1 : Sprite = null
let player_location : number[] = []
let ready = false
let boss_can_move = false
let lifeBar : Sprite = null
let santuario : Sprite = null
let puerta : Sprite = null
let casa_2 : Sprite = null
let casa_1 : Sprite = null
let warp_around = false
let star_sprites : Image[] = []
let talked = false
let npc1 : Sprite = null
let projectile : Sprite = null
let frecuency = 0
let amplitude = 0
let sin_wave = false
let debug_mode = false
let iframe = false
let scatter = 0
let fragmentation = false
let change_offset = false
let projectile_spawner : Sprite = null
let player_sprite : Sprite = null
let small_hitbox = false
let started = false
let hitbox : Sprite = null
let in_menu = false
let in_battle = false
let offset = 0
let MAX = 0
let boss : Sprite = null
let projectile_sprite : Sprite = null
let dy = 0
let dx = 0
let globalY = 0
let globalX = 0
let spacing = 0
let star_sprites2 : number[] = []
let bullet_spin2 = false
let angle_offset2 = 0
scene.setBackgroundImage(assets.image`
    menu_screen
    `)
framedMenu()
music.play(music.stringPlayable("A5 C6 E6 D6 C6 B5 A5 E6 A6 G6 F6 E6", 160), music.PlaybackMode.LoopingInBackground)
music.setVolume(50)
init()
game.onUpdate(function on_on_update() {
    
    if (Math.abs(boss.x - globalX) + Math.abs(boss.y - globalY) <= 2) {
        boss.setVelocity(0, 0)
        if (!ready) {
            phase_change()
            boss_movement()
        }
        
        ready = true
    }
    
    if (small_hitbox) {
        player_sprite.setPosition(hitbox.x, hitbox.y)
    }
    
    if (started) {
        for (let q of sprites.allOfKind(SpriteKind.Projectile)) {
            angle2 = Math.atan2(q.vy, q.vx)
            speed3 = Math.sqrt(q.vx * q.vx + q.vy * q.vy)
            if (warp_around) {
                if (q.x < 8) {
                    q.x = 155
                } else if (q.x > 155) {
                    q.x = 8
                }
                
            }
            
            if (bullet_spin) {
                angle2 += angle_offset
                speed3 += 2
                q.vx = speed3 * Math.cos(angle2)
                q.vy = speed3 * Math.sin(angle2)
            }
            
            if (sin_wave) {
                q.x += Math.sin(angle2 + frecuency) * amplitude
            }
            
        }
    }
    
})
game.onUpdateInterval(2500, function on_update_interval() {
    if (started && boss_can_move) {
        moveSpriteRandom(boss, 40, 8, 60)
    }
    
})
game.onUpdateInterval(1000, function on_update_interval2() {
    if (boss_num == 3) {
        if (boss_progress == 1) {
            spell_aim_trail()
        }
        
    }
    
})
game.onUpdateInterval(1000, function on_update_interval3() {
    if (started) {
        if (boss_num == 1) {
            if (boss_progress == 1) {
                spell_undergrowht()
            } else if (boss_progress == 2) {
                spell_spore_infestation()
            } else if (boss_progress == 3) {
                spell_fragmentation()
            } else if (boss_progress == 4) {
                spell_spores()
            }
            
        } else if (boss_num == 2) {
            if (boss_progress == 2) {
                spell_blue_sun()
            }
            
        }
        
    }
    
})
game.onUpdateInterval(400, function on_update_interval4() {
    if (started) {
        if (boss_num == 2) {
            if (boss_progress == 1) {
                spell_flower()
            } else if (boss_progress == 3) {
                spell_wind()
            }
            
        } else if (boss_num == 3) {
            if (boss_progress == 4) {
                spell_starry_night()
            }
            
        }
        
    }
    
})
game.onUpdateInterval(150, function on_update_interval5() {
    if (started) {
        if (boss_num == 3) {
            if (boss_progress == 2) {
                spell_star_barrage()
            } else if (boss_progress == 3) {
                spell_star_vortex()
            }
            
        }
        
    }
    
})
game.onUpdateInterval(100, function on_update_interval6() {
    
    if (ready && !started) {
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
game.onUpdateInterval(300, function on_update_interval7() {
    if (started) {
        if (boss_num == 2) {
            if (boss_progress == 4) {
                spell_bullet_mirror()
            }
            
        }
        
    }
    
})
