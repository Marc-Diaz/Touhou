@namespace
class SpriteKind:
    PlayerShot = SpriteKind.create()
    LifeBar = SpriteKind.create()
    sprite = SpriteKind.create()
    Enemy_NPC = SpriteKind.create()
    NPC = SpriteKind.create()
    Projectile_spawner = SpriteKind.create()
    sprite_map = SpriteKind.create()
def moveSpriteInTime(sprite2: Sprite, x: number, y: number, t: number):
    global globalX, globalY, dx, dy
    globalX = x
    globalY = y
    dx = x - sprite2.x
    dy = y - sprite2.y
    sprite2.set_velocity(dx / t, dy / t)
def spell_flower():
    global offset
    projectile_sprite.set_image(assets.image("""
        boss_bullet_2
        """))
    shoot_bullet_from_sprite(boss, projectile_sprite.image, 270 / MAX, 0 + offset)
    shoot_bullet_from_sprite(boss, projectile_sprite.image, 270 / MAX, 0 - offset)
    shoot_bullet_from_sprite(boss, projectile_sprite.image, 270 / MAX, 90 + offset)
    shoot_bullet_from_sprite(boss, projectile_sprite.image, 270 / MAX, 90 - offset)
    shoot_bullet_from_sprite(boss, projectile_sprite.image, 270 / MAX, 180 + offset)
    shoot_bullet_from_sprite(boss, projectile_sprite.image, 270 / MAX, 180 - offset)
    shoot_bullet_from_sprite(boss, projectile_sprite.image, 270 / MAX, 270 + offset)
    shoot_bullet_from_sprite(boss, projectile_sprite.image, 270 / MAX, 270 - offset)
    offset += 9
    projectile_sprite.set_image(assets.image("""
        boss_bullet
        """))

def on_up_pressed():
    if not (in_battle) and not (in_menu):
        hitbox.set_image(assets.image("""
            Player_up
            """))
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def on_b_pressed():
    global small_hitbox, player_sprite
    if started:
        hitbox.set_image(assets.image("""
            player_hitbox
            """))
        hitbox.z = 1
        small_hitbox = True
        player_sprite = sprites.create(assets.image("""
            Player_up
            """), SpriteKind.sprite)
        controller.move_sprite(hitbox, 50, 50)
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def moveSpriteRandom(sprite32: Sprite, yLowerBound: number, outerBound: number, v: number):
    moveSprite(sprite32,
        randint(outerBound, scene.screen_width() - outerBound),
        randint(outerBound, yLowerBound),
        v)
def spell_spore_infestation():
    global change_offset, offset
    projectile_spawner.set_position(0 + offset * 3, 5)
    projectile_sprite.set_image(assets.image("""
        cross_bullet_2
        """))
    for index32 in range(9):
        shoot_bullet_from_sprite(projectile_spawner,
            projectile_sprite.image,
            30,
            index32 * 15 + offset)
    if offset >= 55:
        change_offset = False
    elif offset < 0:
        change_offset = True
    if change_offset:
        offset += 5
    else:
        offset += -5
def bullet_fragmentation():
    for p in sprites.all_of_kind(SpriteKind.projectile):
        projectile_spawner.set_velocity(p.vx, p.vy)
def spell_fragmentation():
    global fragmentation
    fragmentation = True
    projectile_sprite.set_image(assets.image("""
        cross_bullet_2
        """))
    
    def on_throttle():
        enemy_shoot_aiming_player(boss, projectile_sprite.image, 30, 1)
        projectile_spawner.set_position(boss.x, boss.y)
        bullet_fragmentation()
        
        def on_after():
            for index in range(5):
                for index322 in range(9):
                    shoot_bullet_from_sprite(projectile_spawner,
                        projectile_sprite.image,
                        45,
                        index322 * 45)
                pause(500)
        timer.after(500, on_after)
        
    timer.throttle("action", 2000, on_throttle)
    

