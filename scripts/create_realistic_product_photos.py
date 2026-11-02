import math
import random
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance, ImageOps

# Set random seed for repeatable sparkle generation
random.seed(42)

def make_vignette(width, height, color=(15, 6, 12), center_color=(45, 18, 30)):
    """Create a realistic studio vignette background"""
    bg = Image.new("RGBA", (width, height), color)
    overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    
    cx, cy = width // 2, int(height * 0.45)
    max_r = int(math.hypot(width, height) * 0.55)
    
    for r in range(max_r, 0, -8):
        factor = r / max_r
        # Interpolate between center_color and color
        cr = int(center_color[0] * (1 - factor) + color[0] * factor)
        cg = int(center_color[1] * (1 - factor) + color[1] * factor)
        cb = int(center_color[2] * (1 - factor) + color[2] * factor)
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(cr, cg, cb, 255))
        
    return overlay

def add_table_surface(im, table_y=680, wood_color=(35, 20, 15)):
    """Add a realistic dark polished wooden table surface in the foreground"""
    w, h = im.size
    table = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(table)
    
    # Table gradient
    for y in range(table_y, h):
        progress = (y - table_y) / (h - table_y)
        r = int(wood_color[0] * (0.8 + 0.4 * (1 - progress)))
        g = int(wood_color[1] * (0.8 + 0.4 * (1 - progress)))
        b = int(wood_color[2] * (0.8 + 0.4 * (1 - progress)))
        draw.line([(0, y), (w, y)], fill=(r, g, b, 255))
        
    # Table edge highlight line
    draw.line([(0, table_y), (w, table_y)], fill=(120, 80, 50, 180), width=2)
    return Image.alpha_composite(im, table)

