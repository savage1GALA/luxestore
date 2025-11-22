# Product Images Folder

## How to Add Images

1. **Copy your image files** into this `server/images/` folder
   - Supported formats: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`
   - Example: `bracelet1.jpg`, `necklace2.png`

2. **Update `products.json`** with the image path:
   ```json
   {
     "id": 1,
     "name": "Product Name",
     "price": 150000,
     "image": "/images/your-image.jpg",
     "category": "Bracelet",
     "description": "Product description"
   }
   ```

3. **Image path format:**
   - Use `/images/filename.jpg` (relative to server)
   - Or use full URL: `http://example.com/image.jpg`
   - Or keep emoji: `💍` (if no image file)

## Examples

✅ **Correct:**
- `"image": "/images/bracelet1.jpg"`
- `"image": "/images/necklace.png"`
- `"image": "http://example.com/image.jpg"`

❌ **Wrong:**
- `"image": "bracelet1.jpg"` (missing /images/)
- `"image": "C:/Users/.../image.jpg"` (use relative path)

## Notes

- Image files should be in this folder: `server/images/`
- Maximum recommended size: 2MB per image
- Recommended dimensions: 800x800px or larger (square works best)
- The app will automatically display images if the path is correct
- If image fails to load, it will show the emoji fallback