def on_a_pressed():
    if started:
        shoot_bullet_from_sprite(hitbox, hitbox.image, 200, -90)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def spell_star_corridor():
    global scatter, offset
    projectile_sprite.set_image(assets.image("""
        star_bullet_2
        """))
    scatter = 10
    shoot_bullet_from_sprite(boss, projectile_sprite.image, 60, 80 + offset)
    shoot_bullet_from_sprite(boss, projectile_sprite.image, 60, 100 + offset)
    offset += randint(-5, 5)

def on_on_overlap(sprite4, otherSprite2):
    global iframe
    if not (iframe) and not (debug_mode):
        info.change_life_by(-1)
        scene.camera_shake(3, 200)
        music.play_tone(139, music.beat(BeatFraction.EIGHTH))
        otherSprite2.destroy()
        iframe = True
        for index2 in range(5):
            if small_hitbox:
                player_sprite.set_image(assets.image("""
                    Player_Iframe
                    """))
                pause(50)
                player_sprite.set_image(assets.image("""
                    Player_up
                    """))
                pause(50)
            else:
                hitbox.set_image(assets.image("""
                    Player_Iframe
                    """))
                pause(50)
                hitbox.set_image(assets.image("""
                    Player_up
                    """))
                pause(50)
        iframe = False
sprites.on_overlap(SpriteKind.player, SpriteKind.projectile, on_on_overlap)

def spell_undergrowht():
    global sin_wave, amplitude
    sin_wave = True
    amplitude = 3
    projectile_sprite.set_image(assets.image("""
        cross_bullet_2
        """))
    projectile_spawner.set_position(80, 120)
    
    def on_background():
        global frecuency
        for index3 in range(10):
            frecuency += 0.32
            shoot_bullet_from_sprite(projectile_spawner, projectile_sprite.image, 45, 270)
            pause(150)
    timer.background(on_background)
    
def shoot_bullet_from_sprite(source_sprite: Sprite, projectile_image: Image, speed: number, angle: number):
    global projectile
    projectile = sprites.create_projectile_from_sprite(assets.image("""
            star_bullet_3
            """),
        source_sprite,
        speed * Math.cos(angle / 57.3),
        speed * Math.sin(angle / 57.3))
    projectile.set_flag(SpriteFlag.AUTO_DESTROY, True)
    if source_sprite.kind() == SpriteKind.player:
        projectile.set_kind(SpriteKind.PlayerShot)
        projectile.set_image(assets.image("""
            player_bullet
            """))
    else:
        projectile.set_image(projectile_image)

def on_on_overlap2(sprite3, otherSprite):
    global talked
    if otherSprite == npc1 and not (talked):
        game.show_long_text("¡Sacerdotisa, gracias a los cielos que has llegado!",
            DialogLayout.BOTTOM)
        game.show_long_text("La noche eterna está haciendo que los hongos enfermen… nuestras cosechas se están pudriendo.",
            DialogLayout.BOTTOM)
        game.show_long_text("Una mujer de mirada helada tomó nuestra reliquia sagrada y huyó hacia el bosque.",
            DialogLayout.BOTTOM)
        game.show_long_text("Por favor… si no la recuperas, nuestra aldea no sobrevivirá.",
            DialogLayout.BOTTOM)
        talked = True
    
    def on_after2():
        global talked
        talked = False
    timer.after(2000, on_after2)
    
sprites.on_overlap(SpriteKind.player, SpriteKind.NPC, on_on_overlap2)

def on_left_pressed():
    if not (in_battle) and not (in_menu):
        hitbox.set_image(assets.image("""
            player_left
            """))
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def spell_blue_sun():
    projectile_sprite.set_image(assets.image("""
        boss_bullet_4
        """))
    for index4 in range(9):
        shoot_bullet_from_sprite(boss, projectile_sprite.image, 60, 45 * index4 + 22.5)
        shoot_bullet_from_sprite(boss, projectile_sprite.image, 100, 45 * index4)
    projectile_sprite.set_image(assets.image("""
        boss_bullet
        """))