# =========================================================================
# 1. MOTORIZED 360° ROTATING CYLINDER PHOTO LAMP
# =========================================================================
def create_cylinder_rotating_lamp():
    print("Generating realistic Motorized Cylindrical Photo Lamp...")
    W, H = 1000, 1000
    base = make_vignette(W, H, color=(12, 5, 15), center_color=(38, 16, 32))
    base = add_table_surface(base, table_y=710, wood_color=(28, 16, 12))
    
    # Contact shadow on table
    shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow)
    s_draw.ellipse([260, 690, 740, 780], fill=(0, 0, 0, 160))
    shadow = shadow.filter(ImageFilter.GaussianBlur(25))
    base = Image.alpha_composite(base, shadow)
    
    # Ambient warm glow on table
    glow_table = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    g_draw = ImageDraw.Draw(glow_table)
    g_draw.ellipse([220, 680, 780, 770], fill=(255, 180, 60, 80))
    glow_table = glow_table.filter(ImageFilter.GaussianBlur(35))
    base = Image.alpha_composite(base, glow_table)

    # 3D Cylinder geometry
    cyl_w = 420
    cyl_h = 490
    cyl_x = (W - cyl_w) // 2  # 290
    cyl_y = 220
    
    # Load and composite 3 real photo panels onto the cylinder
    # Center hero: Couple wedding keepsake
    img_couple = Image.open('public/images/wall-decor/products/custom/couple-wedding-keepsake.jpg').convert('RGBA')
    # Left: Family heirloom
    img_family = Image.open('public/images/wall-decor/products/custom/family-heirloom-frame.jpg').convert('RGBA')
    # Right: Custom portrait
    img_portrait = Image.open('public/images/wall-decor/products/custom/custom-portrait-frame.jpg').convert('RGBA')
    
    # Cylinder canvas (contains all panels before cylindrical shading)
    cyl_canvas = Image.new("RGBA", (cyl_w, cyl_h), (0, 0, 0, 255))
    
    # Left panel (compressed horizontally to simulate cylinder curvature)
    left_w = int(cyl_w * 0.28)
    fam_crop = img_family.resize((left_w, cyl_h), Image.Resampling.LANCZOS)
    cyl_canvas.paste(fam_crop, (0, 0))
    
    # Center panel (wide, prominent hero view)
    center_w = int(cyl_w * 0.52)
    center_x = int(cyl_w * 0.24)
    # Crop couple smartly around bride and groom
    c_w, c_h = img_couple.size
    couple_crop = img_couple.crop((int(c_w * 0.1), int(c_h * 0.1), int(c_w * 0.9), int(c_h * 0.85)))
    couple_resized = couple_crop.resize((center_w, cyl_h), Image.Resampling.LANCZOS)
    cyl_canvas.paste(couple_resized, (center_x, 0))
    
    # Right panel (compressed horizontally to simulate cylinder curvature)
    right_w = int(cyl_w * 0.28)
    right_x = cyl_w - right_w
    port_crop = img_portrait.resize((right_w, cyl_h), Image.Resampling.LANCZOS)
    cyl_canvas.paste(port_crop, (right_x, 0))
    
    # Apply warm 3000K internal backlighting glow to photos
    warm_tint = Image.new("RGBA", (cyl_w, cyl_h), (255, 200, 90, 85))
    cyl_canvas = Image.alpha_composite(cyl_canvas, warm_tint)
    
    # Cylindrical 3D lighting mask (shading edges, highlighting center)
    shading = Image.new("RGBA", (cyl_w, cyl_h), (0, 0, 0, 0))
    sh_draw = ImageDraw.Draw(shading)
    for x in range(cyl_w):
        # Angle across cylinder: -pi/2 to pi/2
        norm_x = (x / cyl_w) * 2 - 1  # -1 to 1
        norm_x = max(-1.0, min(1.0, norm_x))
        cos_val = math.cos(norm_x * (math.pi / 2))  # 1 in center, 0 at edges
        
        # Shadow on extreme edges
        edge_shadow = int(180 * (1 - cos_val))
        sh_draw.line([(x, 0), (x, cyl_h)], fill=(10, 3, 5, edge_shadow))
        
    cyl_canvas = Image.alpha_composite(cyl_canvas, shading)
    
    # Add glossy specular vertical reflections
    specular = Image.new("RGBA", (cyl_w, cyl_h), (0, 0, 0, 0))
    sp_draw = ImageDraw.Draw(specular)
    # Bright specular highlight line on left-center
    sp_x = int(cyl_w * 0.22)
    for dx in range(-12, 13):
        alpha = int(90 * (1 - abs(dx) / 12))
        sp_draw.line([(sp_x + dx, 0), (sp_x + dx, cyl_h)], fill=(255, 255, 255, alpha))
        
    # Subtle secondary highlight on right
    sp_x2 = int(cyl_w * 0.78)
    for dx in range(-8, 9):
        alpha = int(45 * (1 - abs(dx) / 8))
        sp_draw.line([(sp_x2 + dx, 0), (sp_x2 + dx, cyl_h)], fill=(255, 245, 220, alpha))
        
    cyl_canvas = Image.alpha_composite(cyl_canvas, specular)
    
    # Create mask for cylinder with rounded elliptical top and bottom
    cyl_mask = Image.new("L", (cyl_w, cyl_h), 255)
    
    # Paste cylinder body onto base
    base.paste(cyl_canvas, (cyl_x, cyl_y), cyl_mask)
    
    # Draw Lamp Hardware: Top Wooden Cap and Motorized Base Pedestal
    hw = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    hw_draw = ImageDraw.Draw(hw)
    
    # Top Cap (Wooden disc with brass rim)
    cap_rx = cyl_w // 2 + 10
    cap_ry = 26
    cap_cx = W // 2
    cap_cy = cyl_y
    
    # Brass rim
    hw_draw.ellipse([cap_cx - cap_rx, cap_cy - cap_ry, cap_cx + cap_rx, cap_cy + cap_ry], fill=(190, 140, 50, 255))
    hw_draw.ellipse([cap_cx - cap_rx + 4, cap_cy - cap_ry + 4, cap_cx + cap_rx - 4, cap_cy + cap_ry - 4], fill=(55, 30, 20, 255))
    # Cap highlight
    hw_draw.ellipse([cap_cx - cap_rx + 15, cap_cy - cap_ry + 8, cap_cx + cap_rx - 15, cap_cy + cap_ry - 8], fill=(95, 55, 35, 200))
    
    # Bottom Motorized Base Pedestal
    base_rx = cyl_w // 2 + 25
    base_ry = 36
    base_cy = cyl_y + cyl_h
    base_height = 55
    
    # Base cylinder body
    hw_draw.rectangle([cap_cx - base_rx, base_cy, cap_cx + base_rx, base_cy + base_height], fill=(42, 22, 16, 255))
    # Brass collar at top of base
    hw_draw.ellipse([cap_cx - cyl_w // 2 - 5, base_cy - 18, cap_cx + cyl_w // 2 + 5, base_cy + 18], fill=(210, 160, 60, 255))
    hw_draw.ellipse([cap_cx - cyl_w // 2 - 2, base_cy - 15, cap_cx + cyl_w // 2 + 2, base_cy + 15], fill=(30, 15, 10, 255))
    
    # Bottom base rim
    hw_draw.ellipse([cap_cx - base_rx, base_cy + base_height - base_ry // 2, cap_cx + base_rx, base_cy + base_height + base_ry // 2], fill=(28, 14, 10, 255))
    # Brass trim ring at bottom
    hw_draw.arc([cap_cx - base_rx, base_cy + base_height - base_ry // 2, cap_cx + base_rx, base_cy + base_height + base_ry // 2], 0, 180, fill=(210, 160, 60, 255), width=3)
    
    # Touch sensor button on base
    hw_draw.ellipse([cap_cx - 14, base_cy + 22, cap_cx + 14, base_cy + 42], fill=(210, 160, 60, 255))
    hw_draw.ellipse([cap_cx - 10, base_cy + 25, cap_cx + 10, base_cy + 39], fill=(255, 240, 180, 255))
    
    # Radiating warm glow from inside cylinder
    bulb_glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    b_draw = ImageDraw.Draw(bulb_glow)
    b_draw.ellipse([cap_cx - 280, cyl_y - 30, cap_cx + 280, cyl_y + cyl_h + 80], fill=(255, 190, 75, 45))
    b_draw.ellipse([cap_cx - 160, cyl_y + 80, cap_cx + 160, cyl_y + cyl_h - 40], fill=(255, 220, 120, 40))
    bulb_glow = bulb_glow.filter(ImageFilter.GaussianBlur(30))
    
    base = Image.alpha_composite(base, bulb_glow)
    base = Image.alpha_composite(base, hw)
    
    # Add subtle rotation indicator curve at bottom
    rot_ring = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    r_draw = ImageDraw.Draw(rot_ring)
    r_draw.arc([cap_cx - base_rx - 45, base_cy + base_height - 15, cap_cx + base_rx + 45, base_cy + base_height + 45], 20, 160, fill=(240, 190, 80, 200), width=3)
    # Arrow head
    r_draw.polygon([(cap_cx + base_rx + 40, base_cy + base_height + 15), (cap_cx + base_rx + 58, base_cy + base_height + 25), (cap_cx + base_rx + 42, base_cy + base_height + 35)], fill=(240, 190, 80, 220))
    base = Image.alpha_composite(base, rot_ring)

    final_rgb = base.convert('RGB')
    out_path = 'public/images/products/prod-motorized-rotating-photo-lamp/primary-square.jpg'
    final_rgb.save(out_path, 'JPEG', quality=95)
    out_cat = 'public/images/wall-decor/categories/custom-frames/rotating-photo-lamps-category.jpg'
    final_rgb.save(out_cat, 'JPEG', quality=95)
    print(f"Saved: {out_path} and {out_cat}")

# =========================================================================
# 2. CRYSTAL TOWER HEXAGONAL ROTATING PHOTO LAMP
# =========================================================================
def create_hexagonal_tower_lamp():
    print("Generating realistic Crystal Tower Hexagonal Lamp...")
    W, H = 1000, 1000
    base = make_vignette(W, H, color=(14, 8, 5), center_color=(42, 22, 14))
    base = add_table_surface(base, table_y=710, wood_color=(32, 18, 12))
    
    # Shadow and warm light pool
    shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow)
    s_draw.polygon([(260, 715), (740, 715), (820, 785), (180, 785)], fill=(0, 0, 0, 170))
    shadow = shadow.filter(ImageFilter.GaussianBlur(28))
    base = Image.alpha_composite(base, shadow)
    
    glow_table = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    g_draw = ImageDraw.Draw(glow_table)
    g_draw.ellipse([200, 680, 800, 790], fill=(255, 175, 50, 75))
    glow_table = glow_table.filter(ImageFilter.GaussianBlur(38))
    base = Image.alpha_composite(base, glow_table)

    # 3D Hexagonal Tower Facets
    # Left Facet: Family portrait
    img_family = Image.open('public/images/wall-decor/products/custom/family-heirloom-frame.jpg').convert('RGBA')
    # Right/Center Facet: Couple wedding keepsake
    img_couple = Image.open('public/images/wall-decor/products/custom/couple-wedding-keepsake.jpg').convert('RGBA')
    
    facet_h = 470
    tower_y = 220
    cx = W // 2  # 500
    
    # Left facet dimensions
    left_x1, left_y1 = cx - 180, tower_y + 40
    left_x2, left_y2 = cx, tower_y + 70
    left_x3, left_y3 = cx, tower_y + facet_h + 30
    left_x4, left_y4 = cx - 180, tower_y + facet_h
    
    # Right facet dimensions
    right_x1, right_y1 = cx, tower_y + 70
    right_x2, right_y2 = cx + 180, tower_y + 40
    right_x3, right_y3 = cx + 180, tower_y + facet_h
    right_x4, right_y4 = cx, tower_y + facet_h + 30

    tower_img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    
    # Warp / resize photo for left facet
    f_w = int(img_family.width * 0.8)
    f_h = int(img_family.height * 0.8)
    fam_crop = img_family.crop((100, 50, f_w, f_h)).resize((180, facet_h), Image.Resampling.LANCZOS)
    # Apply warm backlight
    fam_warm = Image.alpha_composite(fam_crop, Image.new("RGBA", fam_crop.size, (255, 195, 80, 90)))
    # Darken slightly for perspective angle
    enhancer = ImageEnhance.Brightness(fam_warm)
    fam_shaded = enhancer.enhance(0.78)
    tower_img.paste(fam_shaded, (left_x1, left_y1))
    
    # Right facet with couple photo
    c_w, c_h = img_couple.width, img_couple.height
    coup_crop = img_couple.crop((int(c_w * 0.1), int(c_h * 0.1), int(c_w * 0.9), int(c_h * 0.85))).resize((180, facet_h), Image.Resampling.LANCZOS)
    coup_warm = Image.alpha_composite(coup_crop, Image.new("RGBA", coup_crop.size, (255, 210, 100, 85)))
    enhancer2 = ImageEnhance.Brightness(coup_warm)
    coup_shaded = enhancer2.enhance(0.95)
    tower_img.paste(coup_shaded, (right_x1, right_y2))

    # Mask to crisp hexagonal facet polygon
    mask = Image.new("L", (W, H), 0)
    m_draw = ImageDraw.Draw(mask)
    m_draw.polygon([(left_x1, left_y1), (left_x2, left_y2), (left_x3, left_y3), (left_x4, left_y4)], fill=255)
    m_draw.polygon([(right_x1, right_y1), (right_x2, right_y2), (right_x3, right_y3), (right_x4, right_y4)], fill=255)
    
    base.paste(tower_img, (0, 0), mask)
    
    # Facet Gold Edge Frames & Hardware
    edges = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    e_draw = ImageDraw.Draw(edges)
    
    # Gold beveled center ridge
    e_draw.line([(cx, tower_y + 70), (cx, tower_y + facet_h + 30)], fill=(240, 195, 80, 240), width=4)
    # Left outer ridge
    e_draw.line([(left_x1, left_y1), (left_x4, left_y4)], fill=(180, 130, 45, 220), width=4)
    # Right outer ridge
    e_draw.line([(right_x2, right_y2), (right_x3, right_y3)], fill=(240, 195, 80, 240), width=4)
    
    # Hexagonal Cap (Solid walnut wood with gold filigree)
    cap_poly = [(left_x1, left_y1), (cx, left_y1 - 35), (right_x2, right_y1), (cx, tower_y + 70)]
    e_draw.polygon(cap_poly, fill=(55, 30, 20, 255), outline=(220, 175, 70, 255))
    e_draw.polygon([(p[0], p[1] - 15) for p in cap_poly], fill=(85, 48, 30, 255), outline=(240, 195, 80, 255))
    
    # Heavy Hexagonal Rotating Base Pedestal
    ped_poly_top = [(left_x4 - 25, left_y4), (cx, left_y3 + 18), (right_x3 + 25, right_y3)]
    ped_poly_bot = [(left_x4 - 25, left_y4 + 55), (cx, left_y3 + 73), (right_x3 + 25, right_y3 + 55)]
    
    # Pedestal front faces
    e_draw.polygon([(left_x4 - 25, left_y4), (cx, left_y3 + 18), (cx, left_y3 + 73), (left_x4 - 25, left_y4 + 55)], fill=(40, 20, 14, 255), outline=(190, 140, 50, 200))
    e_draw.polygon([(cx, left_y3 + 18), (right_x3 + 25, right_y3), (right_x3 + 25, right_y3 + 55), (cx, left_y3 + 73)], fill=(55, 28, 20, 255), outline=(220, 175, 70, 220))
    
    # Touch Sensor & Gold badge on pedestal
    e_draw.ellipse([cx - 12, left_y3 + 36, cx + 12, left_y3 + 58], fill=(220, 175, 70, 255))
    e_draw.ellipse([cx - 8, left_y3 + 39, cx + 8, left_y3 + 54], fill=(255, 240, 180, 255))

    # Glow from lamp
    glow_poly = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gp_draw = ImageDraw.Draw(glow_poly)
    gp_draw.ellipse([cx - 250, tower_y - 20, cx + 250, tower_y + facet_h + 80], fill=(255, 190, 75, 50))
    glow_poly = glow_poly.filter(ImageFilter.GaussianBlur(32))

    base = Image.alpha_composite(base, glow_poly)
    base = Image.alpha_composite(base, edges)

    final_rgb = base.convert('RGB')
    out_path = 'public/images/products/prod-hexagonal-tower-rotating-lamp/primary-square.jpg'
    final_rgb.save(out_path, 'JPEG', quality=95)
    print(f"Saved: {out_path}")

# =========================================================================
# 3. ENCHANTED LIQUID GOLD GLITTER ACRYLIC PHOTO FRAME
# =========================================================================
def create_gold_glitter_frame():
    print("Generating realistic Liquid Gold Glitter Frame...")
    W, H = 1000, 1000
    # Clean warm ivory/champagne luxury studio wall
    base = make_vignette(W, H, color=(240, 230, 218), center_color=(252, 247, 240))
    
    # Frame floating drop shadow on wall
    fx, fy = 160, 130
    fw, fh = 680, 740
    shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow)
    s_draw.rounded_rectangle([fx + 24, fy + 32, fx + fw + 24, fy + fh + 32], radius=24, fill=(50, 20, 28, 90))
    shadow = shadow.filter(ImageFilter.GaussianBlur(22))
    base = Image.alpha_composite(base, shadow)

    # Acrylic 4mm Cast Glass Border & Bevel
    frame_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    f_draw = ImageDraw.Draw(frame_layer)
    # Crystal clear beveled edge ring
    f_draw.rounded_rectangle([fx, fy, fx + fw, fy + fh], radius=24, fill=(255, 255, 255, 220), outline=(214, 170, 85, 255), width=3)
    
    # Insert High-Res Couple Photo inside frame
    img_couple = Image.open('public/images/wall-decor/products/custom/couple-wedding-keepsake.jpg').convert('RGBA')
    inner_pad = 22
    inner_w = fw - inner_pad * 2
    inner_h = fh - inner_pad * 2
    
    c_w, c_h = img_couple.size
    crop_box = (int(c_w * 0.05), int(c_h * 0.05), int(c_w * 0.95), int(c_h * 0.9))
    couple_resized = img_couple.crop(crop_box).resize((inner_w, inner_h), Image.Resampling.LANCZOS)
    
    # Photo mask with rounded inner corners
    p_mask = Image.new("L", (inner_w, inner_h), 0)
    pm_draw = ImageDraw.Draw(p_mask)
    pm_draw.rounded_rectangle([0, 0, inner_w, inner_h], radius=16, fill=255)
    
    base.paste(couple_resized, (fx + inner_pad, fy + inner_pad), p_mask)
    
    # ================= REALISTIC LIQUID GOLD GLITTER PARTICLES =================
    glitter_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    g_draw = ImageDraw.Draw(glitter_layer)
    
    # Hundreds of multi-sized shimmering metallic gold flakes and stars
    gold_colors = [
        (255, 245, 180, 255),  # Specular white-gold
        (255, 215, 64, 240),   # Bright yellow gold
        (240, 185, 45, 220),   # Rich gold
        (215, 150, 30, 200),   # Deep amber gold
        (255, 235, 140, 230),  # Champagne gold
    ]
    
    # Liquid cascade clustering: denser at bottom and floating upwards
    for _ in range(450):
        # Biased towards lower half and perimeter
        gx = random.randint(fx + inner_pad + 5, fx + fw - inner_pad - 5)
        # Weight y towards bottom
        gy_factor = math.pow(random.random(), 0.65)  # 0 to 1, biased to 1
        gy = int((fy + inner_pad) + gy_factor * inner_h)
        
        radius = random.choice([2, 2.5, 3, 4, 5, 6, 7])
        col = random.choice(gold_colors)
        
        # Draw glitter flake
        shape = random.choice(['circle', 'star', 'diamond', 'flake'])
        if shape == 'circle':
            g_draw.ellipse([gx - radius, gy - radius, gx + radius, gy + radius], fill=col)
        elif shape == 'diamond':
            g_draw.polygon([(gx, gy - radius * 1.5), (gx + radius, gy), (gx, gy + radius * 1.5), (gx - radius, gy)], fill=col)
        elif shape == 'star' and radius >= 4:
            # 4-point starburst
            r_long = radius * 2.2
            r_short = radius * 0.6
            g_draw.polygon([
                (gx, gy - r_long), (gx + r_short, gy - r_short),
                (gx + r_long, gy), (gx + r_short, gy + r_short),
                (gx, gy + r_long), (gx - r_short, gy + r_short),
                (gx - r_long, gy), (gx - r_short, gy - r_short)
            ], fill=col)
        else:
            g_draw.rectangle([gx - radius, gy - radius // 2, gx + radius, gy + radius // 2], fill=col)

    # Add soft glow to large sparkles
    glitter_glow = glitter_layer.filter(ImageFilter.GaussianBlur(3))
    base = Image.alpha_composite(base, glitter_glow)
    base = Image.alpha_composite(base, glitter_layer)
    
    # 4 Chrome Brushed Floating Standoff Corner Studs
    stud_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    st_draw = ImageDraw.Draw(stud_layer)
    corners = [
        (fx + 36, fy + 36),
        (fx + fw - 36, fy + 36),
        (fx + 36, fy + fh - 36),
        (fx + fw - 36, fy + fh - 36)
    ]
    for cx, cy in corners:
        # Chrome stud shadow
        st_draw.ellipse([cx - 15, cy - 13, cx + 19, cy + 21], fill=(0, 0, 0, 70))
        # Chrome body
        st_draw.ellipse([cx - 16, cy - 16, cx + 16, cy + 16], fill=(210, 215, 220, 255), outline=(150, 155, 160, 255), width=2)
        # Specular glint on stud
        st_draw.ellipse([cx - 12, cy - 12, cx + 2, cy + 2], fill=(255, 255, 255, 220))
        # Center screw socket
        st_draw.ellipse([cx - 5, cy - 5, cx + 5, cy + 5], fill=(130, 135, 140, 255))
        
    base = Image.alpha_composite(base, stud_layer)
    
    # Specular gloss sweep across acrylic glass surface
    gloss = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gl_draw = ImageDraw.Draw(gloss)
    gl_draw.polygon([
        (fx + 40, fy), (fx + 220, fy),
        (fx + 10, fy + fh), (fx - 150, fy + fh)
    ], fill=(255, 255, 255, 45))
    gloss = gloss.filter(ImageFilter.GaussianBlur(15))
    base = Image.alpha_composite(base, gloss)
    
    # 24K Gold Plaque Inscription Bar at bottom
    plaque = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    pq_draw = ImageDraw.Draw(plaque)
    pq_y = fy + fh - 75
    pq_draw.rounded_rectangle([fx + 80, pq_y, fx + fw - 80, pq_y + 45], radius=12, fill=(15, 4, 10, 210), outline=(214, 170, 85, 255), width=2)
    base = Image.alpha_composite(base, plaque)

    final_rgb = base.convert('RGB')
    out_path = 'public/images/products/prod-glitter-gold-photo-frame/primary-square.jpg'
    final_rgb.save(out_path, 'JPEG', quality=95)
    out_cat = 'public/images/wall-decor/categories/custom-frames/glitter-photo-frames-category.jpg'
    final_rgb.save(out_cat, 'JPEG', quality=95)
    print(f"Saved: {out_path} and {out_cat}")

# =========================================================================
# 4. SPARKLING DIAMOND GLITTER ANNIVERSARY & COUPLE PHOTO FRAME
# =========================================================================
def create_diamond_glitter_frame():
    print("Generating realistic Sparkling Diamond Glitter Frame...")
    W, H = 1000, 1000
    base = make_vignette(W, H, color=(235, 238, 245), center_color=(250, 252, 255))
    
    fx, fy = 160, 130
    fw, fh = 680, 740
    
    shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow)
    s_draw.rounded_rectangle([fx + 24, fy + 32, fx + fw + 24, fy + fh + 32], radius=24, fill=(20, 30, 50, 85))
    shadow = shadow.filter(ImageFilter.GaussianBlur(22))
    base = Image.alpha_composite(base, shadow)

    # Frame Border
    frame_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    f_draw = ImageDraw.Draw(frame_layer)
    f_draw.rounded_rectangle([fx, fy, fx + fw, fy + fh], radius=24, fill=(255, 255, 255, 230), outline=(140, 190, 230, 255), width=3)
    
    # Real Portrait inside
    img_portrait = Image.open('public/images/wall-decor/products/custom/custom-portrait-frame.jpg').convert('RGBA')
    inner_pad = 22
    inner_w = fw - inner_pad * 2
    inner_h = fh - inner_pad * 2
    
    p_w, p_h = img_portrait.size
    port_crop = img_portrait.crop((int(p_w * 0.05), int(p_h * 0.05), int(p_w * 0.95), int(p_h * 0.95))).resize((inner_w, inner_h), Image.Resampling.LANCZOS)
    
    p_mask = Image.new("L", (inner_w, inner_h), 0)
    pm_draw = ImageDraw.Draw(p_mask)
    pm_draw.rounded_rectangle([0, 0, inner_w, inner_h], radius=16, fill=255)
    
    base.paste(port_crop, (fx + inner_pad, fy + inner_pad), p_mask)
    
    # Diamond Prismatic Sparkles
    diamond_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d_draw = ImageDraw.Draw(diamond_layer)
    
    prism_colors = [
        (255, 255, 255, 255),  # Pure white diamond
        (200, 230, 255, 240),  # Ice blue
        (230, 210, 255, 230),  # Holographic violet
        (255, 220, 235, 230),  # Rose diamond
        (200, 255, 240, 220),  # Aquamarine
    ]
    
    for _ in range(380):
        gx = random.randint(fx + inner_pad + 5, fx + fw - inner_pad - 5)
        gy_factor = math.pow(random.random(), 0.7)
        gy = int((fy + inner_pad) + gy_factor * inner_h)
        
        radius = random.choice([2, 3, 4, 5, 6, 8])
        col = random.choice(prism_colors)
        
        if radius >= 5:
            r_long = radius * 2.4
            r_short = radius * 0.5
            d_draw.polygon([
                (gx, gy - r_long), (gx + r_short, gy - r_short),
                (gx + r_long, gy), (gx + r_short, gy + r_short),
                (gx, gy + r_long), (gx - r_short, gy + r_short),
                (gx - r_long, gy), (gx - r_short, gy - r_short)
            ], fill=col)
        else:
            d_draw.ellipse([gx - radius, gy - radius, gx + radius, gy + radius], fill=col)

    diamond_glow = diamond_layer.filter(ImageFilter.GaussianBlur(3))
    base = Image.alpha_composite(base, diamond_glow)
    base = Image.alpha_composite(base, diamond_layer)
    
    # 4 Chrome Standoffs
    stud_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    st_draw = ImageDraw.Draw(stud_layer)
    corners = [
        (fx + 36, fy + 36),
        (fx + fw - 36, fy + 36),
        (fx + 36, fy + fh - 36),
        (fx + fw - 36, fy + fh - 36)
    ]
    for cx, cy in corners:
        st_draw.ellipse([cx - 15, cy - 13, cx + 19, cy + 21], fill=(0, 0, 0, 70))
        st_draw.ellipse([cx - 16, cy - 16, cx + 16, cy + 16], fill=(225, 230, 240, 255), outline=(160, 175, 190, 255), width=2)
        st_draw.ellipse([cx - 12, cy - 12, cx + 2, cy + 2], fill=(255, 255, 255, 240))
        st_draw.ellipse([cx - 5, cy - 5, cx + 5, cy + 5], fill=(140, 150, 165, 255))
        
    base = Image.alpha_composite(base, stud_layer)
    
    # Gloss reflection
    gloss = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gl_draw = ImageDraw.Draw(gloss)
    gl_draw.polygon([
        (fx + 60, fy), (fx + 240, fy),
        (fx + 20, fy + fh), (fx - 160, fy + fh)
    ], fill=(255, 255, 255, 40))
    gloss = gloss.filter(ImageFilter.GaussianBlur(14))
    base = Image.alpha_composite(base, gloss)

    final_rgb = base.convert('RGB')
    out_path = 'public/images/products/prod-sparkling-diamond-glitter-frame/primary-square.jpg'
    final_rgb.save(out_path, 'JPEG', quality=95)
    print(f"Saved: {out_path}")

if __name__ == '__main__':
    create_cylinder_rotating_lamp()
    create_hexagonal_tower_lamp()
    create_gold_glitter_frame()
    create_diamond_glitter_frame()
    print("All 4 realistic e-commerce product photos generated successfully!")
