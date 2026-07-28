import { galleryItems } from '../data/gallery'

export default function GalleryGrid() {
 return (
 <div className="gallery__grid">
 {galleryItems.map((item) => (
 <div className="gallery__item" key={item.id}>
 <div
 className="gallery__item-bg"
 style={{ background: item.bg, height: '100%' }}
 >
 <span style={{ fontSize: '56px', opacity: 0.4 }}>{item.emoji}</span>
 </div>
 <div className="gallery__item-overlay">
 <p className="gallery__item-caption">{item.caption}</p>
 </div>
 </div>
 ))}
 </div>
 )
}