def spell_star_vortex():
    global star_sprites, offset
    star_sprites = [assets.image("""
            star_bullet_1
            """),
        assets.image("""
            star_bullet_2
            """),
        assets.image("""
            star_bullet_3
            """),
        assets.image("""
            star_bullet_4
            """)]
    set_bullet_spin(0.05, 2)
    for index22 in range(5):
        projectile_sprite.set_image(star_sprites[index22 - 1])
        shoot_bullet_from_sprite(boss,
            projectile_sprite.image,
            60,
            90 * (index22 + 1) - offset)
    offset += 16
    projectile_sprite.set_image(assets.image("""
        boss_bullet
        """))
def spell_starry_night():
    global star_sprites
    star_sprites = [assets.image("""
            star_bullet_1
            """),
        assets.image("""
            star_bullet_2
            """),
        assets.image("""
            star_bullet_3
            """),
        assets.image("""
            star_bullet_4
            """)]
    for index33 in range(5):
        if index33 == 0:
            projectile_spawner.set_position(randint(0, scene.screen_width()), 0)
        elif index33 == 1:
            projectile_spawner.set_position(randint(0, scene.screen_width()), 120)
        elif index33 == 2:
            projectile_spawner.set_position(0, randint(0, scene.screen_height()))
        elif index33 == 3:
            projectile_spawner.set_position(160, randint(0, scene.screen_height()))
        projectile_sprite.set_image(assets.image("""
            star_bullet_2
            """))
        enemy_shoot_aiming_player(projectile_spawner, star_sprites._pick_random(), 30, 1)
def spell_bullet_mirror():
    global warp_around, offset
    warp_around = True
    projectile_sprite.set_image(assets.image("""
        ice
        """))
    for index323 in range(3):
        shoot_bullet_from_sprite(boss, projectile_sprite.image, 60, offset + index323 * 30)
    offset += 48
def spell_spores():
    global offset
    for index324 in range(9):
        projectile_sprite.set_image(assets.image("""
            cross_bullet_1
            """))
        shoot_bullet_from_sprite(boss,
            projectile_sprite.image,
            45,
            index324 * 45 + 22.5 + offset)
        projectile_sprite.set_image(assets.image("""
            cross_bullet_2
            """))
        shoot_bullet_from_sprite(boss, projectile_sprite.image, 30, index324 * 45 + offset)
    offset += 22.5
def spell_wind():
    global offset
    projectile_sprite.set_image(assets.image("""
        boss_bullet
        """))
    for index5 in range(4):
        shoot_bullet_from_sprite(projectile_spawner,
            projectile_sprite.image,
            randint(45, 60),
            75 + offset)
        projectile_spawner.set_position(randint(0, scene.screen_width()), 5)
    offset += randint(-5, 5)
def start_game():
    global casa_1, casa_2, puerta, santuario, in_menu, in_battle, boss_can_move, ready, started, enemy1, enemy2, enemy3, npc1
    tiles.set_current_tilemap(tilemap("""
        map1
        """))
    casa_1 = sprites.create(assets.image("""
            miImagen
            """),
        SpriteKind.sprite_map)
    casa_2 = sprites.create(assets.image("""
            miImagen
            """),
        SpriteKind.sprite_map)
    puerta = sprites.create(assets.image("""
            miImagen0
            """),
        SpriteKind.sprite_map)
    santuario = sprites.create(assets.image("""
            miImagen2
            """),
        SpriteKind.sprite_map)
    set_Sprite_location(casa_2, tiles.get_tile_location(39, 89))
    set_Sprite_location(casa_1, tiles.get_tile_location(19, 81))
    set_Sprite_location(santuario, tiles.get_tile_location(7, 93))
    set_Sprite_location(puerta, tiles.get_tile_location(26, 90))
    in_menu = False
    in_battle = False
    lifeBar.set_flag(SpriteFlag.INVISIBLE, True)
    boss.set_position(-16, -16)
    boss_can_move = False
    ready = False
    started = False
    sprites.destroy_all_sprites_of_kind(SpriteKind.projectile)
    set_Sprite_location(hitbox,
        tiles.get_tile_location(player_location[0], player_location[1]))
    hitbox.set_image(assets.image("""
        Player_up
        """))
    scene.camera_follow_sprite(hitbox)
    controller.move_sprite(hitbox)
    enemy1 = sprites.create(assets.image("""
        sakuya
        """), SpriteKind.Enemy_NPC)
    enemy2 = sprites.create(assets.image("""
        cirno
        """), SpriteKind.Enemy_NPC)
    enemy3 = sprites.create(assets.image("""
        remilia
        """), SpriteKind.Enemy_NPC)
    npc1 = sprites.create(assets.image("""
        npc1
        """), SpriteKind.NPC)
    set_Sprite_location(enemy1, tiles.get_tile_location(25, 73))
    set_Sprite_location(enemy2, tiles.get_tile_location(25, 40))
    set_Sprite_location(enemy3, tiles.get_tile_location(25, 5))
    set_Sprite_location(npc1, tiles.get_tile_location(19, 83))

