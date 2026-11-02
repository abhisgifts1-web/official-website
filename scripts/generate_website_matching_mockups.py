import os
import math
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance, ImageOps

os.makedirs('public/images/mockups/enchanted-liquid-gold-glitter-acrylic-photo-frame', exist_ok=True)
os.makedirs('public/images/mockups/sparkling-diamond-glitter-wedding-photo-frame', exist_ok=True)
os.makedirs('public/images/mockups/motorized-360-rotating-led-cylinder-photo-lamp', exist_ok=True)
os.makedirs('public/images/mockups/crystal-tower-hexagonal-rotating-photo-lamp', exist_ok=True)

IVORY_BG = (249, 248, 244) # Exact background matching other primary-square.jpg files

def make_clean_card_mockup(art_path, out_path, is_landscape=False, target_w=820, target_h=1080):
    """
    Creates a clean 1200x1200 product card mockup matching the rest of the website:
    Pristine real photo centered on #F9F8F4 warm ivory background with soft drop shadow.
    NO cartoon stars, NO doodle overlays, pure authentic presentation.
    """
    canvas = Image.new("RGB", (1200, 1200), IVORY_BG)
    art = Image.open(art_path).convert("RGBA")
    
    # Resize artwork with high-quality antialiasing
    art_w, art_h = art.size
    aspect = art_w / art_h
    
    if is_landscape:
        fit_w = 1060
        fit_h = int(fit_w / aspect)
        if fit_h > 820:
            fit_h = 820
            fit_w = int(fit_h * aspect)
    else:
        fit_h = 1060
        fit_w = int(fit_h * aspect)
        if fit_w > 860:
            fit_w = 860
            fit_h = int(fit_w / aspect)
            
    art_resized = art.resize((fit_w, fit_h), Image.Resampling.LANCZOS)
    
    # Create soft realistic drop shadow
    shadow = Image.new("RGBA", (1200, 1200), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow)
    
    x0 = (1200 - fit_w) // 2
    y0 = (1200 - fit_h) // 2
    
    # Shadow rectangle offset downwards by 14px
    s_offset_y = 14
    s_draw.rectangle(
        [x0 - 4, y0 + s_offset_y - 2, x0 + fit_w + 4, y0 + fit_h + s_offset_y + 4],
        fill=(0, 0, 0, 95)
    )
    # Gaussian blur the shadow
    shadow = shadow.filter(ImageFilter.GaussianBlur(22))
    
    # Composite shadow onto canvas
    canvas_rgba = canvas.convert("RGBA")
    canvas_rgba = Image.alpha_composite(canvas_rgba, shadow)
    
    # Subtle 1px crisp acrylic border around photo
    art_bordered = art_resized.copy()
    b_draw = ImageDraw.Draw(art_bordered)
    b_draw.rectangle([0, 0, fit_w - 1, fit_h - 1], outline=(230, 225, 215, 120), width=1)
    
    # Paste artwork onto canvas
    canvas_rgba.paste(art_bordered, (x0, y0), art_bordered)
    
    # Convert to RGB and save
    final_img = canvas_rgba.convert("RGB")
    final_img.save(out_path, "JPEG", quality=96, optimize=True)
    print(f"Generated clean card mockup: {out_path} ({final_img.size})")

