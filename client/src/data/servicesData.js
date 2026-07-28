/* ============================================================
 SERVICES DATA, Saloni Enterprise
 Each key matches the URL slug: /services/:serviceId
 ============================================================ */

const IMG = (id, w = 800) =>
 `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`

// ── Shared gallery image pool ─────────────────────────
const G = {
 i1: IMG('photo-1504328345606-18bbc8c9d7d1'),
 i2: IMG('photo-1565193566173-7a0ee3dbe261'),
 i3: IMG('photo-1581091226825-a6a2a5aee158'),
 i4: IMG('photo-1503387762-592deb58ef4e'),
 i5: IMG('photo-1600585154340-be6161a56a0c'),
 i6: IMG('photo-1541888946425-d81bb19240f5'),
 i7: IMG('photo-1486325212027-8081e485255e'),
 i8: IMG('photo-1518780664697-55e3ad937233'),
 i9: IMG('photo-1523056880514-e5a6d02f0a74'),
 i10: IMG('photo-1581092795360-fd1ca04f0952'),
 i11: IMG('photo-1590856029826-c7a73142bbf1'),
 i12: IMG('photo-1603791440384-56cd371ee9a7', 800),
}

export const SERVICES_DATA = {
 /* ═══════════════════════════════════════════════════
 ROLLING SHUTTERS
 ═══════════════════════════════════════════════════ */
 'rolling-shutters': {
 id: 'rolling-shutters',
 title: 'Rolling Shutters',
 heroTitle: 'Rolling Shutter Solutions',
 heroSub:
 'Custom-designed, professionally fabricated and expertly installed rolling shutters built for maximum security, durability and long-term performance.',
 heroImage: '/hero rolling.jpg',
 metaTitle: 'Rolling Shutters — Saloni Enterprise | Quality Shutter Solutions',
 metaDesc:
 'Custom rolling shutter fabrication and installation. Manual, motorized, gear and chain pulley shutters for shops, warehouses and industries. Call Saloni Enterprise today.',
 intro: {
 heading: 'Complete Rolling Shutter Solutions',
 body: 'We design, fabricate and install custom rolling shutters for retail shops, warehouses, garages and industrial facilities. Every shutter is precision-built using galvanised steel or mild steel laths, assembled in our fabrication workshop and installed by our experienced team. From site measurement and material selection to final commissioning, we manage the entire process, ensuring a perfect fit, smooth operation and long-lasting security from day one.',
 },
 whyChoose: [
 { icon: 'shield', title: 'Maximum Security', desc: 'Heavy-duty steel construction provides robust protection against unauthorized entry, theft and vandalism.' },
 { icon: 'gear', title: 'Smooth Operation', desc: 'Every shutter is precision-balanced for effortless daily operation, whether manual or motorized.' },
 { icon: 'ruler', title: 'Custom Sizes', desc: 'Fabricated to your exact opening dimensions. No off-the-shelf compromises, every shutter fits perfectly.' },
 { icon: 'diamond', title: 'Premium Materials', desc: 'High-quality galvanized steel laths with rust and corrosion resistance for extreme weather conditions.' },
 { icon: 'wrench', title: 'Expert Installation', desc: 'Our certified installation team ensures precise fitment, smooth operation and secure locking from day one.' },
 { icon: 'clock', title: 'Long Service Life', desc: 'Properly fabricated and installed shutters deliver 15–20 years of reliable performance with minimal upkeep.' },
 ],
 types: [
 { image: '/manual rolling.jpg', title: 'Manual Rolling Shutters', desc: 'Hand-operated shutters ideal for regular shops, small warehouses and residential garages. Simple, reliable and low maintenance.', bestFor: 'Shops, Garages, Small Warehouses' },
 { image: '/remote rolling.jpg', title: 'Motorized Rolling Shutters', desc: 'Electrically operated shutters with remote control or switch operation. Perfect for large openings or high-frequency use.', bestFor: 'Large Shops, Showrooms, Factories' },
 { image: '/gear rolling.jpg', title: 'Gear Type Shutters', desc: 'Spring-assisted gear mechanism for heavier shutters requiring less physical effort to raise and lower.', bestFor: 'Wide Openings, Industrial Use' },
 { image: '/chain pulling rolling.jpg', title: 'Chain Pulley Shutters', desc: 'Chain and pulley mechanism for heavy-duty applications. Ideal for industrial and high-security requirements.', bestFor: 'Warehouses, Heavy Duty Industrial' },
 ],
 applications: [
 { icon: 'shop', label: 'Retail Shops' },
 { icon: 'warehouse', label: 'Warehouses' },
 { icon: 'factory', label: 'Factories' },
 { icon: 'showroom', label: 'Showrooms' },
 { icon: 'garage', label: 'Garages' },
 { icon: 'hospital', label: 'Hospitals' },
 { icon: 'school', label: 'Schools' },
 { icon: 'office', label: 'Commercial Buildings' },
 ],
 gallery: [
 { src: G.i1, project: 'Industrial Warehouse Shutter', type: 'Motorized Rolling Shutter' },
 { src: G.i2, project: 'Factory Unit Installation', type: 'Heavy Duty Manual Shutter' },
 { src: G.i3, project: 'Commercial Complex Project', type: 'Motorized Rolling Shutter' },
 { src: G.i6, project: 'Retail Shop Front', type: 'Manual Rolling Shutter' },
 { src: G.i11, project: 'Steel Distribution Centre', type: 'Chain Pulley Shutter' },
 { src: G.i12, project: 'Automotive Workshop', type: 'Gear Type Rolling Shutter' },
 ],
 faqs: [
 { q: 'How long does rolling shutter installation take?', a: 'Standard installations take 1–2 working days depending on the opening size and number of shutters. Large commercial or industrial projects may require 3–5 working days.' },
 { q: 'Do you provide motorized shutters with remote control?', a: 'Yes. Our motorized rolling shutters are available with remote control, wall-mounted switch operation and optional smartphone integration via smart home systems.' },
 { q: 'What materials are used in fabrication?', a: 'We use galvanized steel or mild steel lath profiles depending on your application requirements. Galvanized steel is preferred for outdoor and high-humidity environments.' },
 { q: 'Do you offer custom sizes and powder coat colors?', a: 'Yes. All shutters are custom-fabricated to your exact opening dimensions. Powder-coated finishes are available in a wide range of RAL colors at a small additional cost.' },
 { q: 'Can I sign an Annual Maintenance Contract (AMC)?', a: 'Yes. We offer AMC packages that include scheduled servicing, lubrication, spring adjustment and emergency call-out support throughout the year. Contact us for pricing.' },
 { q: 'Do you provide emergency repair services?', a: 'Yes. We offer emergency repair services and aim to respond within 4–8 hours for urgent breakdowns. Please call us directly for fastest response.' },
 ],
 related: ['metal-fabrication', 'steel-railings', 'repair-maintenance', 'glass-works'],
 },

 /* ═══════════════════════════════════════════════════
 CUSTOM METAL FABRICATION
 ═══════════════════════════════════════════════════ */
 'metal-fabrication': {
 id: 'metal-fabrication',
 title: 'Custom Metal Fabrication',
 heroTitle: 'Custom Metal Fabrication',
 heroSub:
 'Precision-engineered metalwork for residential, commercial and industrial projects, fabricated in-house and delivered to your exact specifications.',
 heroImage: '/hero metal fabrication.jpg',
 metaTitle: 'Custom Metal Fabrication — Saloni Enterprise | Gates, Grilles & Sheds',
 metaDesc:
 'Custom metal fabrication services — gates, grilles, sheds and structural metalwork. Precision fabrication and installation by Saloni Enterprise.',
 intro: {
 heading: 'Precision Metal Fabrication, Built to Order',
 body: 'Our custom metal fabrication service delivers precision-engineered solutions for residential, commercial and industrial clients. From structural steel frameworks and industrial components to decorative gates and custom furniture, our skilled welders and fabricators bring your exact specifications to life using premium mild steel, stainless steel and galvanized steel. Every project is measured, designed and fabricated in our workshop before professional installation at your site.',
 },
 whyChoose: [
 { icon: 'precision', title: 'Precision Engineering', desc: 'Every component is measured, cut and assembled to exact tolerances for a perfect structural and aesthetic fit.' },
 { icon: 'diamond', title: 'Premium Quality Steel', desc: 'We source quality mild steel, stainless steel and galvanized steel materials from reputed mills and trusted suppliers.' },
 { icon: 'palette', title: 'Fully Custom Designs', desc: 'From your sketch or architectural drawing to finished product, complete fabrication as per your exact specifications.' },
 { icon: 'truck', title: 'On-Time Delivery', desc: 'Structured project timelines and dedicated supervision ensure your fabricated items are ready when promised.' },
 { icon: 'gear', title: 'Skilled Craftsmen', desc: 'Our team of certified welders and fabricators bring decades of combined expertise in structural and decorative metalwork.' },
 { icon: 'star', title: 'Cost-Effective Solutions', desc: 'Competitive pricing without compromising on quality, transparent quotations with no hidden fabrication charges.' },
 ],
 types: [
 { image: '/grill metal fabrication.jpg', title: 'Custom Gates & Grilles', desc: 'Security gates, compound gates, window grilles and entrance solutions fabricated in mild steel and stainless steel profiles to your exact design.', bestFor: 'Residential, Commercial, Industrial' },
 { image: '/shed metal fabrication.jpg', title: 'Custom Sheds', desc: 'Durable metal sheds for storage, parking and industrial use. Fabricated from galvanized steel or mild steel profiles with roofing sheets.', bestFor: 'Parking, Storage, Workshops, Farms' },
 ],
 applications: [
 { icon: 'home', label: 'Residential Buildings' },
 { icon: 'office', label: 'Commercial Complexes' },
 { icon: 'factory', label: 'Industrial Plants' },
 { icon: 'bridge', label: 'Infrastructure Projects' },
 { icon: 'school', label: 'Educational Institutions' },
 { icon: 'hospital', label: 'Healthcare Facilities' },
 { icon: 'hotel', label: 'Hospitality Sector' },
 { icon: 'warehouse', label: 'Government Projects' },
 ],
 gallery: [
 { src: G.i2, project: 'Industrial Plant Framework', type: 'Structural Steel Fabrication' },
 { src: G.i3, project: 'Commercial Gate Installation', type: 'Custom Gates & Grilles' },
 { src: G.i4, project: 'Residential Decorative Railing', type: 'Decorative Metalwork' },
 { src: G.i6, project: 'Factory Mezzanine Floor', type: 'Structural Steel Fabrication' },
 { src: G.i11, project: 'Sheet Metal Panel Enclosures', type: 'Sheet Metal Fabrication' },
 { src: G.i5, project: 'Hotel Entrance Gate', type: 'Decorative Metal Works' },
 ],
 faqs: [
 { q: 'Can you fabricate from my architect\'s drawings?', a: 'Yes. We work directly from architectural drawings, DWG files or detailed sketches. Our fabrication team reviews your drawings and provides a detailed quotation before beginning work.' },
 { q: 'What metals do you work with?', a: 'We work with mild steel, stainless steel, galvanized steel and aluminum, depending on your application, environment and budget.' },
 { q: 'What finishing options are available?', a: 'We offer powder coating, hot-dip galvanizing, primer painting, spray painting and polished finishes depending on the material and application requirements.' },
 { q: 'Do you handle delivery and installation?', a: 'Yes. We handle complete end-to-end delivery and installation of all fabricated products at your project site.' },
 { q: 'How do I get a price quotation?', a: 'Share your drawings, dimensions or requirements via WhatsApp or email, and we will provide a detailed quotation within 24–48 hours.' },
 { q: 'Do you provide structural calculations or engineering support?', a: 'For major structural fabrication projects, we collaborate with qualified civil and structural engineers. Please discuss your requirements with our team.' },
 ],
 related: ['rolling-shutters', 'steel-railings', 'glass-works', 'repair-maintenance'],
 },

 /* ═══════════════════════════════════════════════════
 TOUGHENED GLASS WORKS
 ═══════════════════════════════════════════════════ */
 'glass-works': {
 id: 'glass-works',
 title: 'Toughened Glass Works',
 heroTitle: 'Toughened Glass Solutions',
 heroSub:
 'Premium toughened glass installations combining safety, clarity and modern aesthetics for offices, retail spaces and residential interiors.',
 heroImage: '/glass cover.jpg',
 metaTitle: 'Toughened Glass Works — Saloni Enterprise | Glass Doors & Partitions',
 metaDesc:
 'Toughened glass doors, office partitions, storefronts and glass balustrades. Premium safety glass installations by Saloni Enterprise.',
 intro: {
 heading: 'Modern Glass Solutions for Every Space',
 body: 'Our toughened glass works service delivers premium safety glass solutions that transform interiors and exteriors across offices, retail spaces and residential properties. We supply and install thermally toughened glass, up to five times stronger than ordinary glass, in frameless doors, office partitions, commercial storefronts and balcony balustrades. Every installation is measured on-site, custom-cut to your exact dimensions and fitted by our specialist glazing team with precision hardware and sealants.',
 },
 whyChoose: [
 { icon: 'shield', title: 'High Safety Standard', desc: 'Thermally toughened glass is up to 5× stronger than ordinary glass and breaks into safe, rounded fragments on impact.' },
 { icon: 'star', title: 'Modern Aesthetics', desc: 'Clean frameless designs with polished edges that enhance any contemporary interior or commercial space.' },
 { icon: 'sound', title: 'Sound Insulation', desc: 'Laminated and double-glazed options significantly reduce noise transmission between spaces.' },
 { icon: 'sun', title: 'UV Protection', desc: 'Special coatings available to filter up to 99% of UV rays while maintaining exceptional optical clarity.' },
 { icon: 'diamond', title: 'Scratch Resistant', desc: 'Hardened surface resists everyday abrasion from furniture, cleaning tools and general wear.' },
 { icon: 'palette', title: 'Custom Finishes', desc: 'Available in clear, frosted, tinted, sandblasted and patterned finishes to match any design requirement.' },
 ],
 types: [
 { image: '/door glass.jpg', title: 'Glass Doors', desc: 'Frameless and semi-framed toughened glass doors with premium stainless steel fittings for modern entrances.', bestFor: 'Offices, Showrooms, Hotels, Restaurants' },
 { image: '/partition glass.jpg', title: 'Office Partitions', desc: 'Floor-to-ceiling glass partition systems that create open yet defined workspaces with minimal visual intrusion.', bestFor: 'Corporate Offices, Co-working Spaces' },
 { image: '/shopfront glass.jpg', title: 'Glass Storefronts', desc: 'Premium structural glass facades and shop fronts that maximize visibility and create a sophisticated brand presence.', bestFor: 'Retail Shops, Showrooms, Malls' },
 { image: '/balustrade glass.jpg', title: 'Glass Balustrades', desc: 'Safety glass panels with stainless steel channels for staircases, balconies and pool areas. Sleek and low maintenance.', bestFor: 'Residential, Hotels, Premium Properties' },
 ],
 applications: [
 { icon: 'office', label: 'Corporate Offices' },
 { icon: 'shop', label: 'Retail Showrooms' },
 { icon: 'hotel', label: 'Hotels & Resorts' },
 { icon: 'restaurant', label: 'Restaurants' },
 { icon: 'home', label: 'Residential Homes' },
 { icon: 'warehouse', label: 'Shopping Malls' },
 { icon: 'hospital', label: 'Healthcare Facilities' },
 { icon: 'school', label: 'Educational Institutions' },
 ],
 gallery: [
 { src: G.i7, project: 'Corporate Office Glass Facade', type: 'Glass Storefront' },
 { src: G.i4, project: 'Hotel Lobby Glass Partition', type: 'Office Partitions' },
 { src: G.i5, project: 'Retail Showroom Entrance', type: 'Glass Doors' },
 { src: G.i8, project: 'Residential Staircase Balustrade', type: 'Glass Balustrades' },
 { src: G.i3, project: 'Co-working Space Partition', type: 'Office Partitions' },
 { src: G.i12, project: 'Restaurant Glass Front', type: 'Glass Storefront' },
 ],
 faqs: [
 { q: 'Is toughened glass safe if it breaks?', a: 'Yes. When toughened glass breaks, it shatters into small, blunt-edged granular pieces rather than sharp shards, significantly reducing the risk of injury.' },
 { q: 'What thickness of glass do you install?', a: 'We install glass from 6mm to 19mm thickness depending on the application. Doors and partitions typically use 10mm–12mm, while balustrades use 12mm–15mm.' },
 { q: 'Can toughened glass be cut or drilled on-site?', a: 'No. Toughened glass cannot be cut, drilled or altered after toughening. All custom holes and cutouts must be specified before the toughening process.' },
 { q: 'Do you provide frosted or decorative glass options?', a: 'Yes. We offer acid-etched frosted, sandblasted, digitally printed, tinted and patterned glass to suit your privacy and aesthetic requirements.' },
 { q: 'How long does glass installation typically take?', a: 'Most residential installations are completed in 1–2 days. Large commercial projects such as full office partitions may take 3–7 working days.' },
 { q: 'Do you offer glazing repair services?', a: 'Yes. We handle glass replacement, hardware repair and re-sealing services for all our glass installations and many third-party installations.' },
 ],
 related: ['steel-railings', 'rolling-shutters', 'metal-fabrication', 'retractable-awnings'],
 },

 /* ═══════════════════════════════════════════════════
 STEEL RAILINGS
 ═══════════════════════════════════════════════════ */
 'steel-railings': {
 id: 'steel-railings',
 title: 'Steel Railings',
 heroTitle: 'Premium Steel Railing Systems',
 heroSub:
 'Elegantly crafted stainless steel and mild steel railings for balconies, staircases and terraces, combining structural strength with timeless design.',
 heroImage: '/railing cover.jpg',
 metaTitle: 'Steel Railings — Saloni Enterprise | SS & MS Railing Systems',
 metaDesc:
 'Custom stainless steel and mild steel railings for balconies, staircases and terraces. Premium railing fabrication and professional installation by Saloni Enterprise.',
 intro: {
 heading: 'Strength, Safety and Elegant Design',
 body: 'Our stainless steel and mild steel railing systems are precision-fabricated for balconies, staircases, terraces and corridors. We combine structural engineering with elegant design to deliver railing solutions that meet safety codes while complementing your architecture. Each system is custom-designed, fabricated in our workshop and installed by our dedicated site team.',
 },
 whyChoose: [
 { icon: 'shield', title: 'Structural Strength', desc: 'Fabricated from stainless steel or heavy-gauge mild steel with full-penetration welds and anchored posts.' },
 { icon: 'star', title: 'Elegant Design', desc: 'Modern profiles and finishes, from mirror-polished stainless to powder-coated matte, to complement any architectural style.' },
 { icon: 'leaf', title: 'Corrosion Resistant', desc: 'Stainless steel is naturally resistant to rust, oxidation and coastal salt air, requiring minimal long-term maintenance.' },
 { icon: 'check', title: 'Safety Compliant', desc: 'All railing systems are designed and installed to meet building code height and load requirements.' },
 { icon: 'clock', title: 'Low Maintenance', desc: 'Polished or brushed finishes require only occasional cleaning to maintain their appearance for decades.' },
 { icon: 'ruler', title: 'Custom Profiles', desc: 'Available in round, square, flat, twisted and custom profiles to match your design vision and budget.' },
 ],
 types: [
 { image: '/steel railing.jpg', title: 'Stainless Steel Railings', desc: 'Premium stainless steel railings with mirror or brushed finish. Corrosion-free, elegant and virtually maintenance-free.', bestFor: 'Balconies, Staircases, Premium Properties' },
 { image: '/ms railing.jpg', title: 'Mild Steel Railings', desc: 'Cost-effective powder-coated mild steel railings in a wide range of profiles and designs for functional or decorative use.', bestFor: 'Residential, Commercial, Industrial' },
 { image: '/glass railing.jpg', title: 'Glass Balustrades', desc: 'Toughened glass panels in stainless steel channels for a sleek, open and contemporary balustrade system.', bestFor: 'Modern Architecture, Premium Homes' },
 { image: '/alumnium railing.jpg', title: 'Aluminum Railings', desc: 'Lightweight, anodized aluminum railings, naturally corrosion-free and ideal for coastal or humid environments.', bestFor: 'Coastal Properties, Terraces, Pools' },
 ],
 applications: [
 { icon: 'home', label: 'Balconies' },
 { icon: 'stair', label: 'Staircases' },
 { icon: 'terrace', label: 'Terraces' },
 { icon: 'corridor', label: 'Corridors' },
 { icon: 'office', label: 'Commercial Buildings' },
 { icon: 'hotel', label: 'Hotels & Resorts' },
 { icon: 'hospital', label: 'Hotels & Resorts' },
 { icon: 'warehouse', label: 'Public Spaces' },
 ],
 gallery: [
 { src: G.i8, project: 'Premium Villa Staircase Railing', type: 'Stainless Steel Railings' },
 { src: G.i5, project: 'Commercial Building Balcony', type: 'MS Powder Coat Railings' },
 { src: G.i4, project: 'Hotel Terrace Glass Balustrade', type: 'Glass Balustrades' },
 { src: G.i7, project: 'Residential Complex Corridor', type: 'Stainless Steel Railings' },
 { src: G.i3, project: 'Poolside Aluminum Railing', type: 'Aluminum Railings' },
 { src: G.i11, project: 'Industrial Mezzanine Safety Rail', type: 'MS Railings' },
 ],
 faqs: [
 { q: 'What types of steel do you use for railings?', a: 'We work with stainless steel and mild steel depending on the application, location and your budget. Stainless steel is ideal for outdoor, coastal or premium applications due to its natural corrosion resistance. Mild steel with powder coating is a cost-effective option for indoor or sheltered locations.' },
 { q: 'Can you match my existing railing design?', a: 'Yes. Our fabrication team can replicate or extend existing railing designs. Share photographs and measurements and we will match the profile and finish as closely as possible.' },
 { q: 'How are railings fixed, drilled into the slab?', a: 'Railing posts can be fixed using core-drilled anchor bolts, side-mounted brackets or surface-mounted base plates depending on your slab type and structural requirements.' },
 { q: 'What is the standard height for safety railings?', a: 'As per building code guidelines, balcony and terrace railings should be a minimum of 1,050mm (42 inches) in height. Staircase railings are typically 900mm.' },
 { q: 'Do you polish and finish on-site?', a: 'Initial buffing is done in our workshop. Final on-site polishing and cleaning is carried out after installation to ensure a flawless finish.' },
 { q: 'How do I maintain stainless steel railings?', a: 'Wipe regularly with a damp microfibre cloth and mild detergent. Avoid steel wool or abrasive cleaners. An occasional application of metal polish maintains the shine and adds a protective layer.' },
 ],
 related: ['glass-works', 'metal-fabrication', 'rolling-shutters', 'repair-maintenance'],
 },

 /* ═══════════════════════════════════════════════════
 RETRACTABLE AWNINGS
 ═══════════════════════════════════════════════════ */
 'retractable-awnings': {
 id: 'retractable-awnings',
 title: 'Retractable Awnings',
 heroTitle: 'Retractable Awning Solutions',
 heroSub:
 'Premium sun and weather protection for outdoor spaces. Custom-designed, heavy-duty awnings available in manual and motorized configurations for homes, restaurants and commercial spaces.',
 heroImage: '/awning coverr.jpg',
 metaTitle: 'Retractable Awnings — Saloni Enterprise | Outdoor Canopy Solutions',
 metaDesc:
 'Custom retractable awnings and fixed canopies. Manual and motorized awning installation for cafes, hotels, residences and commercial spaces by Saloni Enterprise.',
 intro: {
 heading: 'Outdoor Comfort, Crafted to Last',
 body: 'Our retractable awning solutions offer premium sun and weather protection for cafes, restaurants, homes, hotels and office terraces. Available in manual and motorized configurations, our awnings are custom-fabricated using heavy-duty extruded aluminum arms, anodized profiles and UV-resistant acrylic fabric that resists fading and water penetration. Every project is site-measured, custom-manufactured and professionally installed to extend your usable outdoor space in any season.',
 },
 whyChoose: [
 { icon: 'sun', title: 'UV Protection', desc: 'Premium acrylic fabric blocks up to 95% of harmful UV rays while keeping the space bright and comfortable.' },
 { icon: 'shield', title: 'Weather Resistant', desc: 'Heavy-duty aluminum frames with water-repellent, mould-resistant fabric built to perform through monsoon and summer alike.' },
 { icon: 'ruler', title: 'Custom Sizes', desc: 'Available in widths from 2 metres to 12 metres and custom projections to cover any outdoor opening perfectly.' },
 { icon: 'gear', title: 'Easy Operation', desc: 'Manual hand-crank or motorized remote-control operation, including optional wind sensor auto-retract for safety.' },
 { icon: 'leaf', title: 'Energy Efficient', desc: 'Reduces direct solar heat gain, lowering indoor temperatures and reducing air conditioning costs significantly.' },
 { icon: 'palette', title: 'Stylish Designs', desc: 'Wide range of fabric colors, stripe patterns and frame finishes to complement your exterior décor.' },
 ],
 types: [
 { image: '/manual awning.jpg', title: 'Manual Retractable Awning', desc: 'Hand-crank operated, robust and reliable awning for smaller openings. Simple, low maintenance and cost-effective.', bestFor: 'Residences, Small Cafes, Balconies' },
 { image: '/remote awning.jpg', title: 'Motorized Retractable Awning', desc: 'Remote-controlled motorized awning with optional wind sensor, sun sensor and smartphone control for effortless use.', bestFor: 'Restaurants, Hotels, Large Terraces' },
 { image: '/canopy awning.jpg', title: 'Fixed Projection Canopy', desc: 'Permanently fixed overhead canopy providing continuous weather protection without any retractable mechanism.', bestFor: 'Shop Entrances, Corridors, Walkways' },
 ],
 applications: [
 { icon: 'restaurant', label: 'Cafés & Restaurants' },
 { icon: 'home', label: 'Residential Homes' },
 { icon: 'hotel', label: 'Hotels & Resorts' },
 { icon: 'office', label: 'Office Terraces' },
 { icon: 'shop', label: 'Retail Shops' },
 { icon: 'sport', label: 'Sports Facilities' },
 { icon: 'warehouse', label: 'Outdoor Events' },
 { icon: 'pool', label: 'Swimming Pools' },
 ],
 gallery: [
 { src: G.i9, project: 'Restaurant Terrace Canopy', type: 'Motorized Retractable Awning' },
 { src: G.i5, project: 'Residential Balcony Awning', type: 'Manual Retractable Awning' },
 { src: G.i4, project: 'Hotel Poolside Canopy', type: 'Fixed Projection Canopy' },
 { src: G.i6, project: 'Café Outdoor Seating Cover', type: 'Motorized Retractable Awning' },
 { src: G.i3, project: 'Commercial Entrance Canopy', type: 'Fixed Projection Canopy' },
 { src: G.i11, project: 'Mall Courtyard Tensile Structure', type: 'Tensile Canopy' },
 ],
 faqs: [
 { q: 'How long do retractable awnings last?', a: 'High-quality aluminum-frame retractable awnings typically last 10–15 years with proper care. Fabric panels can be replaced independently if needed, extending the awning\'s life further.' },
 { q: 'Can awnings withstand heavy rain and strong wind?', a: 'Our awnings use water-repellent fabric that sheds rain effectively. For strong winds, we recommend retracting the awning. Motorized awnings can include a wind sensor that auto-retracts at preset wind speeds.' },
 { q: 'What fabric colors and patterns are available?', a: 'We offer a wide range of plain, striped and textured acrylic fabrics in 50+ standard colors. Custom color matching for brand requirements is also available.' },
 { q: 'Do you handle installation as well?', a: 'Yes. Our installation team handles complete site measurement, bracket fixing, awning installation and final commissioning including motor testing for motorized variants.' },
 { q: 'Can an existing manual awning be converted to motorized?', a: 'In most cases, yes. If your awning frame is structurally sound, we can retrofit a tubular motor and remote control system without replacing the entire awning.' },
 { q: 'Do you service awnings after installation?', a: 'Yes. We provide periodic servicing including cleaning, fabric inspection, tensioning and motor servicing. Annual maintenance contracts are available.' },
 ],
 related: ['glass-works', 'metal-fabrication', 'rolling-shutters', 'repair-maintenance'],
 },

 /* ═══════════════════════════════════════════════════
 REPAIR & MAINTENANCE
 ═══════════════════════════════════════════════════ */
 'repair-maintenance': {
 id: 'repair-maintenance',
 title: 'Repair & Maintenance',
 heroTitle: 'Repair & Maintenance Services',
 heroSub:
 'Fast, reliable repair and preventive maintenance for rolling shutters, glass works, railings and all metal fabrications, by certified technicians.',
 heroImage: '/repair hero.jpg',
 metaTitle: 'Repair & Maintenance Services — Saloni Enterprise | Rolling Shutter Repair',
 metaDesc:
 'Professional rolling shutter repair, motor servicing, spring replacement and AMC services. Emergency repair support by Saloni Enterprise.',
 intro: {
 heading: 'Fast Repairs, Lasting Solutions',
 body: 'Our repair and maintenance service ensures that your shutters, glass installations, railings and metalwork remain in optimal working condition throughout their lifecycle. From emergency rolling shutter breakdowns and motor failures to scheduled AMC visits and spring replacements, our trained technicians are equipped and dispatched promptly. We use genuine spare parts, provide transparent pricing before beginning any work, and back every repair with our service guarantee.',
 },
 whyChoose: [
 { icon: 'zap', title: 'Quick Response', desc: 'We aim to respond to service requests within 4–8 hours for urgent breakdowns. Emergency same-day visits available.' },
 { icon: 'gear', title: 'Certified Technicians', desc: 'All repairs are carried out by trained and experienced service personnel with product-specific expertise.' },
 { icon: 'diamond', title: 'Genuine Spare Parts', desc: 'We use manufacturer-approved or equivalent grade spare parts for lasting, reliable repairs every time.' },
 { icon: 'star', title: 'Transparent Pricing', desc: 'Clear inspection report and written quotation before any work begins, zero hidden charges or surprises.' },
 { icon: 'clock', title: 'Scheduled AMC', desc: 'Annual Maintenance Contracts with planned visits to keep all installed products performing at their best.' },
 { icon: 'truck', title: 'Pan-West Bengal Service', desc: 'Our mobile service team covers all major districts of for both emergency and planned maintenance.' },
 ],
 types: [
 { image: '/repair rolling.jpg', title: 'Rolling Shutter Repair', desc: 'Complete diagnosis and repair of shutter laths, curtain, spring box, guides, locks and bottom bars. Fast response, quality workmanship.', bestFor: 'Emergency Breakdowns, Damaged Shutters' },
 ],
 applications: [
 { icon: 'shop', label: 'Rolling Shutters' },
 { icon: 'gear', label: 'Motorized Systems' },
 { icon: 'warehouse', label: 'Glass Partitions' },
 { icon: 'factory', label: 'Steel Railings' },
 { icon: 'home', label: 'Retractable Awnings' },
 { icon: 'office', label: 'Metal Fabrications' },
 { icon: 'hotel', label: 'Automated Gates' },
 { icon: 'wrench', label: 'All Saloni Installs' },
 ],
 gallery: [
 { src: G.i10, project: 'Emergency Shutter Repair', type: 'Rolling Shutter Repair' },
 { src: G.i3, project: 'Motor Replacement, Industrial Unit', type: 'Motor & Automation Service' },
 { src: G.i2, project: 'Spring Box Replacement', type: 'Spring & Mechanism Service' },
 { src: G.i6, project: 'AMC Scheduled Visit, Shopping Mall', type: 'Annual Maintenance Contract' },
 { src: G.i12, project: 'Glass Door Hardware Repair', type: 'Glass Partition Repair' },
 { src: G.i4, project: 'Railing Welding & Refinishing', type: 'Steel Railing Maintenance' },
 ],
 faqs: [
 { q: 'How quickly can you attend to an emergency shutter breakdown?', a: 'We aim to respond as quickly as possible for emergency callouts. Please call us directly for fastest dispatch.' },
 { q: 'Do you repair shutters that were not installed by you?', a: 'Yes. We repair rolling shutters, motors and related components regardless of the original installer, as long as we can source compatible spare parts.' },
 { q: 'What is included in an Annual Maintenance Contract (AMC)?', a: 'A standard AMC includes 2 scheduled visits per year, lubrication of all moving parts, spring tension check, visual inspection of laths and guides, minor adjustments and priority emergency callout response.' },
 { q: 'Do you provide a warranty on repair work?', a: 'Yes. We provide a 90-day workmanship warranty on all repair work. Replaced parts carry the manufacturer\'s standard warranty.' },
 { q: 'Can you repair a shutter motor remotely or do you need a site visit?', a: 'Most motor issues require a physical site visit for accurate diagnosis. However, our technicians can often guide you through basic remote troubleshooting steps over WhatsApp before the visit.' },
 { q: 'How do I book a service or AMC?', a: 'You can call us, send a WhatsApp message with your address and issue description, or fill in our online quote form and our service coordinator will contact you within 2–4 hours.' },
 ],
 related: ['rolling-shutters', 'metal-fabrication', 'steel-railings', 'glass-works'],
 },

 /* ═══════════════════════════════════════════════════
 UPVC DOORS & WINDOWS
 ═══════════════════════════════════════════════════ */
 'upvc-doors-windows': {
 id: 'upvc-doors-windows',
 title: 'UPVC Doors & Windows',
 heroTitle: 'UPVC Door & Window Solutions',
 heroSub:
 'Premium UPVC doors and windows that deliver superior thermal insulation, sound reduction, weather resistance and lasting elegance, factory-fabricated and professionally installed.',
 heroImage: '/upvc cover.jpg',
 metaTitle: 'UPVC Doors & Windows — Saloni Enterprise | Doors & Window Solutions',
 metaDesc:
 'Premium UPVC doors and windows — thermally insulated, sound-proof and zero-maintenance. Casement, sliding and double-glazed options for homes, offices and commercial spaces. Call Saloni Enterprise.',
 intro: {
 heading: 'Premium UPVC Door & Window Solutions',
 body: 'Saloni Enterprise supplies and installs high-quality UPVC (Unplasticised Polyvinyl Chloride) doors and windows for residential, commercial and institutional projects. UPVC profiles are engineered to resist corrosion, termites and UV degradation, they never need painting and provide outstanding thermal and acoustic insulation. Whether you need single casement windows, large sliding patio doors or full building fenestration, our fabrication team precision-cuts and assembles each unit in our workshop before our installation crew fits them perfectly on site.',
 },
 whyChoose: [
 { icon: 'sun', title: 'Thermal Insulation', desc: 'Multi-chamber UPVC profiles with optional double-glazing reduce heat transfer, lowering cooling costs significantly.' },
 { icon: 'sound', title: 'Sound Reduction', desc: 'Double-glazed UPVC windows reduce outside noise by up to 35 dB, ideal for busy roads and urban environments.' },
 { icon: 'shield', title: 'Weather Resistance', desc: 'UV-stabilised UPVC profiles resist rain, humidity and harsh Indian weather without warping, rusting or fading.' },
 { icon: 'leaf', title: 'Zero Maintenance', desc: 'Unlike wood or steel, UPVC never needs painting or sealing. A simple wipe keeps it looking new for decades.' },
 { icon: 'ruler', title: 'Custom Fabrication', desc: 'Every unit is fabricated to your exact dimensions with a choice of white, woodgrain and dual-colour finishes.' },
 { icon: 'star', title: 'Long Lifespan', desc: 'High-grade UPVC profiles carry a 10-year structural warranty and deliver 25+ years of reliable performance.' },
 ],
 types: [
 {
 image: '/upvc door.jpg',
 title: 'UPVC Doors',
 desc: 'Strong, thermally insulated UPVC doors for main entrances, balconies and internal spaces. Available in casement, sliding and French door styles with multi-point locking.',
 bestFor: 'Main Entrances, Balconies, Patios',
 },
 {
 image: '/upvc window.jpg',
 title: 'UPVC Windows',
 desc: 'Weather-sealed, sound-reducing UPVC windows in casement, sliding and tilt-turn configurations. Optional double-glazing for superior thermal and acoustic performance.',
 bestFor: 'Homes, Offices, Apartments, Commercial Buildings',
 },
 ],
 applications: [
 { icon: 'home', label: 'Residential Homes' },
 { icon: 'office', label: 'Offices & Corporates' },
 { icon: 'hotel', label: 'Hotels & Resorts' },
 { icon: 'hospital', label: 'Hospitals & Clinics' },
 { icon: 'school', label: 'Schools & Colleges' },
 { icon: 'showroom', label: 'Showrooms' },
 { icon: 'factory', label: 'Industrial Facilities' },
 { icon: 'warehouse', label: 'Commercial Complexes' },
 ],
 gallery: [
 { src: G.i8, project: 'Residential Villa', type: 'Casement Windows' },
 { src: G.i5, project: 'Corporate Office', type: 'Sliding Doors & Windows' },
 { src: G.i9, project: 'Apartment Complex', type: 'Tilt & Turn Windows' },
 { src: G.i7, project: 'Hotel Lobby Facade', type: 'Fixed Picture Windows' },
 { src: G.i4, project: 'School Building', type: 'Casement + Fixed Combo' },
 { src: G.i11, project: 'Healthcare Facility', type: 'Sliding Windows' },
 ],
 faqs: [
 { q: 'What is UPVC and why is it better than aluminium or wood?', a: 'UPVC (Unplasticised Polyvinyl Chloride) is a rigid, maintenance-free plastic profile used for doors and windows. Unlike wood it never warps, rots or needs painting. Unlike aluminium it provides superior thermal insulation. It is cost-effective, durable and ideal for the Indian climate.' },
 { q: 'Can UPVC windows reduce outside noise effectively?', a: 'Yes. UPVC windows with double-glazed glass (typically 4mm glass + 12mm air gap + 4mm glass) can reduce outside noise by 28–35 dB, making a significant difference for homes near busy roads or commercial areas.' },
 { q: 'Do you offer double-glazed glass with UPVC frames?', a: 'Yes. We offer both single-glazed and double-glazed (IGU) UPVC windows. Double glazing is recommended for sound insulation and thermal performance, especially for AC rooms and bedrooms.' },
 { q: 'What colour options are available for UPVC profiles?', a: 'Our standard range includes white, cream, grey, dark brown woodgrain and dual-colour (different inside/outside). Custom RAL colours are available on request with slightly longer lead times.' },
 { q: 'How long does UPVC window installation take?', a: 'For a typical 2-3 bedroom home, installation is usually completed in 2–3 working days. Larger projects like commercial buildings are planned with a phased timeline shared before work begins.' },
 ],
 related: ['glass-works', 'rolling-shutters', 'metal-fabrication', 'steel-railings'],
 },
}

export const getAllServices = () => Object.values(SERVICES_DATA)
export const getService = (id) => SERVICES_DATA[id] || null
export const getRelatedServices = (ids) => ids.map((id) => SERVICES_DATA[id]).filter(Boolean)