def on_right_pressed():
    if not (in_battle) and not (in_menu):
        hitbox.set_image(assets.image("""
            Player_right
            """))
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def start_battle(enemy: Sprite):
    global in_battle, boss_life, player_location, life_bar_progress, boss_progress, boss_num
    in_battle = True
    lifeBar.set_flag(SpriteFlag.INVISIBLE, False)
    boss_life = 48
    player_location = [Math.round(hitbox.x / 16 - 2), Math.round(hitbox.y / 16)]
    life_bar_progress = 0
    boss_progress = 0
    if enemy == enemy1:
        boss_num = 1
        scene.set_background_image(assets.image("""
            forest_1
            """))
        boss.set_image(assets.image("""
            sakuya
            """))
    elif enemy == enemy2:
        boss_num = 2
        scene.set_background_image(assets.image("""
            forest_2
            """))
        boss.set_image(assets.image("""
            cirno
            """))
    elif enemy == enemy3:
        boss_num = 3
        scene.set_background_image(assets.image("""
            moon
            """))
        boss.set_image(assets.image("""
            remilia
            """))
    tiles.place_on_tile(boss, tiles.get_tile_location(0, 0))
    scene.center_camera_at(0, 0)
    tiles.set_current_tilemap(tilemap("""
        level2
        """))
    hitbox.set_image(assets.image("""
        Player_up
        """))
    hitbox.set_position(75, 100)
    sprites.destroy_all_sprites_of_kind(SpriteKind.Enemy_NPC)
    sprites.destroy_all_sprites_of_kind(SpriteKind.NPC)
    preSetBossPosition(80, 30)
# <-- CORRECCIÓN CLAVE
# La función set_projectile_speed y el timer ya no son necesarios
# ya que la velocidad se establece en el momento del disparo.
# timer.after(300, on_after)
def init():
    global iframe, small_hitbox, hitbox, boss_life, boss, lifebar_pic, lifeBar, offset, MAX, boss_can_move, warp_around, global_speed, angle2, bullet_spin, talked, boss_num, player_location, projectile_spawner, change_offset, fragmentation, sin_wave, amplitude, frecuency, in_menu, in_battle
    iframe = False
    small_hitbox = False
    hitbox = sprites.create(assets.image("""
        invisible
        """), SpriteKind.player)
    boss_life = 48
    boss = sprites.create(assets.image("""
        invisible
        """), SpriteKind.enemy)
    lifebar_pic = image.create(96, 5)
    lifeBar = sprites.create(lifebar_pic, SpriteKind.LifeBar)
    offset = 0
    MAX = 10
    boss_can_move = True
    hitbox.set_position(80, 105)
    hitbox.set_flag(SpriteFlag.STAY_IN_SCREEN, True)
    lifeBar.set_position(80, 5)
    lifeBar.set_flag(SpriteFlag.GHOST, True)
    warp_around = False
    global_speed = 0
    angle2 = 0
    bullet_spin = False
    talked = False
    boss_num = 0
    player_location = [7, 97]
    projectile_spawner = sprites.create(assets.image("""
            invisible
            """),
        SpriteKind.Projectile_spawner)
    change_offset = True
    fragmentation = False
    sin_wave = False
    amplitude = 0
    frecuency = 0
    in_menu = True
    in_battle = False