def make_clean_rotating_cylinder_card(out_path):
    """
    Creates an authentic, high-end studio e-commerce shot of the 360° Rotating Cylinder Lamp.
    Clean tabletop, warm 3000K internal illumination, real photo panels, NO cartoon arrows or doodle text.
    """
    W, H = 1200, 1200
    # Clean studio vignette background
    base = Image.new("RGBA", (W, H), (16, 8, 14, 255))
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    cx, cy = W // 2, int(H * 0.44)
    max_r = int(math.hypot(W, H) * 0.55)
    for r in range(max_r, 0, -8):
        factor = r / max_r
        cr = int(45 * (1 - factor) + 16 * factor)
        cg = int(22 * (1 - factor) + 8 * factor)
        cb = int(32 * (1 - factor) + 14 * factor)
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(cr, cg, cb, 255))
    base = Image.alpha_composite(base, overlay)
    
    # Dark polished wood table surface
    table_y = 820
    table = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    t_draw = ImageDraw.Draw(table)
    for y in range(table_y, H):
        progress = (y - table_y) / (H - table_y)
        r = int(28 * (0.8 + 0.4 * (1 - progress)))
        g = int(16 * (0.8 + 0.4 * (1 - progress)))
        b = int(12 * (0.8 + 0.4 * (1 - progress)))
        t_draw.line([(0, y), (W, y)], fill=(r, g, b, 255))
    t_draw.line([(0, table_y), (W, table_y)], fill=(110, 75, 45, 160), width=2)
    base = Image.alpha_composite(base, table)
    
    # Table contact shadow and warm ambient light pool
    shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow)
    s_draw.ellipse([320, 800, 880, 910], fill=(0, 0, 0, 180))
    shadow = shadow.filter(ImageFilter.GaussianBlur(28))
    base = Image.alpha_composite(base, shadow)
    
    glow_table = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    g_draw = ImageDraw.Draw(glow_table)
    g_draw.ellipse([270, 785, 930, 900], fill=(255, 185, 65, 80))
    glow_table = glow_table.filter(ImageFilter.GaussianBlur(40))
    base = Image.alpha_composite(base, glow_table)
    
    # 3D Cylinder Lamp Dimensions
    cyl_w = 480
    cyl_h = 580
    cyl_x = (W - cyl_w) // 2
    cyl_y = 240
    
    cyl_canvas = Image.new("RGBA", (cyl_w, cyl_h), (0, 0, 0, 255))
    
    # Real photos
    img_couple = Image.open('public/images/wall-decor/products/custom/couple-wedding-keepsake.jpg').convert('RGBA')
    img_family = Image.open('public/images/wall-decor/products/custom/family-heirloom-frame.jpg').convert('RGBA')
    img_portrait = Image.open('public/images/collections/custom-portrait-frame.jpg').convert('RGBA')
    
    # Left curved panel
    left_w = int(cyl_w * 0.28)
    fam_crop = img_family.resize((left_w, cyl_h), Image.Resampling.LANCZOS)
    cyl_canvas.paste(fam_crop, (0, 0))
    
    # Center hero panel
    center_w = int(cyl_w * 0.52)
    center_x = int(cyl_w * 0.24)
    c_w, c_h = img_couple.size
    couple_crop = img_couple.crop((int(c_w * 0.08), int(c_h * 0.08), int(c_w * 0.92), int(c_h * 0.88)))
    couple_resized = couple_crop.resize((center_w, cyl_h), Image.Resampling.LANCZOS)
    cyl_canvas.paste(couple_resized, (center_x, 0))
    
    # Right curved panel
    right_w = int(cyl_w * 0.28)
    right_x = cyl_w - right_w
    p_w, p_h = img_portrait.size
    port_crop = img_portrait.crop((int(p_w * 0.1), int(p_h * 0.05), int(p_w * 0.9), int(p_h * 0.85)))
    port_resized = port_crop.resize((right_w, cyl_h), Image.Resampling.LANCZOS)
    cyl_canvas.paste(port_resized, (right_x, 0))
    
    # Warm 3000K internal backlighting glow
    warm_tint = Image.new("RGBA", (cyl_w, cyl_h), (255, 205, 95, 80))
    cyl_canvas = Image.alpha_composite(cyl_canvas, warm_tint)
    
    # Cylindrical curvature shading
    shading = Image.new("RGBA", (cyl_w, cyl_h), (0, 0, 0, 0))
    sh_draw = ImageDraw.Draw(shading)
    for x in range(cyl_w):
        norm_x = (x / cyl_w) * 2 - 1
        norm_x = max(-1.0, min(1.0, norm_x))
        cos_val = math.cos(norm_x * (math.pi / 2))
        edge_shadow = int(175 * (1 - cos_val))
        sh_draw.line([(x, 0), (x, cyl_h)], fill=(12, 4, 6, edge_shadow))
    cyl_canvas = Image.alpha_composite(cyl_canvas, shading)
    
    # Glossy specular vertical reflections
    specular = Image.new("RGBA", (cyl_w, cyl_h), (0, 0, 0, 0))
    sp_draw = ImageDraw.Draw(specular)
    sp_x = int(cyl_w * 0.22)
    for dx in range(-14, 15):
        alpha = int(85 * (1 - abs(dx) / 14))
        sp_draw.line([(sp_x + dx, 0), (sp_x + dx, cyl_h)], fill=(255, 255, 255, alpha))
    sp_x2 = int(cyl_w * 0.78)
    for dx in range(-9, 10):
        alpha = int(40 * (1 - abs(dx) / 9))
        sp_draw.line([(sp_x2 + dx, 0), (sp_x2 + dx, cyl_h)], fill=(255, 245, 220, alpha))
    cyl_canvas = Image.alpha_composite(cyl_canvas, specular)
    
    # Paste cylinder body onto base
    base.paste(cyl_canvas, (cyl_x, cyl_y))
    
    # Realistic turned wooden cap and motorized base
    hw = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    hw_draw = ImageDraw.Draw(hw)
    
    cap_rx = cyl_w // 2 + 10
    cap_ry = 30
    cap_cx = W // 2
    cap_cy = cyl_y
    
    # Top Cap (Wooden disc with brass rim)
    hw_draw.ellipse([cap_cx - cap_rx, cap_cy - cap_ry, cap_cx + cap_rx, cap_cy + cap_ry], fill=(195, 145, 55, 255))
    hw_draw.ellipse([cap_cx - cap_rx + 4, cap_cy - cap_ry + 4, cap_cx + cap_rx - 4, cap_cy + cap_ry - 4], fill=(50, 26, 18, 255))
    hw_draw.ellipse([cap_cx - cap_rx + 16, cap_cy - cap_ry + 8, cap_cx + cap_rx - 16, cap_cy + cap_ry - 8], fill=(85, 48, 30, 210))
    
    # Motorized Base Pedestal
    base_rx = cyl_w // 2 + 26
    base_ry = 40
    base_cy = cyl_y + cyl_h
    base_h = 60
    
    hw_draw.rectangle([cap_cx - base_rx, base_cy, cap_cx + base_rx, base_cy + base_h], fill=(38, 20, 14, 255))
    hw_draw.ellipse([cap_cx - cyl_w // 2 - 5, base_cy - 18, cap_cx + cyl_w // 2 + 5, base_cy + 18], fill=(215, 165, 65, 255))
    hw_draw.ellipse([cap_cx - cyl_w // 2 - 2, base_cy - 15, cap_cx + cyl_w // 2 + 2, base_cy + 15], fill=(28, 14, 10, 255))
    
    hw_draw.ellipse([cap_cx - base_rx, base_cy + base_h - base_ry // 2, cap_cx + base_rx, base_cy + base_h + base_ry // 2], fill=(24, 12, 8, 255))
    hw_draw.arc([cap_cx - base_rx, base_cy + base_h - base_ry // 2, cap_cx + base_rx, base_cy + base_h + base_ry // 2], 0, 180, fill=(215, 165, 65, 255), width=3)
    
    # Soft radiant internal warm glow
    bulb_glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    b_draw = ImageDraw.Draw(bulb_glow)
    b_draw.ellipse([cap_cx - 300, cyl_y - 30, cap_cx + 300, cyl_y + cyl_h + 80], fill=(255, 195, 80, 40))
    bulb_glow = bulb_glow.filter(ImageFilter.GaussianBlur(35))
    
    base = Image.alpha_composite(base, bulb_glow)
    base = Image.alpha_composite(base, hw)
    
    final_img = base.convert("RGB")
    final_img.save(out_path, "JPEG", quality=96, optimize=True)
    print(f"Generated clean rotating cylinder card: {out_path} ({final_img.size})")

def make_clean_hexagonal_tower_card(out_path):
    """
    Creates an authentic studio e-commerce shot of the Hexagonal Rotating Tower Lamp.
    Clean studio setting, realistic faceted perspective, solid walnut base, warm 3000K glow.
    """
    W, H = 1200, 1200
    base = Image.new("RGBA", (W, H), (14, 7, 16, 255))
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    cx, cy = W // 2, int(H * 0.44)
    max_r = int(math.hypot(W, H) * 0.55)
    for r in range(max_r, 0, -8):
        factor = r / max_r
        cr = int(48 * (1 - factor) + 14 * factor)
        cg = int(24 * (1 - factor) + 7 * factor)
        cb = int(36 * (1 - factor) + 16 * factor)
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(cr, cg, cb, 255))
    base = Image.alpha_composite(base, overlay)
    
    table_y = 820
    table = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    t_draw = ImageDraw.Draw(table)
    for y in range(table_y, H):
        progress = (y - table_y) / (H - table_y)
        r = int(30 * (0.8 + 0.4 * (1 - progress)))
        g = int(18 * (0.8 + 0.4 * (1 - progress)))
        b = int(14 * (0.8 + 0.4 * (1 - progress)))
        t_draw.line([(0, y), (W, y)], fill=(r, g, b, 255))
    t_draw.line([(0, table_y), (W, table_y)], fill=(120, 85, 50, 160), width=2)
    base = Image.alpha_composite(base, table)
    
    # Shadow and warm glow on table
    shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow)
    s_draw.ellipse([340, 800, 860, 910], fill=(0, 0, 0, 180))
    shadow = shadow.filter(ImageFilter.GaussianBlur(28))
    base = Image.alpha_composite(base, shadow)
    
    glow_table = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    g_draw = ImageDraw.Draw(glow_table)
    g_draw.ellipse([290, 785, 910, 900], fill=(255, 185, 65, 80))
    glow_table = glow_table.filter(ImageFilter.GaussianBlur(40))
    base = Image.alpha_composite(base, glow_table)
    
    # Hexagonal geometry
    t_top = 230
    t_bottom = 810
    t_height = t_bottom - t_top
    
    x_left = 370
    x_mid = 600
    x_right = 830
    
    # Facet 1 (Left): Couple wedding keepsake
    img_left = Image.open('public/images/wall-decor/products/custom/couple-wedding-keepsake.jpg').convert('RGBA')
    lw, lh = img_left.size
    crop_l = img_left.crop((int(lw * 0.1), int(lh * 0.08), int(lw * 0.9), int(lh * 0.88)))
    f1_w = x_mid - x_left
    facet1 = crop_l.resize((f1_w, t_height), Image.Resampling.LANCZOS)
    
    # Left facet shading
    f1_shade = Image.new("RGBA", (f1_w, t_height), (0, 0, 0, 45))
    f1_warm = Image.new("RGBA", (f1_w, t_height), (255, 205, 90, 75))
    facet1 = Image.alpha_composite(facet1, f1_warm)
    facet1 = Image.alpha_composite(facet1, f1_shade)
    base.paste(facet1, (x_left, t_top))
    
    # Facet 2 (Right): Family heirloom frame
    img_right = Image.open('public/images/wall-decor/products/custom/family-heirloom-frame.jpg').convert('RGBA')
    rw, rh = img_right.size
    crop_r = img_right.crop((int(rw * 0.15), 0, int(rw * 0.85), rh))
    f2_w = x_right - x_mid
    facet2 = crop_r.resize((f2_w, t_height), Image.Resampling.LANCZOS)
    
    f2_shade = Image.new("RGBA", (f2_w, t_height), (0, 0, 0, 15))
    f2_warm = Image.new("RGBA", (f2_w, t_height), (255, 215, 105, 85))
    facet2 = Image.alpha_composite(facet2, f2_warm)
    facet2 = Image.alpha_composite(facet2, f2_shade)
    base.paste(facet2, (x_mid, t_top))
    
    # Facet border bevel lines & highlights
    lines = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    l_draw = ImageDraw.Draw(lines)
    # Center ridge
    for dx in range(-3, 4):
        a = int(120 * (1 - abs(dx) / 3))
        l_draw.line([(x_mid + dx, t_top), (x_mid + dx, t_bottom)], fill=(255, 250, 220, a))
    # Left & right outer edges
    l_draw.line([(x_left, t_top), (x_left, t_bottom)], fill=(20, 8, 12, 180), width=2)
    l_draw.line([(x_right, t_top), (x_right, t_bottom)], fill=(20, 8, 12, 180), width=2)
    
    # Hexagonal Cap (Solid walnut polygon)
    cap_poly = [
        (cx, t_top - 38),
        (x_right + 10, t_top - 12),
        (x_mid, t_top),
        (x_left - 10, t_top - 12)
    ]
    l_draw.polygon(cap_poly, fill=(58, 32, 22, 255), outline=(215, 165, 65, 255))
    
    # Hexagonal Base
    base_poly_top = [
        (x_left - 20, t_bottom),
        (x_mid, t_bottom + 14),
        (x_right + 20, t_bottom),
        (x_right + 20, t_bottom + 55),
        (x_mid, t_bottom + 70),
        (x_left - 20, t_bottom + 55)
    ]
    l_draw.polygon(base_poly_top, fill=(40, 22, 16, 255), outline=(215, 165, 65, 255))
    l_draw.line([(x_mid, t_bottom + 14), (x_mid, t_bottom + 70)], fill=(215, 165, 65, 200), width=2)
    
    # Warm internal illumination
    bulb_glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    b_draw = ImageDraw.Draw(bulb_glow)
    b_draw.ellipse([cx - 280, t_top - 20, cx + 280, t_bottom + 70], fill=(255, 195, 80, 40))
    bulb_glow = bulb_glow.filter(ImageFilter.GaussianBlur(35))
    
    base = Image.alpha_composite(base, bulb_glow)
    base = Image.alpha_composite(base, lines)
    
    final_img = base.convert("RGB")
    final_img.save(out_path, "JPEG", quality=96, optimize=True)
    print(f"Generated clean hexagonal tower card: {out_path} ({final_img.size})")

def make_room_mockup(art_path, out_path, lifestyle_path='public/images/lifestyle/living-room.jpg'):
    """
    Composites the artwork into a realistic room interior mockup matching the other products.
    """
    room = Image.open(lifestyle_path).convert("RGBA")
    art = Image.open(art_path).convert("RGBA")
    rw, rh = room.size # 1376, 768
    
    # Frame placement box on living room wall above sofa
    # Centered at x=950, y=340
    frame_h = 320
    aspect = art.size[0] / art.size[1]
    frame_w = int(frame_h * aspect)
    if frame_w > 400:
        frame_w = 400
        frame_h = int(frame_w / aspect)
        
    x_pos = 960 - (frame_w // 2)
    y_pos = 290 - (frame_h // 2)
    
    # Shadow on wall
    shadow = Image.new("RGBA", (rw, rh), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow)
    s_draw.rectangle([x_pos - 8, y_pos - 4, x_pos + frame_w + 8, y_pos + frame_h + 16], fill=(0, 0, 0, 110))
    shadow = shadow.filter(ImageFilter.GaussianBlur(14))
    room = Image.alpha_composite(room, shadow)
    
    # Resize artwork and paste
    art_resized = art.resize((frame_w, frame_h), Image.Resampling.LANCZOS)
    b_draw = ImageDraw.Draw(art_resized)
    b_draw.rectangle([0, 0, frame_w - 1, frame_h - 1], outline=(230, 220, 205, 140), width=1)
    
    room.paste(art_resized, (x_pos, y_pos), art_resized)
    
    room.convert("RGB").save(out_path, "JPEG", quality=92, optimize=True)
    print(f"Generated room mockup: {out_path}")

print("--- GENERATING MOCKUPS SUITE ---")

# 1. Enchanted Liquid Gold Glitter Acrylic Photo Frame
# Art: bride and groom hands with gold embroidery & wedding rings
art_gold = 'public/images/collections/custom-led-photo-frame.jpg'
out_gold_dir = 'public/images/mockups/enchanted-liquid-gold-glitter-acrylic-photo-frame'
make_clean_card_mockup(art_gold, f"{out_gold_dir}/primary-square.jpg", is_landscape=False)
make_room_mockup(art_gold, f"{out_gold_dir}/mockup-living-room.jpg", 'public/images/lifestyle/living-room.jpg')
make_room_mockup(art_gold, f"{out_gold_dir}/mockup-interior.jpg", 'public/images/lifestyle/master-suite.jpg')
make_room_mockup(art_gold, f"{out_gold_dir}/mockup-foyer.jpg", 'public/images/lifestyle/entrance-foyer.jpg')
make_clean_card_mockup(art_gold, f"{out_gold_dir}/mockup-detail.jpg", is_landscape=False)
make_clean_card_mockup(art_gold, f"{out_gold_dir}/mockup-artistic.jpg", is_landscape=False)

# 2. Sparkling Diamond Glitter Anniversary & Couple Photo Frame
# Art: radiant bride smiling with diamond & gold jewelry
art_diamond = 'public/images/wall-decor/products/custom/round-crystal-frame.jpg'
out_dia_dir = 'public/images/mockups/sparkling-diamond-glitter-wedding-photo-frame'
make_clean_card_mockup(art_diamond, f"{out_dia_dir}/primary-square.jpg", is_landscape=False)
make_room_mockup(art_diamond, f"{out_dia_dir}/mockup-living-room.jpg", 'public/images/lifestyle/living-room.jpg')
make_room_mockup(art_diamond, f"{out_dia_dir}/mockup-interior.jpg", 'public/images/lifestyle/master-suite.jpg')
make_room_mockup(art_diamond, f"{out_dia_dir}/mockup-foyer.jpg", 'public/images/lifestyle/entrance-foyer.jpg')
make_clean_card_mockup(art_diamond, f"{out_dia_dir}/mockup-detail.jpg", is_landscape=False)
make_clean_card_mockup(art_diamond, f"{out_dia_dir}/mockup-artistic.jpg", is_landscape=False)

# 3. Motorized 360 Rotating LED Cylinder Photo Lamp
out_cyl_dir = 'public/images/mockups/motorized-360-rotating-led-cylinder-photo-lamp'
make_clean_rotating_cylinder_card(f"{out_cyl_dir}/primary-square.jpg")
make_clean_rotating_cylinder_card(f"{out_cyl_dir}/mockup-living-room.jpg")
make_clean_rotating_cylinder_card(f"{out_cyl_dir}/mockup-interior.jpg")
make_clean_rotating_cylinder_card(f"{out_cyl_dir}/mockup-foyer.jpg")
make_clean_rotating_cylinder_card(f"{out_cyl_dir}/mockup-detail.jpg")
make_clean_rotating_cylinder_card(f"{out_cyl_dir}/mockup-artistic.jpg")

# 4. Crystal Tower Hexagonal Rotating Photo Lamp
out_hex_dir = 'public/images/mockups/crystal-tower-hexagonal-rotating-photo-lamp'
make_clean_hexagonal_tower_card(f"{out_hex_dir}/primary-square.jpg")
make_clean_hexagonal_tower_card(f"{out_hex_dir}/mockup-living-room.jpg")
make_clean_hexagonal_tower_card(f"{out_hex_dir}/mockup-interior.jpg")
make_clean_hexagonal_tower_card(f"{out_hex_dir}/mockup-foyer.jpg")
make_clean_hexagonal_tower_card(f"{out_hex_dir}/mockup-detail.jpg")
make_clean_hexagonal_tower_card(f"{out_hex_dir}/mockup-artistic.jpg")

# Also copy primary-square.jpg to public/images/products/... for backward compatibility
import shutil
shutil.copyfile(f"{out_gold_dir}/primary-square.jpg", "public/images/products/prod-glitter-gold-photo-frame/primary-square.jpg")
shutil.copyfile(f"{out_dia_dir}/primary-square.jpg", "public/images/products/prod-sparkling-diamond-glitter-frame/primary-square.jpg")
shutil.copyfile(f"{out_cyl_dir}/primary-square.jpg", "public/images/products/prod-motorized-rotating-photo-lamp/primary-square.jpg")
shutil.copyfile(f"{out_hex_dir}/primary-square.jpg", "public/images/products/prod-hexagonal-tower-rotating-lamp/primary-square.jpg")

# Category banners
shutil.copyfile(f"{out_gold_dir}/primary-square.jpg", "public/images/wall-decor/categories/custom-frames/glitter-photo-frames-category.jpg")
shutil.copyfile(f"{out_cyl_dir}/primary-square.jpg", "public/images/wall-decor/categories/custom-frames/rotating-photo-lamps-category.jpg")

print("SUCCESS: All mockups generated and copied!")
