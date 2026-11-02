import re

# 1. Update lib/data/mockProducts.ts
with open('lib/data/mockProducts.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Update prod-enchanted-liquid-gold-glitter
old_g1 = '"/images/products/prod-glitter-gold-photo-frame/primary-square.jpg"'
new_g1 = '''"/images/mockups/enchanted-liquid-gold-glitter-acrylic-photo-frame/primary-square.jpg",
    "/images/mockups/enchanted-liquid-gold-glitter-acrylic-photo-frame/mockup-living-room.jpg",
    "/images/mockups/enchanted-liquid-gold-glitter-acrylic-photo-frame/mockup-interior.jpg"'''
text = text.replace(old_g1, new_g1)

# Update prod-sparkling-diamond-glitter-frame
old_g2 = '"/images/products/prod-sparkling-diamond-glitter-frame/primary-square.jpg"'
new_g2 = '''"/images/mockups/sparkling-diamond-glitter-wedding-photo-frame/primary-square.jpg",
    "/images/mockups/sparkling-diamond-glitter-wedding-photo-frame/mockup-living-room.jpg",
    "/images/mockups/sparkling-diamond-glitter-wedding-photo-frame/mockup-interior.jpg"'''
text = text.replace(old_g2, new_g2)

# Update prod-motorized-360-rotating-lamp
old_l1 = '"/images/products/prod-motorized-rotating-photo-lamp/primary-square.jpg"'
new_l1 = '''"/images/mockups/motorized-360-rotating-led-cylinder-photo-lamp/primary-square.jpg",
    "/images/mockups/motorized-360-rotating-led-cylinder-photo-lamp/mockup-living-room.jpg"'''
text = text.replace(old_l1, new_l1)

# Update prod-hexagonal-tower-rotating-lamp
old_l2 = '"/images/products/prod-hexagonal-tower-rotating-lamp/primary-square.jpg"'
new_l2 = '''"/images/mockups/crystal-tower-hexagonal-rotating-photo-lamp/primary-square.jpg",
    "/images/mockups/crystal-tower-hexagonal-rotating-photo-lamp/mockup-living-room.jpg"'''
text = text.replace(old_l2, new_l2)

with open('lib/data/mockProducts.ts', 'w', encoding='utf-8') as f:
    f.write(text)

print("Updated mockProducts.ts successfully!")

# 2. Update lib/data/categories.ts
with open('lib/data/categories.ts', 'r', encoding='utf-8') as f:
    cat_text = f.read()

cat_text = cat_text.replace(
    "'/images/wall-decor/categories/custom-frames/glitter-photo-frames-category.jpg'",
    "'/images/mockups/enchanted-liquid-gold-glitter-acrylic-photo-frame/primary-square.jpg'"
)
cat_text = cat_text.replace(
    "'/images/wall-decor/categories/custom-frames/rotating-photo-lamps-category.jpg'",
    "'/images/mockups/motorized-360-rotating-led-cylinder-photo-lamp/primary-square.jpg'"
)

with open('lib/data/categories.ts', 'w', encoding='utf-8') as f:
    f.write(cat_text)

print("Updated categories.ts successfully!")

# 3. Update components/home/CategoryShowcase.tsx
with open('components/home/CategoryShowcase.tsx', 'r', encoding='utf-8') as f:
    cs_text = f.read()

cs_text = cs_text.replace(
    "'/images/wall-decor/categories/custom-frames/glitter-photo-frames-category.jpg'",
    "'/images/mockups/enchanted-liquid-gold-glitter-acrylic-photo-frame/primary-square.jpg'"
)
cs_text = cs_text.replace(
    "'/images/wall-decor/categories/custom-frames/rotating-photo-lamps-category.jpg'",
    "'/images/mockups/motorized-360-rotating-led-cylinder-photo-lamp/primary-square.jpg'"
)

with open('components/home/CategoryShowcase.tsx', 'w', encoding='utf-8') as f:
    f.write(cs_text)

print("Updated CategoryShowcase.tsx successfully!")