def boss_movement():
    global boss_movement2, boss_can_move
    boss_movement2 = [[False, False, False, False],
        [False, True, False, False],
        [True, False, False, False]]
    boss_can_move = boss_movement2[boss_num - 1][boss_progress - 1]
def framedMenu():
    global myMenu
    myMenu = miniMenu.create_menu(miniMenu.create_menu_item("Debug"),
        miniMenu.create_menu_item("Fácil"),
        miniMenu.create_menu_item("Normal"),
        miniMenu.create_menu_item("Difícil"),
        miniMenu.create_menu_item("Imposible"))
    myMenu.set_menu_style_property(miniMenu.MenuStyleProperty.WIDTH, 65)
    myMenu.set_menu_style_property(miniMenu.MenuStyleProperty.HEIGHT, 100)
    myMenu.set_style_property(miniMenu.StyleKind.DEFAULT_AND_SELECTED,
        miniMenu.StyleProperty.BORDER,
        miniMenu.create_border_box(4, 0, 0, 0))
    myMenu.set_style_property(miniMenu.StyleKind.DEFAULT_AND_SELECTED,
        miniMenu.StyleProperty.MARGIN,
        miniMenu.create_border_box(0, 0, 0, 2))
    myMenu.set_style_property(miniMenu.StyleKind.DEFAULT,
        miniMenu.StyleProperty.BORDER_COLOR,
        11)
    myMenu.set_style_property(miniMenu.StyleKind.SELECTED,
        miniMenu.StyleProperty.BORDER_COLOR,
        4)
    myMenu.set_style_property(miniMenu.StyleKind.DEFAULT_AND_SELECTED,
        miniMenu.StyleProperty.BACKGROUND,
        12)
    myMenu.set_style_property(miniMenu.StyleKind.DEFAULT,
        miniMenu.StyleProperty.FOREGROUND,
        11)
    myMenu.set_style_property(miniMenu.StyleKind.SELECTED,
        miniMenu.StyleProperty.FOREGROUND,
        4)
    myMenu.top = 28
    myMenu.right = 160
    
    def on_button_pressed(selection, selectedIndex):
        myMenu.close()
        info.set_score(0)
        set_difficulty(selectedIndex)
        start_game()
    myMenu.on_button_pressed(controller.A, on_button_pressed)
    

def on_down_pressed():
    if not (in_battle) and not (in_menu):
        hitbox.set_image(assets.image("""
            Player_down
            """))
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

def set_bullet_spin(a_offset: number, speed2: number):
    global bullet_spin, angle_offset, speed3
    bullet_spin = True
    angle_offset = a_offset
    speed3 = speed2
def preSetBossPosition(x22: number, y2: number):
    global started, ready, offset
    started = False
    ready = False
    offset = 0
    moveSpriteInTime(boss, x22, y2, 1)

def on_on_overlap3(sprite6, otherSprite4):
    start_battle(otherSprite4)
sprites.on_overlap(SpriteKind.player, SpriteKind.Enemy_NPC, on_on_overlap3)

def on_b_released():
    global small_hitbox
    if started:
        hitbox.set_image(assets.image("""
            Player_up
            """))
        small_hitbox = False
        controller.move_sprite(hitbox)
        sprites.destroy(player_sprite)
controller.B.on_event(ControllerButtonEvent.RELEASED, on_b_released)

def enemy_shoot_aiming_player(sprite5: Sprite, projectile_image2: Image, speed22: number, spread: number):
    shoot_bullet_from_sprite(sprite5,
        projectile_image2,
        speed22,
        Math.atan2(hitbox.y - sprite5.y, hitbox.x - sprite5.x) * 57.3 + randint(0 - spread, spread))
def spell_aim_trail():
    projectile_sprite.set_image(assets.image("""
        boss_bullet
        """))
    for index6 in range(11):
        enemy_shoot_aiming_player(boss, projectile_sprite.image, randint(20, 75), 10)
    projectile_sprite.set_image(assets.image("""
        boss_bullet_3
        """))
    enemy_shoot_aiming_player(boss, projectile_sprite.image, 90, 5)
def moveSpriteRandomFixedTime(sprite52: Sprite, yLowerBound2: number, outerBound2: number, u: number):
    moveSpriteInTime(sprite52,
        randint(outerBound2, scene.screen_width() - outerBound2),
        randint(outerBound2, yLowerBound2),
        u)
def moveSprite(sprite62: Sprite, x3: number, y3: number, w: number):
    global globalX, globalY, dx, dy, speed32
    globalX = x3
    globalY = y3
    dx = x3 - sprite62.x
    dy = y3 - sprite62.y
    speed32 = Math.sqrt(dx * dx + dy * dy)
    if speed32 != 0:
        sprite62.set_velocity(dx / speed32 * w, dy / speed32 * w)
def set_Sprite_location(NPC2: Sprite, location: tiles.Location):
    tiles.place_on_tile(NPC2, location)
    if NPC2.kind() == SpriteKind.Enemy_NPC:
        NPC2.say_text("!")
    elif NPC2.kind() == SpriteKind.NPC:
        NPC2.say_text(":)")
def phase_change():
    global boss_progress, warp_around, bullet_spin, sin_wave
    sprites.destroy_all_sprites_of_kind(SpriteKind.projectile)
    boss_progress += 1
    warp_around = False
    bullet_spin = False
    sin_wave = False
def spell_star_barrage():
    set_bullet_spin(0.05, 2)
    projectile_sprite.set_image(assets.image("""
        star_bullet_2
        """))
    
    def on_throttle2():
        projectile_spawner.set_image(assets.image("""
            danger_sprite
            """))
        projectile_spawner.set_position(randint(0, scene.screen_width()),
            randint(0, scene.screen_height()))
        
        def on_after3():
            for index62 in range(9):
                shoot_bullet_from_sprite(projectile_spawner,
                    projectile_sprite.image,
                    60,
                    45 * (index62 + 0.5))
                shoot_bullet_from_sprite(projectile_spawner,
                    projectile_sprite.image,
                    100,
                    45 * index62)
            projectile_spawner.set_image(assets.image("""
                invisible
                """))
        timer.after(500, on_after3)
        
    timer.throttle("action", 1000, on_throttle2)
    
def set_difficulty(difficulty: number):
    global debug_mode, projectile_sprite
    if difficulty == 0:
        debug_mode = True
        info.set_life(20)
    else:
        info.set_life(20 / difficulty)
    projectile_sprite = sprites.create(assets.image("""
            boss_bullet
            """),
        SpriteKind.projectile)
    projectile_sprite.x = -10

def on_on_overlap4(sprite22, otherSprite3):
    global boss_life
    if started:
        info.change_score_by(20)
        boss_life += -1
        music.play_tone(208, music.beat(BeatFraction.EIGHTH))
        lifebar_pic.fill_rect(boss_life * 2, 0, 96 - boss_life * 2, 5, 15)
        lifeBar.set_image(lifebar_pic)
        if boss_life <= 0:
            start_game()
        elif boss_life % 12 == 0:
            preSetBossPosition(80, 30)
    otherSprite3.destroy()
sprites.on_overlap(SpriteKind.enemy, SpriteKind.PlayerShot, on_on_overlap4)

speed32 = 0
speed3 = 0
angle_offset = 0
myMenu: miniMenu.MenuSprite = None
boss_movement2: List[List[bool]] = []
bullet_spin = False
angle2 = 0
global_speed = 0
lifebar_pic: Image = None
boss_num = 0
boss_progress = 0
life_bar_progress = 0
boss_life = 0
enemy3: Sprite = None
enemy2: Sprite = None
enemy1: Sprite = None
player_location: List[number] = []
ready = False
boss_can_move = False
lifeBar: Sprite = None
santuario: Sprite = None
puerta: Sprite = None
casa_2: Sprite = None
casa_1: Sprite = None
warp_around = False
star_sprites: List[Image] = []
talked = False
npc1: Sprite = None
projectile: Sprite = None
frecuency = 0
amplitude = 0
sin_wave = False
debug_mode = False
iframe = False
scatter = 0
fragmentation = False
change_offset = False
projectile_spawner: Sprite = None
player_sprite: Sprite = None
small_hitbox = False
started = False
hitbox: Sprite = None
in_menu = False
in_battle = False
offset = 0
MAX = 0
boss: Sprite = None
projectile_sprite: Sprite = None
dy = 0
dx = 0
globalY = 0
globalX = 0
spacing = 0
star_sprites2: List[number] = []
bullet_spin2 = False
angle_offset2 = 0
scene.set_background_image(assets.image("""
    menu_screen
    """))
framedMenu()
music.set_volume(20)
init()

def on_on_update():
    global ready, angle2, speed3
    if abs(boss.x - globalX) + abs(boss.y - globalY) <= 2:
        boss.set_velocity(0, 0)
        if not (ready):
            phase_change()
            boss_movement()
        ready = True
    if small_hitbox:
        player_sprite.set_position(hitbox.x, hitbox.y)
    if started:
        for q in sprites.all_of_kind(SpriteKind.projectile):
            angle2 = Math.atan2(q.vy, q.vx)
            speed3 = Math.sqrt(q.vx * q.vx + q.vy * q.vy)
            if warp_around:
                if q.x < 8:
                    q.x = 155
                elif q.x > 155:
                    q.x = 8
            if bullet_spin:
                angle2 += angle_offset
                speed3 += 2
                q.vx = speed3 * Math.cos(angle2)
                q.vy = speed3 * Math.sin(angle2)
            if sin_wave:
                q.x += Math.sin(angle2 + frecuency) * amplitude
game.on_update(on_on_update)

def on_update_interval():
    if started and boss_can_move:
        moveSpriteRandom(boss, 40, 8, 60)
game.on_update_interval(2500, on_update_interval)

def on_update_interval2():
    if boss_num == 3:
        if boss_progress == 1:
            spell_aim_trail()
game.on_update_interval(1000, on_update_interval2)

def on_update_interval3():
    if started:
        if boss_num == 1:
            if boss_progress == 1:
                spell_undergrowht()
            elif boss_progress == 2:
                spell_spore_infestation()
            elif boss_progress == 3:
                spell_fragmentation()
            elif boss_progress == 4:
                spell_spores()
        elif boss_num == 2:
            if boss_progress == 2:
                spell_blue_sun()
game.on_update_interval(1000, on_update_interval3)

def on_update_interval4():
    if started:
        if boss_num == 2:
            if boss_progress == 1:
                spell_flower()
            elif boss_progress == 3:
                spell_wind()
        elif boss_num == 3:
            if boss_progress == 4:
                spell_starry_night()
game.on_update_interval(400, on_update_interval4)

def on_update_interval5():
    if started:
        if boss_num == 3:
            if boss_progress == 2:
                spell_star_barrage()
            elif boss_progress == 3:
                spell_star_vortex()
game.on_update_interval(150, on_update_interval5)

def on_update_interval6():
    global life_bar_progress, started
    if ready and not (started):
        if life_bar_progress < 4:
            lifebar_pic.fill_rect(24 * life_bar_progress,
                0,
                24,
                5,
                14 - life_bar_progress % 2 * 6)
            lifebar_pic.fill_rect(24 * life_bar_progress,
                1,
                24,
                3,
                life_bar_progress % 2 * 5 + 4)
            lifeBar.set_image(lifebar_pic)
            life_bar_progress += 1
        else:
            started = True
game.on_update_interval(100, on_update_interval6)

def on_update_interval7():
    if started:
        if boss_num == 2:
            if boss_progress == 4:
                spell_bullet_mirror()
game.on_update_interval(300, on_update_interval7)
